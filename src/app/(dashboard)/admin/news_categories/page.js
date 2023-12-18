import { funcLanguage } from "@/library/funcLanguages";
import { newsCategories } from "@/library/newsCategories";
import CategoryList from "./_components/NewsCatList";
const myConstant = require('@/store/constant')

async function CategoriesPage() {
  // if (!db.initialized) {
  //   await db.initialize();
  // }

  async function getAllNewsCate(lang) {
    "use server";
    const newsCategories = await newsCategories.getAllNewsCategories(lang);
    return newsCategories;
  }
  async function getNewsCate(id) {
    "use server";
    const newsCategories = await newsCategories.getNewsCategories(id);
    return newsCategories;
  }
  async function addNewsCate(data, newsLangs, lang) {
    "use server";
    let message = "";
    let id;
    try {
      await newsCategories.addNewsCategories(data, newsLangs);
      const rs = await newsCategories.getAllNewsCategories(lang);
      return { message: 1, cateList: rs };
    } catch (error) {
      message = `Fail to add a news, try again or inform your admin: ${error.message}`;
    }
    return message;
  }

  async function editNewsCate(data, newsLangs, id, lang) {
    "use server";
    try {
      await newsCategories.updateNewsCategories(data, newsLangs, id);
      const rs = await newsCategories.getAllNewsCategories(lang);
      return { message: 1, cateList: rs };
    } catch (error) {
      return {
        message: `Fail to update news, try again or inform your admin: ${error.message}`,
      };
    }
  }
  async function delNewsCate(id) {
    "use server";
    await newsCategories.deleteNewsCategories(id);
  }
  async function delBulkNewsCate(arrId) {
    "use server";
    await newsCategories.deleteBulkNewsCategories(arrId);
  }
  async function searchNewsCate(search, lang) {
    "use server";
    const newsCategories = await newsCategories.getSearchQuery(
      search,
      lang
    );
    return newsCategories;
  }
  const allNewsCategories = await newsCategories.getAllNewsCategories(
    myConstant.DEFAULT_LANGUAGE
  );
  const langTable = await funcLanguage.getLanguages();

  return (
    <>
      <CategoryList
        dataTable={JSON.stringify(allNewsCategories)}
        langTable={JSON.stringify(langTable)}
        {...{
          getAllNewsCate,
          getNewsCate,
          addNewsCate,
          editNewsCate,
          delNewsCate,
          delBulkNewsCate,
          searchNewsCate,
        }}
      />
    </>
  );
}

export default CategoriesPage;
