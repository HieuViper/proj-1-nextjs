import { pool } from "../../../config/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    console.log("🚀 ~ file: route.js:5 ~ GET ~ params:", params);
    try {
        const result = await pool.query("SELECT * FROM categories WHERE id = ?", [
            params.id,
        ]);
        return NextResponse.json(result[0]);
    } catch (error) {
        return NextResponse.json({ message: error.message });
    }
}

export async function DELETE(request, { params }) {
    try {
        await pool.query("DELETE FROM categories WHERE id = ?", [params.id]);
        return NextResponse.json({}, { status: 204 });
    } catch (error) {
        return NextResponse.json({ message: error.message });
    }
}

export async function PUT(request, { params }) {
    const data = await request.json();

    try {
        await pool.query("UPDATE categories SET ? WHERE id = ?", [data, params.id]);
        return NextResponse.json({
            ...data,
            id: params.id,
        });
    } catch (error) {
        return NextResponse.json({ message: error.message });
    }
}
