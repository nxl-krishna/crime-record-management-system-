import { db } from "../../../db/config";
export async function POST(request) {
  const { email, enteredOtp } = await request.json();

  // Fetch OTP from the database
  const [rows] = await db.execute(
    'SELECT otp, expires_at FROM otp_verification WHERE email = ? ORDER BY created_at DESC LIMIT 1',
    [email]
  );

  if (rows.length === 0) {
    return new Response(JSON.stringify({ success: false, message: 'No OTP found or expired' }), {
      status: 400,
    });
  }

  const { otp, expires_at } = rows[0];

  if (Date.now() > new Date(expires_at)) {
    return new Response(JSON.stringify({ success: false, message: 'OTP has expired' }), {
      status: 400,
    });
  }

  if (enteredOtp == otp) {
    // Delete the OTP after successful verification
    await db.execute('DELETE FROM otp_verification WHERE email = ?', [email]);
    return new Response(JSON.stringify({ success: true, message: 'OTP verified successfully' }), {
      status: 200,
    });
  } else {
    return new Response(JSON.stringify({ success: false, message: 'Invalid OTP' }), {
      status: 400,
    });
  }
}
