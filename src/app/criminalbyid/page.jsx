"use client";

import { useState } from "react";

export default function CriminalRecordForm() {
  const [criminalId, setCriminalId] = useState("");
  const [criminalData, setCriminalData] = useState(null); // Can be an array or an object
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = criminalId ? `/api/criminals?criminal_id=${criminalId}` : `/api/criminals`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Error fetching criminal data");
      }

      const data = await response.json();
      setCriminalData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setCriminalData(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Fetch Criminal Record</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="criminal_id" className="block text-gray-700">Criminal ID (Optional)</label>
            <input
              type="number"
              id="criminal_id"
              value={criminalId}
              onChange={(e) => setCriminalId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Criminal ID (Leave empty for all records)"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Fetch Record
          </button>
        </form>

        {/* Display the criminal data if available */}
        {criminalData && (
          <div className="mt-6 p-4 bg-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold">Criminal Information</h3>
            {Array.isArray(criminalData) ? (
              criminalData.map((criminal) => (
                <div key={criminal.id} className="border-b border-gray-300 py-2">
                  <p><strong>ID:</strong> {criminal.id}</p>
                  <p><strong>Name:</strong> {criminal.name}</p>
                  <p><strong>Crime:</strong> {criminal.crime}</p>
                  <p><strong>Description:</strong> {criminal.description}</p>
                  <p><strong>Date of Crime:</strong> {new Date(criminal.crime_date).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <div className="border-b border-gray-300 py-2">
                <p><strong>ID:</strong> {criminalData.id}</p>
                <p><strong>Name:</strong> {criminalData.name}</p>
                <p><strong>Crime:</strong> {criminalData.crime}</p>
                <p><strong>Description:</strong> {criminalData.description}</p>
                <p><strong>Date of Crime:</strong> {new Date(criminalData.crime_date).toLocaleDateString()}</p>
              </div>
            )}
          </div>
        )}

        {/* Display an error message if there's an error */}
        {error && (
          <div className="mt-4 p-4 bg-red-200 text-red-800 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {/* If no data is found */}
        {!criminalData && !error && (
          <div className="mt-4 p-4 bg-yellow-200 text-yellow-800 rounded-lg">
            <p>No criminal data found</p>
          </div>
        )}
      </div>
    </div>
  );
}