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
  checkLogin,   //check password, username
  isLogin,      //check token
  checkAuthentication,      //check login state
  checkAuthenticationForLoginPage,   //check login state for login page
  checkAuthenticationForLayout,
  logout,
  checkAuthorize,
  checkAuthenticationForApi,
  checkForProtectedApi,
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

// Check the validation of a token, return the object has state { isLogin: boolean, message: string, user: object }
function isLogin( token ) {
  let userToken;
  let message;
  let currentTime = new Date();
  try {
    if ( !token )
      throw new Error('Token is empty');
    userToken = jwt.verify ( token, getConfig().serverRuntimeConfig.secret);
    console.log('verified token :', userToken);

    if ( userToken.nbefore && userToken.nbefore > currentTime ) {
      message = 'Token is used so soon';
      throw new Error ( message );
    }
    const { jti, issuedAt, expire, nbefore, iat, exp, ...user} = userToken;
    return { isLogin: true, user: user };
  } catch (error) {
    console.log('error from isLogin:', error.message);
    return { isLogin: false, message: error.message, user: null };
  }
}

//check authentication for user, if user is not yet logined or token is invalid, we redirect to login page
function checkAuthentication() {
  let token = cookies().get('Authorization');
  console.log('token from cookie Componenent:', token);
  if ( !token ){
    redirect(`/login`);
  }
  const loginInfo = funcLogin.isLogin ( token.value );  //check the validation of token
  if ( loginInfo.isLogin == false ) {                            //INVALID TOKEN
    redirect(`/login?message=${loginInfo.message}`);
  }
  return loginInfo;
}

// check authentication for login page. It is similar the above function
function checkAuthenticationForLoginPage() {
    //check whether user is already logined
    let token = cookies().get('Authorization');
    //console.log('token from cookie:', token);
    let loginInfo;
    if ( token ) {
      loginInfo = funcLogin.isLogin ( token.value );
      //console.log('loginInfo:', loginInfo);
      if ( loginInfo.isLogin ) {
        redirect(`/admin`);
      }
    }
}

//Check authentication for Layout
function checkAuthenticationForLayout() {
  let token = cookies().get('Authorization');
  console.log('token from cookie at layout:', token);
  const loginInfo = token ? funcLogin.isLogin ( token.value ) : null;  //check the validity of token
  return loginInfo;
}

function logout() {
  cookies().delete('Authorization');
  redirect( '/login' );
}

//check authentication for api
function checkAuthenticationForApi() {
  let loginInfo;
  let token = cookies().get('Authorization');
  console.log('token from cookie at API:', token);
  if ( !token ){
    loginInfo = { isLogin: false, message: 'Token is empty', user: null };
    return loginInfo;
  }
  loginInfo = funcLogin.isLogin ( token.value );  //check the validation of token
  return loginInfo;
}

//check the authorization of user for a module , and a feature
async function checkAuthorize( user,  module, feature = null) {
  const roles = getConfig().serverRuntimeConfig.userRoles;
  let isAuthorize = false;
  if ( !feature ){
    isAuthorize = roles[user.role][module] ? true : false
    console.log('authorize without feature:', isAuthorize);
  }
  else
  {
    isAuthorize = roles[user.role][module][feature];
  }
  return isAuthorize;
  }

  //Check for protected API before allowing using the API
  async function checkForProtectedApi(module, feature = null) {
    //Check authentication before using API
    const loginInfo = checkAuthenticationForApi();
    console.log('isLogin?', loginInfo.isLogin);
    if( loginInfo.isLogin == false ) {
      return  { reqStatus: 401 };
    }

    //Check authorization before using API
    const isAuthorize = await checkAuthorize( loginInfo.user, module, feature );
    console.log('isAuthorized?', isAuthorize) ;
    if( isAuthorize == false ) {
      return { reqStatus: 403 };
    }
    return { reqStatus: 200 }
  }