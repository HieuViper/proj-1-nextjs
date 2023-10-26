"use server";
import { db } from "@/config/db";
import { redirect } from "next/navigation";
import { Op, QueryTypes } from "sequelize";

//get Status query from parameter post_status
function getStatusQuery(post_status) {
  switch (post_status) {
    case "":
      return `post_status!='${process.env.POST_STATUS_TRASH}'`;
    case process.env.POST_STATUS_PRIORITY:
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

//Getarticle for tab "All,published, trash"
export async function getAllArticle(
  post_status,
  page,
  size,
  search,
  orderby,
  order,
  author,
  category,
  tag,
  lang
) {
  try {
    const fromarticle = (page - 1) * size; //determine the beginning articles
    const authorQuery = author == "" ? "" : `AND post_author='${author}'`;
    const catQuery =
      category == "" ? "" : `AND categories LIKE '%${category}%'`;
    const tagQuery = tag == "" ? "" : `AND tags like '%${tag}%'`;
    const statusQuery = getStatusQuery(post_status);
    const searchQuery = getSearchQuery(search);
    const orderQuery = orderby == "" ? "" : `ORDER BY ${orderby} ${order}`;

    let sqlquery = `SELECT * FROM articles_all WHERE (${statusQuery} AND languageCode='${lang}' ${searchQuery} ${authorQuery} ${catQuery} ${tagQuery}) ${orderQuery} LIMIT ${fromarticle}, ${size}`;

    const results = await db.seq.query(sqlquery, { type: QueryTypes.SELECT });
    console.log("result:", results);
    return results;
  } catch (error) {
    throw new Error("Fail to get articles from database" + error.message);
  }
}

//get total item of articles
export async function getTotalNumOfarticle(
  post_status,
  search,
  author,
  category,
  tag,
  lang
) {
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

    let sqlquery = `SELECT count(*) AS total FROM articles_all WHERE ${statusQuery} AND languageCode='${lang}' ${searchQuery} ${authorQuery} ${catQuery} ${tagQuery}`;
    //let results = await pool.query(sqlquery, [post_type]);
    let results = await db.seq.query(sqlquery, { type: QueryTypes.SELECT });
    totals.itemsOfTable = results[0].total;
  } catch (error) {
    throw new Error("cannot get items Of Table:" + error.message);
  }
  try {
    //get total number of articles in All Status
    let sqlquery = `SELECT count(*) AS total FROM articles WHERE post_status!='${process.env.POST_STATUS_TRASH}'`;
    //let results = await pool.query(sqlquery);
    let results = await db.seq.query(sqlquery, { type: QueryTypes.SELECT });
    totals.all = results[0].total;
  } catch (error) {
    throw new Error(
      "cannot get number of articles in All Tab:" + error.message
    );
  }
  try {
    //get total number of articles in draft status
    let sqlquery = `SELECT count(*) AS total FROM articles WHERE post_status='${process.env.POST_STATUS_DRAFT}'`;
    let results = await db.seq.query(sqlquery, { type: QueryTypes.SELECT });
    totals.draft = results[0].total;
  } catch (error) {
    throw new Error(
      "Cannot get total of articles in Draft status:" + error.message
    );
  }
  try {
    //get total number of articles in published status
    let sqlquery = `SELECT count(*) AS total FROM articles WHERE post_status='${process.env.POST_STATUS_PUBLISH}'`;
    let results = await db.seq.query(sqlquery, { type: QueryTypes.SELECT });
    totals.publish = results[0].total;
  } catch (error) {
    throw new Error(
      "Cannot get total of articles in published status:" + error.message
    );
  }
  try {
    //get total number of articles in trash status
    let sqlquery = `SELECT count(*) AS total FROM articles WHERE post_status='${process.env.POST_STATUS_TRASH}'`;
    let results = await db.seq.query(sqlquery, { type: QueryTypes.SELECT });
    totals.trash = results[0].total;
  } catch (error) {
    throw new Error(
      "Cannot get total of articles in trash status: " + error.message
    );
  }
  try {
    //get total number of articles in priority status
    let sqlquery = `SELECT count(*) AS total FROM articles WHERE article_position=1`;
    let results = await db.seq.query(sqlquery, { type: QueryTypes.SELECT });
    totals.priority = results[0].total;

    return totals;
  } catch (error) {
    throw new Error(
      "Cannot get total of articles in priority status:" + error.message
    );
  }
}

//Move a articles to trash
export async function trashArticle(key) {
  try {
    await db.Articles.update(
      { post_status: process.env.POST_STATUS_TRASH },
      {
        where: {
          id: key,
        },
      }
    );
  } catch (error) {
    throw new Error("Fail to move articles to trash bin");
  }
}

//Delete bulk of articles, articles based on articleid
export async function deleteBulkArticle(keys, status) {
  try {
    const keysArr = keys.split(",");
    if (status != process.env.POST_STATUS_TRASH)
      await db.Articles.update(
        { post_status: process.env.POST_STATUS_TRASH },
        {
          where: {
            id: {
              [Op.in]: keysArr,
            },
          },
        }
      );
    else
      await db.Articles.destroy({
        where: {
          id: {
            [Op.in]: keysArr,
          },
        },
      });
  } catch (error) {
    console.log(error);
    throw new Error("Fail to delete articles");
  }
}

//Recover Articles
export async function recoverArticle(key) {
  try {
    await db.Articles.update(
      { post_status: process.env.POST_STATUS_DRAFT },
      {
        where: {
          id: key,
        },
      }
    );
  } catch (error) {
    throw new Error(`Fail to recover articles id = ${key}`);
  }
}

//Delete forever a articles
export async function deleteArticle(key) {
  try {
    await db.Articles.destroy({
      where: {
        id: key,
      },
    });
  } catch (error) {
    throw new Error(`Fail to delete articles id = ${key}`);
  }
}

//Get Article by id

export async function getArticle(id) {
  try {
    const result = await db.Articles.findOne({ where: { id } });
    return result;
  } catch (error) {
    throw new Error("Fail to get articles");
  }
}
export async function editarticle(data, id) {
  try {
    const sqlquery = "UPDATE articles SET ? WHERE id = ?";
    await pool.query(sqlquery, [data, id]);
  } catch (error) {
    throw new Error("Fail to edit articles");
  }
}

export async function addarticle(data) {
  try {
    const sqlquery = "INSERT INTO articles SET ?";
    const result = await pool.query(sqlquery, data);
    if (result.insertId) {
      redirect(`/admin/articles/edit/${result.insertId}`);
    }
    // return result
  } catch (error) {
    throw new Error("Fail to add articles");
  }
}

export async function getCategories() {
  try {
    const results = await db.Article_categories.findAll();
    return results;
  } catch (error) {
    console.log(error);
    throw new Error("Fail to get categories");
  }
}
