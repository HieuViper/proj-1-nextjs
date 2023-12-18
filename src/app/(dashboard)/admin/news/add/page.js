import { newsImgs } from "@/library/newsImgs";
import { news } from "@/library/news";
import { redirect } from "next/navigation";
import { NewsForm } from "../_components/NewsForm";
const myConstant = require('@/store/constant')
import getConfig from "next/config";
import { funcLogin } from "@/library/funcLogin";

export const dynamic = "force-dynamic";

async function AddNews() {
  const loginInfo = funcLogin.checkAuthentication();
  const isAuthorize = await funcLogin.checkAuthorize( loginInfo.user, 'news','add' );

  async function addNews(data, newsLangs) {
    "use server";
    let message = "";
    let id;
    try {
      id = await news.addANews(data, newsLangs);
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
      rs = await newsImgs.addImage(data);
      console.log("🚀 ~ file: page.js:14 ~ addArticle ~ rs:", rs);
      result = rs;
    } catch (error) {
      console.log(error.message);
    }

    return result;
  }

  const cate = await news.getCategories(myConstant.DEFAULT_LANGUAGE);
  const tags = await news.getTags(myConstant.DEFAULT_LANGUAGE);
  const langTable = await news.getLanguages();
  return (
    <div className="">
      <h1 className="text-2xl">Add new News</h1>
      <NewsForm
        cate={JSON.stringify(cate)}
        tags={JSON.stringify(tags)}
        langTable={JSON.stringify(langTable)}
        roles={ getConfig().serverRuntimeConfig.userRoles }
        user={ loginInfo.user }
        isAuthorize={ isAuthorize }
        {...{ addNews, addImage }}
      />
    </div>
  );
}
export default AddNews;
