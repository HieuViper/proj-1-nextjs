const db = require("@/app/models");
import { Op, QueryTypes } from "sequelize";

export const funcTags = {
    getAllTags,
    getTotalTags,
    getTags,
    updateTags,
    addTags,
    deleteTags,
    deleteBulkTags,
    getSearchQuery
}

async function getAllTags(page, size, search, lang) {

    try {
        const fromTags = (page - 1) * size;
        const searchQuery = getSearchQuery(search);
        let strquery;
        if (lang)
            strquery = `SELECT * FROM tags_all WHERE LanguageCode='${lang}' ${searchQuery} ORDER BY id DESC LIMIT ${fromTags}, ${size}`;
        const results = await db.sequelize.query(strquery, { type: QueryTypes.SELECT });
        return results;
    } catch (error) {
        console.log(error);
        throw new Error('Fail to get tags');
    }
}

export async function getTotalTags(search, lang) {
    let total
    try {
        const searchQuery = getSearchQuery(search);
        let sqlquery = `SELECT count(*) AS total FROM tags_all WHERE LanguageCode='${lang}' ${searchQuery} `;
        let results = await db.sequelize.query(sqlquery, { type: QueryTypes.SELECT });
        total = results[0].total;
        return total
    } catch (error) {
        throw new Error("cannot get items Of Table:" + error.message);
    }
}
function getSearchQuery(search) {
    return search == ""
        ? ""
        : `AND (name LIKE '%${search}%' OR description LIKE '%${search}%')`;
}

async function getTags(id) {
    try {
        const sqlquery = `SELECT * FROM tags_all WHERE id=${id}`;
        const result = await db.sequelize.query(sqlquery, { type: QueryTypes.SELECT });
        return result;
    } catch (error) {
        throw new Error("Fail to get tag Tags:" + error.message);
    }
}

async function updateTags(data, tagLangs, id) {
    const t = await db.sequelize.transaction();
    try {
        //update into tag Table
        const currentLoginUser = 'huy'; //we add information of modifier huy
        data = { ...data, modified_by: currentLoginUser };
        if (data.post_date)
            data.post_date = db.sequelize.literal('now()');   //user has press publish button, set time for post_date
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
        //update into tag_languages Table
        for (const element of tagLangs) {
            console.log('element:', element);
            const { LanguageCode, TagId, ...tagLangRow } = element;
            await db.Tag_langs.update(
                tagLangRow,
                {
                    where: {
                        [Op.and]: [
                            { TagId: id },
                            { LanguageCode: LanguageCode }
                        ]
                    },
                    transaction: t,
                }
            );
        }

        await t.commit();
    } catch (error) {
        await t.rollback();
        throw new Error('Cannot update tag:' + error.message);
    }
}

async function addTags(data, tagLangs) {
    const t = await db.sequelize.transaction();
    try {
        //update into tag Table
        const currentLoginUser = 'huy'; //we add information of modifier huy
        console.log('data :', data);
        const tag = await db.Tags.create(data, { transaction: t });
        //add TagId property to the tagLangs
        for (const element of tagLangs) {
            element.TagId = tag.id;
        }
        //create records in tag_languages Table
        await db.Tag_langs.bulkCreate(tagLangs, { validate: true, transaction: t });
        await t.commit();

    } catch (error) {
        await t.rollback();
        throw new Error('Cannot create tag:' + error.message);
    }


}

async function deleteTags(key) {
    try {
        await db.Tags.destroy({
            where: {
                id: key,
            },
        });
    } catch (error) {
        throw new Error(`Fail to delete tag id = ${key}`);
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
        throw new Error("Fail to delete tag");
    }
}

