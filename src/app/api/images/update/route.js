import { NextResponse } from "next/server";
import { funcLogin } from "@/library/funcLogin";
import { funcImage } from "@/library/funcImages";

export const dynamic = 'force-dynamic' // defaults to force-static

export async function PUT(req, { params }) {
    //Check for security
    const { reqStatus, loginInfo } = await funcLogin.checkForProtectedApi('images', 'edit');
    if ( reqStatus != 200 )
        return NextResponse.json({} , { status: reqStatus });

    let formData;
    let imageInfo;
    // let query;
    let imgData = {
        alt: null,
        caption: null
    };

    try{
        formData = await req.json();
        imageInfo = formData.imageInfo;
        // query = formData.query;
        imgData.alt = imageInfo.alt;
        imgData.caption = imageInfo.caption;
    } catch ( error ) {
        return NextResponse.json( { msg: error.message }, { status: 400 });
    }

    try {
        //update Image to table
        await funcImage.updateImgById( imgData, imageInfo.id );
        console.log("updating image to database successfully");

        return NextResponse.json( {}, { status: 200 });
    } catch ( error ) {
        return NextResponse.json( { msg: error.message }, { status: 500 });
    }

}