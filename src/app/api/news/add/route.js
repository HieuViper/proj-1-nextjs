import { NextResponse } from "next/server";
import { funcLogin } from "@/library/funcLogin";
import { users } from "@/library/users";
import { img } from "@/library/img";
import { revalidatePath } from "next/cache";
import myConstant from "@/store/constant";
import { news } from "@/library/news";

export const dynamic = 'force-dynamic' // defaults to force-static

export async function POST(req) {
    //Check for security
    const { reqStatus, loginInfo } = await funcLogin.checkForProtectedApi('news', 'add');
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
            console.log('inside here');
            imageUrl = await img.saveImage( imageFile, true, myConstant.news );
            console.log('saving image successfully');

            imageInfo.url = imageUrl.url;
            imageInfo.srcset = imageUrl.srcset;
            imageInfo.author = loginInfo.user.username;
            await newsImgs.addImage( imageInfo );
            console.log("saving image to news image module successfully");

            newsItem.image = imageUrl.url;  //set image for user

        } else {
            newsItem.image = null;      //set image null when user didn't send image
        }

        let newsId = await news.addANews(newsItem, newsLangs);

        return NextResponse.json( { id: newsId }, { status: 200 });
    } catch ( error ) {
        return NextResponse.json( { msg: error.message }, { status: 500 });
    }
}