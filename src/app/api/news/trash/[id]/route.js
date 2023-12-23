import { NextResponse } from "next/server";
import { funcLogin } from "@/library/funcLogin";
import { users } from "@/library/users";
import { img } from "@/library/img";
import { revalidatePath } from "next/cache";
import { news } from "@/library/news";

export const dynamic = 'force-dynamic' // defaults to force-static

export async function DELETE(req, context) {
    //Check for security
    const { reqStatus, loginInfo } = await funcLogin.checkForProtectedApi('news', 'moveTrash');
    if ( reqStatus != 200 )
        return NextResponse.json({} , { status: reqStatus });

    let newsId;
    try{
        newsId = context.params.id;
        console.log('newsId:', newsId);

    } catch ( error ) {
        return NextResponse.json( { msg: error.message }, { status: 400 });
    }
    try {
        news.trashNews( newsId );
        revalidatePath('/admin/news');
        return NextResponse.json( {}, { status: 200 });
    } catch ( error ) {
        return NextResponse.json( { msg: error.message }, { status: 500 });
    }
}