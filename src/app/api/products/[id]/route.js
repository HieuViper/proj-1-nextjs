import { NextResponse } from "next/server";
import models from '@/app/models';
import db from "@/app/models";

export async function POST(body, req) {
    try {
        const product = await body.json();
        let result = await db.Products.create(product);
        const product_languages = product.product_languages;
        product_languages.map(async function (item) {
            var product_language = {
                productId: result.id,
                name: item.name,
                short: item.short,
                description: item.description,
                languageCode: item.languageCode,
            };
            const rs = await db.Product_languages.create(product_language);

        });
        return NextResponse.json({
            result: "success",
            message: "products created successfully",
            data: result
        });
    }
    catch (error) {
        return NextResponse.json({ msg: 'error here: ' + error.message }, { status: 500 });
        // throw new Error('error here: ' + error.message);
    }
}

export async function DELETE(body, req) {
    const id = req.params.id;
    db.Product_languages.destroy({ where: { productId: id } })
    db.Products.destroy({ where: { id: id } })
    return NextResponse.json({
        result: "success",
        message: "deleted success",
    });
    //     db.Products.destroy({ where: { id: id } })
    //         .then((result) => {
    //             db.Product_languages.destroy({ where: { productId: id } }).then(
    //                 (result) => {
    //                     return NextResponse.json({
    //                         result: "success",
    //                         message: "deleted success",
    //                     });
    //                 }
    //             );
    //         })
    //         .catch((error) => {
    //             return NextResponse.json({
    //                 message: "Something went wrong",
    //                 error: error,
    //             });
    //         });
}
export async function GET(req, { params }) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const opLang = searchParams.has("lang") ? {
            code: searchParams.get("lang")

        } : {};
        let product = await db.Products.findOne({
            where: { id: params.id },
            include: [
                {
                    model: db.Product_languages,
                    as: 'product_languages',
                    include: [
                        {
                            model: db.Languages,
                            as: 'languages',
                            where: opLang
                        },
                    ],
                },
            ],
        });

        return NextResponse.json({
            data: product
        });
    }
    catch (error) {
        return NextResponse.json({ msg: 'error here: ' + error.message }, { status: 500 });
        // throw new Error('error here: ' + error.message);
    }
}