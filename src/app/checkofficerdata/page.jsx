"use client";

import { useEffect, useState } from "react";

export default function Criminals() {
  const [criminals, setCriminals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCriminals = async () => {
      try {
        const res = await fetch("/api/checkofficerdata");
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setCriminals(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCriminals();
  }, []);

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!criminals.length) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Criminal Records</h2>
      <a href="/checkofficerdatathroughid">
           <button className="mb-7 mx-[1200] bg-red-500 text-white px-6 py-3 text-lg rounded hover:bg-red-600 mx-7 transition w-48"
>
             check through id
              </button>

            </a>
      <div>
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
      </table></div>
    </div>
  );
}
