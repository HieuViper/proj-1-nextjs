import { funcLogin } from "@/library/funcLogin";
import { Card } from "antd";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
const myConstant = require('@/store/constant')
import LoginForm from "./_components/LoginForm";
// import { now } from "sequelize/types/utils";

const LoginPage = () => {
  //Handle login's process
  async function login(username, password) {
    "use server";
    let message;
    let token;
    try {
      token = await funcLogin.checkLogin(username, password);
      cookies().set({
        name: "Authorization",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',  //Strict
        maxAge: myConstant.LOGIN_TIME,
      });
    } catch (error) {
      message = error.message;
    }
    if (token) {
      redirect("/admin");
    }
    return message;
  }

  funcLogin.checkAuthenticationForLoginPage();

  return (
    <div className="bg-[url('/background.jpg')] bg-no-repeat bg-center bg-cover min-h-screen flex justify-center items-center">
      <Card className="w-[400px] mx-auto">
        <div className="flex justify-center items-center flex-col gap-3 mb-5">
          <Image src="/next.svg" width={30} height={30} alt="" className="w-32 h-10" />
          <h1 className="font-semibold text-2xl">Admin Portal</h1>
          <p className="font-[500]">Admin Portal for CMS Website</p>
        </div>
        <LoginForm {...{ login }} />
      </Card>
    </div>
  );
};

export default LoginPage;
