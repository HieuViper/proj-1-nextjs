import { funcLogin } from "@/library/funcLogin";
import { Button } from "antd";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
