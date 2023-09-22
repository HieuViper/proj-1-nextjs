// import newPage from "../../../../admin/products/add/page";
// export default newPage;

import { CategoryForm } from "@/app/components/categories/CategoryForm";
function EditCategories() {
    return (
        <div className="h-5/6 grid place-items-center ">
            Edit new
            <CategoryForm />
        </div>
    );
}
export default EditCategories;