import { NextResponse } from "next/server";
import { funcLogin } from "@/library/funcLogin";
import { users } from "@/library/users";
import { newsImgs } from "@/library/newsImgs";
import { img } from "@/library/img";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";
const myConstant = require('@/store/constant')

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
        console.log('user image:', user.image);
        console.log('image info', imageInfo);
        console.log('image file:', imageFile);
    } catch ( error ) {
        return NextResponse.json( { msg: error.message }, { status: 400 });
    }
    try {
        let imageUrl = null;
        //save image File
        if ( imageFile ) {
            imageUrl = await img.saveImage( imageFile, false, myConstant.users );
            console.log('saving image successfully');
            //delete old image
            fs.unlink("public" + user.image, (err) => {
                if (err)
                  throw new Error( 'Cannot delete old image: ' + err.message );
              });
            user.image = imageUrl.url;  //set image for user
            user.image_alt = imageInfo.alt;
            user.image_caption = imageInfo.caption;
            //Delete old image file on server

        } else if ( imageInfo ){    //there is the old image, but no new upload image
            // await newsImgs.updateImage( imageInfo, user.image );
            user.image_alt = imageInfo.alt;
            user.image_caption = imageInfo.caption;
        }

        const username = await users.updateAUser(user);
        revalidatePath('/admin/users');
        return NextResponse.json( {}, { status: 200 });
    } catch ( error ) {
        return NextResponse.json( { msg: error.message }, { status: 500 });
    }

}