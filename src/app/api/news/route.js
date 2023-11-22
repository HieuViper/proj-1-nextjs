import { NextResponse } from "next/server";

export async function GET(req, res) {
    return NextResponse.json({message: 'helo'})
}

// export async function POST(req, res) {
//     console.log('at POST API:', req.body.newsid);

//     return NextResponse.json({message: req})
// }

export async function POST(req, res) {
    const newsid = await req.json();
    console.log('newsid:', newsid);
    return NextResponse.json ({ message: newsid });
    // Then save email to your database, etc...
  }