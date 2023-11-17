import { db } from "@/config/db";
import { Button } from "antd";
import { funcLogin } from "@/library/funcLogin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const StartPage = async () => {
  //createSampleData();
  if (!db.initialized) {
    await db.initialize();
  }



  return (
    <div>
      Start database Page
      Database is initialized: { db.initialized }
    </div>
  );
};

export default StartPage;
