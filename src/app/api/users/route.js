// pages/api/users.js
import { db } from "@/db/config"; // Correctly import your database connection

export async function GET(request) {
  try {
    const [rows] = await db.query("SELECT username, email FROM users"); // Execute query and get result rows
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error(error);  // Log any error for debugging
    return new Response("Error fetching user details", { status: 500 });
  }
}
