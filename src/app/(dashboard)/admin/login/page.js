import { Card } from "antd";
import LoginForm from "./_components/LoginForm";
import { funcLogin } from "@/library/funcLogin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import { now } from "sequelize/types/utils";

const LoginPage = () => {
  //Handle login's process
  async function login( username, password ) {
    'use server'
    let message;
    let token;
    try {
      token = await funcLogin.checkLogin( username, password );
      cookies().set({
        name: 'Authorization',
        value: token,
        httpOnly: true,
        path: '/',
        sameSite: 'lax',  //Strict
        maxAge: process.env.LOGIN_TIME,
      });

    } catch (error) {
      message = error.message;
    }
    if( token ) {
      redirect('/admin');
    }
    return message;
  }

  let token = cookies().get('Authorization');
  //console.log('token from cookie:', token);
  let loginInfo;
  if ( token ) {
    loginInfo = funcLogin.isLogin ( token.value );
    console.log('loginInfo:', loginInfo);
    if ( loginInfo.isLogin ) {
      redirect(`/admin`);
    }
}

  return (
    <div className="bg-[url('/background.jpg')] bg-no-repeat bg-center bg-cover min-h-screen flex justify-center items-center">
      <Card className="w-[400px] mx-auto">
        <div className="flex justify-center items-center flex-col gap-3 mb-5">
          <img src="/next.svg" alt="" className="w-32 h-10" />
          <h1 className="font-semibold text-2xl">Admin Portal</h1>
          <p className="font-[500]">Admin Portal for CMS Website</p>
        </div>
        <LoginForm {...{login}} />
      </Card>
    </div>
  );
};

export default LoginPage;
