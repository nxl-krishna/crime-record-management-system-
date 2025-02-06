import { db } from "../../../../db/config";
import nodemailer from 'nodemailer';

export async function POST(request) {
  const { email } = await request.json();
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Expire in 10 minutes

  // Store OTP in the database
  await db.execute(
    'INSERT INTO otp_verification (email, otp, expires_at) VALUES (?, ?, ?)',
    [email, otp, expiresAt]
  );

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Verification to access the record',
    text: `Your OTP is ${otp}. It will expire in 10 minutes.Now you can the access the details of the criminals .Kindly do not share the otp with any one .This otp is generated from the crime record administration team.  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}
