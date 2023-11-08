import UserForm from "../_components/UserForm";

const AddUserPage = () => {
  return (
    <>
      <div className="mb-3">
        <div className="text-2xl font-semibold">Add New User</div>
        <span className="text-xs text-gray-400 ">
          Create a brand new user and add them to this site.
        </span>
      </div>
      <UserForm />
    </>
  );
};

export default AddUserPage;
