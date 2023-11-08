import { db } from "@/config/db";
import { Button } from "antd";

const DashboardPage = async () => {
  // createSampleData();
  if (!db.initialized) {
    await db.initialize();
  }

  return (
    <div>
      DashboardPage
      <Button type="primary">Button</Button>
    </div>
  );
};

export default DashboardPage;
