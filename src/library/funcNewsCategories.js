const db = require("@/app/models");
import { Op, QueryTypes } from "sequelize";

export const funcNewsCategories = {
  getAllNewsCategories,
  getNewsCategories,
  updateNewsCategories,
  addNewsCategories,
  deleteNewsCategories,
  deleteBulkNewsCategories,
  getSearchQuery,
};
async function getAllNewsCategories(lang) {
  try {
    // // const sqlquery = 'SELECT * FROM categories';
    // const results = await db.News_categories.findAll();
    // console.log('resultsabc :', results);
    // return results;
    let strquery;
    if (lang)
      strquery = `SELECT * FROM news_cat_all WHERE LanguageCode='${lang}'`;
    // else
    //     strquery = 'SELECT * FROM news_cat_all';
    const results = await db.sequelize.query(strquery, { type: QueryTypes.SELECT });
    console.log(
      "🚀 ~ file: funcNewsCategories.js:25 ~ getAllNewsCategories ~ results:",
      results
    );
    return results;
  } catch (error) {
    console.log(error);
    throw new Error("Fail to get categories");
  }
}

async function getNewsCategories(id) {
  try {
    const sqlquery = `SELECT * FROM news_cat_all WHERE id=${id}`;
    const result = await db.sequelize.query(sqlquery, { type: QueryTypes.SELECT });
    return result;
  } catch (error) {
    throw new Error("Fail to get news cates:" + error.message);
  }
}

async function updateNewsCategories(data, newsLangs, id) {
  const t = await db.sequelize.transaction();
  try {
    //update into news Table
    const currentLoginUser = "huy"; //we add information of modifier huy
    data = { ...data, modified_by: currentLoginUser };
    if (data.post_date) data.post_date = db.sequelize.literal("now()"); //user has press publish button, set time for post_date
    console.log("data :", data);
    await db.News_categories.update(data, {
      where: {
        id: id,
      },
      transaction: t,
    });
    //update into news_languages Table
    for (const element of newsLangs) {
      console.log("element:", element);
      const { LanguageCode, NewsCategoryId, ...newsLangRow } = element;
      await db.News_cate_langs.update(newsLangRow, {
        where: {
          [Op.and]: [{ NewsCategoryId: id }, { LanguageCode: LanguageCode }],
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

async function addNewsCategories(data, newsLangs) {
  const t = await db.sequelize.transaction();
  try {
    //update into news Table
    const currentLoginUser = "huy"; //we add information of modifier huy
    console.log("data :", data);
    const news = await db.News_categories.create(data, { transaction: t });
    //add NewsCategoryId property to the newsLangs
    for (const element of newsLangs) {
      element.NewsCategoryId = news.id;
    }
    //create records in news_languages Table
    await db.News_cate_langs.bulkCreate(newsLangs, {
      validate: true,
      transaction: t,
    });
    await t.commit();
  } catch (error) {
    await t.rollback();
    throw new Error("Cannot create news:" + error.message);
  }

  // try {

  //     // const news = await db.News_categories.create(data)
  //     await db.News_categories.create(data, { transaction: t });
  //     // for (const element of newsLangs) {
  //     //     element.NewsCategoryId = news.id;
  //     // }
  //     // await db.News_cate_langs.bulkCreate(newsLangs)
  // }
  // catch (error) {
  //     throw new Error('Cannot create news:' + error.message);
  // }
}

async function deleteNewsCategories(key) {
  try {
    await db.News_categories.destroy({
      where: {
        id: key,
      },
    });
  } catch (error) {
    throw new Error(`Fail to delete news id = ${key}`);
  }
}

async function deleteBulkNewsCategories(keys) {
  try {
    const keysArr = keys.split(",");
    await db.News_categories.destroy({
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

async function getSearchQuery(search, lang) {
  // return search == ""
  //     ? ""
  //     : `AND (name LIKE '%${search}%' OR content LIKE '%${search}%' OR categories LIKE '%${search}%')`;
  try {
    let strquery = "SELECT * FROM news_cat_all WHERE(";

    strquery =
      strquery + ` (name LIKE '%${search}%' OR description LIKE '%${search}%')`;
    if (lang) strquery = strquery + ` AND LanguageCode='${lang}')`;
    const results = await db.sequelize.query(strquery, { type: QueryTypes.SELECT });
    return results;
  } catch (error) {
    console.log(error);
    throw new Error("Fail to get categories");
  }
}
