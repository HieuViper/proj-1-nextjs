import { NextResponse } from "next/server";
import { funcLogin } from "@/library/funcLogin";
import { funcUsers } from "@/library/funcUsers";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(req, { params }) {
    const { reqStatus, loginInfo } = await funcLogin.checkForProtectedApi('users');
    if ( reqStatus != 200 )
        return NextResponse.json({} , { status: reqStatus });

    // const { searchParams } = new URL(req.url)
    const searchParams = req.nextUrl.searchParams;

    const keys = searchParams?.keys ?? "";
    const del = searchParams?.del ?? "";
    const role = searchParams?.role ?? "";
    const search = searchParams?.search ?? "";
    const page = searchParams?.page ?? 1;
    const size = searchParams?.size ?? process.env.PAGE_SIZE;
    let orderby = searchParams?.orderby ?? "";
    let order = searchParams?.order ?? "";
    try{
        if( keys != '' || del != '' ) {
            let isAuthorize = await funcLogin.checkAuthorize( loginInfo.user, 'users', 'delete');
            if ( isAuthorize == false )
                return NextResponse.json( {}, { status: 403 } );
            if ( keys != '' )
                await funcUsers.deleteBulkUsers(keys);
            if ( del != '' )
                await funcUsers.deleteUser(del);
        }
        const usersData = await funcUsers.getUsers(
            role,
            page,
            size,
            search,
            orderby,
            order,
        );
        const totals = await funcUsers.getTotalNumOfUsers( role, search );
        const pagination = {
            pageSize: parseInt(size),
            total: totals.itemsOfTable,
            current: parseInt(page),
            // disabled: true
        };
        return NextResponse.json( { dataTable: JSON.stringify(usersData),
                                    user: loginInfo.user,
                                    roles: getConfig().serverRuntimeConfig.userRoles,
                                    pagination: pagination,
                                    totals: totals
        } );
    }
    catch ( error ) {
        return NextResponse.json( { msg: error.message }, { status: 500 } );
    }


}
