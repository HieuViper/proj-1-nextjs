import UserForm from "../_components/UserForm";
import getConfig from "next/config";
import { funcLogin } from "@/library/funcLogin";

export const dynamic = "force-dynamic";

const AddUserPage = async () => {
  const loginInfo = funcLogin.checkAuthentication();
  const isAuthorize = await funcLogin.checkAuthorize( loginInfo.user, 'users','add' );

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
                />
    </>
  );
};

export default AddUserPage;
