import { pool } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const result = await pool.query("SELECT * FROM news WHERE id = ?", [
      params.id,
    ]);
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function DELETE(request, { params }) {
  try {

    await pool.query("DELETE FROM news WHERE id = ?", [params.id]);
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(request, { params }) {
  const data = await request.json();

  try {
    await pool.query("UPDATE news SET ? WHERE id = ?", [data, params.id]);
    return NextResponse.json({
      ...data,
      id: params.id,
    });
  } catch (error) {
    console.log("data in api", data);
    console.log("id of news:", params.id);
    return NextResponse.json({ message: error.message }, {status:422});

  }
}
