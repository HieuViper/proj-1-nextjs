import { pool } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const results = await pool.query("SELECT * FROM articles");
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
export async function POST(request) {
  try {
    const { title, short, author, code, category_id, active, content } =
      await request.json();

    const result = await pool.query("INSERT INTO articles SET ?", {
      title,
      short,
      author,
      code,
      category_id,
      active,
      content,
    });

    return NextResponse.json({
      title,
      short,
      author,
      code,
      category_id,
      active,
      content,
      id: result.insertId,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
