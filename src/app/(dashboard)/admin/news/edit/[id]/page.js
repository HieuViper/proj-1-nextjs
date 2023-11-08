import { funcNews } from "@/library/funcNews";
import { NewsForm } from "../../_components/NewsForm";
import { db } from "@/config/db";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
async function EditNews({ params, searchParams }) {
    // if( !db.initialized ){
    //     await db.initialize();
    // }
    async function dell(data, newsLangs, id) {
        'use server';
        await funcNews.updateANews(data, newsLangs, id);
        redirect('/admin/news');
    }
    async function editNews(data, newsLangs, id) {
        'use server';
        try {
            await funcNews.updateANews(data, newsLangs, id);
            return { message: 1 };
        } catch (error) {
            return { message: `Fail to update news, try again or inform your admin: ${error.message}` };
        }
    }
    const data = await funcNews.getNews(params.id);
    const cate = await funcNews.getCategories(process.env.DEFAULT_LANGUAGE);
    const tags = await funcNews.getTags(process.env.DEFAULT_LANGUAGE);
    const langTable = await funcNews.getLanguages();
    return (
        <div className="">
            Edit new
            <NewsForm data={JSON.stringify(data)}
                cate={JSON.stringify(cate)}
                tags={JSON.stringify(tags)}
                langTable={JSON.stringify(langTable)}
                {...{ dell, editNews }}
            />
        </div>
    );
}
export default EditNews;