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
    let query;
    let imgData = {
        alt: null,
        caption: null
    };

    try{
        formData = await req.json();
        imageInfo = formData.imageInfo;
        query = formData.query;
        imgData.alt = imageInfo.alt;
        imgData.caption = imageInfo.caption;
    } catch ( error ) {
        return NextResponse.json( { msg: error.message }, { status: 400 });
    }

    try {
        //update Image to table
        await funcImage.updateImgById( imgData, imageInfo.id );
        console.log("updating image to database successfully");

        //get new imageList
        let result = {
            images: null,
            pagination: null,
            totals: null,
        }
        result.images = await funcImage.getAllImages( query.page, query.size, query.search );
        result.totals = await funcImage.getTotalNumOfImg( query.search );
        result.pagination = {
            pageSize: parseInt(query.size),
            total: result.totals.itemsOfTable,
            current: parseInt(query.page),
        };
        return NextResponse.json( { data: JSON.stringify(result.images),
                                    pagination: result.pagination,
                                    totals: result.totals,
                                  }, { status: 200 });
    } catch ( error ) {
        return NextResponse.json( { msg: error.message }, { status: 500 });
    }

}