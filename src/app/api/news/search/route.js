import { pool } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const query = searchParams.get("q");
    const status = searchParams.get("status");
    const type = searchParams.get("type");
    let sql;
    if(status != ""){
      sql = `
        SELECT * FROM news WHERE title LIKE '%${query}%'
        OR post_author LIKE '%${query}%'
        OR categories LIKE '%${query}%'
        OR excerpt LIKE '%${query}%'
        OR content LIKE '%${query}%' OR
        (post_status LIKE '%${status}%' AND type LIKE '%${type}%')
      `
    }
    else {
      sql = `
        SELECT * FROM news WHERE title LIKE '%${query}%'
        OR post_author LIKE '%${query}%'
        OR categories LIKE '%${query}%'
        OR excerpt LIKE '%${query}%'
        OR content LIKE '%${query}%' OR
        (post_status != '${process.env.POST_STATUS_TRASH}' AND type LIKE '%${type}%')
      `
    }
    const result = await pool.query(sql);
    console.log("status", status)
    console.log("type", type)
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status:500 }); //ALLWAYS ADD STATUS CODE
  }
}
