import { funcArticle } from "@/library/funcArticles";
import { newsImgs } from "@/library/newsImgs";
import { redirect } from "next/navigation";
import { ArticleForm } from "../_components/ArticleForm";
const myConstant = require('@/store/constant')

const AddArticlePage = async () => {
  async function addArticle(data, articleLangs) {
    "use server";
    let message = "";
    let id;
    try {
      id = await funcArticle.addAarticle(data, articleLangs);
      console.log("🚀 ~ file: page.js:14 ~ addArticle ~ id:", id);
      message = 1;
    } catch (error) {
      message = `Fail to add a Article, try again or inform your admin: ${error.message}`;
    }
    if (id) {
      redirect(`/admin/articles/edit/${id}?message=${message}`);
    }

    return message;
  }
  async function addImage(data) {
    "use server";
    let result;
    try {
      rs = await newsImgs.addImage(data);
      console.log("🚀 ~ file: page.js:14 ~ addArticle ~ rs:", rs);
      result = rs;
    } catch (error) {
      console.log(error.message);
    }

    return result;
  }
  const cate = await funcArticle.getCategories(myConstant.DEFAULT_LANGUAGE);
  const langTable = await funcArticle.getLanguages();
  return (
    <div className="">
      Add new article
      <ArticleForm
        cate={JSON.stringify(cate)}
        langTable={JSON.stringify(langTable)}
        {...{ addArticle, addImage }}
      />
    </div>
  );
};

export default AddArticlePage;
