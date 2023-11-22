import { db } from "@/config/db";

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
  const t = await db.seq.transaction();
  try {
    const body = await req.json();
    const data = body.data;
    const articleLangs = body.articleLangs;
    //update into article Table
    const currentLoginUser = "huy"; //we add information of modifier huy
    data = { ...data, modified_by: currentLoginUser };
    if (data.post_date) data.post_date = db.seq.literal("now()"); //user has press publish button, set time for post_date
    console.log("data :", data);
    await db.Articles.update(data, {
      where: {
        id: id,
      },
      transaction: t,
    });
    //update into article_languages Table
    for (const element of articleLangs) {
      console.log("element:", element);
      const { languageCode, articleId, ...articleLangRow } = element;
      await db.Article_languages.update(articleLangRow, {
        where: {
          [Op.and]: [{ articleId: id }, { languageCode: languageCode }],
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
