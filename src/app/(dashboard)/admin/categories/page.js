

import { newsCategoriesModel } from "@/library/getNewsCategories";
import CategoryList from "./_components/CategoryList";
import { db } from '@/config/db';



async function CategoriesPage() {
  if (!db.initialized) {
    await db.initialize();
  }
  const allNewsCategories = await newsCategoriesModel.getAllNewsCategories()
  // console.log('allNewsCategories :', allNewsCategories);
  const id = 1
  const data = async (id) => {
    const newsCategories = await newsCategoriesModel.getNewsCategories(id)
    // console.log('newsCategories :', newsCategories);

  }

  return (
    <>
      <CategoryList dataTable={JSON.stringify(allNewsCategories)} change={data()} />
    </>
  );
}

export default CategoriesPage;
