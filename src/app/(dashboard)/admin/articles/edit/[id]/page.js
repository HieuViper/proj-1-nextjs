import { getArticle } from "@/library/getArticles";
import { ArticleForm } from "../../_components/ArticleForm";

export const dynamic = "force-dynamic";
const EditArticlePage = async ({ params, searchParams }) => {
  console.log("searchParams :", searchParams);
  const data = await getArticle(params.id);
  const cate = await getCategories();
  return (
    <div className="">
      Edit new
      <ArticleForm data={data} cate={cate} />
    </div>
  );
};

export default EditArticlePage;
