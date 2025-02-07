import { db } from "../../../db/config";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id"); // Corrected from "state" to "id"

  if (!id) {
    return new Response(JSON.stringify({ message: "ID is required." }), {
      status: 400,
    });
  }

  try {
    const [results] = await db.query(
      "SELECT name, crime, description FROM criminals WHERE id = ?",
      [id]
    );

    if (results.length === 0) {
      return new Response(JSON.stringify({ message: "No records found." }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(results), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching records:", error);
    return new Response(JSON.stringify({ message: "Server error." }), {
      status: 500,
    });
  }
}
