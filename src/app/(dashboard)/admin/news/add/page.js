import { NewsForm } from '../_components/NewsForm';
import { funcNews } from '@/library/funcNews';
import { db } from '@/config/db';
import { redirect } from 'next/navigation';
import { message } from 'antd';

export const dynamic = "force-dynamic";

async function AddNews() {
  if (!db.initialized) {
    await db.initialize();
  }
  async function addNews(data, newsLangs) {
    'use server';
    let message = '';
    let id;
    try {
      id = await funcNews.addANews(data, newsLangs);
      message = 1;
    } catch (error) {
      message = `Fail to add a news, try again or inform your admin: ${error.message}`;
    }
    console.log('id:', id);
    if (id) {
      redirect(`/admin/news/edit/${id}?message=${message}`);
    }

    return message;
  }
  const cate = await funcNews.getCategories(process.env.DEFAULT_LANGUAGE);
  const tags = await funcNews.getTags(process.env.DEFAULT_LANGUAGE);
  const langTable = await funcNews.getLanguages();
  return (
    <div className="">
      <h1>Add new News</h1>
      <NewsForm cate={JSON.stringify(cate)}
        tags={JSON.stringify(tags)}
        langTable={JSON.stringify(langTable)}
        {...{ addNews }}
      />
    </div>
  );
}
export default AddNews;
