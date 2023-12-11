/* eslint-disable @next/next/no-async-client-component */

import { callNon } from "@/library/api";
import {
  deleteArticle,
  deleteBulkArticle,
  recoverArticle,
  trashArticle,
} from "@/library/funcArticles";
import ArticleList from "./_components/ArticleList";
import { myConstant } from "@/store/constant";

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
  const size = searchParams?.size ?? myConstant.post.PAGE_SIZE;
  let orderby = searchParams?.orderby ?? "";
  let order = searchParams?.order ?? "";
  const author = searchParams?.author ?? "";
  const category = searchParams?.category ?? "";
  const tag = searchParams?.tag ?? "";
  const lang = searchParams?.lang ?? myConstant.DEFAULT_LANGUAGE;

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

  const { data: articleData, totals } = await callNon(
    `/api/articles?post_status=${status}&page=${page}&size=${size}&search=${search}&orderby=${orderby}&order=${order}&author=${author}&category=${category}&tag=${tag}&lang=${lang}`,
    "GET"
  );
  // const articleData = await getAllArticle(
  //   status,
  //   page,
  //   size,
  //   search,
  //   orderby,
  //   order,
  //   author,
  //   category,
  //   tag,
  //   lang
  // );
  // const totals = await getTotalNumOfarticle(
  //   status,
  //   search,
  //   author,
  //   category,
  //   tag,
  //   lang
  // );
  const pagination = {
    pageSize: parseInt(size),
    total: totals.itemsOfTable,
    current: parseInt(page),
  };

  const langTable = await callNon("/api/languages", "GET");

  return (
    <>
      <ArticleList
        langTable={JSON.stringify(langTable.data)}
        dataTable={JSON.stringify(articleData)}
        pagination={JSON.stringify(pagination)}
        totals={JSON.stringify(totals)}
      />
      ;
    </>
  );
}

export default ArticlePage;
