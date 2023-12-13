const db = require("@/app/models");
import fs from "fs";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    const result = await db.Imgs.findOne({
      where: {
        id: context.params.id,
      },
    });
    return NextResponse.json({ data: result });
  } catch (error) {
    throw new Error("Fail to get Imgs:" + error.message);
  }
}

export async function PUT(req, context) {
  const id = context.params.id;

  try {
    const body = await req.json();
    const data = body.data;
    await db.Imgs.update(data, {
      where: {
        id: id,
      },
    });
    const result = await db.Imgs.findAll();
    return NextResponse.json({ data: result });
  } catch (error) {
    console.log(error);
    throw new Error("Cannot update img:" + error.message);
  }
}

export async function DELETE(req, context) {
  const id = context.params.id;
  const rs = await db.Imgs.findOne({ where: { id: id } });
  try {
    await db.Articles.update(
      { image: null },
      {
        where: {
          image: rs.url,
        },
      }
    );
    await db.News.update(
      { image: null },
      {
        where: {
          image: rs.url,
        },
      }
    );
    await db.Imgs.destroy({
      where: {
        id: id,
      },
    });

    console.log(rs.url.substring(1, rs.url.length));
    // Delete file in folder upload by URL
    fs.unlink("public/" + rs.url.substring(1, rs.url.length), (err) => {
      if (err) console.log(err);
    });

    // await db.Products.update(
    //   {
    //     main_image: null,
    //   },
    //   {
    //     where: {
    //       main_image: url,
    //     },
    //   }
    // );
    // await db.Products.update(
    //   {
    //     sub_image1: null,
    //   },
    //   {
    //     where: {
    //       sub_image1: url,
    //     },
    //   }
    // );
    // await db.Products.update(
    //   {
    //     sub_image2: null,
    //   },
    //   {
    //     where: {
    //       sub_image2: url,
    //     },
    //   }
    // );
    // await db.Products.update(
    //   {
    //     sub_image3: null,
    //   },
    //   {
    //     where: {
    //       sub_image3: url,
    //     },
    //   }
    // );
    // await db.Products.update(
    //   {
    //     sub_image4: null,
    //   },
    //   {
    //     where: {
    //       sub_image4: url,
    //     },
    //   }
    // );

    const result = await db.Imgs.findAll();
    return NextResponse.json({ data: result });
  } catch (error) {
    console.log(error);
    throw new Error("Cannot update img:" + error.message);
  }
}
