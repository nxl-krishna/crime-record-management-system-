"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function CriminalByState() {
  const [state, setState] = useState("");
  const [criminalRecords, setCriminalRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setState(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setCriminalRecords([]);

    try {
      const response = await fetch(`/api/criminalbystate?state=${state}`);

      if (!response.ok) {
        const { message } = await response.json();
        setErrorMessage(message || "Error fetching records.");
        return;
      }

      const data = await response.json();
      setCriminalRecords(data);
    } catch (error) {
      setErrorMessage("Failed to connect to the server.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-[40vw] bg-gray-100 p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Search Criminals by State</h2>

          <form onSubmit={handleSearch}>
            <div className="mb-4">
              <label className="block mb-1">State</label>
              <input
                type="text"
                name="state"
                value={state}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Search
            </button>
          </form>

          {errorMessage && (
            <p className="text-red-500 mt-4">{errorMessage}</p>
          )}

          <div className="mt-6">
            {criminalRecords.length > 0 ? (
              <ul>
                {criminalRecords.map((record, index) => (
                  <li key={index} className="p-3 bg-white mb-2 shadow-md rounded">
                    <strong>Name:</strong> {record.name} <br />
                    <strong>Crime:</strong> {record.crime} <br />
                   
                    
                  </li>
                ))}
              </ul>
            ) : (
              <p>No records found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
