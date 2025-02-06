"use client";

import { useState } from 'react';

export default function CriminalRecordForm() {
  const [criminalState, setCriminalState] = useState('');  // State for holding the input criminal_state
  const [criminalData, setCriminalData] = useState([]);  // State for holding fetched criminal data (an array)
  const [error, setError] = useState(null);  // State for holding any error messages

  // Function to handle form submission and fetch data from the API
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (!criminalState) {
      setError('Please enter a criminal state');
      return;
    }

    try {
      const response = await fetch(`/api/criminals?criminal_state=${criminalState}`);
      if (!response.ok) {
        throw new Error('Error fetching criminal data');
      }

      const data = await response.json();
      setCriminalData(data.length ? data : []);  // Update the criminal data state (store all records)
      setError(null);  // Clear any previous errors
    } catch (err) {
      setError(err.message);
      setCriminalData([]);  // Clear the criminal data if an error occurs
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Fetch Criminal Records by State</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="criminal_state" className="block text-gray-700">Criminal State</label>
            <input
              type="text"
              id="criminal_state"
              value={criminalState}
              onChange={(e) => setCriminalState(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter State"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Fetch Records
          </button>
        </form>

        {/* Display the criminal data if available */}
        {criminalData.length > 0 && (
          <div className="mt-6 p-4 bg-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold">Criminal Information</h3>
            {criminalData.map((criminal) => (
              <div key={criminal.id} className="mb-4">
                <p><strong>ID:</strong> {criminal.id}</p>
                <p><strong>Name:</strong> {criminal.name}</p>
                <p><strong>Crime:</strong> {criminal.crime}</p>
                <p><strong>Description:</strong> {criminal.description}</p>
                <p><strong>Date of Crime:</strong> {new Date(criminal.crime_date).toLocaleDateString()}</p>
                <hr className="my-4"/>
              </div>
            ))}
          </div>
        )}

        {/* Display an error message if there's an error */}
        {error && (
          <div className="mt-4 p-4 bg-red-200 text-red-800 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {/* If no data is found */}
        {criminalData.length === 0 && !error && (
          <div className="mt-4 p-4 bg-yellow-200 text-yellow-800 rounded-lg">
            <p>No criminal data found for the specified state</p>
          </div>
        )}
      </div>
    </div>
  );
}
