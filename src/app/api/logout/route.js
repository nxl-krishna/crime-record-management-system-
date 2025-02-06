export async function POST(request) {
  const { token } = await request.json();

  try {
    await db.query("DELETE FROM user_tokens WHERE token = ?", [token]);
    return new Response("Logout successful", { status: 200 });
  } catch (error) {
    return new Response("Server error", { status: 500 });
  }
}
