const db = require("@/app/models");
const myConstant = require('@/store/constant')
// import fs from "fs";
import { promises as fsPromises } from "fs";
import fs, { writeFile } from "fs/promises";
import path from "path";
import { QueryTypes } from "sequelize";
import { funcLogin } from "./funcLogin";
import sharp from "sharp";
import imageCompression from "browser-image-compression";


export const funcImage = {
  getImage,
  getAllImages,
  getTotalNumOfImg,
  updateImage,
  updateImgById,
  addImage,
  dellImage,
  deleteImg,
  saveImage,
  imageList,
  getMetaImgInfo,
};

function getSearchQuery(search) {
  return search == ""
    ? ""
    : `WHERE ( url LIKE '%${search}%' OR alt LIKE '%${search}%' OR caption LIKE '%${search}%' OR author LIKE '%${search}%')`;
}

export async function getAllImages( page, size, search ) {
  try {
    const fromNews = (page - 1) * size; //determine the beginning news
    const searchQuery = getSearchQuery(search);
    const orderQuery = `ORDER BY updatedAt DESC`;

    let sqlquery = `SELECT * FROM imgs ${searchQuery} ${orderQuery} LIMIT ${fromNews}, ${size}`;

    const results = await db.sequelize.query(sqlquery, { type: QueryTypes.SELECT });

    return results;
  } catch (error) {
    throw new Error("Fail to get images from database: " + error.message);
  }
}

//get total item of news
export async function getTotalNumOfImg( search ) {
  let totals = {
    itemsOfTable: 0,
  };

  try {
    //get total number of news in the return news table
    const searchQuery = getSearchQuery(search);

    let sqlquery = `SELECT count(*) AS total FROM imgs ${searchQuery}`;
    let results = await db.sequelize.query(sqlquery, { type: QueryTypes.SELECT });
    totals.itemsOfTable = results[0].total;
  } catch ( error ) {
    throw new Error("Cannot get items Of Table:" + error.message);
  }
  return totals;
}

//handle proccesses of images list route
//parameter: loginInfo: contain logging information of user, include the role to check authorization
//           searchParams: contain the query from URL of the request
export async function imageList( loginInfo, searchParams ) {

  const del = searchParams?.get('del') ?? "";
  const search = searchParams?.get('search') ?? "";
  const page = searchParams?.get('page') ?? 1;
  const size = searchParams?.get('size') ?? myConstant.post.PAGE_SIZE;

  let result = {
    error: null,
    msg: null,
    images: null,
    pagination: null,
    totals: null,
  }

  try {
      //Check for deleting
      if( del != '' ) {
        let isAuthorize = await funcLogin.checkAuthorize( loginInfo.user, 'images', 'delete');
        if ( isAuthorize == false ) {
            result.error = 403;
            return result;
        }
        await funcImage.deleteImg(del);
      }

      result.images = await funcImage.getAllImages( page, size, search );
      result.totals = await funcImage.getTotalNumOfImg( search );
      result.pagination = {
        pageSize: parseInt(size),
        total: result.totals.itemsOfTable,
        current: parseInt(page),
      };
      return result;
  }
  catch( error ) {
    result.error = 500;
    result.msg = error.message;
    return result;
  }
}

//Get Image Info
export async function getMetaImgInfo( imageUrl ) {
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

    return imageInfo;
  } catch (error) {
    throw new Error ('Cannot get metadata of image:' + error.message);
  }

}


async function getImage(url) {
  try {
    const result = await db.Imgs.findOne({
      where: {
        url: url,
      },
    });
    return result;
  } catch (error) {
    throw new Error("Fail to get img:" + error.message);
  }
}

async function addImage(data) {
  try {
    const result = await db.Imgs.create(data);
    return result;
  } catch (error) {
    throw new Error("Cannot create img:" + error.message);
  }
}


//Update image by id
async function updateImgById(data, id) {
  try {
    const result = await db.Imgs.update(data, {
      where: {
        id: id,
      },
    });
    return result;
  } catch (error) {
    throw new Error("Cannot update img:" + error.message);
  }
}

//Update image by URL
async function updateImage(data, url) {
  try {
    const result = await db.Imgs.update(data, {
      where: {
        url: url,
      },
    });
    return result;
  } catch (error) {
    throw new Error("Cannot update img:" + error.message);
  }
}

// Delete image by image id
async function deleteImg( id ) {
  try {
    const img = await db.Imgs.findByPk( id )
    await dellImage( img.url );
  }
  catch( error ) {
    throw new Error ( 'Cannot delete image:' + error.message );
  }
}

