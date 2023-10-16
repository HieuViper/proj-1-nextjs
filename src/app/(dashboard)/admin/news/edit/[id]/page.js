import { getNews, getCategories, trashNews, recoverNews, publishNews } from "@/library/getNews";
import { NewsForm } from "../../_components/NewsForm";
export const dynamic = "force-dynamic";
async function EditNews({ params, searchParams }) {

    console.log('searchParams :', searchParams);
    const data = await getNews(params.id)
    const cate = await getCategories()

    // const trash = searchParams?.trash ?? "";
    // console.log('trash :', trash);
    // const recover = searchParams?.recover ?? "";
    // const draft = searchParams?.draft ?? "";
    // const publish = searchParams?.publish ?? "";
    // const status = searchParams?.status ?? ""
    // console.log('status :', status);
    // if (status == "trash") {
    //     await trashNews(params.id);
    // }
    // if (status == "draft") {
    //     await recoverNews(params.id);
    // }
    // if (status == "publish") {
    //     await publishNews(params.id);
    // }


    return (
        <div className="">
            Edit new
            <NewsForm data={JSON.stringify(data)} cate={JSON.stringify(cate)} />
        </div>
    );
}
export default EditNews;