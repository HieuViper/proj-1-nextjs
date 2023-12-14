const db = require("@/app/models");
import { NextResponse } from "next/server";
import { QueryTypes } from "sequelize";
const myConstant = require('@/store/constant')

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const post_status = searchParams.get("post_status");
  const page = searchParams.get("page");
  const size = searchParams.get("size");
  const search = searchParams.get("search");
  const orderby = searchParams.get("orderby");
  const order = searchParams.get("order");
  const author = searchParams.get("author");
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");
  const lang = searchParams.get("lang");

  try {
    const fromarticle = (page - 1) * size; //determine the beginning articles
    const authorQuery = author == "" ? "" : `AND post_author='${author}'`;
    const catQuery =
      category == "" ? "" : `AND categories LIKE '%${category}%'`;
    const tagQuery = tag == "" ? "" : `AND tags like '%${tag}%'`;
    const statusQuery = getStatusQuery(post_status);
    const searchQuery = getSearchQuery(search);
    const orderQuery = orderby == "" ? "" : `ORDER BY ${orderby} ${order}`;

    let sqlqueryArticle = `SELECT * FROM articles_all WHERE (${statusQuery} AND LanguageCode='${lang}' ${searchQuery} ${authorQuery} ${catQuery} ${tagQuery}) ${orderQuery} LIMIT ${fromarticle}, ${size}`;

    const resultsArticle = await db.sequelize.query(sqlqueryArticle, {
      type: QueryTypes.SELECT,
    });

    // GET TOTAL
    let totals = {
      itemsOfTable: 0,
      all: 0,
      draft: 0,
      publish: 0,
      trash: 0,
      priority: 0,
    };

    try {
      //get total number of articles in the return articles table
      const statusQuery = getStatusQuery(post_status);
      const searchQuery = getSearchQuery(search);
      const authorQuery = author == "" ? "" : `AND post_author='${author}'`;
      const catQuery =
        category == "" ? "" : `AND categories LIKE '%${category}%'`;
      const tagQuery = tag == "" ? "" : `AND tags like '%${tag}%'`;

      let sqlquery = `SELECT count(*) AS total FROM articles_all WHERE ${statusQuery} AND LanguageCode='${lang}' ${searchQuery} ${authorQuery} ${catQuery} ${tagQuery}`;
      //let results = await pool.query(sqlquery, [post_type]);
      let results = await db.sequelize.query(sqlquery, { type: QueryTypes.SELECT });
      totals.itemsOfTable = results[0].total;
    } catch (error) {
      throw new Error("cannot get items Of Table:" + error.message);
    }
    try {
      //get total number of articles in All Status
      let sqlquery = `SELECT count(*) AS total FROM articles WHERE post_status!='${ myConstant.post.POST_STATUS_TRASH }'`;
      //let results = await pool.query(sqlquery);
      let results = await db.sequelize.query(sqlquery, { type: QueryTypes.SELECT });
      totals.all = results[0].total;
    } catch (error) {
      throw new Error(
        "cannot get number of articles in All Tab:" + error.message
      );
    }
    try {
      //get total number of articles in draft status
      let sqlquery = `SELECT count(*) AS total FROM articles WHERE post_status='${ myConstant.post.POST_STATUS_DRAFT }'`;
      let results = await db.sequelize.query(sqlquery, { type: QueryTypes.SELECT });
      totals.draft = results[0].total;
    } catch (error) {
      throw new Error(
        "Cannot get total of articles in Draft status:" + error.message
      );
    }
    try {
      //get total number of articles in published status
      let sqlquery = `SELECT count(*) AS total FROM articles WHERE post_status='${ process.env.POST_STATUS_PUBLISH}'`;
      let results = await db.sequelize.query(sqlquery, { type: QueryTypes.SELECT });
      totals.publish = results[0].total;
    } catch (error) {
      throw new Error(
        "Cannot get total of articles in published status:" + error.message
      );
    }
    try {
      //get total number of articles in trash status
      let sqlquery = `SELECT count(*) AS total FROM articles WHERE post_status='${myConstant.post.POST_STATUS_TRASH}'`;
      let results = await db.sequelize.query(sqlquery, { type: QueryTypes.SELECT });
      totals.trash = results[0].total;
    } catch (error) {
      throw new Error(
        "Cannot get total of articles in trash status: " + error.message
      );
    }
    try {
      //get total number of articles in priority status
      let sqlquery = `SELECT count(*) AS total FROM articles WHERE article_position=1`;
      let results = await db.sequelize.query(sqlquery, { type: QueryTypes.SELECT });
      totals.priority = results[0].total;
    } catch (error) {
      throw new Error(
        "Cannot get total of articles in priority status:" + error.message
      );
    }

    return NextResponse.json({
      data: resultsArticle,
      totals: totals,
    });
  } catch (error) {
    throw new Error("Fail to get articles: " + error.message);
  }
}

export async function POST(req, res) {
  const t = await db.sequelize.transaction();
  try {
    const body = await req.json();
    const data = body.data;
    const articleLangs = body.articleLangs;
    //update into article Table
    const currentLoginUser = "huy"; //we add information of modifier huy
    if (data.post_date) data.post_date = db.sequelize.literal("now()"); //user has press publish button, set time for post_date
    console.log("data :", data);

    const article = await db.Articles.create(data, { transaction: t });

    //add ArticleId property to the articleLangs
    for (const element of articleLangs) {
      element.ArticleId = article.id;
    }
    console.log(articleLangs);
    //create records in article_languages Table

    await db.Article_languages.bulkCreate(articleLangs, {
      validate: true,
      transaction: t,
    });

    await t.commit();
    // const result = await db.Ar.findAll();
    // return NextResponse.json({ data: result });
  } catch (error) {
    await t.rollback();
    throw new Error("Cannot create article:" + error.message);
  }
}

//get Status query from parameter post_status
function getStatusQuery(post_status) {
  switch (post_status) {
    case "":
      return `post_status!='${myConstant.post.POST_STATUS_TRASH}'`;
    case myConstant.post.POST_STATUS_PRIORITY:
      return `article_position=1`;
    default:
      return `post_status='${post_status}'`;
  }
}
//get search query from search parameter
function getSearchQuery(search) {
  return search == ""
    ? ""
    : `AND (title LIKE '%${search}%' OR content LIKE '%${search}%' OR categories LIKE '%${search}%')`;
}
