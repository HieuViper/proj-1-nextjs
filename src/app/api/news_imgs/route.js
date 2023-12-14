import { NextResponse } from "next/server";
import { newsImgs } from "@/library/newsImgs";
import { funcLogin } from "@/library/funcLogin";

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(req, { params }) {

  const { reqStatus, loginInfo } = await funcLogin.checkForProtectedApi('news_imgs');
  if ( reqStatus != 200 )
      return NextResponse.json({} , { status: reqStatus });

  let result;
  const searchParams = req.nextUrl.searchParams;

  try{
      result = await newsImgs.imageList( loginInfo, searchParams );
      if ( result.error )
        return NextResponse.json( { msg: result.msg }, { status: result.error } );

      //return the result to client
      return NextResponse.json( { data: JSON.stringify(result.images),
                                  pagination: result.pagination,
                                  totals: result.totals,
      } );
  }
  catch ( error ) {
      return NextResponse.json( { msg: error.message }, { status: 500 } );
  }
}


