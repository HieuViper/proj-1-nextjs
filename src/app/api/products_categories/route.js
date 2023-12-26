import myConstant from "@/store/constant";
import { NextResponse } from "next/server";
// import db from '@/models';
const db = require("@/app/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
export async function GET(req, { params }) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const page = searchParams.has("page") ? searchParams.get('page') - 1 : 0;
        const limit = searchParams.has("limit") ? searchParams.get('limit') : 10;
        const option = searchParams.has("search") ? {
            product_code: {
                [Op.like]: "%" + searchParams.get('search') + "%",
            },
        } : {};
        const opLang = searchParams.has("lang") ? {
            code: searchParams.get("lang")
        } : {};

        // const status = await db.Product_categories.findAll({
        //     where:option,
        //     attributes: [
        //         'status',
        //         [Sequelize.fn("COUNT", Sequelize.col("status")), "total"]
        //     ],
        //     group: 'status'
        // })

        let { count, rows } = await db.Product_categories.findAndCountAll({
            where: option,
            include: [
                {
                    model: db.Product_cate_langs,
                    as: 'product_cate_langs',
                    include: [
                        {
                            model: db.Languages,
                            as: 'languages',
                            where: opLang
                        },
                    ],
                },
            ],
            offset: parseInt(page) * parseInt(limit),
            limit: parseInt(limit),
            order: [["id", "DESC"]],
        });
        // console.log('rows:', rows);

        return NextResponse.json({
            //status:status,
            data: rows,
            pagging: {
                lastPage: parseInt(count / parseInt(limit)),
                currentPage: page + 1,
                limit: parseInt(limit),
                total: count
            }
        });
    }
    catch (error) {
        return NextResponse.json({ msg: 'error here: ' + error.message }, { status: 500 });
        // throw new Error('error here: ' + error.message);
    }
}

export async function DELETE(body, { params }) {
    const data = await body.json();
    const ids = data.ids.split(",")
    const del_product_cate_languages = await db.Product_cate_langs.destroy({ where: { id: { [Op.in]: ids } } })
    const del_products_cate = await db.Product_categories.destroy({ where: { id: { [Op.in]: ids } } })
    return NextResponse.json({
        result: "success"
    })
}
export async function POST(body, req) {
    try {
        const product_categories = await body.json();
        let result = await db.Product_categories.create(product_categories);
        const product_cate_langs = product_categories.product_cate_langs;
        product_cate_langs.map(async function (item) {
            var product_cate_lang = {
                product_categoryId: result.id,
                name: item.name,
                // short: item.short,
                description: item.description,
                languageCode: item.languageCode,
            };
            const rs = await db.Product_cate_langs.create(product_cate_lang);

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