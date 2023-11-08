

import { newsCategoriesModel } from "@/library/NewsCategories";
import CategoryList from "./_components/NewsCatList";
import { db } from '@/config/db';
import { getLanguages } from "@/library/getLanguages";

async function CategoriesPage() {
  if (!db.initialized) {
    await db.initialize();
  }

  async function getAllNewsCate(lang) {
    'use server'
    const newsCategories = await newsCategoriesModel.getAllNewsCategories(lang)
    return newsCategories
  }
  async function getNewsCate(id) {
    'use server'
    const newsCategories = await newsCategoriesModel.getNewsCategories(id)
    return newsCategories
  }
  async function addNewsCate(data, newsLangs, lang) {
    'use server';
    let message = '';
    let id;
    try {
      await newsCategoriesModel.addNewsCategories(data, newsLangs);
      const rs = await newsCategoriesModel.getAllNewsCategories(lang);
      return { message: 1, cateList: rs }

    } catch (error) {
      message = `Fail to add a news, try again or inform your admin: ${error.message}`;
    }
    return message;
  }

  async function editNewsCate(data, newsLangs, id, lang) {
    'use server';
    try {
      await newsCategoriesModel.updateNewsCategories(data, newsLangs, id);
      const rs = await newsCategoriesModel.getAllNewsCategories(lang);
      return { message: 1, cateList: rs }
    } catch (error) {
      return { message: `Fail to update news, try again or inform your admin: ${error.message}` };
    }
  }
  async function delNewsCate(id) {
    'use server';
    await newsCategoriesModel.deleteNewsCategories(id);
  }
  async function delBulkNewsCate(arrId) {
    'use server';
    await newsCategoriesModel.deleteBulkNewsCategories(arrId);
  }
  async function searchNewsCate(search, lang) {
    'use server'
    const newsCategories = await newsCategoriesModel.getSearchQuery(search, lang)
    return newsCategories
  }
  const allNewsCategories = await newsCategoriesModel.getAllNewsCategories(process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE)
  const langTable = await getLanguages();

  return (
    <>
      <CategoryList
        dataTable={JSON.stringify(allNewsCategories)}
        langTable={JSON.stringify(langTable)}
        {...{ getAllNewsCate, getNewsCate, addNewsCate, editNewsCate, delNewsCate, delBulkNewsCate, searchNewsCate }} />
    </>
  );
}

export default CategoriesPage;