//this function doesn't not update table products yet, return to this function after working
//with the table products
async function dellImage(url) {
  const t = await db.sequelize.transaction();
  try {
    //Update table Articles
    await db.Articles.update(
      { image: null },
      {
        where: {
          image: url,
        },
        transaction: t,
      }
    );
    //update table News
    await db.News.update(
      { image: null },
      {
        where: {
          image: url,
        },
        transaction: t,
      }
    );
    //update table Users
    await db.Users.update(
      { image: null },
      {
        where: {
          image: url,
        },
        transaction: t,
      }
    );

    await db.Imgs.destroy({
      where: {
        url: url,
      },
      transaction: t,
    });

    console.log(url.substring(1, url.length));
    // Delete file in folder upload by URL
    fs.unlink("public/" + url.substring(1, url.length), (err) => {
      if (err) console.log(err);
        throw new Error( err );
    });


    t.commit();
  } catch (error) {
    t.rollback();
    console.log(error);
    throw new Error("Cannot delete image:" + error.message);
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

    return `/${myConstant.image.FOLDER_UPLOAD}/${folderName}/` + fileName;
  }
  catch ( error ) {
    throw new Error('Cannot save a specific Image:' + error.message);
  }
}

//save image to folder and return image URL
export async function saveImage( imageFile ) {
  if ( !imageFile )
    throw new Error('No image file to save');

    //get Folder's Name to save the image
  let folderName = getFolderName( imageFile );
  let folderPath = `public/${myConstant.image.FOLDER_UPLOAD}/${folderName}`;
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
    console.log('before create imgBuffer');
    let imgBuffer = Buffer.from( await imageFile.arrayBuffer() );
    console.log('aftere create imgBuffer');
    result.url = await saveSpecificImage( imgBuffer, fileName, folderPath, folderName );

    //all the file dimension need to be saved
    const fileSizeCompress = [150, 350, 700];
    // Compression options
    const compressionOptions = {
      quality: 70,
      chromaSubsampling: '4:4:4',
    };

    // Resize options
    const resizeOptions = {
      width: 150, // Set the desired width
      withoutEnlargement: true, // Prevent enlarging the image if it's smaller than the specified dimensions
    };
    for (let i = 0; i < fileSizeCompress.length; i++) {
      //Create new file from compression
      let subFileName = `${fileName[0]}_${fileSizeCompress[i]}.${fileName[1]}`;
      //config resize dimension
      resizeOptions.width = fileSizeCompress[i]; //define width of the image
      //resize file
      console.log('come here before sharp resize');
      const sharpResize = sharp( imgBuffer ).resize( resizeOptions );

      let subFile;
      switch ( fileType ) {
        case "image/jpeg":
          console.log('inside switch');
          sharpResize.jpeg( compressionOptions ).toBuffer( (err, outputBuffer) => {
            if( err ) {
              throw new Error('Coundnt compress file jpeg');
            }
            subFile = outputBuffer;
          } );
          break;
        case  "image/jpg" :
          sharpResize.jpeg( compressionOptions ).toBuffer( (err, outputBuffer) => {
            if( err ) {
              throw new Error('Coundnt compress file jpg');
            }
            subFile = outputBuffer;
          } );
          break;
        case "image/png":
          sharpResize.png( compressionOptions ).toBuffer( (err, outputBuffer) => {
            if( err ) {
              throw new Error('Coundnt compress file png');
            }
            subFile = outputBuffer;
          } );
          break;
        case "image/gif":
          sharpResize.gif( compressionOptions ).toBuffer( (err, outputBuffer) => {
            if( err ) {
              throw new Error('Coundnt compress file gif');
            }
            subFile = outputBuffer;
          } );
          break;
        case "image/webp":
          sharpResize.webp( compressionOptions ).toBuffer( (err, outputBuffer) => {
            if( err ) {
              throw new Error('Coundnt compress file webp');
            }
            subFile = outputBuffer;
          } );
          break;
        case "image/tiff":
          sharpResize.tiff( compressionOptions ).toBuffer( (err, outputBuffer) => {
            if( err ) {
              throw new Error('Coundnt compress file tiff');
            }
            subFile = outputBuffer;
          } );
          break;
        default:
          throw new Error('This image type is not supported');

      }

      // save sub file to the disk
      let subUrl = await saveSpecificImage( subFile, subFileName, folderPath, folderName );
      let buildSrcSet;
      if( i == 0 ) {
        buildSrcSet = subUrl + ` ${fileSizeCompress[i]}w`;
      }
      else {
        buildSrcSet = ', ' + subUrl + ` ${fileSizeCompress[i]}w`;
      }
      result.srcset += buildSrcSet;
      console.log('srcset:', result.srcset);

    }
    return result;
  } catch (error) {
    throw new Error( 'Cannot save image file:' + error.message );
  }
}