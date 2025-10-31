# Mailer server for Smart Civic Issue Reporter

This folder contains a small Express.js mailer service that sends complaint emails to the relevant department and an acknowledgement to the reporter.

Steps to run (local development)

1. Copy the example env and set credentials:

```bash
cp .env.example .env
# Edit .env: set EMAIL_USER and EMAIL_PASS (Gmail App Password) and optionally CC_EMAIL
```

2. Install dependencies and start server:

```bash
cd server
npm install
npm run start
```

3. POST to the endpoint (example JSON):

POST http://localhost:5000/api/send-complaint

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "category": "Roads",
  "description": "Large pothole near Sector 17 market",
  "location": "Sector 17, Chandigarh",
  "imageUrl": "https://example.com/pothole.jpg"
}
```

Notes
- Uses Gmail via Nodemailer (App Password recommended) or replace with another SMTP provider for production.
- Logs are written to the `server-logs/` directory with masked email addresses.
- Rate limiting is enabled on the endpoint.
