import { db } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const results = await db.Imgs.findAll();
    return NextResponse.json({ data: results });
  } catch (error) {
    throw new Error("Fail to get img:" + error.message);
  }
}
export async function POST(req, res) {
  try {
    const body = await req.json();
    const data = body.data;
    await db.Imgs.create(data);
    const result = await db.Imgs.findAll();
    return NextResponse.json({ data: result });
  } catch (error) {
    throw new Error("Cannot create img:" + error.message);
  }
}
