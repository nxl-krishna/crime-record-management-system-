// pages/api/criminals.js
import { db } from "../../../db/config";// Import your MySQL connection configuration

export default async function handler(req, res) {
  // Ensure the request is a GET request
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Get the 'criminal_state' query parameter from the URL
  const { criminal_state } = req.query;

  if (!criminal_state) {
    return res.status(400).json({ message: 'Please provide a criminal state' });
  }

  console.log("criminal_state received:", criminal_state);  // Debugging: Log the state value

  try {
    // Use case-insensitive matching (you can use = if the states are stored in a consistent format)
    const [rows] = await db.query(
      "SELECT id, name, crime, description, crime_date FROM criminals WHERE LOWER(state) = LOWER(?)",
      [criminal_state]
    );

    // If no records found, return an empty array with a message
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No criminal records found for the specified state' });
    }

    // Return the fetched data as JSON
    return res.status(200).json(rows);

  } catch (error) {
    console.error('Error fetching criminals:', error);
    return res.status(500).json({ message: 'Error fetching criminal records' });
  }
}
