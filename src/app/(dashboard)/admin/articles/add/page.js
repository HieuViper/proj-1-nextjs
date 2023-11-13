import { addAarticle, funcArticle } from "@/library/funcArticles";
import { redirect } from "next/navigation";
import { ArticleForm } from "../_components/ArticleForm";

const AddArticlePage = async () => {
  // if (!db.initialized) {
  //   await db.initialize();
  // }
  async function addArticle(data, articleLangs) {
    "use server";
    let message = "";
    let id;
    try {
      id = await addAarticle(data, articleLangs);
      console.log("🚀 ~ file: page.js:14 ~ addArticle ~ id:", id);
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
  const cate = await funcArticle.getCategories(process.env.DEFAULT_LANGUAGE);
  const langTable = await funcArticle.getLanguages();
  return (
    <div className="">
      Add new article
      <ArticleForm
        cate={JSON.stringify(cate)}
        langTable={JSON.stringify(langTable)}
        {...{ addArticle }}
      />
    </div>
  );
};

export default AddArticlePage;
