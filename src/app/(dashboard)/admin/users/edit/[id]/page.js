import { UserAddOutlined } from "@ant-design/icons";
import { Button} from "antd";
import Link from "next/link";
import UserForm from "../../_components/UserForm";
import { funcUsers } from "@/library/funcUsers";
import { userRoles } from "@/library/userRoles";
import { headers, cookies } from "next/headers";

const EditUserPage = async ({ params }) => {
  console.log('params: ', params.id);
  const user = await funcUsers.getUser(params.id);

  //update user information
  async function updateUser(userPara) {
    'use server';
    //test cookie
    cookies().set({
      name: 'Authorization',
      value: 'Huy Token',
      httpOnly: true,
      path: '/',
      sameSite: 'lax',  //Strict
      maxAge: 300,
    })

    let message;
    try {
      await funcUsers.updateAUser(userPara);
      message = 1 ;
    } catch (error) {
      message = ` ${error.message}`;
    }
    return message
  }

  const headerInst = headers();
  headerInst.forEach( (value, key) => {
    console.log('key:', key, ' --- value: ', value);
  });

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
                roles={userRoles}
                {...{updateUser}}
      />
    </>
  );
};

export default EditUserPage;
