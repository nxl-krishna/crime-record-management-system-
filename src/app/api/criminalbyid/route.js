import { db } from "../../../db/config";

export async function GET(request) {
  const url = new URL(request.url);
  const criminal_id = url.searchParams.get('criminal_id');

  try {
    let query;
    let params = [];

    if (criminal_id) {
      query = "SELECT id, name, crime, description, crime_date FROM criminals WHERE id = ?";
      params = [criminal_id];
    } else {
      query = "SELECT id, name, crime, description, crime_date FROM criminals";
    }

    const [rows] = await db.query(query, params);

    if (criminal_id && rows.length === 0) {
      return new Response(JSON.stringify({ error: "No criminal found with this ID" }), { status: 404 });
    }

    return new Response(JSON.stringify(criminal_id ? rows[0] : rows), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error fetching criminal data" }), { status: 500 });
  }
}