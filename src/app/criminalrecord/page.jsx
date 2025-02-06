// components/CriminalDetails.js
"use client"
import { useEffect, useState } from "react";

const CriminalDetails = () => {
  const [criminals, setCriminals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCriminalDetails = async () => {
      try {
        const response = await fetch("/api/criminals"); // Correct API route
        if (!response.ok) {
          throw new Error("Failed to fetch criminals");
        }
        const data = await response.json();
        console.log(data);  // Log to check the data returned
        setCriminals(data);  // Set data to state
      } catch (error) {
        setError(error.message); // Handle error
      }
    };

    fetchCriminalDetails();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Criminal Details</h1>
      {criminals.length > 0 ? (
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left border-b">ID</th>
              <th className="py-2 px-4 text-left border-b">Name</th>
              <th className="py-2 px-4 text-left border-b">Crime</th>
              <th className="py-2 px-4 text-left border-b">Description</th>
              <th className="py-2 px-4 text-left border-b">Crime Date</th>
            </tr>
          </thead>
          <tbody>
            {criminals.map((criminal, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{criminal.id}</td>
                <td className="py-2 px-4 border-b">{criminal.name}</td>
                <td className="py-2 px-4 border-b">{criminal.crime}</td>
                <td className="py-2 px-4 border-b">{criminal.description}</td>
                <td className="py-2 px-4 border-b">{criminal.crime_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No criminals found.</p>
      )}
    </div>
  );
};

export default CriminalDetails;
