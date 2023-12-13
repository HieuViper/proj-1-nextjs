import { funcImage } from "@/library/funcImages";
import { funcNews } from "@/library/funcNews";
import { redirect } from "next/navigation";
import { NewsForm } from "../../_components/NewsForm";
const myConstant = require('@/store/constant')

export const dynamic = "force-dynamic";
async function EditNews({ params, searchParams }) {
  async function dell(data, newsLangs, id) {
    "use server";
    await funcNews.updateANews(data, newsLangs, id);
    redirect("/admin/news");
  }
  async function editNews(data, newsLangs, id) {
    "use server";
    try {
      await funcNews.updateANews(data, newsLangs, id);
      return { message: 1 };
    } catch (error) {
      return {
        message: `Fail to update news, try again or inform your admin: ${error.message}`,
      };
    }
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
  async function updateImage(data, url) {
    "use server";
    let result;
    try {
      let rs = await funcImage.updateImage(data, url);
      console.log("🚀 ~ file: page.js:14 ~ updateImage ~ rs:", rs);
      result = rs;
    } catch (error) {
      console.log(error.message);
    }

    return result;
  }
  const data = await funcNews.getNews(params.id);
  const mainImage = await funcImage.getImage(data[0]?.image ?? "");
  const cate = await funcNews.getCategories( myConstant.DEFAULT_LANGUAGE );
  const tags = await funcNews.getTags(myConstant.DEFAULT_LANGUAGE);
  const langTable = await funcNews.getLanguages();
  return (
    <div className="">
      Edit new
      <NewsForm
        data={JSON.stringify(data)}
        cate={JSON.stringify(cate)}
        tags={JSON.stringify(tags)}
        langTable={JSON.stringify(langTable)}
        mainImage={JSON.stringify(mainImage)}
        {...{ dell, editNews, updateImage, addImage }}
      />
    </div>
  );
}
export default EditNews;
