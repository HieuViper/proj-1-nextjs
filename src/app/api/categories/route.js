import { pool } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const results = await pool.query("SELECT * FROM categories");
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
export async function POST(request) {
  try {
    const { name, category_code, description } = await request.json();
    const categories_keywords = name.replaceAll(" ", "");
    const result = await pool.query("INSERT INTO categories SET ?", {
      name,
      category_code,
      description,
      categories_keywords,
    });

    return NextResponse.json({
      name,
      categories_keywords,
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
