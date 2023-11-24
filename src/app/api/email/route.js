import { funcEmail } from "@/library/funcEmail";
import { NextResponse } from "next/server";

export async function POST( req ) {
    let options;
    try {
        options = await req.json();
        console.log('receive from client:', options);
    }
    catch {
        return NextResponse.json( {}, { status: 400 } )
    }
    try {
        await funcEmail.sendMail( options );
        console.log('succefully');
        return NextResponse.json( {msg: 'Sending mail successfully'} );
    }
    catch( error ){
        console.log('fail:', error.message);
        return NextResponse.json( { msg: error.message }, { status: 500 } );
    }
}