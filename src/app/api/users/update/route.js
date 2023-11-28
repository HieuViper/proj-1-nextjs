import { NextResponse } from "next/server";
import { funcLogin } from "@/library/funcLogin";
import { funcUsers } from "@/library/funcUsers";
import { funcImage } from "@/library/funcImages";

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
    console.log('users:', user);
    console.log('imageInfo:', imageInfo);
    console.log('loginInfo at API:', loginInfo);
    try {
        let imageUrl = null;
        //save image File
        if ( imageFile ) {
            imageUrl = await funcImage.saveImage( imageFile );
            console.log('saving image successfully');
            //add new Image to table
            imageInfo.url = imageUrl;
            imageInfo.author = loginInfo.user.username;
            await funcImage.addImage( imageInfo );
            console.log("saving image to database successfully");
            user.image = imageUrl;  //set image for user
        } else if ( imageInfo ){    //there is the old image, but no new upload image
            await funcImage.updateImage( imageInfo, user.image );
        }

        const username = await funcUsers.updateAUser(user);
        return NextResponse.json( {}, { status: 200 });
    } catch ( error ) {
        return NextResponse.json( { msg: error.message }, { status: 500 });
    }

}