import { db } from "@/config/db";
import { Op, QueryTypes } from "sequelize";

export const tagsModel = {
    getAllTags,
    getTags,
    updateTags,
    addTags,
    deleteTags,
    deleteBulkTags,
    getSearchQuery
}
async function getAllTags(lang) {
    try {
        // // const sqlquery = 'SELECT * FROM tags';
        // const results = await db.Tags.findAll();
        // console.log('resultsabc :', results);
        // return results;
        let strquery;
        if (lang)
            strquery = `SELECT * FROM tags_all WHERE languageCode='${lang}'`;
        // else
        //     strquery = 'SELECT * FROM tags_all';
        const results = await db.seq.query(strquery, { type: QueryTypes.SELECT });
        return results;
    } catch (error) {
        console.log(error);
        throw new Error('Fail to get tags');
    }
}

async function getTags(id) {
    try {
        const sqlquery = `SELECT * FROM tags_all WHERE id=${id}`;
        const result = await db.seq.query(sqlquery, { type: QueryTypes.SELECT });
        return result;
    } catch (error) {
        throw new Error("Fail to get news Tags:" + error.message);
    }
}

async function updateTags(data, tagLangs, id) {
    const t = await db.seq.transaction();
    try {
        //update into news Table
        const currentLoginUser = 'huy'; //we add information of modifier huy
        data = { ...data, modified_by: currentLoginUser };
        if (data.post_date)
            data.post_date = db.seq.literal('now()');   //user has press publish button, set time for post_date
        console.log('data :', data);
        await db.Tags.update(
            data,
            {
                where: {
                    id: id,
                },
                transaction: t,
            },
        );
        //update into news_languages Table
        for (const element of tagLangs) {
            console.log('element:', element);
            const { languageCode, tagId, ...newsLangRow } = element;
            await db.Tag_langs.update(
                newsLangRow,
                {
                    where: {
                        [Op.and]: [
                            { tagId: id },
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

async function addTags(data, tagLangs) {
    const t = await db.seq.transaction();
    try {
        //update into news Table
        const currentLoginUser = 'huy'; //we add information of modifier huy
        console.log('data :', data);
        const news = await db.Tags.create(data, { transaction: t });
        //add tagId property to the tagLangs
        for (const element of tagLangs) {
            element.tagId = news.id;
        }
        //create records in news_languages Table
        await db.Tag_langs.bulkCreate(tagLangs, { validate: true, transaction: t });
        await t.commit();

    } catch (error) {
        await t.rollback();
        throw new Error('Cannot create news:' + error.message);
    }

    // try {

    //     // const news = await db.Tags.create(data)
    //     await db.Tags.create(data, { transaction: t });
    //     // for (const element of tagLangs) {
    //     //     element.tagsId = news.id;
    //     // }
    //     // await db.Tag_langs.bulkCreate(tagLangs)
    // }
    // catch (error) {
    //     throw new Error('Cannot create news:' + error.message);
    // }
}

async function deleteTags(key) {
    try {
        await db.Tags.destroy({
            where: {
                id: key,
            },
        });
    } catch (error) {
        throw new Error(`Fail to delete news id = ${key}`);
    }
}

async function deleteBulkTags(keys) {
    try {
        const keysArr = keys.split(",");
        await db.Tags.destroy({
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
    //     : `AND (name LIKE '%${search}%' OR content LIKE '%${search}%' OR tags LIKE '%${search}%')`;
    try {
        let strquery = 'SELECT * FROM tags_all WHERE(';

        strquery = strquery + ` (name LIKE '%${search}%' OR description LIKE '%${search}%')`;
        if (lang)
            strquery = strquery + ` AND languageCode='${lang}')`;
        const results = await db.seq.query(strquery, { type: QueryTypes.SELECT });
        return results;
    } catch (error) {
        console.log(error);
        throw new Error('Fail to get tags');
    }
}