import { NextResponse } from "next/server";
import { funcLogin } from "@/library/funcLogin";
import { newsImgs } from "@/library/newsImgs";
import { img } from "@/library/img";

export const dynamic = 'force-dynamic' // defaults to force-static

export async function POST(req) {
    //Check for security
    const { reqStatus, loginInfo } = await funcLogin.checkForProtectedApi('news_imgs', 'add');
    if ( reqStatus != 200 )
        return NextResponse.json({} , { status: reqStatus });

        let formData;
        let imageInfo;
        let imageFile;
        let query;
    try{
        formData = await req.formData();
        imageInfo = JSON.parse(formData.get('imageInfo'));
        imageFile = formData.get('imageFile');
        if ( !imageFile ) {
            throw new Error( 'No uploaded image' );
        }
        query = JSON.parse( formData.get( 'query' ) );
    } catch ( error ) {
        return NextResponse.json( { msg: error.message }, { status: 400 });
    }
    try {
        let imageUrl = null;
        //save image File

        imageUrl = await img.saveImage( imageFile );
        console.log('saving image successfully');
        //add new Image to table
        imageInfo.url = imageUrl.url;
        imageInfo.srcset = imageUrl.srcset;
        imageInfo.author = loginInfo.user.username;
        await newsImgs.addImage( imageInfo );
        console.log("saving image to database successfully");

        //get new imageList
        let result = {
            images: null,
            pagination: null,
            totals: null,
        }
        result.images = await newsImgs.getAllImages( query.page, query.size, '' );
        result.totals = await newsImgs.getTotalNumOfImg( '' );
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