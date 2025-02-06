import { db } from "../../../db/config";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { username, email, password } = await request.json();

  if (!username || !email || !password) {
    return new Response("Missing fields", { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );
    return new Response(JSON.stringify({ message: "Signup successful" }), {
      status: 201,
    });
  } catch (error) {
    return new Response("User already exists", { status: 409 });
  }
}
