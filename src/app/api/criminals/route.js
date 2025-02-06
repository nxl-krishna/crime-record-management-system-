// pages/api/criminals.js
import { db } from "../../../db/config";// Correctly import your database connection

export async function GET(request) {
  try {
    const [rows] = await db.query("SELECT id,name, crime, description,crime_date FROM criminals"); // Execute query and get result rows
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error(error);  // Log any error for debugging
    return new Response("Error fetching criminals data", { status: 500 });
  }
}
