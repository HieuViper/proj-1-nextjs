//"use server";
const db = require("@/app/models");
const myConstant = require('@/store/constant')
import { Op, QueryTypes } from "sequelize";

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

export const funcArticle = {
  getAllArticle,
  getTotalNumOfarticle,
  trashArticle,
  deleteBulkArticle,
  recoverArticle,
  deleteArticle,
  getArticle,
  getCategories,
  getLanguages,
  updateAarticle,
  addAarticle,
};

//Get article for tab "All,published, trash"
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

    const results = await db.sequelize.query(sqlquery, { type: QueryTypes.SELECT });
    return results;
  } catch (error) {
    throw new Error("Fail to get articles from database" + error.message);
  }
}

//Get total item of articles
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
    let results = await db.sequelize.query(sqlquery, { type: QueryTypes.SELECT });
    totals.itemsOfTable = results[0].total;
  } catch (error) {
    throw new Error("cannot get items Of Table:" + error.message);
  }
  try {
    //get total number of articles in All Status
    let sqlquery = `SELECT count(*) AS total FROM articles WHERE post_status!='${myConstant.post.POST_STATUS_TRASH}'`;
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
    let sqlquery = `SELECT count(*) AS total FROM articles WHERE post_status='${myConstant.post.POST_STATUS_DRAFT}'`;
    let results = await db.sequelize.query(sqlquery, { type: QueryTypes.SELECT });
    totals.draft = results[0].total;
  } catch (error) {
    throw new Error(
      "Cannot get total of articles in Draft status:" + error.message
    );
  }
  try {
    //get total number of articles in published status
    let sqlquery = `SELECT count(*) AS total FROM articles WHERE post_status='${myConstant.post.POST_STATUS_PUBLISH}'`;
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
      { post_status: myConstant.post.POST_STATUS_TRASH },
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

//Delete bulk of articles, articles based on articleId
export async function deleteBulkArticle(keys, status) {
  try {
    const keysArr = keys.split(",");
    if (status != myConstant.post.POST_STATUS_TRASH)
      await db.Articles.update(
        { post_status: myConstant.post.POST_STATUS_TRASH },
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
      { post_status: myConstant.post.POST_STATUS_DRAFT },
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

//Get Article by ID
export async function getArticle(id) {
  try {
    let sqlquery = `SELECT * FROM articles_all WHERE id=${id}`;
    //let results = await pool.query(sqlquery, [post_type]);
    let result = await db.sequelize.query(sqlquery, { type: QueryTypes.SELECT });
    // const result = await db.Article_categories.findOne({ where: { id: id } });
    return result;
  } catch (error) {
    console.log("12345", error);
    throw new Error("Fail to get articles");
  }
}

//Get All Categories
export async function getCategories(lang) {
  try {
    let strquery;
    if (lang)
      strquery = `SELECT * FROM article_cat_all WHERE languageCode='${lang}'`;
    else strquery = "SELECT * FROM article_cat_all";
    const results = await db.sequelize.query(strquery, { type: QueryTypes.SELECT });

    return results;
  } catch (error) {
    throw new Error("Fail to get categories: " + error.message);
  }
}

//Get All Languages
export async function getLanguages() {
  //console.log('db in language:', db);
  try {
    const results = await db.Languages.findAll({
      order: db.sequelize.literal(`code='${myConstant.DEFAULT_LANGUAGE}' DESC`),
    });
    return results;
  } catch (error) {
    throw new Error("Fail to get languages: " + error.message);
  }
}

//Add a new article from Add form
//parameter: data: contain updated value for article Table
//           articleLangs: contain updated value for article_languages Table
export async function addAarticle(data, articleLangs) {
  const t = await db.sequelize.transaction();
  try {
    //update into article Table
    const currentLoginUser = "huy"; //we add information of modifier huy
    if (data.post_date) data.post_date = db.sequelize.literal("now()"); //user has press publish button, set time for post_date
    console.log("data :", data);

    const article = await db.Articles.create(data, { transaction: t });

    //add articleId property to the articleLangs
    for (const element of articleLangs) {
      element.articleId = article.id;
    }
    console.log(articleLangs);
    //create records in article_languages Table

    await db.Article_languages.bulkCreate(articleLangs, {
      validate: true,
      transaction: t,
    });

    await t.commit();
    return article.id;
  } catch (error) {
    await t.rollback();
    throw new Error("Cannot create article:" + error.message);
  }
}

//Update new information of a article from Edit form
//parameter: data: contain updated value for article Table
//           articleLangs: contain updated value for article_languages Table
//           id:  contain id of the article that need to be updated
export async function updateAarticle(data, articleLangs, id) {
  const t = await db.sequelize.transaction();
  try {
    //update into article Table
    const currentLoginUser = "huy"; //we add information of modifier huy
    data = { ...data, modified_by: currentLoginUser };
    if (data.post_date) data.post_date = db.sequelize.literal("now()"); //user has press publish button, set time for post_date
    console.log("data :", data);
    await db.Articles.update(data, {
      where: {
        id: id,
      },
      transaction: t,
    });
    //update into article_languages Table
    for (const element of articleLangs) {
      console.log("element:", element);
      const { languageCode, articleId, ...articleLangRow } = element;
      await db.Article_languages.update(articleLangRow, {
        where: {
          [Op.and]: [{ articleId: id }, { languageCode: languageCode }],
        },
        transaction: t,
      });
    }

    await t.commit();
  } catch (error) {
    await t.rollback();
    throw new Error("Cannot update article:" + error.message);
  }
}
