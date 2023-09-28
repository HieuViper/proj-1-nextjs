// import newPage from "../../../../admin/products/add/page";
// export default newPage;

import { NewsForm } from "@/app/components/news/NewsForm";
function EditNews() {
    return (
        <div className="h-5/6 grid place-items-center ">
            Edit new
            <NewsForm />
        </div>
    );
}
export default EditNews;