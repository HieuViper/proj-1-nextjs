import { UserAddOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import UserForm from "../../_components/UserForm";

const EditUserPage = () => {
  return (
    <>
      <div className="mb-4 flex items-center gap-3">
        <div className="text-2xl font-semibold">Edit User Huy Quang</div>
        <Link href={`/admin/users/add`}>
          <Button className="">
            <div className="flex justify-center items-center gap-2">
              Add User
              <UserAddOutlined />
            </div>
          </Button>
        </Link>
      </div>
      <UserForm />
    </>
  );
};

export default EditUserPage;
