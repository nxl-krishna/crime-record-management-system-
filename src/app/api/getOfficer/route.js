import { db } from "../../../db/config";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const officer_id = searchParams.get("officer_id");

    try {
        const result = await db.query("SELECT * FROM users WHERE officer_id = ?", [officer_id]);
        if (result.length === 0) {
            return new Response(JSON.stringify({ message: "Officer not found" }), { status: 404 });
        }
        return new Response(JSON.stringify({ officer: result[0] }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Database error" }), { status: 500 });
    }
}
