import { db } from "@/config/db";
// import fs from "fs";
import { promises as fsPromises } from "fs";
import fs, { writeFile } from "fs/promises";
import path from "path";

export const funcImage = {
  getImage,
  getImages,
  updateImage,
  addImage,
  dellImage,
  saveImage,
};

async function getImages() {
  try {
    const result = await db.Imgs.findAll();
    return result;
  } catch (error) {
    throw new Error("Fail to get img:" + error.message);
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

//this function doesn't not update table users, products
async function dellImage(url) {
  try {
    await db.Articles.update(
      { image: null },
      {
        where: {
          image: url,
        },
      }
    );
    await db.News.update(
      { image: null },
      {
        where: {
          image: url,
        },
      }
    );
    // await db.Articles.update(
    //   { image: null },
    //   {
    //     where: {
    //       image: url,
    //     },
    //   }
    // );
    const result = await db.Imgs.destroy({
      where: {
        url: url,
      },
    });

    console.log(url.substring(1, url.length));
    // Delete file in folder upload by URL
    fs.unlink("public/" + url.substring(1, url.length), (err) => {
      if (err) console.log(err);
    });


    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Cannot update img:" + error.message);
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
  let folderPath = `public/${process.env.FOLDER_UPLOAD}/${folderName}`;
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
        `public/${process.env.FOLDER_UPLOAD}/${folderName}/` + fileName
      ),
      buffer
    );
    return `/${process.env.FOLDER_UPLOAD}/${folderName}/` + fileName;
  } catch (error) {
    throw new Error( 'Cannot save image file:' + error.message );
  }
}