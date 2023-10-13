import { CategoryForm } from "@/app/(dashboard)/admin/categories/_components/CategoryForm";

function AddCategories() {
  return (
    <div className="h-5/6 grid place-items-center ">
      Add new
      <CategoryForm />
    </div>
  );
}
export default AddCategories;
