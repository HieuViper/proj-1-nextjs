/* eslint-disable @next/next/no-async-client-component */

import {
  deleteArticle,
  deleteBulkArticle,
  getAllArticle,
  getTotalNumOfarticle,
  recoverArticle,
  trashArticle,
} from "@/library/funcArticles";
import ArticleList from "./_components/ArticleList";

// This part is important!
export const dynamic = "force-dynamic";

async function ArticlePage({ searchParams }) {
  // if (!db.initialized) {
  //   await db.initialize();
  // }
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

  console.log("searchparams: ", searchParams);

  if (trash != "") {
    await trashArticle(trash);
  }
  if (keys != "") {
    await deleteBulkArticle(keys, status);
  }
  if (recover != "") {
    await recoverArticle(recover);
  }
  if (del != "") {
    await deleteArticle(del);
  }
  if (Object.keys(searchParams).length == 0) {
    orderby = "post_modified";
    order = "desc";
  }

  const articleData = await getAllArticle(
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
  const totals = await getTotalNumOfarticle(
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

  return (
    <>
      <ArticleList
        dataTable={JSON.stringify(articleData)}
        pagination={JSON.stringify(pagination)}
        totals={JSON.stringify(totals)}
      />
      ;
    </>
  );
}

export default ArticlePage;
