import { callNon } from "@/library/api";
import axios from "axios";
import { promises as fsPromises } from "fs";
import sharp from "sharp";
import ImageList from "./_components/ImageList";
const myConstant = require('@/store/constant')
import { funcImage } from "@/library/funcImages";
import { funcLogin } from "@/library/funcLogin";
import getConfig from "next/config";

// This part is important!
export const dynamic = "force-dynamic";

const ImagePage = async () => {
  const loginInfo = funcLogin.checkAuthentication();
  const isAuthorize = await funcLogin.checkAuthorize(loginInfo.user, 'news');

  const result = await funcImage.imageList(loginInfo);
  if ( result.error )
    //console.log('Error from funcNews.newsList:', result.msg );
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
