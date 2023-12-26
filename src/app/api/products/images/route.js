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
    const files = formData.getAll("files");

    if (files.length === 0) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const uploadedImages = [];

    try {
        for (const file of files) {
            const buffer = Buffer.from(await file.arrayBuffer());
            let lastModifiedDate = new Date(file.lastModified);
            let nameFolderInCustom = convertISOToCustomFormat(
                lastModifiedDate.toISOString()
            );

            let filename = file.name.replaceAll(" ", "_");

            await doesFolderExist(`public/uploads/${nameFolderInCustom}`).then(
                async (exists) => {
                    if (!exists) {
                        console.log("Folder does not exist. Creating...");
                        await fsPromises.mkdir(`public/uploads/${nameFolderInCustom}`);
                    }
                }
            );

            const existingFiles = await fs.readdir(`public/uploads/${nameFolderInCustom}`);
            const isDuplicate = existingFiles.includes(filename);

            if (isDuplicate) {
                const temp = filename.split(".");
                filename = `${temp[0]}-${Date.now()}.${temp[1]}`;
            }

            await writeFile(
                path.join(process.cwd(), `public/uploads/${nameFolderInCustom}/${filename}`),
                buffer
            );

            uploadedImages.push({
                url: `/uploads/${nameFolderInCustom}/${filename}`,
                name: filename,
            });
        }

        return NextResponse.json({
            Message: "Success",
            status: 201,
            images: uploadedImages,
        });
    } catch (error) {
        console.log("Error occurred: ", error);
        return NextResponse.json({ Message: "Failed", status: 500 });
    }
}