import { newsImgs } from "@/library/newsImgs";
import { news } from "@/library/news";
import { redirect } from "next/navigation";
import { NewsForm } from "../../_components/NewsForm";
const myConstant = require('@/store/constant')
import getConfig from "next/config";
import { funcLogin } from "@/library/funcLogin";
import { users } from "@/library/users";
import { languages } from "@/library/languages";

export const dynamic = "force-dynamic";
async function EditNews({ params, searchParams }) {
  const loginInfo = funcLogin.checkAuthentication();
  const isAuthorize = await funcLogin.checkAuthorize( loginInfo.user, 'news','edit' );

  const data = await news.getNews(params.id);
  const mainImage = await newsImgs.getImage(data[0]?.image ?? "");
  const cate = await news.getCategories( myConstant.DEFAULT_LANGUAGE );
  const tags = await news.getTags(myConstant.DEFAULT_LANGUAGE);
  const langTable = await languages.getLanguages();
  const authors = await users.getAllUsers();
  return (
    <div className="">
      Edit new
      <NewsForm
        data={JSON.stringify(data)}
        cate={JSON.stringify(cate)}
        tags={JSON.stringify(tags)}
        langTable={JSON.stringify(langTable)}
        mainImage={JSON.stringify(mainImage)}
        authors = {JSON.stringify( authors )}
        roles={ getConfig().serverRuntimeConfig.userRoles }
        user={ loginInfo.user }
        isAuthorize={ isAuthorize }
      />
    </div>
  );
}
export default EditNews;
