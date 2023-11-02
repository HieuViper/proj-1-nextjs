import { db } from "@/config/db";

export const newsCategoriesModel = { getAllNewsCategories, getNewsCategories, editNewsCategories, addNewsCategories }
export async function getAllNewsCategories() {
    try {
        // const sqlquery = 'SELECT * FROM categories';
        const results = await db.News_categories.findAll();
        console.log('resultsabc :', results);
        return results;
    } catch (error) {
        console.log(error);
        throw new Error('Fail to get categories');
    }
}
export async function getNewsCategories(id) {
    console.log('idcate :', id);
    try {
        const result = await db.News_categories.findOne({ where: { id: 1 } })
        console.log('resultxyz :', result);

        // const sqlquery = 'SELECT * FROM news WHERE id = ?';
        // const result = await pool.query(sqlquery, [id]);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error('Fail to get getNewsCategories');
    }
}
export async function editNewsCategories(data, id) {
    try {
        // const sqlquery = 'UPDATE news SET ? WHERE id = ?';
        // await pool.query(sqlquery, [data, id]);
        const result = await db.News_categories.update({ data }, { where: { id } });
        return result;
    } catch (error) {
        throw new Error('Fail to edit getNewsCategories');
    }
}

export async function addNewsCategories(data) {
    try {
        // const sqlquery = 'INSERT INTO news SET ?';
        // const result = await pool.query(sqlquery, data);
        const result = await db.News_categories.create({ data });
        // if (result.insertId) {
        //     redirect(`/admin/news/edit/${result.insertId}`);
        // }
        return result;
    } catch (error) {
        throw new Error('Fail to add getNewsCategories');
    }
}