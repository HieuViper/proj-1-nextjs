import UserForm from "../_components/UserForm";
import { userRoles } from "@/library/userRoles";
import { funcUsers } from "@/library/funcUsers";
import { redirect } from "next/navigation";
import { headers, cookies } from "next/headers";
import { log } from "console";

export const dynamic = "force-dynamic";

const AddUserPage = () => {
  async function addUser(user){
    'use server'
    let message = '';
    let username;
    try {
      username = await funcUsers.addAUser( user );
      message = 1;
    } catch (error) {
      message = `Fail to add a user, try again or inform your admin: ${error.message}`;
    }
    console.log('username:', username);
    if (username) {
      redirect(`/admin/users?message=${message}`);
    }

    return message;
  }
  const headerInst = headers();
  headerInst.forEach( (value, key) => {
    console.log('key:', key, ' --- value: ', value);
  });
  console.log('cookie from header', headerInst.getSetCookie());
  console.log('cookies: ', cookies().getAll());


  return (
    <>
      <div className="mb-3">
        <div className="text-2xl font-semibold">Add New User</div>
        <span className="text-xs text-gray-400 ">
          Create a brand new user and add them to this site.
        </span>
      </div>
      <UserForm roles={userRoles} {...{ addUser }} />
    </>
  );
};

export default AddUserPage;
