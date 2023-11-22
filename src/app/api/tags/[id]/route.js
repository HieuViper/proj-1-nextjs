import { db } from "@/config/db";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function PUT(req, context) {
  const id = context.params.id;
  const t = await db.seq.transaction();
  try {
    const body = await req.json();
    let data = body.data;
    let tagLangs = body.tagLangs;
    //update into tag Table
    const currentLoginUser = "huy"; //we add information of modifier huy
    data = { ...data, modified_by: currentLoginUser };
    if (data.post_date) data.post_date = db.seq.literal("now()"); //user has press publish button, set time for post_date
    console.log("data :", data);
    await db.Tags.update(data, {
      where: {
        id: id,
      },
      transaction: t,
    });
    //update into tag_languages Table
    for (const element of tagLangs) {
      console.log("element:", element);
      const { languageCode, tagId, ...tagLangRow } = element;
      await db.Tag_langs.update(tagLangRow, {
        where: {
          [Op.and]: [{ tagId: id }, { languageCode: languageCode }],
        },
        transaction: t,
      });
    }

    await t.commit();
    return NextResponse.json({ message: 1 });
  } catch (error) {
    await t.rollback();
    throw new Error("Cannot update tag:" + error.message);
  }
}

export async function DELETE(req, context) {
  const id = context.params.id;
  try {
    await db.Tags.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    throw new Error(`Fail to delete tag id = ${id}`);
  }
}
