import { db } from "@/config/db";
import { createSampleData } from "@/library/createSamples";

const StartPage = async () => {
  createSampleData();
  if (!db.initialized) {
    await db.initialize();
  }

  return (
    <div>Start database Page Database is initialized: {db.initialized}</div>
  );
};

export default StartPage;
