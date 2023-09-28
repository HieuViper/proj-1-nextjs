import { pool } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const results = await pool.query("SELECT * FROM news");
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
export async function POST(request) {
  try {
    const { title, type, category_id, short, description } =
      await request.json();
    const news_keywords = title.replaceAll(" ", "");
    const result = await pool.query("INSERT INTO news SET ?", {
      title,
      type,
      category_id,
      short,
      description,
      news_keywords,
    });

    return NextResponse.json({
      title,
      type,
      category_id,
      short,
      description,
      id: result.insertId,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}
