import { NextResponse } from "next/server";
import { funcLogin } from "@/library/funcLogin";
import { users } from "@/library/users";

export const dynamic = 'force-dynamic' // defaults to force-static
// export const fetchCache = 'force-no-store'

export async function GET(req, { params }) {

    const { reqStatus, loginInfo } = await funcLogin.checkForProtectedApi('users');
    if ( reqStatus != 200 )
        return NextResponse.json({} , { status: reqStatus });

    let result;
    // const { searchParams } = new URL(req.url)
    const searchParams = req.nextUrl.searchParams;
    try{
        result = await users.userList( loginInfo, searchParams );
        if ( result.error )
          return NextResponse.json( { msg: result.msg }, { status: result.error } );

        return NextResponse.json( { dataTable: JSON.stringify(result.users),
                                    //user: loginInfo.user,
                                    //roles: getConfig().serverRuntimeConfig.userRoles,
                                    pagination: result.pagination,
                                    totals: result.totals
        } );
    }
    catch ( error ) {
        return NextResponse.json( { msg: error.message }, { status: 500 } );
    }
}
