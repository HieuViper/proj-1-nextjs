import { callNon } from "@/library/api";
import axios from "axios";
import { promises as fsPromises } from "fs";
import sharp from "sharp";
import ImageList from "./_components/ImageList";
import { myConstant } from "@/store/constant";
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

  //const imageData = await callNon("/api/images", "GET");
  // async function addImage(data) {
  //   "use server";
  //   try {
  //     try {
  //       const rs = await callNon("/api/images", "POST", { data: data });
  //       return { message: 1, data: rs.data };
  //     } catch (error) {
  //       throw new Error(
  //         `Fail to add Languages, try again or inform your admin: ${error.message}`
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }
  // async function updateImage(data, id) {
  //   "use server";
  //   try {
  //     const rs = await callNon(`/api/images/${id}`, "PUT", { data: data });
  //     return { message: 1, data: rs.data };
  //   } catch (error) {
  //     throw new Error(
  //       `Fail to update Languages, try again or inform your admin: ${error.message}`
  //     );
  //   }
  // }
  // async function dellImage(id) {
  //   "use server";
  //   try {
  //     const rs = await callNon(`/api/images/${id}`, "DELETE");
  //     return { message: 1, data: rs.data };
  //   } catch (error) {
  //     throw new Error(
  //       `Fail to update Languages, try again or inform your admin: ${error.message}`
  //     );
  //   }
  // }

  // Func to get Information of Image By URL provided
  async function getInfoImage(imageUrl) {
    "use server";
    console.log("🚀 ~ file: page.js:50 ~ getInfoImage ~ imageUrl:", imageUrl);
    let result;
    try {

      const buffer = await fsPromises.readFile(`public${imageUrl}`)
      // Use Sharp to get image information
      const metadata = await sharp(buffer).metadata();

      // Get file creation time using the fs module
      const stats = await fsPromises.stat(
        `public${imageUrl}`
      );
      const creationTime = stats.ctime;
      const dateObj = new Date(creationTime.toString() );
      const imageInfo = {
        creationTime: `${dateObj.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })} ${dateObj.toLocaleTimeString("en-US", { hour12: false })}`, // convert isostring to date time format dd/mm/yyyy hh:mm:ss
        fileName: imageUrl.split("/").pop(),
        fileType: metadata.format,
        dimensions: {
          width: metadata.width,
          height: metadata.height,
        },
        size: Math.floor(buffer.length / 1024), // File size in kb
      };
      console.log(
        "🚀 ~ file: page.js:67 ~ getInfoImage ~ imageInfo:",
        imageInfo
      );
      result = imageInfo;
    } catch (error) {
      console.error("Error:", error.message);
    }
    return result;
  }

  return (
    <div>
      <ImageList
        data={JSON.stringify(result.images)}
        pagination={result.pagination}
        totals={result.totals}
        user={ loginInfo.user }
        roles={ getConfig().serverRuntimeConfig.userRoles }
        isAuthorize={ isAuthorize }
        {...{ getInfoImage }}
      />
    </div>
  );
};

export default ImagePage;
