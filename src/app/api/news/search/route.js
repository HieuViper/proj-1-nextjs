import { pool } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const query = searchParams.get("q");
    const status = searchParams.get("status");
    const type = searchParams.get("type");
    const result = await pool.query(
      `
      SELECT * FROM news WHERE title LIKE '%${query}%'
      OR type LIKE '%${query}%' 
      OR post_author LIKE '%${query}%' 
      OR post_status LIKE '%${query}%' 
      OR categories LIKE '%${query}%' 
      OR news_position LIKE '%${query}%' 
      OR excerpt LIKE '%${query}%' 
      OR content LIKE '%${query}%' OR

      (post_status LIKE '%${status}%' AND type LIKE '%${type}%')
      `
    );
    console.log("status", status)
    console.log("type", type)
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
