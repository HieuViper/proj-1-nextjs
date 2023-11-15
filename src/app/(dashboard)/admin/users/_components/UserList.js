"use client";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Button, Radio, Select, Space, Table, Tag } from "antd";
import { Popconfirm } from "antd/es/popconfirm";
import Search from "antd/es/input/Search";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import http, { request } from 'http';
import Head from "next/head";
import { Header } from "antd/es/layout/layout";
//import { setCookie  } from 'js-cookie';

const UserList = ( props ) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  let orderParaDefault = ""; //this orderPara is built from current role and sorted state
  let orderParaInit = "";    // this orderPara is build from current role and initSort variable
  const initSort = {
    order: null,
    columnKey: null,
  };
  const [paginationServer, setPaginationServer] = useState({
    pageSize: 10,
    total: 0,
    current: 1,
  });


  const [totals, setTotals] = useState({});
  const [sortedInfo, setSortedInfo] = useState(initSort);
  const [users, setUsers] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(searchParams.get("role") ?? "");
  const [search, setSearch] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [roles, setRoles] = useState({});   //contain all the role and the number of records for each role { Aministrator: 20, Editor: 100 }

  useEffect(() => {
    setUsers( JSON.parse( props.dataTable ) );
    setPaginationServer( props.pagination );
    setTotals( props.totals );
    const { itemsOfTable, all, ...rolesData} = props.totals;
    setRoles( rolesData );
    setSelectedRowKeys( [] );
    setLoadingStatus( false );
    setLoading( false );
    notifyAddUserSuccess();
  }, [props]);

  //Notify success adding new from /admin/add
  function notifyAddUserSuccess() {
    //get message redirected from add user route
      const message = searchParams.get("message") ?? "";
      if (message == 1) {
        //signal of success edit on server
        let messageNotify = "Add user successfully";
        toast.success(messageNotify, {
          position: "top-center",
        });
      }
  }

  const onSelectChange = (newSelectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  //Bulk delete
  const startDelete = () => {
    setLoading( true );
    const current = new URLSearchParams(searchParams);
    const sorter = getOrderPara(sortedInfo, false);
    const keys = selectedRowKeys
      .map((key) => `${key},`)
      .join("")
      .slice(0, -1);

    current.set("keys", keys);
    current.set("size", paginationServer.pageSize);
    current.set("role", role);
    current.set("search", search);
    if (sorter.orderby) {
      current.set("order", sorter.order);
      current.set("orderby", sorter.orderby);
    }

    const searchPara = current.toString();
    const query = searchPara ? `?${searchPara}` : "";
    router.push(`${pathName}${query}`);
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearch = async (value) => {
    //set state sorter to init state, that means sort follow the date column
    setSearch(value);
    const orderPara = orderParaInit;
    router.push(
      `${pathName}?role=${role}&size=${paginationServer.pageSize}&search=${value}${orderPara}`
    );
    //reset the state of filter, we just dont reset filter of status and language.
    setSortedInfo(initSort);
  };

  const handleRole = async ( role ) => {
    //set state sorter to init state

    const orderPara = getOrderPara(initSort, true);
    router.refresh();
    router.push(
      `${pathName}?role=${role}&size=${paginationServer.pageSize}${orderPara}`
    );
    //Reset all below states
    setSortedInfo(initSort);
    setRole(role);
    setSearch("");
  };

  //getOrderParameter for URL
  //parameter: sorter: sort state of the table
  //statusPara: status of table: publish, draft, trash, priority
  const getOrderPara = (sorter, stringResult) => {
    if (sorter.order) {
      let order;
      if (sorter.order == "ascend") order = "asc";
      if (sorter.order == "descend") order = "desc";
      let orderby;
      orderby = sorter.columnKey;
      return stringResult
        ? `&orderby=${orderby}&order=${order}`
        : { orderby, order };
    } else return stringResult ? "" : { orderby: null, order: null };
  };
  //set orderPara string
  orderParaDefault = getOrderPara(sortedInfo, true);
  orderParaInit = getOrderPara(initSort, true);
  //set languages for the languages select box

  const handleChange = (pagination, filters, sorter) => {
    setLoadingStatus(true);
    setSortedInfo(sorter);
    const orderPara = getOrderPara(sorter, true);
    router.push(
      `${pathName}?page=${pagination.current}&size=${pagination.pageSize}&role=${role}&search=${search}${orderPara}`
    );
  };


  // var options = {
  //   port: 3000,
  //   host: 'localhost',
  // };
  // let request = http.request(options);
  // request.setHeader('Authorization', 'my Token');
  // console.log('Request:', request);
  // request.end();
/*
  const header1 = new Headers();
  header1.set('Authorization','huy token');
  console.log("header1:", header1.get('Authorization'));
  */
/*
  const postData = JSON.stringify({
    'msg': 'Hello World!',
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/admin/users/add',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
      'Authorization': 'huy Token'
    },
  };

  const options2 = new URL('http://abc:xyz@example.com');

  const req = http.request(options2, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  // Write data to request body
  req.write(postData);
  req.end()
*/


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
                <Link href={`/admin/users/edit/${record.username}`}>
                  <span className="btn-edit">
                    <EditOutlined className="pr-1" />
                    Edit
                  </span>
                </Link>{" "}
                |
                {/* <Popconfirm
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
                > */}
                  <span className="btn-delete cursor-pointer">
                    <DeleteOutlined className="pr-1" />
                    Delete
                  </span>
                {/* </Popconfirm> */}
                |{" "}
                <Link href={`/vi/users/preview/${record.username}`}>
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
      dataIndex: "display_name",
      key: "display_name",
      render: (_, record) => {
        return <p>{record.display_name}</p>;
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
      dataIndex: "num_posts ",
      key: "num_posts ",
      // sortOrder: sortedInfo.columnKey === "date" ? sortedInfo.order : null,
      render: (_, record) => {
        return <div>{record.num_posts}</div>;
      },
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
          onChange={(e) => onSearchChange(e)}
          onSearch={(e) => handleSearch(e)}
          enterButton
          style={{
            width: 250,
          }}
        />
      </div>

      <div className="flex items-center gap-2 mb-3">
      <Space>
          <Radio.Group
            disabled={loadingStatus}
            defaultValue={ searchParams.get("role") ?? "" }
            onChange={(e) => {
              handleRole(e.target.value);
              setLoadingStatus(true);
            }}
            optionType="button"
            buttonStyle="solid"
          >
            <Radio.Button value="" key="AllRoles">All ({totals.all})</Radio.Button>
            {
              Object.keys(roles).map((aRow) => (
                <Radio.Button value={ aRow } key={ aRow }>
                  { aRow }({ roles[aRow] })
                </Radio.Button>
              ))
            }
          </Radio.Group>
        </Space>
      </div>

      <div className="mb-3">
        {/* <Popconfirm
          title="Delete users"
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
        > */}
          <Button
            type="primary"
            danger
            onClick={startDelete}
            disabled={!hasSelected}
            loading={loading}
          >
            <div className="flex justify-center items-center gap-2">
              Bulk Delete <DeleteOutlined />
            </div>
          </Button>
        {/* </Popconfirm> */}

        <span className="mx-2 italic">
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table
        //style={{ marginTop: 10 }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={users}
        rowKey="username"
        onChange={handleChange}
        pagination={{ ...paginationServer, disabled: loadingStatus }}
        // bordered={true}
        scroll={{
          x: 1300,
        }}
      />
    </>
  );
};

export default UserList;
