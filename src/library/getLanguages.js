import { db } from "@/config/db";

export async function getLanguages() {
    //console.log('db in language:', db);
    try {
        const results = await db.Languages.findAll({
            order: db.seq.literal(`code='${process.env.DEFAULT_LANGUAGE}' DESC`),
        });
        return results;
    } catch (error) {
        throw new Error('Fail to get languages: ' + error.message);
    }
}