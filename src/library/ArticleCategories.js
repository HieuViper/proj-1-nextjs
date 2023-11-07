import { db } from "@/config/db";
import { Op, QueryTypes } from "sequelize";

export const articleCatModel = {
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
        const results = await db.seq.query(strquery, { type: QueryTypes.SELECT });
        return results;
    } catch (error) {
        console.log(error);
        throw new Error('Fail to get articles');
    }
}

async function getArticleCat(id) {
    try {
        const sqlquery = `SELECT * FROM article_cat_all WHERE id=${id}`;
        const result = await db.seq.query(sqlquery, { type: QueryTypes.SELECT });
        return result;
    } catch (error) {
        throw new Error("Fail to get news ArticleCat:" + error.message);
    }
}

async function updateArticleCat(data, articleLangs, id) {
    const t = await db.seq.transaction();
    try {
        //update into news Table
        const currentLoginUser = 'huy'; //we add information of modifier huy
        data = { ...data, modified_by: currentLoginUser };
        if (data.post_date)
            data.post_date = db.seq.literal('now()');   //user has press publish button, set time for post_date
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
        //update into news_languages Table
        for (const element of articleLangs) {
            console.log('element:', element);
            const { languageCode, articleCategoryId, ...newsLangRow } = element;
            await db.Article_cate_langs.update(
                newsLangRow,
                {
                    where: {
                        [Op.and]: [
                            { articleCategoryId: id },
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
        throw new Error('Cannot update news:' + error.message);
    }
}

async function addArticleCat(data, articleLangs) {
    const t = await db.seq.transaction();
    try {
        //update into news Table
        const currentLoginUser = 'huy'; //we add information of modifier huy
        console.log('data :', data);
        const news = await db.Article_categories.create(data, { transaction: t });
        //add articleCategoryId  property to the articleLangs
        for (const element of articleLangs) {
            element.articleCategoryId = news.id;
        }
        //create records in news_languages Table
        await db.Article_cate_langs.bulkCreate(articleLangs, { validate: true, transaction: t });
        await t.commit();

    } catch (error) {
        await t.rollback();
        throw new Error('Cannot create news:' + error.message);
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
        throw new Error(`Fail to del news id = ${key}`);
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
        throw new Error("Fail to del news");
    }
}

async function getSearchQuery(search, lang) {

    try {
        let strquery = 'SELECT * FROM article_cat_all WHERE(';

        strquery = strquery + ` (name LIKE '%${search}%' OR description LIKE '%${search}%')`;
        if (lang)
            strquery = strquery + ` AND languageCode='${lang}')`;
        const results = await db.seq.query(strquery, { type: QueryTypes.SELECT });
        return results;
    } catch (error) {
        console.log(error);
        throw new Error('Fail to get articles');
    }
}