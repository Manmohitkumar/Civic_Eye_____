import express from "express";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { sendComplaintEmail } from "./mailer.js";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import validator from "validator";

dotenv.config();

const app = express();
app.use(express.json({ limit: '5mb' }));

// Simple CORS allowlist (adjust FRONTEND_ORIGIN in .env if needed)
// Default to '*' for easier local development; set a stricter origin in production via server/.env
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || '*';
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', FRONTEND_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

// Rate limiter
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 20, // limit each IP to 20 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});
app.use("/api/send-complaint", limiter);

const DEPT_MAP = {
    Roads: "xenr1mccchd@nic.in",
    Electricity: "elop1-chd@nic.in",
    "Water": "smartcity.chd@nic.in",
    Health: "dhs_ut@yahoo.co.in",
    Environment: "cf-chd@chd.nic.in",
    Emergency: "erss112chd-police@chd.nic.in",
};

const writeLog = async (entry) => {
    try {
        const logPath = path.join(process.cwd(), "server-logs");
        if (!fs.existsSync(logPath)) fs.mkdirSync(logPath, { recursive: true });
        const file = path.join(logPath, `${new Date().toISOString().slice(0, 10)}.log`);
        const masked = { ...entry };
        if (masked.email) masked.email = masked.email.replace(/(.{2}).+@/, "$1*@");
        fs.appendFileSync(file, JSON.stringify(masked) + "\n");
    } catch (e) {
        console.error("Failed to write log", e);
    }
};

app.post('/api/send-complaint', async (req, res) => {
    try {
        const { name, email, category, description, location, imageUrl } = req.body;

        // Basic validation
        if (!name || !email || !category || !description || !location) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        const allowed = Object.keys(DEPT_MAP).concat(['Other']);
        if (!allowed.includes(category)) {
            return res.status(400).json({ error: 'Invalid category' });
        }

        const departmentEmail = DEPT_MAP[category] || process.env.CC_EMAIL || 'comm-mcc-chd@nic.in';
        const ccEmail = process.env.CC_EMAIL || departmentEmail;

        const subject = `🚨 New Civic Complaint: ${category}`;
        const html = `
      <div style="font-family: Arial, sans-serif; line-height:1.4;">
        <h3>New Complaint Received</h3>
        <p><b>Category:</b> ${validator.escape(category)}</p>
        <p><b>Description:</b> ${validator.escape(description)}</p>
        <p><b>Location:</b> ${validator.escape(location)}</p>
        <p><b>Reported By:</b> ${validator.escape(name)} (${validator.escape(email)})</p>
        ${imageUrl ? `<p><b>Photo:</b> <a href="${validator.escape(imageUrl)}" target="_blank">View Image</a></p>` : ''}
        <hr/>
        <p>This complaint was auto-forwarded via Smart Civic Issue Reporter.</p>
      </div>
    `;

        // send to department
        await sendComplaintEmail({ to: departmentEmail, cc: ccEmail, subject, html });

        const trackingId = `CE-${Date.now()}`;
        const ackHtml = `
      <div style="font-family: Arial, sans-serif;">
        <p>Dear ${validator.escape(name)},</p>
        <p>Thank you for reporting. Your complaint has been forwarded to the relevant department. Tracking ID: <b>${trackingId}</b>.</p>
        <p>We will notify you on status updates.</p>
      </div>
    `;

        await sendComplaintEmail({ to: email, subject: 'Complaint Received - Smart Civic Issue Reporter', html: ackHtml, cc: process.env.CC_EMAIL });

        // Log
        await writeLog({ name, email, category, location, timestamp: new Date().toISOString(), trackingId });

        return res.json({ message: 'Complaint emailed and acknowledgement sent', trackingId });
    } catch (err) {
        console.error('Error sending complaint email:', err);
        return res.status(500).json({ error: 'Failed to send complaint email' });
    }
});

