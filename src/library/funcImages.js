import { db } from "@/config/db";
import fs from "fs";

export const funcImage = {
  getImage,
  getImages,
  updateImage,
  addImage,
  dellImage,
};

async function getImages() {
  try {
    const result = await db.Imgs.findAll();
    return result;
  } catch (error) {
    throw new Error("Fail to get img:" + error.message);
  }
}

async function getImage(url) {
  try {
    const result = await db.Imgs.findOne({
      where: {
        url: url,
      },
    });
    return result;
  } catch (error) {
    throw new Error("Fail to get img:" + error.message);
  }
}

async function addImage(data) {
  try {
    const result = await db.Imgs.create(data);
    return result;
  } catch (error) {
    throw new Error("Cannot create img:" + error.message);
  }
}

async function updateImage(data, url) {
  try {
    const result = await db.Imgs.update(data, {
      where: {
        url: url,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Cannot update img:" + error.message);
  }
}

async function dellImage(url) {
  try {
    await db.Articles.update(
      { image: null },
      {
        where: {
          image: url,
        },
      }
    );
    await db.News.update(
      { image: null },
      {
        where: {
          image: url,
        },
      }
    );
    await db.Articles.update(
      { image: null },
      {
        where: {
          image: url,
        },
      }
    );
    const result = await db.Imgs.destroy({
      where: {
        url: url,
      },
    });

    console.log(url.substring(1, url.length));
    // Delete file in folder upload by URL
    fs.unlink("public/" + url.substring(1, url.length), (err) => {
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

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Cannot update img:" + error.message);
  }
}
