"use client";

import { useState } from "react";

export default function OfficerCases() {
    const [officerId, setOfficerId] = useState("");
    const [officer, setOfficer] = useState(null);
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Fetch officer details
            const officerRes = await fetch(`/api/getOfficer?officer_id=${officerId}`);
            const officerData = await officerRes.json();

            if (!officerRes.ok) {
                setError(officerData.message || "Officer not found");
                setLoading(false);
                return;
            }

            setOfficer(officerData.officer);

            // Fetch officer's cases
            const casesRes = await fetch(`/api/getCases?officer_id=${officerId}`);
            const casesData = await casesRes.json();

            if (!casesRes.ok) {
                setError(casesData.message || "No cases found");
                setCases([]);
            } else {
                setCases(casesData.cases);
            }
        } catch (err) {
            setError("Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Search Officer Cases</h1>

            {/* Officer ID Input Form */}
            <form onSubmit={handleSubmit} className="mb-6 flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Enter Officer ID"
                    value={officerId}
                    onChange={(e) => setOfficerId(e.target.value)}
                    required
                    className="border p-2 rounded w-60"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Search
                </button>
            </form>

            {/* Error Message */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Loading State */}
            {loading && <p>Loading...</p>}

            {/* Display Officer Info */}
            {officer && (
                <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold">{officer.username}</h2>
                    <p><strong>Officer ID:</strong> {officer.officer_id}</p>
                    <p><strong>Email:</strong> {officer.email}</p>
                </div>
            )}

            {/* Display Case Table */}
            {cases.length > 0 && (
                <table className="w-full border-collapse border border-gray-300 mt-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Victim Name</th>
                            <th className="border px-4 py-2">Suspect</th>
                            <th className="border px-4 py-2">Crime Description</th>
                            <th className="border px-4 py-2">Officer Name</th>
                            <th className="border px-4 py-2">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cases.map((c, index) => (
                            <tr key={index} className="text-center">
                                <td className="border px-4 py-2">{c.victim_name}</td>
                                <td className="border px-4 py-2">{c.suspect}</td>
                                <td className="border px-4 py-2">{c.crime_description}</td>
                                <td className="border px-4 py-2">{c.officer_namae}</td>
                                <td className="border px-4 py-2">{c.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
