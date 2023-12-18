const db = require("@/app/models");
const myConstant = require('@/store/constant')
import fs, { writeFile } from "fs/promises";
import { QueryTypes } from "sequelize";
import { funcLogin } from "./funcLogin";


export const newsImgs = {
  getImage,
  getAllImages,
  getTotalNumOfImg,
  updateImage,
  updateImgById,
  addImage,
  dellImage,
  deleteImg,
  imageList,
};

function getSearchQuery(search) {
  return search == ""
    ? ""
    : `WHERE ( url LIKE '%${search}%' OR alt LIKE '%${search}%' OR caption LIKE '%${search}%' OR author LIKE '%${search}%')`;
}

export async function getAllImages( page = 1, size, search = '') {
  try {
    const fromNews = (page - 1) * size; //determine the beginning news
    const searchQuery = getSearchQuery(search);
    const orderQuery = `ORDER BY updatedAt DESC`;

    let sqlquery = `SELECT * FROM news_imgs ${searchQuery} ${orderQuery} LIMIT ${fromNews}, ${size}`;

    const results = await db.sequelize.query(sqlquery, { type: QueryTypes.SELECT });

    return results;
  } catch (error) {
    throw new Error("Fail to get images from database: " + error.message);
  }
}

//get total item of news
export async function getTotalNumOfImg( search  = '') {
  let totals = {
    itemsOfTable: 0,
  };

  try {
    //get total number of news in the return news table
    const searchQuery = getSearchQuery(search);

    let sqlquery = `SELECT count(*) AS total FROM news_imgs ${searchQuery}`;
    let results = await db.sequelize.query(sqlquery, { type: QueryTypes.SELECT });
    totals.itemsOfTable = results[0].total;
  } catch ( error ) {
    throw new Error("Cannot get items Of Table:" + error.message);
  }
  return totals;
}

//handle proccesses of images list route
//parameter: loginInfo: contain logging information of user, include the role to check authorization
//           searchParams: contain the query from URL of the request
export async function imageList( loginInfo, searchParams ) {

  const del = searchParams?.get('del') ?? "";
  const search = searchParams?.get('search') ?? "";
  const page = searchParams?.get('page') ?? 1;
  const size = searchParams?.get('size') ?? myConstant.post.PAGE_SIZE;

  let result = {
    error: null,
    msg: null,
    images: null,
    pagination: null,
    totals: null,
  }

  try {
      //Check for deleting
      if( del != '' ) {
        let isAuthorize = await funcLogin.checkAuthorize( loginInfo.user, 'news_imgs', 'delete');
        if ( isAuthorize == false ) {
            result.error = 403;
            return result;
        }
        await newsImgs.deleteImg(del);
      }

      result.images = await newsImgs.getAllImages( page, size, search );
      result.totals = await newsImgs.getTotalNumOfImg( search );
      result.pagination = {
        pageSize: parseInt(size),
        total: result.totals.itemsOfTable,
        current: parseInt(page),
      };
      return result;
  }
  catch( error ) {
    result.error = 500;
    result.msg = error.message;
    return result;
  }
}


async function getImage(url) {
  try {
    const result = await db.News_imgs.findOne({
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
    const result = await db.News_imgs.create(data);
    return result;
  } catch (error) {
    throw new Error("Cannot create img:" + error.message);
  }
}


//Update image by id
async function updateImgById(data, id) {
  try {
    const result = await db.News_imgs.update(data, {
      where: {
        id: id,
      },
    });
    return result;
  } catch (error) {
    throw new Error("Cannot update img:" + error.message);
  }
}

//Update image by URL
async function updateImage(data, url) {
  try {
    const result = await db.News_imgs.update(data, {
      where: {
        url: url,
      },
    });
    return result;
  } catch (error) {
    throw new Error("Cannot update img:" + error.message);
  }
}

// Delete image by image id
async function deleteImg( id ) {
  try {
    const img = await db.News_imgs.findByPk( id )
    await dellImage( img.url );
  }
  catch( error ) {
    throw new Error ( 'Cannot delete image:' + error.message );
  }
}

//this function doesn't not update table products yet, return to this function after working
//with the table products
async function dellImage(url) {
  const t = await db.sequelize.transaction();
  try {
    //Update table Articles
    // await db.Articles.update(
    //   { image: null },
    //   {
    //     where: {
    //       image: url,
    //     },
    //     transaction: t,
    //   }
    // );
    //update table News
    await db.News.update(
      { image: null },
      {
        where: {
          image: url,
        },
        transaction: t,
      }
    );
    //update table Users
    // await db.Users.update(
    //   { image: null },
    //   {
    //     where: {
    //       image: url,
    //     },
    //     transaction: t,
    //   }
    // );

    await db.News_imgs.destroy({
      where: {
        url: url,
      },
      transaction: t,
    });

    console.log(url.substring(1, url.length));
    // Delete file in folder upload by URL
    fs.unlink("public" + url, (err) => {
      if (err) console.log(err);
        throw new Error( err );
    });


    t.commit();
  } catch (error) {
    t.rollback();
    console.log(error);
    throw new Error("Cannot delete image:" + error.message);
  }
}
