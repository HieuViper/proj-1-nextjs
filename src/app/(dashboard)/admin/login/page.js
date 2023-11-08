import { Card } from "antd";
import LoginForm from "./_components/LoginForm";

const LoginPage = () => {
  return (
    <div className="bg-[url('/background.jpg')] bg-no-repeat bg-center bg-cover min-h-screen flex justify-center items-center">
      <Card className="w-[400px] mx-auto">
        <div className="flex justify-center items-center flex-col gap-3 mb-5">
          <img src="/next.svg" alt="" className="w-32 h-10" />
          <h1 className="font-semibold text-2xl">Admin Portal</h1>
          <p className="font-[500]">Admin Portal for CMS Website</p>
        </div>
        <LoginForm />
      </Card>
    </div>
  );
};

export default LoginPage;
