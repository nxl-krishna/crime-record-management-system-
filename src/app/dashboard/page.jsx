"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";

export default function AddRecord() {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/logout", { method: "POST" });
        router.push("/login");
    };

    const [formData, setFormData] = useState({
        name: "",
        crime: "",
        description: "",
        state: "",
        district: "",
        criminal_address: "",
    });

    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch("/api/addrecords", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Record added successfully!");
                setFormData({ name: "", crime: "", description: "", state: "", district: "", criminal_address: "" });
            } else {
                setMessage(data.message || "An error occurred.");
            }
        } catch (error) {
            setMessage("Failed to connect to the server.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-[40vw] min-h-screen items-center justify-center bg-gray-100">
                    <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold mb-4">Add Record</h2>

                        {message && <p className="mb-4">{message}</p>}

                        <div className="mb-4">
                            <label className="block mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Crime</label>
                            <input
                                type="text"
                                name="crime"
                                value={formData.crime}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Description</label>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">State</label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">District</label>
                            <input
                                type="text"
                                name="district"
                                value={formData.district}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Criminal Address</label>
                            <input
                                type="text"
                                name="criminal_address"
                                value={formData.criminal_address}
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

                    <a href="/criminalrecord">
                        <button className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mx-7">
                            Criminal Record
                        </button>
                    </a>

                    <a href="/criminalbyid">
                        <button className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mx-7">
                            Criminal Record by ID
                        </button>
                    </a>

                    
                    <a href="/CriminalByState">
                        <button className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mx-7">
                            Criminal Record by State
                        </button>
                    </a>
                    <a href="/criminalbydistrict">
                        <button className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mx-7">
                            Criminal Record by district
                        </button>
                    </a>

                   
                </div>
            </div>
        </>
    );
}
