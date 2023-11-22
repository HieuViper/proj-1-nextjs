import UserForm from "../_components/UserForm";
import getConfig from "next/config";
import { funcUsers } from "@/library/funcUsers";
import { redirect } from "next/navigation";
import { headers, cookies } from "next/headers";
import { funcLogin } from "@/library/funcLogin";

export const dynamic = "force-dynamic";

const AddUserPage = async () => {
  const loginInfo = funcLogin.checkAuthentication();
  const isAuthorize = await funcLogin.checkAuthorize( loginInfo.user, 'users','add' );

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


  return (
    <>
      <div className="mb-3">
        <div className="text-2xl font-semibold">Add New User</div>
        <span className="text-xs text-gray-400 ">
          Create a brand new user and add them to this site.
        </span>
      </div>
      <UserForm roles={ getConfig().serverRuntimeConfig.userRoles }
                user={ loginInfo.user }
                isAuthorize={ isAuthorize }
                {...{ addUser }}
                />
    </>
  );
};

export default AddUserPage;
