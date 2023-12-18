const db = require("@/app/models");
import { Op, QueryTypes } from "sequelize";

export const funcArticleCategories = {
    getAllArticleCat,
    getArticleCat,
    updateArticleCat,
    addArticleCat,
    delArticleCat,
    delBulkArticleCat,
    getSearchQuery
}
async function getAllArticleCat(lang) {
    try {

        let strquery;
        if (lang)
            strquery = `SELECT * FROM article_cat_all WHERE languageCode='${lang}'`;
        const results = await db.sequelize.query(strquery, { type: QueryTypes.SELECT });
        return results;
    } catch (error) {
        console.log(error);
        throw new Error('Fail to get articles');
    }
}

async function getArticleCat(id) {
    try {
        const sqlquery = `SELECT * FROM article_cat_all WHERE id=${id}`;
        const result = await db.sequelize.query(sqlquery, { type: QueryTypes.SELECT });
        return result;
    } catch (error) {
        throw new Error("Fail to get articleCat :" + error.message);
    }
}

async function updateArticleCat(data, articleLangs, id) {
    const t = await db.sequelize.transaction();
    try {
        //update into articleCat Table
        const currentLoginUser = 'huy'; //we add information of modifier huy
        data = { ...data, modified_by: currentLoginUser };
        if (data.post_date)
            data.post_date = db.sequelize.literal('now()');   //user has press publish button, set time for post_date
        console.log('data :', data);
        await db.Article_categories.update(
            data,
            {
                where: {
                    id: id,
                },
                transaction: t,
            },
        );
        //update into articleCat_languages Table
        for (const element of articleLangs) {
            console.log('element:', element);
            const { languageCode, article_categoryId, ...articleCatLangRow } = element;
            await db.Article_cate_langs.update(
                articleCatLangRow,
                {
                    where: {
                        [Op.and]: [
                            { article_categoryId: id },
                            { languageCode: languageCode }
                        ]
                    },
                    transaction: t,
                }
            );
        }

        await t.commit();
    } catch (error) {
        await t.rollback();
        throw new Error('Cannot update articleCat:' + error.message);
    }
}

async function addArticleCat(data, articleLangs) {
    const t = await db.sequelize.transaction();
    try {
        //update into articleCat Table
        const currentLoginUser = 'huy'; //we add information of modifier huy
        console.log('data :', data);
        const articleCat = await db.Article_categories.create(data, { transaction: t });
        //add article_categoryId  property to the articleLangs
        for (const element of articleLangs) {
            element.article_categoryId = articleCat.id;
        }
        //create records in articleCat_languages Table
        await db.Article_cate_langs.bulkCreate(articleLangs, { validate: true, transaction: t });
        await t.commit();

    } catch (error) {
        await t.rollback();
        throw new Error('Cannot create articleCat:' + error.message);
    }

}

async function delArticleCat(key) {
    try {
        await db.Article_categories.destroy({
            where: {
                id: key,
            },
        });
    } catch (error) {
        throw new Error(`Fail to del articleCat id = ${key}`);
    }
}

async function delBulkArticleCat(keys) {
    try {
        const keysArr = keys.split(",");
        await db.Article_categories.destroy({
            where: {
                id: {
                    [Op.in]: keysArr,
                },
            },
        });

    } catch (error) {
        console.log(error);
        throw new Error("Fail to del articleCat");
    }
}

async function getSearchQuery(search, lang) {

    try {
        let strquery = 'SELECT * FROM article_cat_all WHERE(';

        strquery = strquery + ` (name LIKE '%${search}%' OR description LIKE '%${search}%')`;
        if (lang)
            strquery = strquery + ` AND languageCode='${lang}')`;
        const results = await db.sequelize.query(strquery, { type: QueryTypes.SELECT });
        return results;
    } catch (error) {
        console.log(error);
        throw new Error('Fail to get articles');
    }
}