import { db } from "@/config/db";
import { Op } from "sequelize";

//BULK DELETE ARTICLE
export async function PUT(req, context) {
  try {
    const body = await req.json();
    const keysArr = body.arrDell.split(",");
    const status = body.status;
    if (status != process.env.POST_STATUS_TRASH)
      await db.Articles.update(
        { post_status: process.env.POST_STATUS_TRASH },
        {
          where: {
            id: {
              [Op.in]: keysArr,
            },
          },
        }
      );
    else
      await db.Articles.destroy({
        where: {
          id: {
            [Op.in]: keysArr,
          },
        },
      });
  } catch (error) {
    console.log(error);
    throw new Error("Fail to delete articles");
  }
}
