import { db } from "../../../db/config";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const officer_id = searchParams.get("officer_id");

    try {
        const result = await db.query(
            "SELECT * FROM crime_record WHERE officer_id = ?",
            [officer_id]
        );
        return new Response(JSON.stringify({ cases: result }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error fetching cases" }), { status: 500 });
    }
}
