import { db } from "@/config/db";
import { request } from "http";
import { NOW, Op, QueryTypes } from "sequelize";
import { userRoles } from "./userRoles";
import bcrypt from 'bcrypt';
import { funcUsers } from "./funcUsers";
import getConfig from "next/config";
import jwt from 'jsonwebtoken';
import { log } from "console";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const funcLogin = {
  checkLogin,
  isLogin,
  checkAuthentication
};

const is_valid_email = (email) => {
  const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return pattern.test(email);
};

//Create Token
function createToken( user ) {
  const currentTime = new Date();
  let token=null;
  let current = new Date();
  const payload = {
    jti: user.username,
    iss: user.display_name,
    // issuedAt: new Date(),
    // expire: new Date( currentTime.getTime() + process.env.LOGIN_TIME * 1000 ),
    nbefore: currentTime,
    role: user.role,
    image: user.image,
    email: user.email,
    phone: user.phone,
  }
  const key = getConfig().serverRuntimeConfig.secret;
  try{
     token = jwt.sign( payload, key, { expiresIn: parseInt(process.env.LOGIN_TIME) });
  } catch ( error ){
    throw new Error("Error from creating Token");
  }
  return token;
}

//Check login from username or email, password form login page
export async function checkLogin(username, password) {
  let user;
  let validLogin = false;
  let message;
  let token;
  try {
    if ( is_valid_email( username ) ) {
      user = await funcUsers.getUserByEmail( username );
    } else {
      user = await funcUsers.getUser( username )
    }
    if ( user ) {
      // console.log('user information:', user);
      validLogin = await bcrypt.compare( password, user.password );
      if ( validLogin ) {
        //create token
        token = createToken( user );
        return token;
      }
      else {
        message = "Wrong password, please try again";
        throw new Error (message);
      }
    }
    else {
      message = "User name or email doesn't exit";
      throw new Error (message);
    }
  }
  catch (error) {
    if( message )
      throw new Error ( error.message );
    else
      throw new Error ( 'System Error, Inform Admin' );
  }
}

function isLogin( token ) {
  let userToken;
  let message;
  let currentTime = new Date();
  try {
    userToken = jwt.verify ( token, getConfig().serverRuntimeConfig.secret);
    console.log('verified token :', userToken);

    if ( userToken.nbefore && userToken.nbefore > currentTime ) {
      message = 'Token is used so soon';
      throw new Error ( message );
    }
    const { jti, issuedAt, expire, nbefore, iat, exp, ...user} = userToken;
    return { isLogin: true, user: user };
  } catch (error) {
    return { isLogin: false, message: message };
  }
}

function checkAuthentication() {
  let token = cookies().get('Authorization');
  console.log('token from cookie:', token);
  if ( !token )
    redirect(`/admin/login`);
  const loginInfo = funcLogin.isLogin ( token.value );  //check the validation of token
  if ( !loginInfo.isLogin ) {                            //INVALID TOKEN
    redirect(`/admin/login?message=${loginInfo.message}`);
  }
  return loginInfo;
}
