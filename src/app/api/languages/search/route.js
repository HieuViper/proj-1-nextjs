import { db } from "@/config/db";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function POST(req, res) {
  try {
    const body = await req.json();
    console.log("🚀 ~ file: route.js:8 ~ POST ~ body:", body);
    const result = await db.Languages.findAll({
      where: {
        code: {
          [Op.like]: `%${body.search}%`,
        },
        name: {
          [Op.like]: `%${body.search}%`,
        },
      },
    });

    return NextResponse.json({ data: result });
  } catch (error) {
    console.log(error);
    throw new Error("Fail to get languages");
  }
}
