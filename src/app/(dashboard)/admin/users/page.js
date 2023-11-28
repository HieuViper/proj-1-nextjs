import UserList from "./_components/UserList";
import { funcUsers } from "@/library/funcUsers";
import { headers, cookies } from "next/headers";
import { funcLogin } from "@/library/funcLogin";
import getConfig from "next/config";


export const dynamic = "force-dynamic";

const UserPage = async ({ searchParams }) => {

  const loginInfo = funcLogin.checkAuthentication();
  const isAuthorize = await funcLogin.checkAuthorize(loginInfo.user, 'users');

  console.log('isLogin At Page users:', loginInfo.isLogin);
  const result = await funcUsers.userList(loginInfo);
  if ( result.error )
    throw new Error( 'Error: ' + result.msg );


  return (
    <>
      <UserList dataTable={ JSON.stringify( result.users ) }
        user={ loginInfo.user }
        roles={ getConfig().serverRuntimeConfig.userRoles }
        isAuthorize={ isAuthorize }
        pagination={ result.pagination }
        totals={ result.totals } />
    </>
  );
};

export default UserPage;
