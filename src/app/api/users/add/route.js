import { NextResponse } from "next/server";
import { funcLogin } from "@/library/funcLogin";
import { funcUsers } from "@/library/funcUsers";
import { newsImgs } from "@/library/newsImgs";

export const dynamic = 'force-dynamic' // defaults to force-static

export async function POST(req) {
    //Check for security
    const { reqStatus, loginInfo } = await funcLogin.checkForProtectedApi('users', 'add');
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
            imageUrl = await newsImgs.saveImage( imageFile );
            console.log('saving image successfully');
            //add new Image to table
            imageInfo.url = imageUrl;
            imageInfo.author = loginInfo.user.username;
            await newsImgs.addImage( imageInfo );
            console.log("saving image to database successfully");
            user.image = imageUrl;  //set image for user
        } else {
            user.image = null;      //set image null when user didn't send image
        }

        await funcUsers.addAUser(user);
        return NextResponse.json( {}, { status: 200 });
    } catch ( error ) {
        return NextResponse.json( { msg: error.message }, { status: 500 });
    }

}