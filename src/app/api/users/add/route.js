import { NextResponse } from "next/server";
import { funcLogin } from "@/library/funcLogin";
import { users } from "@/library/users";
import { img } from "@/library/img";
import { revalidatePath } from "next/cache";

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
            imageUrl = await img.saveImage( imageFile, false );
            console.log('saving image successfully');
            user.image = imageUrl.url;  //set image for user
            user.image_alt = imageInfo.alt;
            user.image_caption = imageInfo.caption;
        } else {
            user.image = null;      //set image null when user didn't send image
        }

        await users.addAUser(user);
        revalidatePath('/admin/users');
        return NextResponse.json( {}, { status: 200 });
    } catch ( error ) {
        return NextResponse.json( { msg: error.message }, { status: 500 });
    }
}