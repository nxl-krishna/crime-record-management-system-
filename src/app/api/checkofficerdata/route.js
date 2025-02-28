import { NextResponse } from "next/server";
import { db } from "../../../db/config"; // Import your database connection

export async function GET() {
  try {
    const query = `
      SELECT u.username AS officer_name, c.name AS criminal_name, c.crime, c.crime_date
      FROM criminals c
      JOIN users u ON c.officer_id = u.officer_id;
    `;
    const [rows] = await db.query(query);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
