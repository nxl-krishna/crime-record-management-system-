import { db } from "../../../db/config";

export async function POST(request) {
  try {
    const { victim_name, suspect, crime_description, officer_id, address } = await request.json();

    // Validate all input fields
    if (!victim_name || !suspect || !crime_description  || !officer_id || !address) {
      return new Response(JSON.stringify({ message: "All fields are required." }), {
        status: 400,
      });
    }

    // Insert the record into the database
    await db.query(
      "INSERT INTO crime_record (victim_name, suspect, crime_description, officer_id, address) VALUES (?, ?, ?,  ?, ?)",
      [victim_name, suspect, crime_description, officer_id, address]
    );

    return new Response(JSON.stringify({ message: "Record added successfully!" }), {
      status: 201,
    });

  } catch (error) {
    console.error("Error adding record:", error);
    return new Response(JSON.stringify({ message: "Error adding record." }), {
      status: 500,
    });
  }
}
