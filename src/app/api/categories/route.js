import { pool } from "../../config/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const results = await pool.query("SELECT * FROM categories");
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json({ message: error.message });
    }
}
// export async function POST(request) {
//     try {
//         const { name, type, categories_keywords } = await request.json();
//         categories_keywords = name
//         console.log(name, type, categories_keywords);

//         const result = await pool.query("INSERT INTO categories SET ?", {
//             name,
//             type,
//             categories_keywords
//         });

//         return NextResponse.json({ id: result.insertId, name, type, categories_keywords });
//     } catch (error) {
//         return NextResponse.json(
//             { message: error.message },
//             {
//                 status: 500,
//             }
//         );
//     }
// }
