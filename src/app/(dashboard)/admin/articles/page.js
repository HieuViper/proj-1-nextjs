"use client";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Search from "antd/es/input/Search";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import toast from "react-hot-toast";

const ArticlePage = () => {
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearchByColumn(selectedKeys, confirm, dataIndex)
          }
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearchByColumn(selectedKeys, confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title"),
      sorter: (a, b) =>
        ("" + a.title).localeCompare(b.title, undefined, { numeric: true }),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Category",
      dataIndex: "category_id",
      key: "category_id",
      onCell: (record) => {},

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
      title: "Active",
      dataIndex: "active",
      key: "active",
      onCell: (record) => {},

      render: (_, record) => {
        return (
          <div className="font-semibold">
            {record.active == 1 ? "True" : "False"}
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button>
            <Link href={`/admin/articles/edit/${record.id}`}>Edit</Link>
          </Button>
          <Button
            danger
            onClick={() => {
              axios.delete("/api/articles/" + record.id).then((res) => {
                setArticles((prevItem) =>
                  prevItem.filter((item) => item.id !== record.id)
                );
              });
              toast.success("Task deleted");
              // router.push("/admin/articles");
              router.refresh();
            }}
          >
            <a>Delete</a>
          </Button>
        </Space>
      ),
    },
  ];
  const router = useRouter();
  const [articles, setArticles] = useState();
  const [cates, setCates] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
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
        "/api/articles/" +
          rowSelection.selectedRowKeys
            .map((item) => `${item};`)
            .join("")
            .slice(0, -1)
      )
      .then((res) => {
        setArticles((prevItem) =>
          prevItem.filter(
            (item) => !rowSelection.selectedRowKeys.includes(item.id)
          )
        );

        console.log(res);
        toast.success("Tasks deleted");
        setLoading(false);
        // router.push("/admin/articles");
        router.refresh();
      });
  };

  const handleSearch = async (value) => {
    const rs = await axios.get(`/api/articles/search?q=${value}`);
    setArticles(rs.data);
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get("/api/articles");
        const { data: data_cate } = await axios.get("/api/categories");
        console.log(
          "🚀 ~ file: page.js:102 ~ fetchProduct ~ data_cate:",
          data_cate
        );
        console.log(
          "🚀 ~ file: ArticlesForm.js:20 ~ fetchProduct ~ data:",
          data
        );
        setArticles(data);
        setCates(data_cate);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <>
      <div className="flex items-center mb-4 gap-x-4">
        <p className="font-semibold text-xl">Articles</p>
        <Button className="">
          <Link href={`/admin/articles/add`}>Add article</Link>
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
        }}
      >
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
      </span>

      <Table
        style={{ marginTop: 10 }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={articles}
        rowKey="id"
      />
    </>
  );
};

export default ArticlePage;
