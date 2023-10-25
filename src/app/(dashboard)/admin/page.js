import { Button } from "antd";
import { db } from "@/config/db";
import { QueryTypes } from "sequelize";

const DashboardPage = async () => {
  if( !db.initialized) {
    await db.initialize();

  }
  const createSampleData = () => {
    // for ( let i = 1; i++; i < 100 ){
    //   let news = db.News
    // }
  }
  return (
    <div>
      DashboardPage
      <Button type="primary">Button</Button>
    </div>
  );
};

export default DashboardPage;
