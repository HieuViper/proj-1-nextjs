const db = require("@/app/models");
const myConstant = require('@/store/constant')
// import fs from "fs";
import { promises as fsPromises } from "fs";
import path from "path";
import sharp from "sharp";

export const img = {
  saveImage,
  getMetaImgInfo,
};


//Get Image Info
export async function getMetaImgInfo( imageUrl ) {
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

    return imageInfo;
  } catch (error) {
    throw new Error ('Cannot get metadata of image:' + error.message);
  }

}

// Function to check to make sure the folder exists, if not , make the folder
const checkAndCreateFolder = async ( folderPath ) => {
  console.log(folderPath);
  try {
    // Use 'access' method to check if the folder exists
    await fsPromises.access( folderPath );
  } catch (error) {
    // If 'access' throws an error, the folder does not exist
    await fsPromises.mkdir( folderPath );
  }
};

// Function to convert from isostring to custom name like 'jan2023'
function getFolderName( imageFile ) {

  let imageDate = new Date(imageFile.lastModified); //get modified date
  // Get the month and year from the Date object
  const month = imageDate.toLocaleString("en-US", { month: "short" });
  const year = imageDate.getFullYear();

  // Combine the month and year in the desired format
  const folderName = month.toLowerCase() + year;
  return folderName;
}

async function checkAndCreateFileName( fileName, folderPath ) {
  const fileList = await fsPromises.readdir( folderPath );
  const isDuplicate = fileList.includes( fileName );

  // if duplicate then change filename to unique
  if (isDuplicate == true) {
    const temp = fileName.split(".");
    fileName = temp[0] + "-" + Date.now().toString() + "." + temp[1];
  }
  return fileName;
}

//save one image on the specific foler path and specific image name
async function saveSpecificImage( imageFileBuffer, name, folderPath, folderName ) {
  try {
    let fileName = await checkAndCreateFileName( name, folderPath );

    //const buffer = Buffer.from(await imageFile.arrayBuffer());

    await fsPromises.writeFile(
      path.join(
        process.cwd(),
        `${folderPath}/` + fileName
      ),
      imageFileBuffer
    );

    return { url: `${myConstant.news.image.FOLDER_UPLOAD}/${folderName}/` + fileName,
             fileName: fileName,
      };
  }
  catch ( error ) {
    throw new Error('Cannot save a specific Image:' + error.message);
  }
}

//Compress Image
//fileType: image type
// imgBuffer: Buffer
//resizeWidth: width of image after resizing
async function compressImage(fileType, imgBuffer, resizeWidth) {
  const compressionOptions = {
    quality: myConstant.news.image.QUALITY,
    chromaSubsampling: '4:4:4',
  };

  // Resize options
  const resizeOptions = {
    width: resizeWidth, // Set the desired width
    withoutEnlargement: true, // Prevent enlarging the image if it's smaller than the specified dimensions
  };

  return new Promise((resolve, reject) => {
    const sharpResize = sharp( imgBuffer ).resize( resizeOptions );
    switch (fileType) {
      case 'image/jpeg':
      case 'image/jpg':
        sharpResize.jpeg(compressionOptions).toBuffer((err, outputBuffer) => {
          if (err) {
            reject(new Error('Couldn\'t compress file jpeg'));
          } else {
            resolve(outputBuffer);
          }
        });
        break;
      case 'image/png':
        sharpResize.png(compressionOptions).toBuffer((err, outputBuffer) => {
          if (err) {
            reject(new Error('Couldn\'t compress file png'));
          } else {
            resolve(outputBuffer);
          }
        });
        break;
      case 'image/gif':
        sharpResize.gif(compressionOptions).toBuffer((err, outputBuffer) => {
          if (err) {
            reject(new Error('Couldn\'t compress file gif'));
          } else {
            resolve(outputBuffer);
          }
        });
        break;
      case 'image/webp':
        sharpResize.webp(compressionOptions).toBuffer((err, outputBuffer) => {
          if (err) {
            reject(new Error('Couldn\'t compress file webp'));
          } else {
            resolve(outputBuffer);
          }
        });
        break;
      case 'image/tiff':
        sharpResize.tiff(compressionOptions).toBuffer((err, outputBuffer) => {
          if (err) {
            reject(new Error('Couldn\'t compress file tiff'));
          } else {
            resolve(outputBuffer);
          }
        });
        break;
      default:
        reject(new Error('This image type is not supported'));
    }
  });
}

//save image to folder and return image URL
export async function saveImage( imageFile ) {
  if ( !imageFile )
    throw new Error('No image file to save');

    //get Folder's Name to save the image
  let folderName = getFolderName( imageFile );
  let folderPath = `public${myConstant.news.image.FOLDER_UPLOAD}/${folderName}`;
  let fileName = imageFile.name.replaceAll(" ", "_");     //replace space in file name by '_'
  let fileType = imageFile.type;
  console.log('fileType of image:', fileType );
  let result = {
    url: null,
    srcset: ''
  }
  try {
    // check folder, if it doesn't exit, create new folder
    await checkAndCreateFolder( folderPath );
    //save the origin image to the disk
    let imgBuffer = Buffer.from( await imageFile.arrayBuffer() );

    let savedImage = await saveSpecificImage( imgBuffer, fileName, folderPath, folderName );
    result.url = savedImage.url;
    //all the file dimension need to be saved
    const fileSizeCompress = [150, 350, 700];
    // Compression options

    for (let i = 0; i < fileSizeCompress.length; i++) {

      let fileNameArr = savedImage.fileName.split('.');
      //get file name of the subfile
      let subFileName = `${fileNameArr[0]}_${fileSizeCompress[i]}.${fileNameArr[1]}`;
      console.log( 'subFileName:', subFileName );
        //Create new file from compression
      const outputBuffer = await compressImage (fileType, imgBuffer, fileSizeCompress[i]);
      // save sub file to the disk
      let subSavedImg = await saveSpecificImage( outputBuffer, subFileName, folderPath, folderName );

      let buildSrcSet;
      if( i == 0 ) {
        buildSrcSet = subSavedImg.url + ` ${fileSizeCompress[i]}w`;
      }
      else {
        buildSrcSet = ', ' + subSavedImg.url + ` ${fileSizeCompress[i]}w`;
      }
      result.srcset += buildSrcSet;
      console.log('srcset:', result.srcset);

    }
    console.log('result after saving image:', result);
    return result;
  } catch (error) {
    throw new Error( 'Cannot save image file:' + error.message );
  }
}