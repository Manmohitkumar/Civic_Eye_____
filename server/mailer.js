import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

const LOG_PATH = path.join(process.cwd(), "logs", "complaints.log");

function logEmail(entry) {
    try {
        fs.mkdirSync(path.dirname(LOG_PATH), { recursive: true });
        fs.appendFileSync(LOG_PATH, `${new Date().toISOString()} - ${entry}\n`);
    } catch (e) {
        console.error("Failed to log email:", e);
    }
}

export async function createTransporter() {
    const { EMAIL_USER, EMAIL_PASS, SENDGRID_USER, SENDGRID_PASS } = process.env;

    if (SENDGRID_USER && SENDGRID_PASS) {
        // SendGrid SMTP
        return nodemailer.createTransport({
            host: "smtp.sendgrid.net",
            port: 587,
            secure: false,
            auth: { user: SENDGRID_USER, pass: SENDGRID_PASS },
        });
    }

    if (!EMAIL_USER || !EMAIL_PASS) {
        throw new Error("Missing EMAIL_USER or EMAIL_PASS in environment");
    }

    // Gmail SMTP (secure)
    return nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
    });
}

async function sendWithRetries(transporter, mailOptions, maxAttempts = 3) {
    let attempt = 0;
    let lastErr = null;
    while (attempt < maxAttempts) {
        try {
            attempt++;
            const info = await transporter.sendMail(mailOptions);
            logEmail(`SENT to ${mailOptions.to} subject="${mailOptions.subject}" attempt=${attempt} messageId=${info.messageId}`);
            return info;
        } catch (err) {
            lastErr = err;
            logEmail(`FAILED to ${mailOptions.to} subject="${mailOptions.subject}" attempt=${attempt} error=${err?.message}`);
            // exponential backoff
            await new Promise((res) => setTimeout(res, 500 * Math.pow(2, attempt)));
        }
    }
    throw new Error(`Failed to send email after ${maxAttempts} attempts. Last error: ${lastErr?.message}`);
}

export async function sendComplaintEmail({ to, cc, subject, html, fromName }) {
    const transporter = await createTransporter();
    const from = `${(fromName || process.env.EMAIL_FROM_NAME || "Smart Civic Issue Reporter")} <${process.env.EMAIL_USER}>`;
    const mailOptions = { from, to, cc: cc || undefined, subject, html };
    return await sendWithRetries(transporter, mailOptions);
}

export async function sendUserAck({ userEmail, userName, referenceId, category, locationLink }) {
    try {
        const transporter = await createTransporter();
        const fromName = process.env.EMAIL_FROM_NAME || `Smart Civic Issue Reporter`;
        const subject = `[CIVIC EYE] Complaint Received: ${referenceId}`;
        const html = `
      <div style="font-family: Arial, sans-serif;">
        <p>Dear ${userName || 'Citizen'},</p>
        <p>Thank you for reporting a ${category} issue. Your complaint reference ID is <strong>${referenceId}</strong>.</p>
        <p>Location: <a href="${locationLink}">Open in Maps</a></p>
        <p>Regards,<br/>Civic Eye Team</p>
      </div>
    `;
        const mailOptions = {
            from: `${fromName} <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject,
            html,
        };
        const info = await sendWithRetries(transporter, mailOptions, 2);
        logEmail(`ACK_SENT to ${userEmail} ref=${referenceId} messageId=${info.messageId}`);
        return info;
    } catch (err) {
        logEmail(`ACK_ERROR to ${userEmail} ref=${referenceId} error=${err?.message}`);
        throw err;
    }
}

export default createTransporter;
