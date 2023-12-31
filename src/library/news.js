//'use server';
// const db = require("@/app/models");
const db = require("@/app/models")
import Sequelize, { Op, QueryTypes } from "sequelize";
import { funcLogin } from "./funcLogin";
import { log } from "console";
import { languages } from "./languages";
import { undefined } from "zod";
const myConstant = require('@/store/constant')

//get Status query from parameter post_status
function getStatusQuery(post_status) {
  switch (post_status) {
    case "":
      // return `post_status!='${myConstant.post.POST_STATUS_TRASH}'`;
      return { post_status: {
                  [Op.ne]: myConstant.post.POST_STATUS_TRASH,
                }
              };
    case myConstant.post.POST_STATUS_PRIORITY:
      // return `news_position=1`;
      return {
          news_position: 1
      };
    default:
      // return `post_status='${post_status}'`;
      return {
        post_status: post_status
      }
  }
}
//get search query from search parameter
function getSearchQuery(search) {
  // return search == ""
  //   ? ""
  //   : `AND (title LIKE '%${search}%' OR content LIKE '%${search}%' OR categories LIKE '%${search}%')`;
  let result = {
    news: {},
    news_languages: {}
  };
  if ( search != '' ) {
    result.news = {
      categories: {
        [Op.like]: `%${search}%`
      }
    };
    result.news_languages = {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${search}%`
            }
          },
          {
            content: {
              [Op.like]: `%${search}%`
            }
          },
        ]
    }
  }
  return result;
}
export const news = {
  getAllNews,
  getTotalNumOfNews,
  trashNews,
  deleteBulkNews,
  recoverNews,
  deleteNews,
  getNews,
  getCategories,
  getTags,
  updateANews,
  addANews,
  newsList,
};

//GetNews for tab "All,published, trash"
export async function getAllNews(
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
  let result = {
    news: null,
    totals: {
      itemsOfTable: 0,
      all: 0,
      draft: 0,
      publish: 0,
      trash: 0,
      priority: 0,
    }
  };

  try {
    // const fromNews = (page - 1) * size; //determine the beginning news
    const authorQuery = author == '' ? {}
                                            :
                                            {
                                              post_author: author
                                            };
    // const catQuery =
    //   category == "" ? "" : `AND categories LIKE '%${category}%'`;
    const catQuery = category == '' ? {}
                                           : {
                                              categories: {
                                                [Op.like]: `%${category}%`
                                              }
                                            }
    // const tagQuery = tag == "" ? "" : `AND tags like '%${tag}%'`;
    const tagQuery = tag == '' ? {}
                                      : {
                                          tags: {
                                            [Op.like]: `%${tag}%`
                                          }
                                      }
    const statusQuery = getStatusQuery(post_status);
    const searchQuery = getSearchQuery(search);
    // const orderQuery = orderby == "" ? "" : `ORDER BY ${orderby} ${order}`;

    // let sqlquery = `SELECT * FROM news_all WHERE (${statusQuery} AND languageCode='${lang}' ${searchQuery} ${authorQuery} ${catQuery} ${tagQuery}) ${orderQuery} LIMIT ${fromNews}, ${size}`;
    // const results = await db.sequelize.query(sqlquery, { type: QueryTypes.SELECT });

    let { count, rows } = await db.News.findAndCountAll({
        where: {
          [Op.and]: [
            statusQuery,
            // { languageCode: lang },
            searchQuery.news,
            authorQuery,
            catQuery,
            tagQuery
          ]
        },
        attributes: [
            'id', 'post_author', 'categories', 'tags', 'post_date', 'post_modified', 'post_status', 'news_code'
        ],
        include: [
        {
            model: db.News_languages,
            as: 'news_languages',
            where: {
              [Op.and]: [
                { languageCode: lang },
                searchQuery.news_languages,
              ]
            },
            attributes: [
              'title'
            ]
        },
        ],
        offset: parseInt(page - 1) * parseInt( size ),
        limit: parseInt( size ),
        order: [[orderby, order]],
    });
    result.news = rows;
    result.totals.itemsOfTable = count;

     //get total number of news in All Status
      let rsAll = await db.News.findAndCountAll(
        {
          where: {
            post_status: {
              [Op.ne] : myConstant.post.POST_STATUS_TRASH
            }
          },
      }
      );
      result.totals.all  = rsAll.count;
    //Get total number of news in detail status
    let rows3 = await db.News.findAll({
        attributes: [
          'post_status',
          [Sequelize.fn("COUNT", Sequelize.col("post_status")), "total"]
        ],
        group: 'post_status'
    });
    for ( const item of rows3 ) {
      switch ( item.post_status ) {
        case myConstant.post.POST_STATUS_DRAFT:
          result.totals.draft = item.dataValues.total;
          break;
        case myConstant.post.POST_STATUS_TRASH:
          result.totals.trash = item.dataValues.total;
          break;
        case myConstant.post.POST_STATUS_PUBLISH:
          result.totals.publish = item.dataValues.total;
          break;
        default:
          throw new Error( 'Post_status in database is not right. Review all post_status in database' );
      }
    }
    //get total number of news in priority status
    let rsPri = await db.News.findAndCountAll({
      where: {
        news_position: 1
      },
    });
    result.totals.priority = rsPri.count;
  } catch (error) {
    throw new Error("Fail to get news from databas: " + error.message);
  }
  return result;
}

//get total item of news
export async function getTotalNumOfNews(
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
    //get total number of news in the return news table
    const statusQuery = getStatusQuery(post_status);
    const searchQuery = getSearchQuery(search);
    const authorQuery = author == "" ? "" : `AND post_author='${author}'`;
    const catQuery =
      category == "" ? "" : `AND categories LIKE '%${category}%'`;
    const tagQuery = tag == "" ? "" : `AND tags like '%${tag}%'`;

    let sqlquery = `SELECT count(*) AS total FROM news_all WHERE ${statusQuery} AND languageCode='${lang}' ${searchQuery} ${authorQuery} ${catQuery} ${tagQuery}`;
    //let results = await pool.query(sqlquery, [post_type]);
    let results = await db.sequelize.query(sqlquery, { type: QueryTypes.SELECT });
    totals.itemsOfTable = results[0].total;
  } catch (error) {
    throw new Error("cannot get items Of Table:" + error.message);
  }
  try {
    //get total number of news in All Status
    let sqlquery = `SELECT count(*) AS total FROM news WHERE post_status!='${myConstant.post.POST_STATUS_TRASH}'`;
    //let results = await pool.query(sqlquery);
    let results = await db.sequelize.query(sqlquery, { type: QueryTypes.SELECT });
    totals.all = results[0].total;
  } catch (error) {
    throw new Error("cannot get number of news in All Tab:" + error.message);
  }
  try {
    //get total number of news in draft status
    let sqlquery = `SELECT count(*) AS total FROM news WHERE post_status='${myConstant.post.POST_STATUS_DRAFT}'`;
    let results = await db.sequelize.query(sqlquery, { type: QueryTypes.SELECT });
    totals.draft = results[0].total;
  } catch (error) {
    throw new Error(
      "Cannot get total of news in Draft status:" + error.message
    );
  }
  try {
    //get total number of news in published status
    let sqlquery = `SELECT count(*) AS total FROM news WHERE post_status='${myConstant.post.POST_STATUS_PUBLISH}'`;
    let results = await db.sequelize.query(sqlquery, { type: QueryTypes.SELECT });
    totals.publish = results[0].total;
  } catch (error) {
    throw new Error(
      "Cannot get total of news in published status:" + error.message
    );
  }
  try {
    //get total number of news in trash status
    let sqlquery = `SELECT count(*) AS total FROM news WHERE post_status='${myConstant.post.POST_STATUS_TRASH}'`;
    let results = await db.sequelize.query(sqlquery, { type: QueryTypes.SELECT });
    totals.trash = results[0].total;
  } catch (error) {
    throw new Error(
      "Cannot get total of news in trash status: " + error.message
    );
  }
  try {

    let sqlquery = `SELECT count(*) AS total FROM news WHERE news_position=1`;
    let results = await db.sequelize.query(sqlquery, { type: QueryTypes.SELECT });
    totals.priority = results[0].total;

    return totals;
  } catch (error) {
    throw new Error(
      "Cannot get total of news in priority status:" + error.message
    );
  }
}

//Move a news to trash
export async function trashNews(key) {
  try {
    await db.News.update(
      { post_status: myConstant.post.POST_STATUS_TRASH },
      {
        where: {
          id: key,
        },
      }
    );
  } catch (error) {
    throw new Error("Fail to move news to trash bin");
  }
}

//Delete bulk of news, articles based on newsId
export async function deleteBulkNews(keys, status) {
  try {
    const keysArr = keys.split(",");
    if (status != myConstant.post.POST_STATUS_TRASH)
      await db.News.update(
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
      await db.News.destroy({
        where: {
          id: {
            [Op.in]: keysArr,
          },
        },
      });
  } catch (error) {
    console.log(error);
    throw new Error("Fail to delete news");
  }
}

//Recover News
export async function recoverNews(key) {
  try {
    await db.News.update(
      { post_status: myConstant.post.POST_STATUS_DRAFT },
      {
        where: {
          id: key,
        },
      }
    );
  } catch (error) {
    throw new Error(`Fail to recover news id = ${key}`);
  }
}

//Delete forever a news
export async function deleteNews(key) {
  try {
    await db.News.destroy({
      where: {
        id: key,
      },
    });
  } catch (error) {
    throw new Error(`Fail to delete news id = ${key}`);
  }
}

//Get News By ID
export async function getNews(id) {
  try {
    const sqlquery = `SELECT * FROM news_all WHERE id=${id}`;
    const result = await db.sequelize.query(sqlquery, { type: QueryTypes.SELECT });
    return result;
  } catch (error) {
    throw new Error("Fail to get news:", error.message);
  }
}

//get all Categories
export async function getCategories(lang) {
  try {
    let strquery;
    if (lang)
      strquery = `SELECT * FROM news_cat_all WHERE languageCode='${lang}'`;
    else strquery = "SELECT * FROM news_cat_all";
    const results = await db.sequelize.query(strquery, { type: QueryTypes.SELECT });
    return results;
  } catch (error) {
    throw new Error("Fail to get categories: " + error.message);
  }
}

//Get all tags
export async function getTags(lang) {
  try {
    let strquery;
    if (lang) strquery = `SELECT * FROM tags_all WHERE languageCode='${lang}'`;
    else strquery = "SELECT * FROM tags_all";
    const results = await db.sequelize.query(strquery, { type: QueryTypes.SELECT });
    return results;
  } catch (error) {
    throw new Error("Fail to get Tags: " + error.message);
  }
}



//Update new information of a News from Edit form
//parameter: data: contain updated value for news Table
//           newsLangs: contain updated value for news_languages Table
//           id:  contain id of the news that need to be updated
export async function updateANews(data, newsLangs, id) {
  const t = await db.sequelize.transaction();
  try {
    //update into news Table
    // const currentLoginUser = "huy"; //we add information of modifier huy
    // data = { ...data, modified_by: currentLoginUser };
    if (data.post_date) data.post_date = db.sequelize.literal("now()"); //user has press publish button, set time for post_date
    console.log("data :", data);
    await db.News.update(data, {
      where: {
        id: id,
      },
      transaction: t,
    });
    //update into news_languages Table
    for (const element of newsLangs) {
      console.log("element:", element);
      const { languageCode, newsId, ...newsLangRow } = element;
      await db.News_languages.update(newsLangRow, {
        where: {
          [Op.and]: [{ newsId: id }, { languageCode: languageCode }],
        },
        transaction: t,
      });
    }

    await t.commit();

  } catch (error) {
    await t.rollback();
    throw new Error("Cannot update news:" + error.message);
  }
}

//Add a new News from Add form
//parameter: data: contain updated value for news Table
//           newsLangs: contain updated value for news_languages Table
export async function addANews(data, newsLangs) {
  const t = await db.sequelize.transaction();
  try {
    //update into news Table
    // const currentLoginUser = "huy"; //we add information of modifier huy
    if (data.post_date) data.post_date = db.sequelize.literal("now()"); //user has press publish button, set time for post_date
    console.log("data :", data);
    const news = await db.News.create(data, { transaction: t });
    //add newsId property to the newsLangs
    for (const element of newsLangs) {
      element.newsId = news.id;
    }
    //create records in news_languages Table
    await db.News_languages.bulkCreate(newsLangs, {
      validate: true,
      transaction: t,
    });

    await t.commit();
    return news.id;
  } catch (error) {
    await t.rollback();
    console.log(error);
    throw new Error("Cannot create news:" + error.message);
  }
}



//handle proccesses of news list route
//parameter: loginInfo: contain logging information of user, include the role to check authorization
//           searchParams: contain the query from URL of the request
async function newsList( loginInfo, searchParams ) {

  const trash = searchParams?.get('trash') ?? '';
  const keys = searchParams?.get('keys') ?? '';
  const recover = searchParams?.get('recover') ?? '';
  const del = searchParams?.get('del') ?? '';
  const status = searchParams?.get('status') ?? '';
  const search = searchParams?.get('search') ?? '';
  const page = searchParams?.get('page') ?? 1;
  const size = searchParams?.get('size') ?? myConstant.post.PAGE_SIZE;
  let orderby = searchParams?.get('orderby') ?? '';
  let order = searchParams?.get('order') ?? '';
  const author = searchParams?.get('author') ?? '';
  const category = searchParams?.get('category') ?? '';
  const tag = searchParams?.get('tag') ?? '';
  const lang = searchParams?.get('lang') ?? myConstant.DEFAULT_LANGUAGE;

  let result = {
    error: null,
    msg: null,
    news: null,
    languages: null,
    pagination: null,
    totals: null,
  }

  try {
      //Check for deleting
      if( keys != '' || del != '' ) {
        let isAuthorize = await funcLogin.checkAuthorize( loginInfo.user, 'news', 'delete');
        if ( isAuthorize == false ) {
            result.error = 403;
            return result;
        }
        if ( keys != '' )
            await news.deleteBulkNews(keys, status);
        if ( del != '' )
            await news.deleteNews(del);
      }
      //Check for moving to trash
      if( trash != '' ) {
        let isAuthorize = await funcLogin.checkAuthorize( loginInfo.user, 'news', 'moveTrash');
        if ( isAuthorize == false ) {
            result.error = 403;
            return result;
        }
        await news.trashNews(trash);
      }
      //Check for recovering
      if( recover != '' ) {
        let isAuthorize = await funcLogin.checkAuthorize( loginInfo.user, 'news', 'recover');
        if ( isAuthorize == false ) {
            result.error = 403;
            return result;
        }
        await news.recoverNews( recover );
      }
      //if no search params. Set default order for searching
      if ( !searchParams || searchParams?.keys().length == 0 ) {
        orderby = "post_modified";
        order = "desc";
      }
      let newsRs = await news.getAllNews(
        status,
        page,
        size,
        search,
        orderby,
        order,
        author,
        category,
        tag,
        lang
      );
      result.news = newsRs.news;
      result.totals = newsRs.totals;
      // result.totals = await news.getTotalNumOfNews(
      //   status,
      //   search,
      //   author,
      //   category,
      //   tag,
      //   lang
      // );
      result.pagination = {
        pageSize: parseInt(size),
        total: result.totals.itemsOfTable,
        current: parseInt(page),
      };
      result.languages = await languages.getLanguages();
      return result;
  }
  catch( error ) {
    result.error = 500;
    result.msg = error.message;
    return result;
  }
}