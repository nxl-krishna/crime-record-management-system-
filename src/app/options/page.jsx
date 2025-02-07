"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Navbar from '../../components/Navbar';

export default function AddRecord() {
    const router = useRouter();
    const handleLogout = async () => {
        await fetch('/api/logout', { method: 'POST' });
        router.push('/login');
    };
    const [formData, setFormData] = useState({
        name: '',
        crime: '',
        description: '',
    });

    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch('/api/addrecords', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('record added successful!.');
                setFormData({ name: '', crime: '', description: '' });
            } else {
                setMessage(data.message || 'An error occurred.');
            }
        } catch (error) {
            setMessage('Failed to connect to the server.');
        }
    };

    return (
        <>
        <Navbar/>
      <div className="flex items-center justify-center min-h-screen">

        
           <a href="/dashboard">
           <button className="mt-6 bg-red-500 text-white px-6 py-3 text-lg rounded hover:bg-red-600 mx-7 transition w-48"
>
             Add Criminal Data
              </button>

            </a>
            <a href="/crimedata">
           <button className="mt-6 bg-red-500 text-white px-6 py-3 text-lg rounded hover:bg-red-600 mx-7 transition w-48"
>
             Adding Crime Data
              </button>

            </a>
        </div>

</>

        
        
    );
}
