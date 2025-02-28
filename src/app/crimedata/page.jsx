"use client";

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
        victim_name: '',
        suspect: '',
        crime_description: '',
        
        officer_id: '',
        address: ''
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
            const response = await fetch('/api/addcrimerecords', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Record added successfully!');
                setFormData({
                    victim_name: '',
                    suspect: '',
                    crime_description: '',
                    
                    officer_id: '',
                    address: ''
                });
            } else {
                setMessage(data.message || 'An error occurred.');
            }
        } catch (error) {
            setMessage('Failed to connect to the server.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-[40vw] min-h-screen items-center justify-center bg-gray-100">
                    <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold mb-4">Add Crime Record</h2>

                        {message && <p className="mb-4 text-green-600">{message}</p>}

                        <div className="mb-4">
                            <label className="block mb-1">Victim Name</label>
                            <input
                                type="text"
                                name="victim_name"
                                value={formData.victim_name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Suspect</label>
                            <input
                                type="text"
                                name="suspect"
                                value={formData.suspect}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Crime Description</label>
                            <input
                                type="text"
                                name="crime_description"
                                value={formData.crime_description}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>

                        

                        <div className="mb-4">
                            <label className="block mb-1">ID of Assigned Officer</label>
                            <input
                                type="text"
                                name="officer_id"
                                value={formData.officer_id}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add Record
                        </button>
                    </form>

                    <button
                        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                    
                </div>
            </div>
        </>
    );
}
