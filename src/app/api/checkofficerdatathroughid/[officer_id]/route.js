import { NextResponse } from "next/server";
import { db } from "../../../../db/config"; // Adjusted import for db config

export async function GET(request, { params }) {
  try {
    const { officer_id } = params; // Get officer_id from the URL

    if (!officer_id) {
      return NextResponse.json({ error: "Officer ID is required" }, { status: 400 });
    }

    const query = `
      SELECT u.username AS officer_name, c.name AS criminal_name, c.crime, c.crime_date
      FROM criminals c
      JOIN users u ON c.officer_id = u.officer_id
      WHERE c.officer_id = ?;
    `;
    
    const [rows] = await db.query(query, [officer_id]);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
