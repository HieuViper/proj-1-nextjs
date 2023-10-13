/* eslint-disable @next/next/no-async-client-component */

import { useRouter } from "next/navigation";
import NewsList from "@/components/NewsList";
import { getAllNews, deleteBulkNews, recoverNews, deleteNews, trashNews, getTotalNumOfNews } from '@/library/getNews';


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
  const orderby = searchParams?.orderby ?? "";
  const order = searchParams?.order ?? "";

  console.log("searchparams: ", searchParams);

  if(trash!=""){
    await trashNews(trash);
  }
  if(keys!="") {
    await deleteBulkNews(keys);
  }
  if(recover!="") {
    await recoverNews(recover);
  }
  if(del!="") {
    await deleteNews(del);
  }

  const newsData = await getAllNews(process.env.POST_TYPE_NEWS, status, page, size, search, orderby, order);
  const total = await getTotalNumOfNews(process.env.POST_TYPE_NEWS, status, search);
  const pagination = {
    pageSize: size,
    total: total.total,
    current:page,
  }

  //console.log("data from getNews:", newsData);
  return (
    <>
      <NewsList dataTable={ JSON.stringify(newsData)} pagination={ pagination }/>;
    </>
  );
}

export default NewsPage;
