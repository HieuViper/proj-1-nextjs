import { funcLogin } from "@/library/funcLogin";
import { Button } from "antd";
<<<<<<< HEAD
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
=======
>>>>>>> 5f8aaaba24bf4af60dab634e2a18c6ffeea98f8d

const DashboardPage = async () => {

  console.log('at Admin Page');
  const loginInfo = funcLogin.checkAuthentication();

  return (
    <div>
      DashboardPage
      <Button type="primary">Button</Button>
    </div>
  );
};

export default DashboardPage;
