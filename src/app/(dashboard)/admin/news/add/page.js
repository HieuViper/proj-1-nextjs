import { db } from "@/config/db";
import { newsMHandle } from "@/library/getNews";
import { redirect } from "next/navigation";
import { NewsForm } from "../_components/NewsForm";

export const dynamic = "force-dynamic";

async function AddNews() {
  if (!db.initialized) {
    await db.initialize();
  }
  async function addNews(data, newsLangs) {
    "use server";
    let message = "";
    let id;
    try {
      id = await newsMHandle.addANews(data, newsLangs);
      message = 1;
    } catch (error) {
      message = `Fail to add a news, try again or inform your admin: ${error.message}`;
    }
    console.log("id:", id);
    if (id) {
      redirect(`/admin/news/edit/${id}?message=${message}`);
    }

    return message;
  }
  const cate = await newsMHandle.getCategories(process.env.DEFAULT_LANGUAGE);
  const tags = await newsMHandle.getTags(process.env.DEFAULT_LANGUAGE);
  const langTable = await newsMHandle.getLanguages();
  return (
    <div className="">
      <h1>Add new News</h1>
      <NewsForm
        cate={JSON.stringify(cate)}
        tags={JSON.stringify(tags)}
        langTable={JSON.stringify(langTable)}
        {...{ addNews }}
      />
    </div>
  );
}
export default AddNews;
