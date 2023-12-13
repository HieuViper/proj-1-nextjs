const db = require("@/app/models");
import { NextResponse } from "next/server";
import { Op, QueryTypes } from "sequelize";

function getSearchQuery(search) {
  return search == ""
    ? ""
    : `AND (name LIKE '%${search}%' OR description LIKE '%${search}%')`;
}
export async function GET(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    const size = searchParams.get("size");
    const search = searchParams.get("search");
    const lang = searchParams.get("lang");
    const fromTags = (page - 1) * size;
    const searchQuery = getSearchQuery(search);
    let strqueryData;
    if (lang)
      strqueryData = `SELECT * FROM tags_all WHERE languageCode='${lang}' ${searchQuery} ORDER BY id DESC LIMIT ${fromTags}, ${size}`;
    const results = await db.sequelize.query(strqueryData, {
      type: QueryTypes.SELECT,
    });

    // get total tags
    let sqlqueryTotal = `SELECT count(*) AS total FROM tags_all WHERE languageCode='${lang}' ${searchQuery} `;
    let resultsTotal = await db.sequelize.query(sqlqueryTotal, {
      type: QueryTypes.SELECT,
    });
    const total = resultsTotal[0].total;
    return NextResponse.json({ data: results, total: total });
  } catch (error) {
    console.log(error);
    throw new Error("Fail to get tags");
  }
}
export async function POST(req, res) {
  try {
    const t = await db.sequelize.transaction();
    try {
      const body = await req.json();
      const data = body.data;
      console.log("🚀 ~ file: route.js:44 ~ POST ~ data:", data);
      const tagLangs = body.tagLangs;
      console.log("🚀 ~ file: route.js:46 ~ POST ~ tagLangs:", tagLangs);

      //update into tag Table
      const currentLoginUser = "huy"; //we add information of modifier huy
      console.log("data :", data);
      const tag = await db.Tags.create(data, { transaction: t });
      //add tagId property to the tagLangs
      for (const element of tagLangs) {
        element.tagId = tag.id;
      }
      //create records in tag_languages Table
      await db.Tag_langs.bulkCreate(tagLangs, {
        validate: true,
        transaction: t,
      });
      await t.commit();
      return NextResponse.json({ message: 1 });
    } catch (error) {
      await t.rollback();
      throw new Error("Cannot create tag:" + error.message);
    }
  } catch (error) {
    throw new Error("Cannot create Tags:" + error.message);
  }
}

//Bulk Delete
export async function DELETE(req, res) {
  try {
    const body = await req.json();
    const keysArr = body.arrDell.split(",");
    await db.Tags.destroy({
      where: {
        id: {
          [Op.in]: keysArr,
        },
      },
    });
    const result = await db.Tags.findAll();
    return NextResponse.json({ data: result });
  } catch (error) {
    console.log(error);
    throw new Error("Fail to delete Tags", error);
  }
}
