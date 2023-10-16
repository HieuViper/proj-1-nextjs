'use server'
import { pool } from "@/config/db";

//get Status query from parameter post_status
function getStatusQuery(post_status) {
  return post_status == "" ?
    `post_status!='${process.env.POST_STATUS_TRASH}'`
    :
    `post_status='${post_status}'`;
}

//get search query from search parameter
function getSearchQuery(search) {
  return search == "" ? ""
    :
    `AND (title LIKE '%${search}%' OR content LIKE '%${search}%' OR categories LIKE '%${search}%')`;
}

//GetNews for tab "All,published, trash"
export const getAllNews = async (post_type, post_status, page, size, search, orderby, order) => {
  try {
    const fromNews = (page - 1) * size; //determine the beginning news
    const statusQuery = getStatusQuery(post_status);
    const searchQuery = getSearchQuery(search);
    const orderQuery = orderby == "" ? "" : `ORDER BY ${orderby} ${order}`;

    let sqlquery = `SELECT * FROM news WHERE (${statusQuery} AND type=? ${searchQuery}) ${orderQuery} LIMIT ${fromNews}, ${size}`;
    console.log("sqlqeury: ", sqlquery)
    const results = await pool.query(sqlquery, [post_type]);
    return results;
  }
  catch (error) {
    throw new Error('Fail to get news from database');
  }
}

//get total item of news
export async function getTotalNumOfNews(post_type, post_status, search) {
  try {
    const statusQuery = getStatusQuery(post_status);
    const searchQuery = getSearchQuery(search);

    const sqlquery = `SELECT count(*) AS total FROM news WHERE ${statusQuery} AND type=? ${searchQuery}`;
    const results = await pool.query(sqlquery, [post_type]);
    return results[0];
  }
  catch (error) {
    throw new Error('Cannot get total of news');
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
export async function deleteBulkNews(keys) {
  try {
    const sqlquery = `UPDATE news SET post_status='${process.env.POST_STATUS_TRASH}' WHERE id IN (${keys})`;
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
export async function publishNews(key) {
  try {
    const sqlquery = `UPDATE news SET post_status='${process.env.POST_STATUS_PUBLISH}' WHERE id=?`;
    await pool.query(sqlquery, [key]);
  }
  catch (error) {
    throw new Error('Fail to move news to publish bin');
  }
}
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
    const result = await pool.query(sqlquery, data);
    return result
    // const result = await pool.query("INSERT INTO news SET ?", {
    //   title, type, categories, post_author, post_date, excerpt, content, post_status, news_code, news_position

    // });
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