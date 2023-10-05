/* eslint-disable @next/next/no-async-client-component */
"use client";
import { Button, Space, Table, Input, Select, Radio, Popconfirm } from "antd";
import Search from "antd/es/input/Search";
import { SearchOutlined, DeleteOutlined, EditOutlined, SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import toast from "react-hot-toast";

function NewsPage() {

  const router = useRouter();
  const [news, setNews] = useState();
  const [cates, setCates] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");


  const searchInput = useRef(null);
  const handleSearchByColumn = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
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
    setLoading(true);
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
        router.refresh();
      });
  };

  const handleSearch = async (value) => {
    const rs = await axios.get(`/api/news/search?q=${value}`);
    setNews(rs.data);
  };

  const handlePostStatus = async (value) => {
    const rs = await axios.get(`/api/news/search?status=${value}&type=${type}`);
    setNews(rs.data);
    setStatus(value)
  };
  const handleType = async (value) => {
    const rs = await axios.get(`/api/news/search?type=${value}&status=${status}`);
    setNews(rs.data);
    setType(value)
  };

  useEffect(() => {
    const fetchProduct = async () => {
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
        setCates(data_cate);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, []);

  // const getColumnSearchProps = (dataIndex) => ({
  //   filterDropdown: ({
  //     setSelectedKeys,
  //     selectedKeys,
  //     confirm,
  //     clearFilters,
  //     close,
  //   }) => (
  //     <div
  //       style={{
  //         padding: 8,
  //       }}
  //       onKeyDown={(e) => e.stopPropagation()}
  //     >
  //       <Input
  //         ref={searchInput}
  //         placeholder={`Search ${dataIndex}`}
  //         value={selectedKeys[0]}
  //         onChange={(e) =>
  //           setSelectedKeys(e.target.value ? [e.target.value] : [])
  //         }
  //         onPressEnter={() =>
  //           handleSearchByColumn(selectedKeys, confirm, dataIndex)
  //         }
  //         style={{
  //           marginBottom: 8,
  //           display: "block",
  //         }}
  //       />
  //       <Space>
  //         <Button
  //           type="primary"
  //           onClick={() =>
  //             handleSearchByColumn(selectedKeys, confirm, dataIndex)
  //           }
  //           icon={<SearchOutlined />}
  //           size="small"
  //           style={{
  //             width: 90,
  //           }}
  //         >
  //           Search
  //         </Button>
  //         <Button
  //           onClick={() => clearFilters && handleReset(clearFilters)}
  //           size="small"
  //           style={{
  //             width: 90,
  //           }}
  //         >
  //           Reset
  //         </Button>
  //         <Button
  //           type="link"
  //           size="small"
  //           onClick={() => {
  //             confirm({
  //               closeDropdown: false,
  //             });
  //             setSearchText(selectedKeys[0]);
  //             setSearchedColumn(dataIndex);
  //           }}
  //         >
  //           Filter
  //         </Button>
  //         <Button
  //           type="link"
  //           size="small"
  //           onClick={() => {
  //             close();
  //           }}
  //         >
  //           close
  //         </Button>
  //       </Space>
  //     </div>
  //   ),
  //   filterIcon: (filtered) => (
  //     <SearchOutlined
  //       style={{
  //         color: filtered ? "#1677ff" : undefined,
  //       }}
  //     />
  //   ),
  //   onFilter: (value, record) =>
  //     record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  //   onFilterDropdownOpenChange: (visible) => {
  //     if (visible) {
  //       setTimeout(() => searchInput.current?.select(), 100);
  //     }
  //   },
  //   render: (text) =>
  //     searchedColumn === dataIndex ? (
  //       <Highlighter
  //         highlightStyle={{
  //           backgroundColor: "#ffc069",
  //           padding: 0,
  //         }}
  //         searchWords={[searchText]}
  //         autoEscape
  //         textToHighlight={text ? text.toString() : ""}
  //       />
  //     ) : (
  //       text
  //     ),
  // });
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      // ...getColumnSearchProps("title"),
      sorter: (a, b) =>
        ("" + a.title).localeCompare(b.title, undefined, { numeric: true }),
    },
    {
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
    },
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
            {cates &&
              cates?.find((item) => item.id == record.category_id)?.name}
          </div>
        );
      },
    },
    {
      title: "News Position",
      dataIndex: "news_position",
      key: "news_position",
      sorter: (a, b) =>
        ("" + a.news_position).localeCompare(b.news_position, undefined, { numeric: true }),

      render: (_, record) => {
        return (
          <div className="font-semibold">
            {record.news_position == 1 ? "OnTop" : "Normal"}
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} type="primary" ghost>
            <Link href={`/admin/news/edit/${record.id}`}>Edit</Link>
          </Button>
          {record.post_status !== "trash" ?
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
                  post_status: "trash",
                  news_code: record.news_code,
                  news_position: record.news_position
                }).then((res) => {
                  handlePostStatus(status)

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
    },
  ];

  return (
    <>
      <div className="flex items-center mb-4 gap-x-4">
        <p className="font-semibold text-xl">news</p>
        <Button className="">
          <Link href={`/admin/news/add`}>Add News</Link>
        </Button>

        <Search
          placeholder="input search text"
          onSearch={(e) => handleSearch(e)}
          enterButton
          style={{
            width: 200,
          }}
          className=" w-56"
        />
      </div>
      <Button
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

        <Radio.Group onChange={(e) => handlePostStatus(e.target.value)} optionType="button"
          buttonStyle="solid">
          <Radio.Button value=""> All</Radio.Button>
          <Radio.Button value="draft">Draft</Radio.Button>
          <Radio.Button value="publish">Publish</Radio.Button>
          <Radio.Button value="trash">Trash</Radio.Button>
        </Radio.Group>
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
      </Space>

      <Table
        style={{ marginTop: 10 }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={news}
        rowKey="id"
      />
    </>
  );
}

export default NewsPage;
