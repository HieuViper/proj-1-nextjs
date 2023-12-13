import { funcArticle } from "@/library/funcArticles";
import { funcImage } from "@/library/funcImages";
import { redirect } from "next/navigation";
import { ArticleForm } from "../../_components/ArticleForm";
const myConstant = require('@/store/constant')

export const dynamic = "force-dynamic";
const EditArticlePage = async ({ params, searchParams }) => {
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
  async function updateImage(data, url) {
    "use server";
    let result;
    try {
      let rs = await funcImage.updateImage(data, url);
      console.log("🚀 ~ file: page.js:14 ~ updateImage ~ rs:", rs);
      result = rs;
    } catch (error) {
      console.log(error.message);
    }

    return result;
  }
  async function addImage(data) {
    "use server";
    let result;
    try {
      rs = await funcImage.addImage(data);
      console.log("🚀 ~ file: page.js:14 ~ addArticle ~ rs:", rs);
      result = rs;
    } catch (error) {
      console.log(error.message);
    }

    return result;
  }
  async function findOneImage(url) {
    "use server";
    let isExisted;
    try {
      let rs = await funcImage.getImage(url);
      if (rs) {
        isExisted = true;
      } else {
        isExisted = false;
      }
    } catch (error) {
      console.log(error.message);
    }
    return isExisted;
  }
  const data = await funcArticle.getArticle(params.id);
  console.log("🚀 ~ file: page.js:25 ~ EditArticlePage ~ data:", data);
  const mainImage = await funcImage.getImage(data[0]?.image ?? "");
  const cate = await funcArticle.getCategories(myConstant.DEFAULT_LANGUAGE);
  const langTable = await funcArticle.getLanguages();
  return (
    <div>
      Edit new
      <ArticleForm
        data={JSON.stringify(data)}
        cate={JSON.stringify(cate)}
        langTable={JSON.stringify(langTable)}
        mainImage={JSON.stringify(mainImage)}
        {...{ dellArticle, editArticle, updateImage, addImage, findOneImage }}
      />
    </div>
  );
};

export default EditArticlePage;
