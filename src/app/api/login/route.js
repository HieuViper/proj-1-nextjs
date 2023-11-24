import { NextResponse } from "next/server";
import { funcLogin } from "@/library/funcLogin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { log } from "util";

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(req, { params }) {

    // const { searchParams } = new URL(req.url)
    const searchParams = req.nextUrl.searchParams;
    //Delete the Authentication
    const option = searchParams.get('option');
    console.log('option:', option);
    if ( option  == 'delAuth' ) {
      cookies().delete('Authorization');

    }
    return new NextResponse('hello', {
      status: 200,
      //headers: { 'Set-Cookie': cookies().toString() },
    });

}

export async function PUT( req ) {

  const { reqStatus } = await funcLogin.checkForProtectedApi('login');
  if ( reqStatus != 200 )
    return NextResponse.json({} , { status: reqStatus });


  return NextResponse.json({ msg:'hello'}, { status: 200 } );
}

export async function POST(req) {
    const credential = await req.json();
    let message;
    let token;
    try {
      token = await funcLogin.checkLogin( credential.username, credential.password );   //check username,email, password
      cookies().set({
        name: 'Authorization',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',  //Strict
        maxAge: process.env.LOGIN_TIME,
      });
      return NextResponse.json({}, { status: 200 })
    } catch (error) {
        // throw new Error( error.message );
        message = error.message;
        return NextResponse.json( { msg: message }, { status: 401 }  );
    }

  }