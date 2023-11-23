import { funcEmail } from "@/library/funcEmail";
import { NextResponse } from "next/server";

export async function POST( req ) {
    let options;
    try {
        options = req.json();
    }
    catch {
        return NextResponse.json( {}, { status: 400 } )
    }
    try {
        await funcEmail.sendMail( options );
        return NextResponse.json( {msg: 'Sending mail successfully'} );
    }
    catch( error ){
        return NextResponse.json( { msg: error.message }, { status: 500 } );
    }
}