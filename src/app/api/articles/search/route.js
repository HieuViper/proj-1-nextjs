import { pool } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const query = searchParams.get("q");
    const result = await pool.query(
      `SELECT * FROM articles WHERE title LIKE '%${query}%' OR code LIKE '%${query}%'`
    );
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
