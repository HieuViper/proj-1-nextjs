/* eslint-disable @next/next/no-async-client-component */
"use client";
import { format } from 'date-fns';
import { Button, Space, Table, Input, Select, Radio, Popconfirm, Tag } from "antd";
import Search from "antd/es/input/Search";
import { SearchOutlined, DeleteOutlined, EditOutlined, SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function NewsList( props ) {
  //console.log("data get from server:", props.dataTable);

  let initPagination = {
    pageSize: 10,
    total: 0,
    current:1,
  }
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const [news, setNews] = useState();
  const [pagination, setPagination] = useState(initPagination);
  //const [cates, setCates] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [search, setSearch]  = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(200);
  const [order, setOrder] = useState("");
  const [sortTitle,setsortTitle] = useState(null);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  }
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const startDelete = () => {
    /*setLoading(true);
    console.log(rowSelection);
    axios
      .delete(
        "/api/news/" +
        rowSelection.selectedRowKeys
          .map((item) => `${item};`)
          .join("")
          .slice(0, -1)
      )
      .then((res) => {
        setNews((prevItem) =>
          prevItem.filter(
            (item) => !rowSelection.selectedRowKeys.includes(item.id)
          )
        );

        console.log(res);
        toast.success("Tasks deleted");
        setLoading(false);
        // router.push("/admin/news");
        router.refresh();//2 request cycles


      });*/
      const current = new URLSearchParams(searchParams);
      const keys = selectedRowKeys.map((key) => `${key},`)
      .join("")
      .slice(0,-1);
      current.set("keys", keys);
      current.set("status", status);
      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathName}${query}`);
  };

  const handleSearch = async (value) => {
    //const rs = await axios.get(`/api/news/search?q=${value}`);
    //setNews(rs.data);

    router.push(`${pathName}?status=${status}&size=${pagination.pageSize}&search=${value}${order}`);
  };

  const handlePostStatus = async (post_status) => {
    setSort(null)
    //const rs = await axios.get(`/api/news/search?status=${post_status}&type=${process.env.NEXT_PUBLIC_TYPE_NEWS}`);
    router.push(`${pathName}?status=${post_status}&size=${pagination.pageSize}`);
    //setNews(rs.data);
    setStatus(post_status);
    setSearch("");
  };

const changePagination =(value) => {
  console.log("value",value);
  //const current = new URLSearchParams(searchParams);

  router.push(`${pathName}?page=${value.current}&size=${value.pageSize}&status=${status}&search=${search}${order}`);

}


  /*const handleType = async (value) => {
    const rs = await axios.get(`/api/news/search?type=${value}&status=${status}`);
    setNews(rs.data);
    setType(value)
  };*/

  //we dont need to call api /api/categories

  useEffect(() => {
    /*const fetchProduct = async () => {
      try {
        const { data } = await axios.get("/api/news");
        const { data: data_cate } = await axios.get("/api/categories");
        console.log(
          "🚀 ~ file: page.js:102 ~ fetchProduct ~ data_cate:",
          data_cate
        );
        console.log(
          "🚀 ~ file: NewsForm.js:20 ~ fetchProduct ~ data:",
          data
        );
        setNews(data);
        //setCates(data_cate);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();*/

    const newsData = JSON.parse(props.dataTable);
    setNews(newsData);
    setPagination(props.pagination);
    setSelectedRowKeys([]);
    //removeQueryParamsFromRouter(router);


  }, [props]);


  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      // ...getColumnSearchProps("title"),
      // sorter: (a, b,sortOrder) => {
      //   setSort(sortOrder)
      //   //("" + a.title).localeCompare(b.title, undefined, { numeric: true });
      //   let orderstr;
      //   if( sortOrder=="ascend" ) { orderstr = "asc"; }
      //   else if ( sortOrder=="descend" ) { orderstr = "desc"; }

      //   const orderParameter = sortOrder == "" ? "" : `&orderby=title&order=${orderstr}`;
      //   setOrder(orderParameter);
      //   router.push(`${pathName}?status=${status}&size=${pagination.pageSize}&search=${search}${orderParameter}`);
      //   console.log("sortOrder",orderParameter);
      //   // if(sort=="ascend") {
      //   //   router.push(`${pathName}?status=${status}&size=${pagination.pageSize}&search=${search}&orderby=title&order=asc`);
      //   // }else {
      //   //   router.push(`${pathName}?status=${status}&size=${pagination.pageSize}&search=${search}&orderby=title&order=desc`);

      //   // }
      // },
      // sortOrder:sort,


      sorter:false,
// // sortDirections:"descend",
      sortOrder:sortTitle,
      onCell:(record, rowIndex) => {
        switch(sortTitle) {
          case null:
            setsortTitle("ascend");
            break;
          case "ascend":
            setsortTitle( "descend" );
            break;
          case "descend":
            setsortTitle( null );
        }
//   console.log("record",record)
//   console.log("rowIndex",rowIndex)

     },


      render: (_, record) => {

        return (
          <>
            {record.title}
            <div className='opacity-0 group hover:opacity-100 transition-opacity duration-300'>
              {
              record.post_status !== process.env.NEXT_PUBLIC_PS_TRASH?
              <>
                <Link href={`/admin/news/edit/${record.id}`}>Edit</Link> |
                <Link href={`${pathName}?trash=${record.id}&status=${status}`}> Trash </Link>
                | <Link href={`/vi/news/preview/${record.id}`}>Preview</Link>
              </>
              :
              <>
              <Link href={`${pathName}?recover=${record.id}&status=${status}`}>Recover</Link> | <Link href={`${pathName}?del=${record.id}&status=${status}`}>Delete</Link>
              </>
              }
            </div>
          </>
        );
      },
    },
    /*{
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) =>
        ("" + a.type).localeCompare(b.type, undefined, { numeric: true }),
    },
    {
      title: "Post Status",
      dataIndex: "post_status",
      key: "post_status",
      sorter: (a, b) =>
        ("" + a.post_status).localeCompare(b.post_status, undefined, { numeric: true }),
    },*/
    {
      title: "Post Author",
      dataIndex: "post_author",
      key: "post_author",
      sorter: (a, b) =>
        ("" + a.post_author).localeCompare(b.post_author, undefined, { numeric: true }),
    },
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
      sorter: (a, b) =>
        ("" + a.categories).localeCompare(b.categories, undefined, { numeric: true }),

      render: (_, record) => {
        return (
          <div
            onClick={() =>
              router.push(`/admin/categories/edit/${record.category_id}`)
            }
            className="cursor-pointer hover:text-sky-500"
          >
            {/*cates &&
              cates?.find((item) => item.id == record.category_id)?.name*/
              record.categories}
          </div>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "post_modified",
      key: "date",
      sorter: (a, b) =>
        ("" + a.news_position).localeCompare(b.news_position, undefined, { numeric: true }),

      render: (_, record) => {
        return (
          <div>
            {
            record.post_status == process.env.NEXT_PUBLIC_PS_PUBLISH?
              <>Published<br/>{format(new Date(record.post_date), "yyyy/MM/dd 'at' h:mma")}</>
              :
              <>Last Modified<br/>{format(new Date(record.post_modified), "yyyy/MM/dd 'at' h:mma")}</>
            }
          </div>
        );
      },
    },
    /*{
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} type="primary" ghost>
            <Link href={`/admin/news/edit/${record.id}`}>Edit</Link>
          </Button>
          {record.post_status !== "trash" ? //move this api to server actions
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => {
                axios.put("/api/news/" + record.id, {
                  title: record.title,
                  type: record.type,
                  categories: record.categories,
                  post_author: record.post_author,
                  post_date: record.post_date,
                  excerpt: record.excerpt,
                  content: record.content,
                  post_status: "trash",// only need this
                  news_code: record.news_code,
                  news_position: record.news_position
                }).then((res) => {
                  handlePostStatus(status) //need to set default for state status

                });
                toast.success("Move to trash success");
                // router.refresh();
              }}
            >
              <a>Move to trash</a>
            </Button> :
            <div className="flex gap-3">
              <Button
                style={{
                  borderColor: 'green',
                  color: 'green'
                }}
                icon={<SyncOutlined />}
                onClick={() => {
                  axios.put("/api/news/" + record.id, {
                    title: record.title,
                    type: record.type,
                    categories: record.categories,
                    post_author: record.post_author,
                    post_date: record.post_date,
                    excerpt: record.excerpt,
                    content: record.content,
                    post_status: "draft",
                    news_code: record.news_code,
                    news_position: record.news_position
                  }).then((res) => {
                    handlePostStatus(status)
                  });;
                  toast.success("Recover success");
                  // router.refresh();
                }}
              >
                Recover
              </Button>

              {status == "trash" && <Popconfirm
                title="Confirmation required"
                description="Are you sure you want to remove this item?
                 Item cannot recovered once deleted!"
                onConfirm={() => {
                  axios.delete("/api/news/" + record.id).then((res) => {
                    setNews((prevItem) =>
                      prevItem.filter((item) => item.id !== record.id)
                    );
                  });
                  toast.success("Task deleted");
                  // router.push("/admin/news");
                  router.refresh();
                }}

                okText="Yes"
                cancelText="No"
              >
                <Button
                  icon={<DeleteOutlined />}
                  type="primary"
                  danger >Delete</Button>
              </Popconfirm>}

            </div>
          }

        </Space>
      ),
    },*/
  ];

  return (
    <>
      <div className="flex items-center mb-4 gap-x-4">
        <p className="font-semibold text-xl">News</p>
        <Button className="">
          <Link href={`/admin/news/add`}>Add News</Link>
        </Button>

        <Search
          placeholder="input search text"
          value={search}
          onChange={(e) => onSearchChange(e)}
          onSearch={(e) => handleSearch(e)}
          enterButton
          style={{
            width: 200,
          }}
          className=" w-56"
        />
      </div>
      <Button //change this button to a submit button to call server action
        type="primary"
        danger
        onClick={startDelete}
        disabled={!hasSelected}
        loading={loading}
      >
        Bulk Delete
      </Button>
      <span
        style={{
          marginLeft: 8,
          marginRight: 8
        }}
      >
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
      </span>

      <Space>

        <Radio.Group defaultValue={""} onChange={(e) => handlePostStatus(e.target.value)} optionType="button"
          buttonStyle="solid">
          <Radio.Button value="">All</Radio.Button>
          <Radio.Button value={process.env.NEXT_PUBLIC_PS_DRAFT}>Draft</Radio.Button>
          <Radio.Button value={process.env.NEXT_PUBLIC_PS_PUBLISH}>Publish</Radio.Button>
          <Radio.Button value={process.env.NEXT_PUBLIC_PS_TRASH}>Trash</Radio.Button>
        </Radio.Group>
        {/*
        <Select style={{
          width: 120,
        }}
          defaultValue=""
          onChange={(e) => handleType(e)}
        >
          <Option value={""}>All type</Option>
          <Option value={"article"}>Articles</Option>
          <Option value={"news"}>News</Option>
        </Select>
      */}
      </Space>

      <Table
        style={{ marginTop: 10 }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={news}
        rowKey="id"
        onChange={(value)=>changePagination(value)}
        pagination={pagination}
      />

    </>
  );
}

