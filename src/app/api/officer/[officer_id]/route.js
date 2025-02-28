import { db } from "../../../../db/config";

export async function GET(request, { params }) {
    try {
        const officer_id = params.officer_id;

        // Validate officer_id
        if (!officer_id) {
            return new Response(JSON.stringify({ message: "Officer ID is required." }), {
                status: 400,
            });
        }

        // Fetch officer details
        const [officer] = await db.query("SELECT * FROM users WHERE id = ?", [officer_id]);

        if (!officer.length) {
            return new Response(JSON.stringify({ message: "Officer not found." }), { status: 404 });
        }

        // Fetch assigned cases
        const [cases] = await db.query("SELECT * FROM crime_record WHERE officer_id = ?", [officer_id]);

        return new Response(JSON.stringify({ officer: officer[0], cases }), { status: 200 });

    } catch (error) {
        console.error("Error fetching officer details and cases:", error);
        return new Response(JSON.stringify({ message: "Error fetching data." }), {
            status: 500,
        });
    }
}
