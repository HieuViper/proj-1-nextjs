import { NextResponse } from "next/server";
import { funcLogin } from "@/library/funcLogin";
import { funcUsers } from "@/library/funcUsers";
import { newsImgs } from "@/library/newsImgs";
import { img } from "@/library/img";
import fs from "fs/promises";

export const dynamic = 'force-dynamic' // defaults to force-static

export async function POST(req, { params }) {
    //Check for security
    const { reqStatus, loginInfo } = await funcLogin.checkForProtectedApi('users', 'edit');
    if ( reqStatus != 200 )
        return NextResponse.json({} , { status: reqStatus });

    let formData;
    let user;
    let imageInfo;
    let imageFile;
    try{
        formData = await req.formData();
        user = JSON.parse(formData.get('user'));
        imageInfo = JSON.parse(formData.get('imageInfo'));
        imageFile = formData.get('imageFile');
    } catch ( error ) {
        return NextResponse.json( { msg: error.message }, { status: 400 });
    }
    try {
        let imageUrl = null;
        //save image File
        if ( imageFile ) {
            imageUrl = await img.saveImage( imageFile, false );
            console.log('saving image successfully');

            user.image = imageUrl.url;  //set image for user
            user.image_alt = imageInfo.alt;
            user.image_caption = imageInfo.caption;
            //Delete old image file on server
            fs.unlink("public" + user.image, (err) => {
                if (err)
                  throw new Error( 'Cannot delete old image: ' + err.message );
              });
        } else if ( imageInfo ){    //there is the old image, but no new upload image
            await newsImgs.updateImage( imageInfo, user.image );
        }

        const username = await funcUsers.updateAUser(user);
        return NextResponse.json( {}, { status: 200 });
    } catch ( error ) {
        return NextResponse.json( { msg: error.message }, { status: 500 });
    }

}