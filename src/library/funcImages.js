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


// Function to check if a folder exists
const doesFolderExist = async (folderPath) => {
  console.log(folderPath);
  try {
    // Use 'access' method to check if the folder exists
    await fsPromises.access(folderPath);

    // If 'access' is successful, the folder exists
    return true;
  } catch (error) {
    // If 'access' throws an error, the folder does not exist
    return false;
  }
};

// Function to convert from isostring to custom name like 'jan2023'
function convertISOToCustomFormat(isoString) {
  // Parse the ISO string and create a Date object
  const date = new Date(isoString);

  // Get the month and year from the Date object
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  // Combine the month and year in the desired format
  const result = month.toLowerCase() + year;

  return result;
}

//save image to folder and return image URL
export async function saveImage( imageFile ) {
  if ( !imageFile )
    throw new Error('No image file to save');

  let lastModifiedDate = new Date(imageFile.lastModified); //get modified date
  let nameFolderInCustom = convertISOToCustomFormat(
    //get name folder in format like 'jan2023'
    lastModifiedDate.toISOString()
  );

  //replace space in file name by '_'
  const buffer = Buffer.from(await imageFile.arrayBuffer());
  let filename = imageFile.name.replaceAll(" ", "_");

  try {
    // check folder exist
    await doesFolderExist(`public/${process.env.FOLDER_UPLOAD}/${nameFolderInCustom}`).then(
      async (exists) => {
        if (exists) {   //no need
          // console.log("Folder exists!");
          // const temp = filename.split(".");
          // filename = temp[0] + "-" + Date.now().toString() + "." + temp[1]; //no need, it is duplicate the below step at row 73
        } else {
          console.log("Folder does not exist.");
          await fsPromises.mkdir(`public/${process.env.FOLDER_UPLOAD}/${nameFolderInCustom}`);
        }
      }
    );

    // Check if the filename is already present in the folder
    const files = await fs.readdir(`public/${process.env.FOLDER_UPLOAD}/${nameFolderInCustom}`);
    const isDuplicate = files.includes(filename);

    // if duplicate then change filename to unique
    if (isDuplicate == true) {
      const temp = filename.split(".");
      filename = temp[0] + "-" + Date.now().toString() + "." + temp[1];
    }

    await writeFile(
      path.join(
        process.cwd(),
        `public/${process.env.FOLDER_UPLOAD}/${nameFolderInCustom}/` + filename
      ),
      buffer
    );
    return `/uploads/${nameFolderInCustom}/` + filename;
  } catch (error) {
    throw new Error( 'Cannot save image file:' + error.message );
  }
}