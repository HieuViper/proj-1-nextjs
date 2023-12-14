import { promises as fsPromises } from "fs";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import { newsImgs } from "@/library/newsImgs";
import { funcLogin } from "@/library/funcLogin";



export async function POST(req, res) {
  //Check for security
  const { reqStatus, loginInfo } = await funcLogin.checkForProtectedApi('users', 'add');
  if ( reqStatus != 200 )
      return NextResponse.json({} , { status: reqStatus });

  //get uploading image
  let file;
  try{
    const formData = await req.formData();
    file = formData.get("file");
    if (!file)
      throw new Error('No uploaded image');
  }
  catch( error ) {
    return NextResponse.json( { msg: error.message }, { status: 400 });
  }

  try {
      //save image to database
      let imgUrl = await newsImgs.saveImage(file);

      return NextResponse.json({
        url: imgUrl,
        url150:`/uploads/nov2023/ava11_150.jpeg`,
        url350: `/uploads/nov2023/ava11_350.jpeg`,
        // url350:
        //   `/uploads/${nameFolderInCustom}/` +
        //   filenameWithoutExt +
        //   "_350." +
        //   extfile,
        url700:`/uploads/nov2023/ava11_700.jpeg` ,
      }, {status: 201});

    } catch (error) {
      return NextResponse.json({ msg: error.message}, { status: 500 });
    }
  }

