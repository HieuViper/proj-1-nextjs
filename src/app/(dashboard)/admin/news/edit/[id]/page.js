import { getNews, getCategories, trashNews, recoverNews, publishNews } from "@/library/getNews";
import { NewsForm } from "../../_components/NewsForm";
export const dynamic = "force-dynamic";
async function EditNews({ params, searchParams }) {

    console.log('searchParams :', searchParams);
    const data = await getNews(params.id)
    const cate = await getCategories()
    return (
        <div className="">
            Edit new
            <NewsForm data={JSON.stringify(data)} cate={JSON.stringify(cate)} />
        </div>
    );
}
export default EditNews;