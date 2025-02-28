
import { db } from "../../../db/config";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { id, password } = await request.json();

  if (!id || !password) {
    return new Response("Missing ID or password", { status: 400 });
  }

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE officer_id = ?", [
      id,
    ]);

    if (rows.length === 0) {
      return new Response("User not found", { status: 404 });
    }

    const user = rows[0];

    // Compare the password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return new Response("Invalid password", { status: 401 });
    }

    return new Response(
      JSON.stringify({ message: "Login successful", username: user.username }),
      { status: 200 }
    );
  } catch (error) {
    return new Response("Server error", { status: 500 });
  }
}
