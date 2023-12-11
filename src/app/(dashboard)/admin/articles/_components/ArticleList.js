/* eslint-disable @next/next/no-async-client-component */
"use client";
import { myConstant } from "@/store/constant";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Radio, Select, Space, Table, Tag } from "antd";
import Search from "antd/es/input/Search";
import { format } from "date-fns";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ArticleList = (props) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const initSort = {
    order: "descend",
    columnKey: "date",
  };
  const [paginationServer, setPagination] = useState({
    pageSize: 10,
    total: 0,
    current: 1,
  });

  const [totals, setTotals] = useState({
    itemsOfTable: 0,
    all: 0,
    draft: 0,
    publish: 0,
    trash: 0,
    priority: 0,
  });
  const [sortedInfo, setSortedInfo] = useState(initSort);
  const [articles, setArticles] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(searchParams?.get("status") ?? "");
  const [search, setSearch] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [lang, setLang] = useState("vi");

  //set languages for the languages select box
  let langOptions = JSON.parse(props.langTable).map((lang) => {
    return { value: lang.code, label: lang.name };
  });

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const onSelectChange = (articleSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", articleSelectedRowKeys);
    setSelectedRowKeys(articleSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const startDelete = () => {
    const current = new URLSearchParams(searchParams);
    const sorter = getOrderPara(sortedInfo, false);
    const keys = selectedRowKeys
      .map((key) => `${key},`)
      .join("")
      .slice(0, -1);
    if (sorter.orderby) {
      current.set("order", sorter.order);
      current.set("orderby", sorter.orderby);
    }
    current.set("keys", keys);
    current.set("status", status);
    current.set("size", paginationServer.pageSize);
    current.set("search", search);
    current.set("author", author);
    current.set("category", category);
    current.set("lang", lang);

    //add sorter here
    const searchPara = current.toString();
    const query = searchPara ? `?${searchPara}` : "";
    router.push(`${pathName}${query}`);
  };

  const handleSearch = async (value) => {
    //set state sorter to init state, that means sort follow the date column
    setSortedInfo(initSort);
    const orderPara = getOrderPara(initSort, true);
    router.push(
      `${pathName}?status=${status}&lang=${lang}&size=${paginationServer.pageSize}&search=${value}${orderPara}`
    );
    //reset the state of filter, we just dont reset filter of status and language.
    setSortedInfo({});
    setAuthor("");
    setCategory("");
  };

  const handlePostStatus = async (post_status) => {
    //set state sorter to init state, that means sort follow the date column
    setSortedInfo(initSort);
    const orderPara = getOrderPara(initSort, true);
    router.refresh();
    router.push(
      `${pathName}?status=${post_status}&lang=${lang}&size=${paginationServer.pageSize}${orderPara}`
    );
    //Reset all below states
    setSearch("");
    setAuthor("");
    setCategory("");

    setStatus(post_status);
  };

  const handleAuthorFilter = (post_author) => {
    setSortedInfo(initSort);
    const orderPara = getOrderPara(initSort, true);
    router.push(
      `${pathName}?status=${status}&lang=${lang}&size=${paginationServer.pageSize}&author=${post_author}${orderPara}`
    );
    //Reset all below states
    setSearch("");
    setCategory("");

    setAuthor(post_author);
  };

  const handleCategoryFilter = (cat) => {
    setSortedInfo(initSort);
    const orderPara = getOrderPara(initSort, true);
    router.push(
      `${pathName}?status=${status}&lang=${lang}&size=${paginationServer.pageSize}&category=${cat}${orderPara}`
    );
    //Reset all below states
    setSearch("");
    setAuthor("");

    setCategory(cat);
  };

  //getOrderParameter for URL
  const getOrderPara = (sorter, stringResult) => {
    if (sorter.order) {
      let order;
      if (sorter.order == "ascend") order = "asc";
      if (sorter.order == "descend") order = "desc";
      let orderby;
      if (sorter.columnKey === "date")
        orderby =
          status === myConstant.post.POST_STATUS_PUBLISH
            ? "post_date"
            : "post_modified";
      else orderby = sorter.columnKey;
      return stringResult
        ? `&orderby=${orderby}&order=${order}`
        : { orderby, order };

      //return `&orderby=${orderby}&order=${order}`;
    } else return stringResult ? "" : { orderby: null, order: null };
  };

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
    const orderPara = getOrderPara(sorter, true);
    router.push(
      `${pathName}?page=${pagination.current}&size=${pagination.pageSize}&status=${status}&lang=${lang}&author=${author}&category=${category}&search=${search}${orderPara}`
    );
  };

  const handleChangeLanguage = (langValue) => {
    console.log(langValue);
    setSortedInfo(initSort);
    const orderPara = getOrderPara(initSort, true);
    router.push(
      `${pathName}?status=${status}&size=${paginationServer.pageSize}${orderPara}&lang=${langValue}`
    );
    //reset the other filters

    setSearch("");
    setAuthor("");
    setCategory("");

    setLang(langValue);
  };

  useEffect(() => {
    console.log("vao day");
    const articlesData = JSON.parse(props.dataTable);
    setArticles(articlesData);
    setPagination(JSON.parse(props.pagination));
    setTotals(JSON.parse(props.totals));
    setSelectedRowKeys([]);
    setLoadingStatus(false);
  }, [props]);

  //console.log('props.cate :', props.cate);
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: () => {},
      sortOrder: sortedInfo.columnKey === "title" ? sortedInfo.order : null,
      render: (_, record) => {
        return (
          <>
            <div className="text-base font-medium pb-2">{record.title}</div>
            <div className="flex gap-2">
              {record.post_status !== myConstant.post.POST_STATUS_TRASH ? (
                <>
                  <Link href={`/admin/articles/edit/${record.id}`}>
                    <span className="btn-edit">
                      <EditOutlined className="pr-1" />
                      Edit
                    </span>
                  </Link>{" "}
                  |
                  <Link
                    href={`${pathName}?trash=${record.id}&size=${
                      paginationServer.pageSize
                    }&status=${status}&author=${author}&category=${category}&search=${search}${getOrderPara(
                      sortedInfo,
                      true
                    )}`}
                  >
                    <span className="btn-trash ">
                      <DeleteOutlined className="pr-1" />
                      Trash
                    </span>
                  </Link>
                  |{" "}
                  <Link href={`/vi/articles/preview/${record.id}`}>
                    <span className="btn-preview">
                      <EyeOutlined className="pr-1" />
                      Preview
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={`${pathName}?recover=${record.id}&size=${
                      paginationServer.pageSize
                    }&status=${status}&author=${author}&category=${category}&search=${search}${getOrderPara(
                      sortedInfo,
                      true
                    )}`}
                  >
                    <span className="btn-recover">
                      <SyncOutlined className="pr-1" />
                      Recover
                    </span>
                  </Link>
                  |{" "}
                  <Popconfirm
                    title="Delete the task"
                    icon={
                      <QuestionCircleOutlined
                        style={{
                          color: "red",
                        }}
                      />
                    }
                    description="Are you sure to delete this article?"
                    onConfirm={() =>
                      router.push(
                        `${pathName}?del=${record.id}&size=${
                          paginationServer.pageSize
                        }&status=${status}&author=${author}&category=${category}&search=${search}${getOrderPara(
                          sortedInfo,
                          true
                        )}`
                      )
                    }
                    onCancel={(e) => console.log(e)}
                    okText="Yes"
                    cancelText="Cancel"
                  >
                    <span className="btn-delete cursor-pointer">
                      <DeleteOutlined className="pr-1" />
                      Delete
                    </span>
                  </Popconfirm>
                </>
              )}
            </div>
          </>
        );
      },
    },
    {
      title: "Post Author",
      dataIndex: "post_author",
      key: "post_author",
      render: (_, record) => {
        return (
          <a href="#" onClick={() => handleAuthorFilter(record.post_author)}>
            {record.post_author}
          </a>
        );
      },
    },
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
      width: 300,
      render: (_, record) => {
        const categories = record.categories
          ? record.categories.split(",").map((cat) => cat.trim())
          : [];
        return (
          <>
            {categories.map((cat1, index) => (
              <a
                href="#"
                onClick={() => handleCategoryFilter(cat1)}
                key={index}
              >
                <Tag color="green" style={{ marginBottom: "4px" }}>
                  {cat1}
                </Tag>
              </a>
            ))}
          </>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "post_modified",
      key: "date",
      sorter: () => {},
      sortOrder: sortedInfo.columnKey === "date" ? sortedInfo.order : null,
      render: (_, record) => {
        return (
          <div>
            {record.post_status == myConstant.post.POST_STATUS_PUBLISH ? (
              <>
                Published
                <br />
                {format(new Date(record.post_date), "yyyy/MM/dd 'at' h:mma")}
              </>
            ) : (
              <>
                Last Modified
                <br />
                {format(
                  new Date(record.post_modified),
                  "yyyy/MM/dd 'at' h:mma"
                )}
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex justify-between mb-4 gap-x-4">
        <div className="flex gap-x-5">
          <p className="font-semibold text-xl pr-4">Articles</p>
          <Link href={`/admin/articles/add`}>
            <Button className="">Add Article</Button>
          </Link>
          <Select
            defaultValue="vi"
            value={lang}
            style={{
              width: 120,
            }}
            onChange={handleChangeLanguage}
            options={langOptions}
            // options={[
            //   {
            //     value: "vi",
            //     label: "Tiếng Việt",
            //   },
            //   {
            //     value: "en",
            //     label: "English",
            //   },
            // ]}
          />
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
      <div style={{ marginBottom: 23 }}>
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
            marginRight: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>

        <Space>
          <Radio.Group
            disabled={loadingStatus}
            defaultValue={status}
            onChange={(e) => {
              handlePostStatus(e.target.value), setLoadingStatus(true);
            }}
            optionType="button"
            buttonStyle="solid"
          >
            <Radio.Button value="">All ({totals.all})</Radio.Button>
            <Radio.Button value={myConstant.post.POST_STATUS_DRAFT}>
              Draft({totals.draft})
            </Radio.Button>
            <Radio.Button value={myConstant.post.POST_STATUS_PUBLISH}>
              Publish ({totals.publish})
            </Radio.Button>
            <Radio.Button value={myConstant.post.POST_STATUS_PRIORITY}>
              Priority ({totals.priority})
            </Radio.Button>
            <Radio.Button value={myConstant.post.POST_STATUS_TRASH}>
              Trash ({totals.trash})
            </Radio.Button>
          </Radio.Group>
        </Space>
      </div>
      <Table
        style={{ marginTop: 10 }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={articles}
        rowKey="id"
        onChange={handleChange}
        pagination={paginationServer}
        // bordered={true}
      />
    </>
  );
};

export default ArticleList;
