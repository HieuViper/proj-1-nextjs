import ImageList from "./_components/ImageList";
const myConstant = require('@/store/constant')
import { newsImgs } from "@/library/newsImgs";
import { funcLogin } from "@/library/funcLogin";
import getConfig from "next/config";

// This part is important!
export const dynamic = "force-dynamic";

const ImagePage = async () => {
  const loginInfo = funcLogin.checkAuthentication();
  const isAuthorize = await funcLogin.checkAuthorize(loginInfo.user, 'news_imgs');

  const result = await newsImgs.imageList(loginInfo);
  if ( result.error )
    throw new Error( 'Error: ' + result.msg );


  return (
    <div>
      <ImageList
        data={JSON.stringify(result.images)}
        pagination={result.pagination}
        totals={result.totals}
        user={ loginInfo.user }
        roles={ getConfig().serverRuntimeConfig.userRoles }
        isAuthorize={ isAuthorize }
      />
    </div>
  );
};

export default ImagePage;
