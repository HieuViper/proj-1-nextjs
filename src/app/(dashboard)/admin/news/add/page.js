import { funcImage } from "@/library/funcImages";
import { funcNews } from "@/library/funcNews";
import { redirect } from "next/navigation";
import { NewsForm } from "../_components/NewsForm";
import { myConstant } from "@/store/constant";

export const dynamic = "force-dynamic";

async function AddNews() {
  async function addNews(data, newsLangs) {
    "use server";
    let message = "";
    let id;
    try {
      id = await funcNews.addANews(data, newsLangs);
      message = 1;
    } catch (error) {
      message = `Fail to add a news, try again or inform your admin: ${error.message}`;
    }
    if (id) {
      redirect(`/admin/news/edit/${id}?message=${message}`);
    }

    return message;
  }
  async function addImage(data) {
    "use server";
    let result;
    try {
      rs = await funcImage.addImage(data);
      console.log("🚀 ~ file: page.js:14 ~ addArticle ~ rs:", rs);
      result = rs;
    } catch (error) {
      console.log(error.message);
    }

    return result;
  }
  const cate = await funcNews.getCategories(myConstant.DEFAULT_LANGUAGE);
  const tags = await funcNews.getTags(myConstant.DEFAULT_LANGUAGE);
  const langTable = await funcNews.getLanguages();
  return (
    <div className="">
      <h1 className="text-2xl">Add new News</h1>
      <NewsForm
        cate={JSON.stringify(cate)}
        tags={JSON.stringify(tags)}
        langTable={JSON.stringify(langTable)}
        {...{ addNews, addImage }}
      />
    </div>
  );
}
export default AddNews;
