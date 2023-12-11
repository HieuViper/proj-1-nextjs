import { db } from "@/config/db";
import { myConstant } from "@/store/constant";
import { NextResponse } from "next/server";
import { Op, QueryTypes } from "sequelize";

export async function GET(req, res) {
  try {
    const results = await db.Languages.findAll({
      order: db.seq.literal(`code='${myConstant.DEFAULT_LANGUAGE}' DESC`),
    });
    // return results;
    return NextResponse.json({ data: results });
  } catch (error) {
    throw new Error("Fail to get languages: " + error.message);
  }
}
export async function POST(req, res) {
  try {
    const body = await req.json();
    console.log("body", body);

    await db.Languages.create(body.data);
    if (body.data.active == 1) {
      let sqlqueryNews = `INSERT INTO news_languages(title, excerpt, content, newsId, languageCode)
      SELECT 'undefined', 'undefined', 'undefined', m.id, '${body.data.code}'
      FROM news m
      WHERE NOT EXISTS (
        SELECT 1
        FROM news_languages n
        WHERE n.newsId = m.id AND n.languageCode = '${body.data.code}'
      );`;
      let sqlqueryArticle = `INSERT INTO article_languages(title, excerpt, content, articleId, languageCode)
      SELECT 'undefined', 'undefined', 'undefined', m.id, '${body.data.code}'
      FROM articles m
      WHERE NOT EXISTS (
        SELECT 1
        FROM article_languages n
        WHERE n.articleId = m.id AND n.languageCode = '${body.data.code}'
      );`;
      await db.seq.query(sqlqueryNews, { type: QueryTypes.INSERT });
      await db.seq.query(sqlqueryArticle, { type: QueryTypes.INSERT });
    }
    const result = await db.Languages.findAll();
    return NextResponse.json({ data: result });
  } catch (error) {
    throw new Error("Cannot create languages:" + error.message);
  }
}

//Bulk Delete
export async function DELETE(req, res) {
  try {
    const body = await req.json();
    await db.Languages.destroy({
      where: {
        code: {
          [Op.in]: body.arrDell,
        },
      },
    });
    const result = await db.Languages.findAll();
    return NextResponse.json({ data: result });
  } catch (error) {
    console.log(error);
    throw new Error("Fail to delete languages", error);
  }
}
