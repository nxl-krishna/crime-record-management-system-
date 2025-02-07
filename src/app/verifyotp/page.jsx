'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';

export default function OtpVerification() {
  const [otp, setOtp] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  useEffect(() => {
    if (email) {
      sendOtp();
    }
  }, [email]);

  const sendOtp = async () => {
    const response = await fetch('/api/otp/send-email', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (data.success) {
      alert('OTP sent to your email!');
    } else {
      alert('Error sending OTP');
    }
  };

  const verifyOtp = async () => {
    const response = await fetch('/api/otp/verify', {
      method: 'POST',
      body: JSON.stringify({ email, enteredOtp: otp }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    setStatus(data.message);

    if (data.success) {
      router.push('/options');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="p-4">
      <h1>OTP Verification</h1>
      <p>An OTP has been sent to {email}</p>

      <div className="mt-4">
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="p-2 border rounded"
        />
        <button onClick={verifyOtp} className="ml-2 p-2 bg-green-500 text-white rounded">Verify OTP</button>
      </div>
      {status && <p className="mt-2 text-red-500">{status}</p>}
    </div></>
  );
}