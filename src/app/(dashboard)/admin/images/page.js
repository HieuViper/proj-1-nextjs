import { funcImage } from "@/library/funcImages";
import axios from "axios";
import { promises as fsPromises } from "fs";
import sharp from "sharp";
import ImageList from "./_components/ImageList";

// This part is important!
export const dynamic = "force-dynamic";

const ImagePage = async () => {
  const imageData = await funcImage.getImages();
  async function addImage(data) {
    "use server";
    let result;
    try {
      await funcImage.addImage(data);
      let newData = await funcImage.getImages();
      result = newData;
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
      let newData = await funcImage.getImages();
      console.log("🚀 ~ file: page.js:14 ~ updateImage ~ rs:", rs);
      result = newData;
    } catch (error) {
      console.log(error.message);
    }

    return result;
  }
  async function dellImage(url) {
    "use server";
    let result;
    try {
      let rs = await funcImage.dellImage(url);
      let newData = await funcImage.getImages();
      result = newData;
    } catch (error) {
      console.log(error.message);
    }

    return result;
  }

  // Func to get Information of Image By URL provided
  async function getInfoImage(imageUrl) {
    "use server";
    console.log("🚀 ~ file: page.js:50 ~ getInfoImage ~ imageUrl:", imageUrl);
    let result;
    try {
      // Fetch image data using Axios
      const response = await axios.get(process.env.HOSTNAME + imageUrl, {
        responseType: "arraybuffer",
      });
      const buffer = Buffer.from(response.data);

      // Use Sharp to get image information
      const metadata = await sharp(buffer).metadata();

      // Get file creation time using the fs module
      const stats = await fsPromises.stat(
        "public/" + imageUrl.substring(1, imageUrl.length)
      );
      const creationTime = stats.ctime;
      const dateObj = new Date(creationTime.toString());
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
        data={JSON.stringify(imageData)}
        {...{ updateImage, dellImage, addImage, getInfoImage }}
      />
    </div>
  );
};

export default ImagePage;
