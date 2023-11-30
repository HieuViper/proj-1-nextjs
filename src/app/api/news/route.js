import { NextResponse } from "next/server";
import { funcLogin } from "@/library/funcLogin";
import { funcNews } from "@/library/funcNews";

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(req, { params }) {

    const { reqStatus, loginInfo } = await funcLogin.checkForProtectedApi('news');
    if ( reqStatus != 200 )
        return NextResponse.json({} , { status: reqStatus });

    let result;
    // const { searchParams } = new URL(req.url)
    const searchParams = req.nextUrl.searchParams;

    try{
        result = await funcNews.newsList( loginInfo, searchParams );
        if ( result.error )
          return NextResponse.json( { msg: result.msg }, { status: result.error } );

        //return the result to client
        return NextResponse.json( { dataTable: JSON.stringify(result.news),
                                    pagination: result.pagination,
                                    totals: result.totals,
                                    langTable: JSON.stringify(result.languages)
        } );
    }
    catch ( error ) {
        return NextResponse.json( { msg: error.message }, { status: 500 } );
    }
}
