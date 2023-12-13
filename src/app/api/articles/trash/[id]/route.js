const db = require("@/app/models");
const myConstant = require('@/store/constant')

export async function PUT(req, context) {
  const id = context.params.id;
  try {
    await db.Articles.update(
      { post_status: myConstant.post.POST_STATUS_TRASH },
      {
        where: {
          id: id,
        },
      }
    );
  } catch (error) {
    throw new Error("Fail to move articles to trash bin");
  }
}
