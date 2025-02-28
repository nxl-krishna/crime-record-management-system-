import { db } from "../../../db/config";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const district = searchParams.get("district");

    if (!district) {
      return new Response(JSON.stringify({ message: "District is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const [results] = await db.query(
      "SELECT name, crime, description, state FROM criminals WHERE district = ?",
      [district]
    );

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error fetching records:", error);
    return new Response(JSON.stringify({ message: "Server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
