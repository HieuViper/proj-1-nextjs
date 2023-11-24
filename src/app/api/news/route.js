import { NextResponse } from "next/server";

export async function GET(req, res) {
<<<<<<< HEAD
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
=======
  return NextResponse.json({ message: "hello" });
}
export async function POST(req, res) {
  console.log("vao ");
  const body = await req.json();
  console.log("body", body);
  return NextResponse.json({ prompt: 12 });
}
>>>>>>> 5f8aaaba24bf4af60dab634e2a18c6ffeea98f8d
