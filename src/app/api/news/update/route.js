import { NextResponse } from "next/server";
import { funcLogin } from "@/library/funcLogin";
import { users } from "@/library/users";
import { newsImgs } from "@/library/newsImgs";
import { img } from "@/library/img";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";
import { news } from "@/library/news";
const myConstant = require('@/store/constant')

export const dynamic = 'force-dynamic' // defaults to force-static

export async function POST(req, { params }) {
    //Check for security
    const { reqStatus, loginInfo } = await funcLogin.checkForProtectedApi('users', 'edit');
    if ( reqStatus != 200 )
        return NextResponse.json({} , { status: reqStatus });


    let formData;
    let newsItem, newsLangs;
    let imageInfo;
    let imageFile;
    try{
        formData = await req.formData();
        newsItem = JSON.parse(formData.get('news'));
        newsLangs = JSON.parse(formData.get('newsLangs'));
        imageInfo = JSON.parse(formData.get('imageInfo'));
        imageFile = formData.get('imageFile');
        console.log('imageFile:', imageFile);
        console.log('imageInfo:', imageInfo);
        console.log('newsItem:', newsItem);
        console.log('newslang:', newsLangs);
    } catch ( error ) {
        return NextResponse.json( { msg: error.message }, { status: 400 });
    }
    try {
        let imageUrl = null;
        //save image File
        if ( imageFile ) {
            imageUrl = await img.saveImage( imageFile, true, myConstant.news );
            console.log('saving image successfully');

            //Add new image file into news image module
            imageInfo.url = imageUrl.url;
            imageInfo.srcset = imageUrl.srcset;
            imageInfo.author = loginInfo.user.username;
            await newsImgs.addImage( imageInfo );

            newsItem.image = imageUrl.url;  //set image for user

        } else if ( imageInfo ){    //there is the old image, but no new upload image
            await newsImgs.updateImage( imageInfo, newsItem.image );
        }

        newsItem.modified_by = loginInfo.user.username;
        await news.updateANews(newsItem, newsLangs, newsItem.id);
        // revalidatePath('/admin/users');
        return NextResponse.json( { url: newsItem.image, post_status: newsItem.post_status }, { status: 200 });
    } catch ( error ) {
        return NextResponse.json( { msg: error.message }, { status: 500 });
    }

}