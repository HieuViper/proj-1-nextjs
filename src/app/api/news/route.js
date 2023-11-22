import { NextResponse } from "next/server";

export async function GET(req, res) {
  return NextResponse.json({ message: "hello" });
}
export async function POST(req, res) {
  console.log("vao ");
  const body = await req.json();
  console.log("body", body);
  return NextResponse.json({ prompt: 12 });
}
