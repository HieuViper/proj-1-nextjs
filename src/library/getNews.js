'use server'
import { pool } from "@/config/db";
import { redirect } from "next/navigation";

//get Status query from parameter post_status
function getStatusQuery(post_status) {
  switch (post_status) {
    case '':
      return `post_status!='${process.env.POST_STATUS_TRASH}'`;
    case process.env.POST_STATUS_PRIORITY:
      return `news_position=1`;
    default:
      return `post_status='${post_status}'`;
  }
}

//get search query from search parameter
function getSearchQuery(search) {
  return search == "" ? ""
    :
    `AND (title LIKE '%${search}%' OR content LIKE '%${search}%' OR categories LIKE '%${search}%')`;
}

//GetNews for tab "All,published, trash"
export const getAllNews = async (post_type, post_status, page, size, search, orderby, order, author, category, tag) => {
  try {
    const fromNews = (page - 1) * size; //determine the beginning news
    const authorQuery = author == '' ? '' : `AND post_author=${author}`;
    const catQuery = category == '' ? '' : `AND categories LIKE '%${category}%'`;
    const tagQuery = tag == '' ? '' : `AND tags like '%${tag}%'`;
    const statusQuery = getStatusQuery(post_status);
    const searchQuery = getSearchQuery(search);
    const orderQuery = orderby == "" ? "" : `ORDER BY ${orderby} ${order}`;

    let sqlquery = `SELECT * FROM news WHERE (${statusQuery} AND type=? ${searchQuery} ${authorQuery} ${catQuery} ${tagQuery}) ${orderQuery} LIMIT ${fromNews}, ${size}`;
    console.log("sqlqeury: ", sqlquery)
    const results = await pool.query(sqlquery, [post_type]);
    return results;
  }
  catch (error) {
    throw new Error('Fail to get news from database');
  }
}

//get total item of news
export async function getTotalNumOfNews(post_type, post_status, search, author, category, tag) {
  let totals = {
    itemsOfTable: 0,
    all: 0,
    draft: 0,
    publish: 0,
    trash: 0,
    priority: 0,
  }

  try {
    //get total number of news in the return news table
    const statusQuery = getStatusQuery(post_status);
    const searchQuery = getSearchQuery(search);
    const authorQuery = author == '' ? '' : `AND post_author=${author}`;
    const catQuery = category == '' ? '' : `AND categories LIKE '%${category}%'`;
    const tagQuery = tag == '' ? '' : `AND tags like '%${tag}%'`;

    let sqlquery = `SELECT count(*) AS total FROM news WHERE ${statusQuery} AND type=? ${searchQuery} ${authorQuery} ${catQuery} ${tagQuery}`;
    let results = await pool.query(sqlquery, [post_type]);
    totals.itemsOfTable = results[0].total;
  } catch (error) {
    throw new Error("cannot get items Of Table:" + error.message);
  }
  try {
    //get total number of news in All Status
    let sqlquery = `SELECT count(*) AS total FROM news WHERE post_status!='${process.env.POST_STATUS_TRASH}'`;
    let results = await pool.query(sqlquery);
    totals.all = results[0].total;
  } catch (error) {
    throw new Error("cannot get number of news in All Tab:" + error.message);
  }
  try {
    //get total number of news in draft status
    let sqlquery = `SELECT count(*) AS total FROM news WHERE post_status='${process.env.POST_STATUS_DRAFT}'`;
    let results = await pool.query(sqlquery);
    totals.draft = results[0].total;
  } catch (error) {
    throw new Error("Cannot get total of news in Draft status:" + error.message);
  }
  try {
    //get total number of news in published status
    let sqlquery = `SELECT count(*) AS total FROM news WHERE post_status='${process.env.POST_STATUS_PUBLISH}'`;
    let results = await pool.query(sqlquery);
    totals.publish = results[0].total;
  } catch (error) {
    throw new Error("Cannot get total of news in published status:" + error.message);
  }
  try {
    //get total number of news in trash status
    let sqlquery = `SELECT count(*) AS total FROM news WHERE post_status='${process.env.POST_STATUS_TRASH}'`;
    let results = await pool.query(sqlquery);
    totals.trash = results[0].total;
  } catch (error) {
    throw new Error("Cannot get total of news in trash status: " + error.message);
  }
  try {
    //get total number of news in priority status
    let sqlquery = `SELECT count(*) AS total FROM news WHERE news_position=1`;
    let results = await pool.query(sqlquery);
    totals.priority = results[0].total;

    return totals;
  }
  catch (error) {
    throw new Error('Cannot get total of news in priority status:' + error.message);
  }
}



//Move a news to trash
export async function trashNews(key) {
  try {
    const sqlquery = `UPDATE news SET post_status='${process.env.POST_STATUS_TRASH}' WHERE id=?`;
    await pool.query(sqlquery, [key]);
  }
  catch (error) {
    throw new Error('Fail to move news to trash bin');
  }
}

//Delete bulk of news, articles based on newsid
export async function deleteBulkNews(keys, status) {
  try {
    let sqlquery;
    if (status != process.env.POST_STATUS_TRASH)
      sqlquery = `UPDATE news SET post_status='${process.env.POST_STATUS_TRASH}' WHERE id IN (${keys})`;
    else
      sqlquery = `DELETE FROM news WHERE id IN (${keys})`;
    await pool.query(sqlquery);
  }
  catch (error) {
    throw new Error('Fail to delete news');
  }
}



//Recover News
export async function recoverNews(key) {
  try {
    const sqlquery = `UPDATE news SET post_status='${process.env.POST_STATUS_DRAFT}' WHERE id = ?`;
    await pool.query(sqlquery, [key]);
  }
  catch (error) {
    throw new Error(`Fail to recover news id = ${key}`);
  }
}

//Delete forever a news
export async function deleteNews(key) {
  try {
    const sqlquery = 'DELETE FROM news WHERE id = ?';
    await pool.query(sqlquery, [key]);
  }
  catch (error) {
    throw new Error(`Fail to delete news id = ${key}`);
  }
}

// 
// 

export async function getNews(id) {
  try {
    const sqlquery = "SELECT * FROM news WHERE id = ?";
    const result = await pool.query(sqlquery, [id]);
    return result[0]
  }
  catch (error) {
    throw new Error('Fail to get news');
  }
}
export async function editNews(data, id) {
  try {
    const sqlquery = "UPDATE news SET ? WHERE id = ?";
    await pool.query(sqlquery, [data, id]);
  }
  catch (error) {
    throw new Error('Fail to edit news');
  }
}

export async function addNews(data) {
  try {
    const sqlquery = "INSERT INTO news SET ?";
    const result = await pool.query(sqlquery, data)
    if (result.insertId) {
      redirect(`/admin/news/edit/${result.insertId}`)
    }
    // return result

  }
  catch (error) {
    throw new Error('Fail to add news');
  }
}

export async function getCategories() {
  try {
    const sqlquery = "SELECT * FROM categories";
    const result = await pool.query(sqlquery);
    return result
  }
  catch (error) {
    throw new Error('Fail to get categories');
  }
}