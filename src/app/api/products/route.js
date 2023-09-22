import { NextResponse } from "next/server";
import { pool } from "../../config/db";

export async function GET() {
  try {
    const results = await pool.query("SELECT * FROM products");
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
export async function POST(request) {
  try {
    const { name, description, price } = await request.json();

    const result = await pool.query("INSERT INTO products SET ?", {
      name,
      description,
      price,
    });

    return NextResponse.json({ name, description, price, id: result.insertId });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}
