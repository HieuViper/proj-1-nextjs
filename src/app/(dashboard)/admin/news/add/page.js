import { getCategories } from '@/library/getNews';
import { NewsForm } from '../_components/NewsForm';
import { newsMHandle } from '@/library/getNews';
import { db } from '@/config/db';

export const dynamic = "force-dynamic";

async function AddNews() {
  if( !db.initialized ){
    await db.initialize();
  }

  const cate = await newsMHandle.getCategories();
  const tags = await newsMHandle.getCategories();
  return (
    <div className="">
      <h1>Add new News</h1>
      <NewsForm cate={JSON.stringify(cate)}
                tags = {JSON.stringify(tags)}
      />
    </div>
  );
}
export default AddNews;
