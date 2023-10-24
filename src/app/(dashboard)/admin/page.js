import { Button } from "antd";
import { db } from "@/config/db";
import { QueryTypes } from "sequelize";

const DashboardPage = async () => {
  if( !db.initialized) {
    await db.initialize();
  }
  const news = await db.News.findAll();

  console.log("first news,", JSON.stringify(news[0]));
  const news2 = await db.seq.query("SELECT * FROM news_all WHERE (post_status!='trash' AND language_code='vi'    ) ORDER BY post_modified desc LIMIT 0, 10", { type: QueryTypes.SELECT});
  console.log("news from news table:", news2);

  return (
    <div>
      DashboardPage
      <Button type="primary">Button</Button>
    </div>
  );
};

export default DashboardPage;
