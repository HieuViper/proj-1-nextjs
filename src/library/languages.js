const db = require("@/app/models");
const myConstant = require('@/store/constant')
import { Op } from "sequelize";

export const languages = {
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
      order: db.sequelize.literal(`code='${myConstant.DEFAULT_LANGUAGE}' DESC`),
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
    throw new Error("Cannot create languages:" + error.message);
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
    throw new Error(`Fail to delete languages code = ${key}`);
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
    throw new Error("Fail to delete languages", error);
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
    throw new Error("Fail to get languages");
  }
}
