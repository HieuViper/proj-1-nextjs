import { UserAddOutlined } from "@ant-design/icons";
import { Button} from "antd";
import Link from "next/link";
import UserForm from "../../_components/UserForm";
import { funcUsers } from "@/library/funcUsers";
import { userRoles } from "@/library/userRoles";
import { headers, cookies } from "next/headers";
import { funcLogin } from "@/library/funcLogin";
import { newsImgs } from "@/library/newsImgs";

const EditUserPage = async ({ params }) => {
  const loginInfo = funcLogin.checkAuthentication();
  const isAuthorize = await funcLogin.checkAuthorize( loginInfo.user, 'users','edit' );

  let mainImage;
  const user = await funcUsers.getUser(params.id);
  if ( user.image )
    mainImage = await newsImgs.getImage(user.image);

//just for testing headers
  // const headerInst = headers();
  // headerInst.forEach( (value, key) => {
  //   console.log('key:', key, ' --- value: ', value);
  // });

  return (
    <>
      <div className="mb-4 flex items-center gap-3">
        <div className="text-2xl font-semibold">Edit User { user.display_name }</div>
        <Link href={`/admin/users/add`}>
          <Button className="">
            <div className="flex justify-center items-center gap-2">
              Add User
              <UserAddOutlined />
            </div>
          </Button>
        </Link>
      </div>
      <UserForm data={JSON.stringify(user)}
                mainImage={JSON.stringify(mainImage)}
                roles={userRoles}
               // {...{updateUser}}
      />
    </>
  );
};

export default EditUserPage;
