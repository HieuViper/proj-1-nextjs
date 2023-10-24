import { NextResponse } from 'next/server'
import { db } from './config/db';

export function middleware(request) {
    /*if (request.nextUrl.pathname.startsWith('/admin')){
        if( !db.initialized ) {
            db.initialize();
        }
        return NextResponse.next();
    }*/
}