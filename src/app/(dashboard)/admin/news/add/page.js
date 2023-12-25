
import { news } from "@/library/news";
import { redirect } from "next/navigation";
import { NewsForm } from "../_components/NewsForm";
const myConstant = require('@/store/constant')
import getConfig from "next/config";
import { funcLogin } from "@/library/funcLogin";
import { users } from "@/library/users";
import { languages } from "@/library/languages";

export const dynamic = "force-dynamic";

async function AddNews() {
  const loginInfo = funcLogin.checkAuthentication();
  const isAuthorize = await funcLogin.checkAuthorize( loginInfo.user, 'news','add' );


  const cate = await news.getCategories(myConstant.DEFAULT_LANGUAGE);
  const tags = await news.getTags(myConstant.DEFAULT_LANGUAGE);
  const langTable = await languages.getLanguages();
  const authors = await users.getAllUsers();
  return (
    <div className="">
      <h1 className="text-2xl">Add new News</h1>
      <NewsForm
        cate={JSON.stringify(cate)}
        tags={JSON.stringify(tags)}
        langTable={JSON.stringify(langTable)}
        authors = {JSON.stringify( authors )}
        roles={ getConfig().serverRuntimeConfig.userRoles }
        user={ loginInfo.user }
        isAuthorize={ isAuthorize }
      />
    </div>
  );
}
export default AddNews;
