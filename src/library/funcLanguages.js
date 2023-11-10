import { db } from "@/config/db";
import { Op } from "sequelize";

export const funcLanguage = {
  getLanguages,
  getLanguage,
  updateLanguage,
  addLanguage,
  deleteLanguage,
  deleteBulkLanguages,
  getSearchQuery,
};

async function getLanguages() {
  try {
    const results = await db.Languages.findAll({
      order: db.seq.literal(`code='${process.env.DEFAULT_LANGUAGE}' DESC`),
    });
    return results;
  } catch (error) {
    throw new Error("Fail to get languages: " + error.message);
  }
}

async function getLanguage(code) {
  try {
    const result = await db.Languages.findOne({
      where: {
        code: code,
      },
    });
    return result;
  } catch (error) {
    throw new Error("Fail to get languages:" + error.message);
  }
}

async function updateLanguage(data, code) {
  try {
    const result = await db.Languages.update(data, {
      where: {
        code: code,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Cannot update languages:" + error.message);
  }
}

async function addLanguage(data) {
  try {
    const result = await db.Languages.create(data);
    return result;
  } catch (error) {
    throw new Error("Cannot create news:" + error.message);
  }
}

async function deleteLanguage(key) {
  try {
    await db.Languages.destroy({
      where: {
        code: key,
      },
    });
  } catch (error) {
    throw new Error(`Fail to delete news code = ${key}`);
  }
}

async function deleteBulkLanguages(arr) {
  try {
    await db.Languages.destroy({
      where: {
        code: {
          [Op.in]: arr,
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Fail to delete news", error);
  }
}

async function getSearchQuery(search) {
  try {
    const result = await db.Languages.findAll({
      where: {
        code: {
          [Op.like]: `%${search}%`,
        },
        name: {
          [Op.like]: `%${search}%`,
        },
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Fail to get tags");
  }
}