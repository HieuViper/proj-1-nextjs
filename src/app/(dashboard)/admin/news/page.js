/* eslint-disable @next/next/no-async-client-component */

import { useRouter } from "next/navigation";
import NewsList from "@/components/NewsList";
import { getAllNews, deleteBulkNews, recoverNews, deleteNews, trashNews, getTotalNumOfNews, getCategories } from '@/library/getNews';


// This part is important!
export const dynamic = "force-dynamic";

async function NewsPage({ searchParams }) {
  const trash = searchParams?.trash ?? "";
  const keys = searchParams?.keys ?? "";
  const recover = searchParams?.recover ?? "";
  const del = searchParams?.del ?? "";
  const status = searchParams?.status ?? "";
  const search = searchParams?.search ?? "";
  const page = searchParams?.page ?? 1;
  const size = searchParams?.size ?? process.env.PAGE_SIZE;
  let orderby = searchParams?.orderby ?? "";
  let order = searchParams?.order ?? "";
  const author = searchParams?.author ?? "";
  const category = searchParams?.category ?? "";
  const tag = searchParams?.tag ?? "";

  console.log("searchparams: ", searchParams);

  if (trash != "") {
    await trashNews(trash);
  }
  if (keys != "") {
    await deleteBulkNews(keys, status);
  }
  if (recover != "") {
    await recoverNews(recover);
  }
  if (del != "") {
    await deleteNews(del);
  }
  if (Object.keys(searchParams).length == 0) {
    orderby = 'post_modified';
    order = 'desc'
  }

  const newsData = await getAllNews(process.env.POST_TYPE_NEWS, status, page, size, search, orderby, order, author, category, tag);
  const totals = await getTotalNumOfNews(process.env.POST_TYPE_NEWS, status, search, author, category, tag);
  const pagination = {
    pageSize: parseInt(size),
    total: totals.itemsOfTable,
    current: parseInt(page),
  }
  const cate = await getCategories()
  //console.log("data from getNews:", newsData);

  return (
    <>
      <NewsList dataTable={JSON.stringify(newsData)} pagination={pagination} totals={totals} cate={cate} />;
    </>
  );
}

export default NewsPage;
