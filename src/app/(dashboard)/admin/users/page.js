import UserList from "./_components/UserList";
import { funcUsers } from "@/library/funcUsers";
import { headers, cookies } from "next/headers";
import { funcLogin } from "@/library/funcLogin";
import { userRoles } from "@/library/userRoles";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const UserPage = async ({ searchParams }) => {

  // let token = cookies().get('Authorization');
  // console.log('token from cookie:', token);
  // if ( !token )
  //   redirect(`/admin/login`);
  // const loginInfo = funcLogin.isLogin ( token.value );
  // if ( !loginInfo.isLogin ) {
  //   redirect(`/admin/login?message=${loginInfo.message}`);
  // }
  const loginInfo = funcLogin.checkAuthentication();


   const keys = searchParams?.keys ?? "";
   const del = searchParams?.del ?? "";
   const role = searchParams?.role ?? "";
   const search = searchParams?.search ?? "";
   const page = searchParams?.page ?? 1;
   const size = searchParams?.size ?? process.env.PAGE_SIZE;
   let orderby = searchParams?.orderby ?? "";
   let order = searchParams?.order ?? "";

   if (keys != '') {
      await funcUsers.deleteBulkUsers(keys);
    }
   if (del != '') {
      await funcUsers.deleteUser(del);
   }
  //  if (Object.keys(searchParams).length == 0) {
  //     orderby = "post_modified";
  //     order = "desc";
  //  }
  console.log('Users list page');
  const usersData = await funcUsers.getUsers(
    role,
    page,
    size,
    search,
    orderby,
    order,
  );
  const totals = await funcUsers.getTotalNumOfUsers( role, search );
  const pagination = {
    pageSize: parseInt(size),
    total: totals.itemsOfTable,
    current: parseInt(page),
    // disabled: true
  };

  console.log('cookies: ', cookies().getAll());
  return (
    <>
      <UserList dataTable={JSON.stringify(usersData)} user={loginInfo.user} roles={userRoles}
        pagination={pagination}
        totals={totals} />
    </>
  );
};

export default UserPage;
