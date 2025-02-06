// pages/api/criminalsByDate.js
import { db } from "@/db/config"; // Correctly import your database connection

export async function GET(request) {
  const url = new URL(request.url);
  const crime_date = url.searchParams.get('crime_date'); // Extract the crime_date from query parameters

  if (!crime_date) {
    return new Response("Missing crime_date parameter", { status: 400 });
  }

  try {
    const [rows] = await db.query("SELECT id, name, crime, description, crime_date FROM criminals WHERE crime_date = ?", [crime_date]); // Use the crime_date input
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error(error); // Log any error for debugging
    return new Response("Error fetching criminals data by date", { status: 500 });
  }
}
