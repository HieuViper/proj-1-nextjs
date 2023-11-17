import { funcLogin } from "@/library/funcLogin";
import { Button } from "antd";
import { funcLogin } from "@/library/funcLogin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  // createSampleData();
  // if (!db.initialized) {
  //   await db.initialize();
  // }

  const loginInfo = funcLogin.checkAuthentication();

  return (
    <div>
      DashboardPage
      <Button type="primary">Button</Button>
    </div>
  );
};

export default DashboardPage;
