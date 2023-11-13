import { db } from "@/config/db";
import { request } from "http";
import { Op, QueryTypes } from "sequelize";
import { userRoles } from "./userRoles";
import bcrypt from 'bcrypt';

export const funcUsers = {
  getUsers,
  getTotalNumOfUsers,
  deleteBulkUsers,
  deleteUser,
  getUser,
  updateAUser,
  addAUser,
};


//get search query from search parameter
function getSearchQuery(search) {
  return search == ""
    ? ""
    : `AND (username LIKE '%${search}%' OR first_name LIKE '%${search}%' OR last_name LIKE '%${search}%' OR email LIKE '%${search}%' OR role LIKE '%${search}%')`;
}

//GetNews for tab "All,published, trash"
export async function getUsers(
  role,
  page,
  size,
  search,
  orderby,
  order,
) {
  try {
    const fromNews = (page - 1) * size; //determine the beginning news
    const roleQuery = role == "" ? "" : `role='${role}'`
    const searchQuery = getSearchQuery(search);
    const orderQuery = orderby == "" ? "" : `ORDER BY ${orderby} ${order}`;
    const whereQuery = ( roleQuery == "" && searchQuery == "" ) ? ""
                        : `WHERE (${roleQuery} ${searchQuery})`;

    let sqlquery = `SELECT * FROM users ${whereQuery} ${orderQuery} LIMIT ${fromNews}, ${size}`;

    const results = await db.seq.query(sqlquery, { type: QueryTypes.SELECT });
    // let results;
    // if( role != "" && search != ""){
    //   results = await db.Users.findAll({
    //     where: {
    //       [Op.and]: {
    //         role: role,
    //         [Op.or]: {
    //           username: {
    //             like: `%${search}%`
    //           },
    //           first_name: {
    //             like: `%${search}%`
    //           },
    //           last_name: {
    //             like: `%${search}%`
    //           },
    //           role: {
    //             like: `%${search}%`
    //           },
    //         }
    //       }
    //     },
    //     offset: fromNews,
    //     limit: size,
    //     order: [
    //       [orderby, order]
    //     ]
    //   });
    // }else{
    //   results = await db.Users.findAll({
    //     offset: fromNews,
    //     limit: size,
    //     order: [
    //       [orderby, order]
    //     ]
    //   });
    // }


    return results;
  } catch (error) {
    throw new Error("Fail to get users from database" + error.message);
  }
}

//get total item of news
export async function getTotalNumOfUsers( role, search ) {
  let totals = {
    itemsOfTable: 0,
    all: 0,
  };
  // Object.keys(userRoles).forEach((role) => {
  //   totals[role] = 0;
  // });

  try {
    //get total number of users in the return user table
    const roleQuery = role == "" ? "" : `role='${role}'`
    const searchQuery = getSearchQuery(search);
    const whereQuery = ( roleQuery == "" && searchQuery == "" ) ? ""
                        : `WHERE (${roleQuery} ${searchQuery})`;

    let sqlquery = `SELECT count(*) AS total FROM users ${whereQuery}`;
    //let results = await pool.query(sqlquery, [post_type]);
    let results = await db.seq.query(sqlquery, { type: QueryTypes.SELECT });
    totals.itemsOfTable = results[0].total;
  } catch (error) {
    throw new Error("cannot get items Of Table:" + error.message);
  }

//get total number of users in All Status
  try {
    let sqlquery = `SELECT count(*) AS total FROM users`;
    let results = await db.seq.query(sqlquery, { type: QueryTypes.SELECT });
    totals.all = results[0].total;
  } catch (error) {
    throw new Error("cannot get number of news in All Tab:" + error.message);
  }
  //get total number of user for each role
  for( const role of Object.keys(userRoles) ) {
    try {
      //get total number of news in draft status
      let sqlquery = `SELECT count(*) AS total FROM users WHERE role='${role}'`;
      let results = await db.seq.query(sqlquery, { type: QueryTypes.SELECT });
      totals[role] = results[0].total ;
    } catch (error) {
      throw new Error(
        `Cannot get total of user in role: ${role} - ` + error.message
      );
    }
  }
  return totals;
}


//Delete bulk of news, articles based on newsid
export async function deleteBulkUsers(keys) {
  try {
    const keysArr = keys.split(",");

      await db.Users.destroy({
        where: {
          username: {
            [Op.in]: keysArr,
          },
        },
      });
  } catch (error) {
    console.log(error);
    throw new Error("Fail to delete users - " + error.message);
  }
}


//Delete forever a news
export async function deleteUser(key) {
  try {
    await db.Users.destroy({
      where: {
        username: key,
      },
    });
  } catch (error) {
    throw new Error(`Fail to delete users username = ${key} - ` + error.message);
  }
}

//Get User By Username
export async function getUser(username) {
  try {
    const user = await db.Users.findByPk(username);
    return user;
  } catch (error) {
    throw new Error(`Fail to get user: ${username} - ` +  error.message);
  }
}


//Update new information of a user from Edit form
//parameter: data: contain updated value for user Table
//           username:  contain username of the user that need to be updated
export async function updateAUser(data) {
  const {username, old_email, ...user} = data;
  try {
    //update into user Table
    console.log('data :', data);
    if(user.email != old_email) { //user has change their email, we check whether this email is already used
      const tempUser = await db.Users.findOne({ where: {
        email: user.email
      } });
      if ( tempUser )
        throw new Error('This email is already used');
    }
    //hash password if user change password
    if( user.password ) {
      const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND));
      const hash = await bcrypt.hash(data.password, salt);
      user.password = hash;
    }

    await db.Users.update(
      user,
      {
        where: {
          username: username,
        }
      },
    );

  } catch (error) {
    throw new Error(`Cannot update user: ${username} - ` + error.message);
  }
}

//Add a new User from Add form
//parameter: data: contain updated value for Users Table
export async function addAUser(data) {
  try {
    //update into user Table
    console.log('data :', data);
    //check whether username is already used
    const exitUser = await db.Users.findByPk( data.username );
    if( exitUser ){
      throw new Error( "Username already exist" );
    }
    //check whether email is already used
    const usedEmail = await db.Users.findOne( { where: {
      email: data.email
      }
    } );
    if( usedEmail )
      throw new Error( "Email is already being used" );

    //hash password
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND));
    const hash = await bcrypt.hash(data.password, salt);

    data.password = hash;
    console.log('Salt:', salt);
    console.log('Hashed Password:', hash);


    const user = await db.Users.create(data);


    return user.username;
  } catch (error) {
    throw new Error("Cannot create user: " + error.message);
  }
}
