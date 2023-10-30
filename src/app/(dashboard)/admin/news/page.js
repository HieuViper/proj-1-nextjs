/* eslint-disable @next/next/no-async-client-component */

import NewsList from "@/components/NewsList";
import { newsModel } from "@/library/getNews";

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
  const lang = searchParams?.lang ?? process.env.DEFAULT_LANGUAGE;

  // console.log('searchparams: ', searchParams);

  if (trash != "") {
    await newsModel.trashNews(trash);
  }
  if (keys != "") {
    await newsModel.deleteBulkNews(keys, status);
  }
  if (recover != "") {
    await newsModel.recoverNews(recover);
  }
  if (del != "") {
    await newsModel.deleteNews(del);
  }
  if (Object.keys(searchParams).length == 0) {
    orderby = "post_modified";
    order = "desc";
  }

  const newsData = await newsModel.getAllNews(
    status,
    page,
    size,
    search,
    orderby,
    order,
    author,
    category,
    tag,
    lang
  );
  const totals = await newsModel.getTotalNumOfNews(
    status,
    search,
    author,
    category,
    tag,
    lang
  );
  const pagination = {
    pageSize: parseInt(size),
    total: totals.itemsOfTable,
    current: parseInt(page),
  };
  const langTable = await newsModel.getLanguages();
  return (
    <>
      <NewsList
        dataTable={JSON.stringify(newsData)}
        pagination={pagination}
        totals={totals}
        langTable={JSON.stringify(langTable)}
      />
      ;
    </>
  );
}

export default NewsPage;
