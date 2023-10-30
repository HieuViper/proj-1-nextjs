import { getCategories } from "@/library/getArticles";
import { ArticleForm } from "../_components/ArticleForm";

const AddArticlePage = async () => {
  const cate = await getCategories();
  return (
    <div className="">
      Add new article
      <ArticleForm cate={cate} />
    </div>
  );
};

export default AddArticlePage;