// Anonymous complaint: inserts using Supabase service role and sends acknowledgement
app.post('/api/complaints/anonymous', limiter, async (req, res) => {
    try {
        const { reference_id, title, reporter_name, reporter_email, category, description, location, location_lat, location_lng, photo_url, department_email } = req.body || {};

        if (!reference_id || !category) return res.status(400).json({ error: 'Missing required fields' });

        // reporter_email is required for acknowledgement
        if (!reporter_email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(reporter_email)) {
            return res.status(400).json({ error: 'Valid reporter_email is required for anonymous submissions' });
        }

        const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;
        const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
        if (!SUPABASE_SERVICE_ROLE || !supabaseUrl) {
            return res.status(500).json({ error: 'Server not configured to accept anonymous submissions. Missing service role or supabase url.' });
        }

        const record = {
            reference_id,
            complaint_id: reference_id,
            title: title || `Complaint - ${category}`,
            user_id: null,
            user_name: reporter_name || null,
            user_email: reporter_email || null,
            user_mobile: null,
            category,
            ai_suggested_category: null,
            photo_url: photo_url || null,
            location_lat: location_lat || null,
            location_lng: location_lng || null,
            location: location || null,
            google_maps_link: (location_lat && location_lng) ? `https://www.google.com/maps?q=${location_lat},${location_lng}` : null,
            department_email: department_email || process.env.CC_EMAIL || 'comm-mcc-chd@nic.in',
            description: description || null,
            status: 'Submitted',
            created_date: new Date().toISOString(),
            created_by: 'anonymous',
        };

        // Insert via Supabase REST (service role)
        const r = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/complaints`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_SERVICE_ROLE,
                'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE}`,
                'Prefer': 'return=representation'
            },
            body: JSON.stringify([record])
        });

        if (!r.ok) {
            const txt = await r.text().catch(() => null);
            console.error('Supabase insert failed', r.status, txt);
            return res.status(500).json({ error: 'Failed to insert complaint' });
        }

        const inserted = await r.json().catch(() => null);

        // Send to department and ack
        const departmentEmail = record.department_email;
        const subject = `🚨 New Civic Complaint: ${category}`;
        const html = `
      <div style="font-family: Arial, sans-serif; line-height:1.4;">
        <h3>New Complaint Received</h3>
        <p><b>Category:</b> ${category}</p>
        <p><b>Description:</b> ${description || ''}</p>
        <p><b>Location:</b> ${location || ''}</p>
        <p><b>Reported By:</b> ${reporter_name || 'Anonymous'} (${reporter_email})</p>
        ${photo_url ? `<p><b>Photo:</b> <a href="${photo_url}" target="_blank">View Image</a></p>` : ''}
        <hr/>
        <p>This complaint was auto-forwarded via CivicEye.</p>
      </div>
    `;

        try {
            await sendComplaintEmail({ to: departmentEmail, cc: process.env.CC_EMAIL || departmentEmail, subject, html });
        } catch (e) {
            console.error('Failed to email department for anonymous complaint', e);
        }

        try {
            const ackHtml = `
        <div style="font-family: Arial, sans-serif;">
          <p>Dear ${reporter_name || 'Reporter'},</p>
          <p>Thank you for reporting. Your complaint has been received. Reference ID: <b>${reference_id}</b>.</p>
          <p>We will notify you on status updates.</p>
        </div>
      `;
            await sendComplaintEmail({ to: reporter_email, subject: 'Complaint Received - CivicEye', html: ackHtml, cc: process.env.CC_EMAIL });
        } catch (e) {
            console.error('Failed to send ack to reporter', e);
        }

        // Log
        await writeLog({ reporter_name, reporter_email, category, location, timestamp: new Date().toISOString(), reference_id });

        return res.json({ message: 'Anonymous complaint recorded', reference_id, inserted: inserted && inserted[0] ? inserted[0] : null });
    } catch (err) {
        console.error('anonymous complaint error', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// In-memory OTP store: otpToken -> { email, code, expiresAt, attempts, sentCount }
const otps = new Map();

function generateOtpCode() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
}

function makeOtpToken() {
    return crypto.randomBytes(12).toString('hex');
}

// Basic rate limiting per email for OTPs
const OTP_MAX_SENDS_PER_HOUR = 5;
const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes
const OTP_MAX_ATTEMPTS = 5;

app.post('/api/auth/send-otp', async (req, res) => {
    try {
        const { email } = req.body || {};
        if (!email) return res.status(400).json({ message: 'Email is required' });
        // basic email validation
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return res.status(400).json({ message: 'Invalid email' });

        // count recent sends
        let found = null;
        for (const [token, data] of otps) {
            if (data.email === email) {
                found = data;
                break;
            }
        }

        if (found && found.sentCount >= OTP_MAX_SENDS_PER_HOUR) {
            return res.status(429).json({ message: 'Too many OTP requests for this email. Try later.' });
        }

        const code = generateOtpCode();
        const otpToken = makeOtpToken();
        const expiresAt = Date.now() + OTP_TTL_MS;

        otps.set(otpToken, { email, code, expiresAt, attempts: 0, sentCount: (found ? found.sentCount + 1 : 1) });

        // send email via existing mailer helper
        const subject = `Your CivicEye login code`;
        const html = `<div style="font-family: Arial, sans-serif;"><p>Your one-time login code is <strong>${code}</strong>. It expires in 5 minutes.</p><p>If you did not request this, ignore this email.</p></div>`;
        try {
            await sendComplaintEmail({ to: email, subject, html });
        } catch (e) {
            console.error('Failed to send OTP email', e);
            // remove otp entry
            otps.delete(otpToken);
            return res.status(500).json({ message: 'Failed to send OTP email' });
        }

        return res.json({ otpRequired: true, otpToken });
    } catch (err) {
        console.error('send-otp error', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/auth/resend-otp', async (req, res) => {
    try {
        const { email, otpToken } = req.body || {};
        if (!email) return res.status(400).json({ message: 'Email is required' });

        // find existing token for this email (prefer provided token)
        let token = otpToken;
        if (!token) {
            for (const [t, data] of otps) if (data.email === email) { token = t; break; }
        }
        if (!token || !otps.has(token)) return res.status(400).json({ message: 'No outstanding OTP for this email' });

        const data = otps.get(token);
        if (data.sentCount >= OTP_MAX_SENDS_PER_HOUR) return res.status(429).json({ message: 'Too many OTP requests for this email. Try later.' });

        // generate new code, update
        const code = generateOtpCode();
        data.code = code;
        data.expiresAt = Date.now() + OTP_TTL_MS;
        data.sentCount = (data.sentCount || 0) + 1;
        otps.set(token, data);

        const subject = `Your CivicEye login code (resend)`;
        const html = `<div style="font-family: Arial, sans-serif;"><p>Your one-time login code is <strong>${code}</strong>. It expires in 5 minutes.</p></div>`;
        try {
            await sendComplaintEmail({ to: email, subject, html });
        } catch (e) {
            console.error('Failed to resend OTP email', e);
            return res.status(500).json({ message: 'Failed to resend OTP email' });
        }
        return res.json({ message: 'OTP resent' });
    } catch (err) {
        console.error('resend-otp error', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/auth/verify-otp', async (req, res) => {
    try {
        const { otpToken, code } = req.body || {};
        if (!otpToken || !code) return res.status(400).json({ message: 'otpToken and code required' });
        const data = otps.get(otpToken);
        if (!data) return res.status(400).json({ message: 'Invalid or expired OTP' });
        if (Date.now() > data.expiresAt) { otps.delete(otpToken); return res.status(400).json({ message: 'OTP expired' }); }
        if (data.attempts >= OTP_MAX_ATTEMPTS) { otps.delete(otpToken); return res.status(429).json({ message: 'Too many attempts' }); }

        data.attempts = (data.attempts || 0) + 1;
        if (data.code !== String(code).trim()) {
            otps.set(otpToken, data);
            return res.status(400).json({ message: 'Invalid OTP code' });
        }

        // success - remove entry
        otps.delete(otpToken);

        // If SUPABASE_SERVICE_ROLE is configured, we could create/ensure the Supabase user here.
        const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;
        if (SUPABASE_SERVICE_ROLE) {
            // attempt to upsert user via Supabase admin REST API
            try {
                const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
                if (supabaseUrl) {
                    // Create user if not exists
                    await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE}`
                        },
                        body: JSON.stringify({ email: data.email, email_confirm: true })
                    });
                }
            } catch (e) {
                console.error('Warning: failed to upsert user via admin API', e);
            }
        }

        // Return success; frontend will handle storing a token after full integration.
        return res.json({ success: true, message: 'OTP verified' });
    } catch (err) {
        console.error('verify-otp error', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Proxy login to Supabase (password grant)
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body || {};
        if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
        const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
        const anonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;
        if (!supabaseUrl || !anonKey) return res.status(500).json({ message: 'Supabase not configured' });

        const body = { grant_type: 'password', email, password };
        const r = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'apikey': anonKey },
            body: JSON.stringify(body)
        });
        const json = await r.json().catch(() => ({}));
        if (!r.ok) return res.status(r.status).json(json);
        return res.json(json);
    } catch (err) {
        console.error('login proxy error', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Proxy signup to Supabase
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { email, password } = req.body || {};
        if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
        const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
        const anonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;
        if (!supabaseUrl || !anonKey) return res.status(500).json({ message: 'Supabase not configured' });

        const r = await fetch(`${supabaseUrl}/auth/v1/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'apikey': anonKey },
            body: JSON.stringify({ email, password })
        });
        const json = await r.json().catch(() => ({}));
        if (!r.ok) return res.status(r.status).json(json);
        return res.json(json);
    } catch (err) {
        console.error('signup proxy error', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Mailer server running on ${PORT}`));
