import express from "express";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { sendComplaintEmail } from "./mailer.js";
import fs from "fs";
import path from "path";
import validator from "validator";

dotenv.config();

const app = express();
app.use(express.json({ limit: '5mb' }));

// Simple CORS allowlist (adjust FRONTEND_ORIGIN in .env if needed)
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://127.0.0.1:8080';
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Mailer server running on ${PORT}`));
