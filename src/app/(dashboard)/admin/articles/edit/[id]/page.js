import { funcArticle } from "@/library/funcArticles";
import { redirect } from "next/navigation";
import { ArticleForm } from "../../_components/ArticleForm";

export const dynamic = "force-dynamic";
const EditArticlePage = async ({ params, searchParams }) => {
  // if (!db.initialized) {
  //   await db.initialize();
  // }
  async function dellArticle(data, articleLangs, id) {
    "use server";
    await funcArticle.updateAarticle(data, articleLangs, id);
    redirect("/admin/articles");
  }
  async function editArticle(data, articleLangs, id) {
    "use server";
    try {
      await funcArticle.updateAarticle(data, articleLangs, id);
      return { message: 1 };
    } catch (error) {
      return {
        message: `Fail to update article, try again or inform your admin: ${error.message}`,
      };
    }
  }
  const data = await funcArticle.getArticle(params.id);
  const cate = await funcArticle.getCategories(process.env.DEFAULT_LANGUAGE);
  const langTable = await funcArticle.getLanguages();
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
