const db = require("@/app/models");

export async function DELETE(req, context) {
  const id = context.params.id;
  try {
    await db.Articles.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    throw new Error(`Fail to delete articles id = ${id}`);
  }
}

export async function PUT(req, context) {
  const id = context.params.id;
  const t = await db.sequelize.transaction();
  try {
    const body = await req.json();
    const data = body.data;
    const articleLangs = body.articleLangs;
    //update into article Table
    const currentLoginUser = "huy"; //we add information of modifier huy
    let data1 = { ...data, modified_by: currentLoginUser };
    if (data1.post_date) data1.post_date = db.sequelize.literal("now()"); //user has press publish button, set time for post_date
    console.log("data1 :", data1);
    await db.Articles.update(data1, {
      where: {
        id: id,
      },
      transaction: t,
    });
    //update into article_languages Table
    for (const element of articleLangs) {
      console.log("element:", element);
      const { LanguageCode, ArticleId, ...articleLangRow } = element;
      await db.Article_languages.update(articleLangRow, {
        where: {
          [Op.and]: [{ ArticleId: id }, { LanguageCode: LanguageCode }],
        },
        transaction: t,
      });
    }

    await t.commit();
  } catch (error) {
    await t.rollback();
    throw new Error("Cannot update article:" + error.message);
  }
}
