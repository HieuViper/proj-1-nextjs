import { db } from "@/config/db";
import { addAarticle, articleHandle } from "@/library/getArticles";
import { ArticleForm } from "../_components/ArticleForm";

const AddArticlePage = async () => {
  if (!db.initialized) {
    await db.initialize();
  }
  async function addArticle(data, articleLangs) {
    "use server";
    let message = "";
    let id;
    try {
      id = await addAarticle(data, articleLangs);
      message = 1;
    } catch (error) {
      message = `Fail to add a Article, try again or inform your admin: ${error.message}`;
    }
    console.log("id:", id);
    if (id) {
      redirect(`/admin/articles/edit/${id}?message=${message}`);
    }

    return message;
  }
  const cate = await articleHandle.getCategories();
  const langTable = await articleHandle.getLanguages();
  return (
    <div className="">
      Add new article
      <ArticleForm cate={cate} langTable={langTable} {...{ addArticle }} />
    </div>
  );
};

export default AddArticlePage;
