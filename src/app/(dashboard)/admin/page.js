import { db } from "@/config/db";
import { Button } from "antd";

const DashboardPage = async () => {
  if (db.initialized) {
    await db.initialize();
  }

  // createSampleData();

  return (
    <div>
      DashboardPage
      <Button type="primary">Button</Button>
    </div>
  );
};

export default DashboardPage;
