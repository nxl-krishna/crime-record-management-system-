import { db } from "../../../db/config";



export async function POST(request) {
  const { name, crime, description } = await request.json();

  // Check if all fields are present
  if (!name || !crime || !description) {
    return new Response("Missing fields", { status: 400 });
  }

  try {
    await db.query(
      "INSERT INTO criminals (name, crime, description) VALUES (?, ?, ?)",
      [name, crime, description]
    );
    return new Response(JSON.stringify({ message: "Record added successfully" }), {
      status: 201,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return new Response("Error adding record", { status: 500 });
  }
}
