const { Pool } = require("pg");

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed", status: 405 });
  }

  const { firstName, clerkUserId } = await request.json();

  if (!firstName || !clerkUserId) {
    return Response.json({ error: "Missing required fields", status: 400 });
  }

  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });

    const updateQuery = `
    UPDATE users
    SET name = $1
    WHERE clerk_id = $2
    RETURNING *;
  `;

    const { rows } = await pool.query(updateQuery, [firstName, clerkUserId]);

    if (rows.length === 0) {
      return Response.json({ error: "User not found", status: 404 });
    }

    return Response.json({ data: rows[0], status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error", status: 500 });
  }
}
