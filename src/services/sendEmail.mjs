"use server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
const escapeHtml = (str = "") =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const sendEmail = async (data) => {
  const { name, date, time, summary, phone, address } = data;

  const html = `
  <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding:30px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden;">
      
      <!-- Header -->
      <div style="background:#2563eb; color:#ffffff; padding:20px;">
        <h2 style="margin:0;">New Appointment Booked</h2>
        <p style="margin:4px 0 0; font-size:14px;">
          A new appointment has been scheduled
        </p>
      </div>

      <!-- Body -->
      <div style="padding:24px; color:#333333;">
        <p style="font-size:15px; margin-bottom:20px;">
          Hello Mahmud Selim,
          <br />
          A new appointment has just been booked. Here are the details:
        </p>

        <table style="width:100%; border-collapse:collapse; font-size:14px;">
          <tr>
            <td style="padding:10px; background:#f1f5f9; font-weight:bold;">Client Name</td>
            <td style="padding:10px; white-space:pre-wrap;">${escapeHtml(
              name
            )}</td>
          </tr>
          <tr>
            <td style="padding:10px; background:#f1f5f9; font-weight:bold;">Date</td>
            <td style="padding:10px; white-space:pre-wrap;">${date}</td>
          </tr>
          <tr>
            <td style="padding:10px; background:#f1f5f9; font-weight:bold;">Time</td>
            <td style="padding:10px; white-space:pre-wrap;">${time}</td>
          </tr>
          <tr>
            <td style="padding:10px; background:#f1f5f9; font-weight:bold;">Phone</td>
            <td style="padding:10px; white-space:pre-wrap;">${escapeHtml(
              phone
            )}</td>
          </tr>
          <tr>
            <td style="padding:10px; background:#f1f5f9; font-weight:bold;">Address</td>
            <td style="padding:10px; white-space:pre-wrap;">${escapeHtml(
              address
            )}</td>
          </tr>
          <tr>
            <td style="padding:10px; background:#f1f5f9; font-weight:bold;">Summary</td>
            <td style="padding:10px; white-space:pre-wrap;"> ${
              summary ? escapeHtml(summary) : "—"
            }</td>
          </tr>
        </table>

        <p style="margin-top:24px; font-size:14px; color:#555;">
          To see all the appointments <a href='https://alhikmahbd.org/admin/appointments' style="color:blue">Click here</a>
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#f8fafc; text-align:center; padding:14px; font-size:12px; color:#777;">
        © ${new Date().getFullYear()} Appointment System
      </div>

    </div>
  </div>
  `;

  return transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: process.env.FROM_EMAIL, // admin email
    subject: "🆕 New Appointment Booked",
    html,
  });
};

export default sendEmail;
