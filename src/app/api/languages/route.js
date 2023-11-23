<<<<<<< HEAD
import { NextResponse } from "next/server";

export async function GET(req, res) {
    return NextResponse.json({message: 'helo'})
}

// export async function POST(req, res) {
//     console.log('at POST API:', req.body.newsid);

//     return NextResponse.json({message: req})
// }

export async function POST(req, res) {
    const newsid = await req.json();
    console.log('newsid:', newsid);
    return NextResponse.json ({ message: newsid });
    // Then save email to your database, etc...
  }
=======
import { db } from "@/config/db";
import { NextResponse } from "next/server";
import { Op, QueryTypes } from "sequelize";

export async function GET(req, res) {
  try {
    const results = await db.Languages.findAll({
      order: db.seq.literal(`code='${process.env.DEFAULT_LANGUAGE}' DESC`),
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
>>>>>>> 5f8aaaba24bf4af60dab634e2a18c6ffeea98f8d
