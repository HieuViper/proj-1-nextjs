

import { articleCatModel } from "@/library/ArticleCategories";
import ArticleList from "./_components/ArticleCatList";
import { db } from '@/config/db';
import { getLanguages } from "@/library/getLanguages";

async function ArticlePage() {
  if (!db.initialized) {
    await db.initialize();
  }

  async function getAllArticle(lang) {
    'use server'
    const article = await articleCatModel.getAllArticleCat(lang)
    return article
  }
  async function getArticle(id) {
    'use server'
    const article = await articleCatModel.getArticleCat(id)
    return article
  }
  async function addArticle(data, articleLangs, lang) {
    'use server';
    let message = '';
    let id;
    try {
      await articleCatModel.addArticleCat(data, articleLangs);
      const rs = await articleCatModel.getAllArticleCat(lang);
      return { message: 1, articleList: rs }

    } catch (error) {
      message = `Fail to add a articles, try again or inform your admin: ${error.message}`;
    }
    return message;
  }

  async function editArticle(data, articleLangs, id, lang) {
    'use server';
    try {
      await articleCatModel.updateArticleCat(data, articleLangs, id);
      const rs = await articleCatModel.getAllArticleCat(lang);
      return { message: 1, articleList: rs }
    } catch (error) {
      return { message: `Fail to update articles, try again or inform your admin: ${error.message}` };
    }
  }
  async function delArticle(id) {
    'use server';
    await articleCatModel.delArticleCat(id);
  }
  async function delBulkArticle(arrId) {
    'use server';
    await articleCatModel.delBulkArticleCat(arrId);
  }
  async function searchArticle(search, lang) {
    'use server'
    const article = await articleCatModel.getSearchQuery(search, lang)
    return article
  }
  const allArticleCat = await articleCatModel.getAllArticleCat(process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE)
  const langTable = await getLanguages();

  return (
    <>
      <ArticleList
        dataTable={JSON.stringify(allArticleCat)}
        langTable={JSON.stringify(langTable)}
        {...{ getAllArticle, getArticle, addArticle, editArticle, delArticle, delBulkArticle, searchArticle }} />
    </>
  );
}

export default ArticlePage;
