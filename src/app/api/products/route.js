import { NextResponse } from "next/server";
import models from '@/models';
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
export async function GET(req,{params}) {
    const searchParams = req.nextUrl.searchParams;
    const page =  searchParams.has("page")?searchParams.get('page')-1 : 0;
    const limit =  searchParams.has("limit")?searchParams.get('limit') : 20;
    const option =  searchParams.has("keyword")?{
        code: {
        [Op.like]: "%" + searchParams.get('keyword') + "%",
        },
    }:{};
    const opLang =  searchParams.has("lang")?{
        code: searchParams.get("lang")
        
    }:{};

    const status = await models.Products.findAll({
        where:option,
        attributes: [ 
            'status',
            [Sequelize.fn("COUNT", Sequelize.col("status")), "total"]
        ],
        group: 'status'
    })
    
    let { count, rows } = await models.Products.findAndCountAll({
        where: option,
        include: [
        {
            model: models.ProductLanguages,
            as: 'product_languages',
            include: [
            {
                model: models.Languages,
                as: 'languages',
                where:opLang
            },
            ],
        },
        ],
        offset: parseInt(page) * parseInt(limit),
        limit: parseInt(limit),
        order: [["id", "DESC"]],
    });
    return NextResponse.json({
        status:status,
        data: rows,
        pagging: {
        lastPage: parseInt(count / parseInt(limit)),
        currentPage: page+1,
        limit: parseInt(limit),
        total: count
    }});
}