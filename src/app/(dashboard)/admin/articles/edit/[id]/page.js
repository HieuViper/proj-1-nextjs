import { db } from "@/config/db";
import { articleHandle } from "@/library/getArticles";
import { ArticleForm } from "../../_components/ArticleForm";

export const dynamic = "force-dynamic";
const EditArticlePage = async ({ params, searchParams }) => {
  if (!db.initialized) {
    await db.initialize();
  }
  async function dellArticle(data, articleLangs, id) {
    "use server";
    await articleHandle.updateAarticle(data, articleLangs, id);
    redirect("/admin/articles");
  }
  async function editArticle(data, articleLangs, id) {
    "use server";
    try {
      await articleHandle.updateAarticle(data, articleLangs, id);
      return { message: 1 };
    } catch (error) {
      return {
        message: `Fail to update article, try again or inform your admin: ${error.message}`,
      };
    }
  }
  const data = await articleHandle.getArticle(params.id);
  const cate = await articleHandle.getCategories(process.env.DEFAULT_LANGUAGE);
  const langTable = await articleHandle.getLanguages();
  return (
    <div>
      Edit new
      <ArticleForm
        data={data}
        cate={cate}
        langTable={langTable}
        {...{ dellArticle, editArticle }}
      />
    </div>
  );
};

export default EditArticlePage;
