import { promises as fsPromises } from "fs";
import fs, { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

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

export async function POST(req, res) {
  const formData = await req.formData();
  const file = formData.get("file");
  let lastModifiedDate = new Date(file.lastModified); //get modified date
  let nameFolderInCustom = convertISOToCustomFormat(
    //get name folder in format like 'jan2023'
    lastModifiedDate.toISOString()
  );

  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  } else {
    const buffer = Buffer.from(await file.arrayBuffer());
    let filename = file.name.replaceAll(" ", "_");

    try {
      await doesFolderExist(`public/uploads/${nameFolderInCustom}`).then(
        async (exists) => {
          if (exists) {
            console.log("Folder exists!");
          } else {
            console.log("Folder does not exist.");
            await fsPromises.mkdir(`public/uploads/${nameFolderInCustom}`);
          }
        }
      );

      // Check if the filename is already present in the folder
      const files = await fs.readdir(`public/uploads/${nameFolderInCustom}`);
      const isDuplicate = files.includes(filename);

      // if duplicate then change filename to unique
      if (isDuplicate == true) {
        const temp = filename.split(".");
        filename = temp[0] + "-" + Date.now().toString() + "." + temp[1];
      }
      console.log("filenaem", filename);

      await writeFile(
        path.join(
          process.cwd(),
          `public/uploads/${nameFolderInCustom}/` + filename
        ),
        buffer
      );
      return NextResponse.json({
        Message: "Success",
        status: 201,
        url: `/uploads/${nameFolderInCustom}/` + filename,
      });
    } catch (error) {
      console.log("Error occured ", error);
      return NextResponse.json({ Message: "Failed", status: 500 });
    }
  }
}
