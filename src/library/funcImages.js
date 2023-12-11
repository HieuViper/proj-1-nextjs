import { db } from "@/config/db";
import { myConstant } from "@/store/constant";
// import fs from "fs";
import { promises as fsPromises } from "fs";
import fs, { writeFile } from "fs/promises";
import path from "path";
import { QueryTypes } from "sequelize";
import { funcLogin } from "./funcLogin";

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

    const results = await db.seq.query(sqlquery, { type: QueryTypes.SELECT });

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
    let results = await db.seq.query(sqlquery, { type: QueryTypes.SELECT });
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
  const t = await db.seq.transaction();
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


//save image to folder and return image URL
export async function saveImage( imageFile ) {
  if ( !imageFile )
    throw new Error('No image file to save');

    //get Folder's Name to save the image
  let folderName = getFolderName( imageFile );
  let folderPath = `public/${myConstant.image.FOLDER_UPLOAD}/${folderName}`;
  let fileName = imageFile.name.replaceAll(" ", "_");     //replace space in file name by '_'
  try {
    // check folder, if it doesn't exit, create new folder
    await checkAndCreateFolder( folderPath );

    // Check if the filename is already present in the folder, if it already exit, change to new filename
    fileName = await checkAndCreateFileName( fileName, folderPath );

    const buffer = Buffer.from(await imageFile.arrayBuffer());

    await fsPromises.writeFile(
      path.join(
        process.cwd(),
        `public/${myConstant.image.FOLDER_UPLOAD}/${folderName}/` + fileName
      ),
      buffer
    );
    return `/${myConstant.image.FOLDER_UPLOAD}/${folderName}/` + fileName;
  } catch (error) {
    throw new Error( 'Cannot save image file:' + error.message );
  }
}