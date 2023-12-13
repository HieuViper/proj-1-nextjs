import { funcArticleCategories } from "@/library/funcArticleCategories";
import { funcLanguage } from "@/library/funcLanguages";
import ArticleList from "./_components/ArticleCatList";
const myConstant = require('@/store/constant')

async function ArticlePage() {
  // if (!db.initialized) {
  //   await db.initialize();
  // }

  async function getAllArticle(lang) {
    "use server";
    const article = await funcArticleCategories.getAllArticleCat(lang);
    return article;
  }
  async function getArticle(id) {
    "use server";
    const article = await funcArticleCategories.getArticleCat(id);
    return article;
  }
  async function addArticle(data, articleLangs, lang) {
    "use server";
    let message = "";
    let id;
    try {
      await funcArticleCategories.addArticleCat(data, articleLangs);
      const rs = await funcArticleCategories.getAllArticleCat(lang);
      return { message: 1, articleList: rs };
    } catch (error) {
      message = `Fail to add a articles, try again or inform your admin: ${error.message}`;
    }
    return message;
  }

  async function editArticle(data, articleLangs, id, lang) {
    "use server";
    try {
      await funcArticleCategories.updateArticleCat(data, articleLangs, id);
      const rs = await funcArticleCategories.getAllArticleCat(lang);
      return { message: 1, articleList: rs };
    } catch (error) {
      return {
        message: `Fail to update articles, try again or inform your admin: ${error.message}`,
      };
    }
  }
  async function delArticle(id) {
    "use server";
    await funcArticleCategories.delArticleCat(id);
  }
  async function delBulkArticle(arrId) {
    "use server";
    await funcArticleCategories.delBulkArticleCat(arrId);
  }
  async function searchArticle(search, lang) {
    "use server";
    const article = await funcArticleCategories.getSearchQuery(search, lang);
    return article;
  }
  const allArticleCat = await funcArticleCategories.getAllArticleCat(
    myConstant.DEFAULT_LANGUAGE
  );
  const langTable = await funcLanguage.getLanguages();

  return (
    <>
      <ArticleList
        dataTable={JSON.stringify(allArticleCat)}
        langTable={JSON.stringify(langTable)}
        {...{
          getAllArticle,
          getArticle,
          addArticle,
          editArticle,
          delArticle,
          delBulkArticle,
          searchArticle,
        }}
      />
    </>
  );
}

export default ArticlePage;
