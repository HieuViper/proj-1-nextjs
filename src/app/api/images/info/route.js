import { NextResponse } from "next/server";
import { funcLogin } from "@/library/funcLogin";
import { funcImage } from "@/library/funcImages";

export const dynamic = 'force-dynamic' // defaults to force-static

export async function POST(req) {
    //Check for security
    const { reqStatus, loginInfo } = await funcLogin.checkForProtectedApi('images');
    if ( reqStatus != 200 )
        return NextResponse.json({} , { status: reqStatus });

        let formData;
        let imgUrl;

    try{
        formData = await req.json();
        imgUrl = formData.imgUrl;
    } catch ( error ) {
        return NextResponse.json( { msg: error.message }, { status: 400 });
    }
    try {
        let imgMetaInfo = await funcImage.getMetaImgInfo( imgUrl );
        return NextResponse.json( imgMetaInfo, { status: 200 });
    } catch ( error ) {
        return NextResponse.json( { msg: error.message }, { status: 500 });
    }

}