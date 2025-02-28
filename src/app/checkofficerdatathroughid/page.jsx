"use client";

import { useState } from "react";

export default function Criminals() {
  const [officerId, setOfficerId] = useState("");
  const [criminals, setCriminals] = useState([]);
  const [error, setError] = useState(null);

  const fetchCriminals = async () => {
    if (!officerId) {
      setError("Please enter an officer ID");
      return;
    }

    try {
      const res = await fetch(`/api/checkofficerdatathroughid/${officerId}`);
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setCriminals(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setCriminals([]);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Criminal Records by Officer</h2>

      <div className="mb-4">
        <input
          type="number"
          placeholder="Enter Officer ID"
          value={officerId}
          onChange={(e) => setOfficerId(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={fetchCriminals} className="bg-blue-500 text-white px-4 py-2">
          Fetch Data
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {criminals.length > 0 ? (
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 p-2">Officer Name</th>
              <th className="border border-gray-400 p-2">Criminal Name</th>
              <th className="border border-gray-400 p-2">Crime</th>
              <th className="border border-gray-400 p-2">Crime Date</th>
            </tr>
          </thead>
          <tbody>
            {criminals.map((criminal, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-400 p-2">{criminal.officer_name}</td>
                <td className="border border-gray-400 p-2">{criminal.criminal_name}</td>
                <td className="border border-gray-400 p-2">{criminal.crime}</td>
                <td className="border border-gray-400 p-2">{new Date(criminal.crime_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No records found</p>
      )}
    </div>
  );
}
