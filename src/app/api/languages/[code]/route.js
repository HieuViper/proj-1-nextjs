import { db } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    const result = await db.Languages.findOne({
      where: {
        code: context.params.code,
      },
    });
    return NextResponse.json({ data: result });
  } catch (error) {
    throw new Error("Fail to get languages:" + error.message);
  }
}
export async function PUT(req, context) {
  const code = context.params.code;
  try {
    const body = await req.json();
    await db.Languages.update(body.data, {
      where: {
        code: code,
      },
    });
    const result = await db.Languages.findAll();
    return NextResponse.json({ data: result });
  } catch (error) {
    console.log(error);
    throw new Error("Cannot update languages:" + error.message);
  }
}
export async function DELETE(req, context) {
  const code = context.params.code;
  try {
    await db.Languages.destroy({
      where: {
        code: code,
      },
    });
    const result = await db.Languages.findAll();
    return NextResponse.json({ data: result });
  } catch (error) {
    throw new Error(`Fail to delete languages code = ${code}`);
  }
}
