const sgMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY, EMAIL_FROM } = process.env;

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

async function sendEmail(to, subject, text) {
  if (!SENDGRID_API_KEY) {
    console.warn('SendGrid API key not configured');
    return;
  }
  const msg = { to, from: EMAIL_FROM || 'no-reply@example.com', subject, text };
  await sgMail.send(msg);
}

module.exports = { sendEmail };
