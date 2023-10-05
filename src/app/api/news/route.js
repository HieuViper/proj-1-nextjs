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
    const { title, type, categories, post_author, post_date, excerpt, content, post_status, news_code, news_position } =
      await request.json();
    const result = await pool.query("INSERT INTO news SET ?", {
      title, type, categories, post_author, post_date, excerpt, content, post_status, news_code, news_position

    });

    return NextResponse.json({
      title, type, categories, post_author, post_date, excerpt, content, post_status, news_code, news_position,
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
