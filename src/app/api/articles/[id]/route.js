import { pool } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const result = await pool.query("SELECT * FROM articles WHERE id = ?", [
      params.id,
    ]);
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function DELETE(request, { params }) {
  // try {
  //   console.log("🚀 ~ file: route.js:16 ~ DELETE ~ params:", params);
  //   console.log("🚀 ~ file: route.js:16 ~ DELETE ~ request:", request);
  //   return NextResponse.json({}, { status: 204 });
  // } catch (error) {}
  try {
    console.log("🚀 ~ file: route.js:16 ~ DELETE ~ params:", params);
    if (params.id.includes(";")) {
      // delete multiple
      console.log("vao ; ne");

      await pool.query(
        `DELETE FROM articles WHERE id IN (${params.id
          .split(";")
          .map((item) => `"${item}",`)
          .join("")
          .slice(0, -1)})`
      );
    } else {
      //delete one
      await pool.query("DELETE FROM articles WHERE id = ?", [params.id]);
    }
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(request, { params }) {
  const data = await request.json();

  try {
    await pool.query("UPDATE articles SET ? WHERE id = ?", [data, params.id]);
    return NextResponse.json({
      ...data,
      id: params.id,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
