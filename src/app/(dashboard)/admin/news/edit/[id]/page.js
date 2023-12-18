import { newsImgs } from "@/library/newsImgs";
import { news } from "@/library/news";
import { redirect } from "next/navigation";
import { NewsForm } from "../../_components/NewsForm";
const myConstant = require('@/store/constant')
import getConfig from "next/config";
import { funcLogin } from "@/library/funcLogin";

export const dynamic = "force-dynamic";
async function EditNews({ params, searchParams }) {
  const loginInfo = funcLogin.checkAuthentication();
  const isAuthorize = await funcLogin.checkAuthorize( loginInfo.user, 'news','edit' );

  async function dell(data, newsLangs, id) {
    "use server";
    await news.updateANews(data, newsLangs, id);
    redirect("/admin/news");
  }
  async function editNews(data, newsLangs, id) {
    "use server";
    try {
      await news.updateANews(data, newsLangs, id);
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
      rs = await newsImgs.addImage(data);
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
      let rs = await newsImgs.updateImage(data, url);
      console.log("🚀 ~ file: page.js:14 ~ updateImage ~ rs:", rs);
      result = rs;
    } catch (error) {
      console.log(error.message);
    }

    return result;
  }
  const data = await news.getNews(params.id);
  const mainImage = await newsImgs.getImage(data[0]?.image ?? "");
  const cate = await news.getCategories( myConstant.DEFAULT_LANGUAGE );
  const tags = await news.getTags(myConstant.DEFAULT_LANGUAGE);
  const langTable = await news.getLanguages();
  return (
    <div className="">
      Edit new
      <NewsForm
        data={JSON.stringify(data)}
        cate={JSON.stringify(cate)}
        tags={JSON.stringify(tags)}
        langTable={JSON.stringify(langTable)}
        mainImage={JSON.stringify(mainImage)}
        roles={ getConfig().serverRuntimeConfig.userRoles }
        user={ loginInfo.user }
        isAuthorize={ isAuthorize }
        {...{ dell, editNews, updateImage, addImage }}
      />
    </div>
  );
}
export default EditNews;
