import { db } from "../../../db/config";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state");

  if (!state) {
    return new Response(JSON.stringify({ message: "State is required." }), {
      status: 400,
    });
  }

  try {
    const [results] = await db.query(
      "SELECT name,crime,description state FROM criminals WHERE state = ?",
      [state]
    );

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
