"use client";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import Search from "antd/es/input/Search";
import Link from "next/link";
import { useState } from "react";

const UserList = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [paginationServer, setPagination] = useState({
    pageSize: 10,
    total: 0,
    current: 1,
  });

  // bulk delete
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const startDelete = () => {};
  const handleChange = (pagination, filters, sorter) => {};

  //Table Columns
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: () => {},
      // sortOrder: sortedInfo.columnKey === "title" ? sortedInfo.order : null,
      render: (_, record) => {
        return (
          <>
            <div className="text-base font-medium pb-2">{record.username}</div>
            <div className="flex gap-2">
              <>
                <Link href={`/admin/users/edit/${record.id}`}>
                  <span className="btn-edit">
                    <EditOutlined className="pr-1" />
                    Edit
                  </span>
                </Link>{" "}
                |
                <Popconfirm
                  title="Delete the task"
                  icon={
                    <QuestionCircleOutlined
                      style={{
                        color: "red",
                      }}
                    />
                  }
                  description="Are you sure to delete this user?"
                  onConfirm={() => {}}
                  onCancel={(e) => console.log(e)}
                  okText="Yes"
                  cancelText="Cancel"
                >
                  <span className="btn-delete cursor-pointer">
                    <DeleteOutlined className="pr-1" />
                    Delete
                  </span>
                </Popconfirm>
                |{" "}
                <Link href={`/vi/users/preview/${record.id}`}>
                  <span className="btn-preview">
                    <EyeOutlined className="pr-1" />
                    Preview
                  </span>
                </Link>
              </>
            </div>
          </>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return <p>{record.name}</p>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => {
        return (
          <>
            <Link href={`mailto:${record.email}`}>{record.email}</Link>
          </>
        );
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_, record) => {
        return (
          <>
            <p>{record.role}</p>
          </>
        );
      },
    },
    {
      title: "Post",
      dataIndex: "post_number",
      key: "post_number",
      // sortOrder: sortedInfo.columnKey === "date" ? sortedInfo.order : null,
      render: (_, record) => {
        return <div>{record.post_number}</div>;
      },
    },
  ];

  //Table data source
  const users = [
    {
      id: 1,
      username: "huy",
      name: "pham quang huy",
      email: "huy@gmail.com",
      role: "administrator",
      post_number: "88",
    },
    {
      id: 2,
      username: "hieu",
      name: "phan minh hieu",
      email: "hieu@gmail.com",
      role: "administrator",
      post_number: "68",
    },
    {
      id: 3,
      username: "cao",
      name: "nguyen truong cao",
      email: "cao@gmail.com",
      role: "administrator",
      post_number: "77",
    },
  ];

  return (
    <>
      <div className="flex justify-between mb-4 gap-x-4">
        <div className="flex gap-x-5">
          <p className="font-semibold text-2xl pr-4">Users</p>
          <Link href={`/admin/users/add`}>
            <Button className="">
              <div className="flex justify-center items-center gap-2">
                Add User
                <UserAddOutlined />
              </div>
            </Button>
          </Link>
        </div>
        <Search
          placeholder="input search text"
          value={search}
          // onChange={(e) => onSearchChange(e)}
          // onSearch={(e) => handleSearch(e)}
          enterButton
          style={{
            width: 250,
          }}
        />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Link href="" className="font-bold">
          All (3)
        </Link>{" "}
        |
        <Link href="" className="">
          Administrator (2)
        </Link>{" "}
        |
        <Link href="" className="">
          Editor (1)
        </Link>
      </div>

      <div className="mb-3">
        <Popconfirm
          title="Delete the task"
          description={`Are you sure to delete ${selectedRowKeys.length} items?`}
          icon={
            <QuestionCircleOutlined
              style={{
                color: "red",
              }}
            />
          }
          onConfirm={startDelete}
          onCancel={() => {}}
          okText="Yes"
          cancelText="Cancel"
        >
          <Button
            type="primary"
            danger
            disabled={!hasSelected}
            loading={loading}
          >
            <div className="flex justify-center items-center gap-2">
              Bulk Delete <DeleteOutlined />
            </div>
          </Button>
        </Popconfirm>

        <span className="mx-2 italic">
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table
        style={{ marginTop: 10 }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={users}
        rowKey="id"
        onChange={handleChange}
        pagination={paginationServer}
        // bordered={true}
      />
    </>
  );
};

export default UserList;
