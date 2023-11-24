import UserList from "./_components/UserList";
import { funcUsers } from "@/library/funcUsers";
import { headers, cookies } from "next/headers";
import { funcLogin } from "@/library/funcLogin";
import { userRoles } from "@/library/userRoles";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const UserPage = async ({ searchParams }) => {

  const loginInfo = funcLogin.checkAuthentication();
  const isAuthorize = await funcLogin.checkAuthorize(loginInfo.user, 'users');

  const res = await fetch('/api/users', {
    method: 'GET',
    cache: 'no-store',
   });

   //if there's an error. Display the error, breaking display the page
   if ( res.ok == false ){
    let err = await res.json();
    throw new Error( err.msg );
   }

  //  const keys = searchParams?.keys ?? "";
  //  const del = searchParams?.del ?? "";
  //  const role = searchParams?.role ?? "";
  //  const search = searchParams?.search ?? "";
  //  const page = searchParams?.page ?? 1;
  //  const size = searchParams?.size ?? process.env.PAGE_SIZE;
  //  let orderby = searchParams?.orderby ?? "";
  //  let order = searchParams?.order ?? "";

  //  if (keys != '') {
  //     await funcUsers.deleteBulkUsers(keys);
  //   }
  //  if (del != '') {
  //     await funcUsers.deleteUser(del);
  //  }

  // console.log('Users list page');
  // const usersData = await funcUsers.getUsers(
  //   role,
  //   page,
  //   size,
  //   search,
  //   orderby,
  //   order,
  // );
  // const totals = await funcUsers.getTotalNumOfUsers( role, search );
  // const pagination = {
  //   pageSize: parseInt(size),
  //   total: totals.itemsOfTable,
  //   current: parseInt(page),
  //   // disabled: true
  // };

  return (
    <>
      <UserList dataTable={JSON.stringify(usersData)} user={loginInfo.user} roles={userRoles}
        isAuthorize={ isAuthorize }
        pagination={pagination}
        totals={totals} />
    </>
  );
};

export default UserPage;
