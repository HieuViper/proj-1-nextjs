import { getCategories } from '@/library/getNews';
import { NewsForm } from '../_components/NewsForm';

async function AddNews() {
  const cate = await getCategories();
  return (
    <div className="">
      Add new
      <NewsForm cate={JSON.stringify(cate)} />
    </div>
  );
}
export default AddNews;
