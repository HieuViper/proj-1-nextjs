import { NextResponse } from "next/server";
import models from '@/app/models';

export async function POST(body, req) {
    const product = await body.json();
    let result = await models.Products.create(product);

    const product_languages = product.product_languages;
    product_languages.map(async function (item) {
        var product_language = {
            productId: result.id,
            name: item.name,
            short: item.short,
            description: item.description,
            languageId: item.languageId,
        };
        const rs = await models.ProductLanguages.create(product_language);

    });
    return NextResponse.json({
        result: "success",
        message: "products created successfully",
        data: result
    });
}

export async function DELETE(body, req) {
    const id = req.params.id;
    models.Products.destroy({ where: { id: id } })
        .then((result) => {
            models.ProductLanguages.destroy({ where: { productId: id } }).then(
                (result) => {
                    return NextResponse.json({
                        result: "success",
                        message: "deleted success",
                    });
                }
            );
        })
        .catch((error) => {
            return NextResponse.json({
                message: "Something went wrong",
                error: error,
            });
        });
}