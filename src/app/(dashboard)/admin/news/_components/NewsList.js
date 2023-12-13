/* eslint-disable @next/next/no-async-client-component */
"use client";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Button, Radio, Select, Space, Table, Tag } from "antd";
import Search from "antd/es/input/Search";
import { format } from "date-fns";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { callAPI, handleNotAuthorized } from "@/library/client/callAPI";
import { useLogin } from "@/store/login";
import { Span } from "next/dist/trace";
const myConstant = require('@/store/constant')

export default function NewsList(props) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  // console.log('search', searchParams.get('status'));

  let orderParaDefault = "";
  let orderParaInit = "";
  const initSort = {
    order: "descend",
    columnKey: "date",
  };
  const [paginationServer, setPaginationServer] = useState({
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
  const [news, setNews] = useState();
  const [langTable, setLangTable] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(searchParams.get("status") ?? "");
  const [search, setSearch] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [lang, setLang] = useState(myConstant.DEFAULT_LANGUAGE);
  const [errorMessage, setErrorMessage] = useState('');   //display the serious error
  const { setLoginForm } = useLogin();    //use to set global state allowing enable the login form.


  useEffect(() => {
    //redirect to login page if user is not authorized
    if( props.isAuthorize == false ) {
      handleNotAuthorized(
        () => { router.push('/login') },
        ( msg ) => { setErrorMessage( msg ) }
      );
    }

    setInitStates( props );
    setLoadingStatus( false );  //when request is sending, and wait for the response, loadingstatus is set true. That disabled all the link, components
    setLoading( false );        //loading is similar to loadingstatus but it is used to display loading message on the button 'bulk delete'

  }, [props]);

  function setInitStates( result ) {
    // const newsData = JSON.parse(props.dataTable);
    // const langData = JSON.parse(props.langTable);
    setLangTable(JSON.parse(result.langTable));
    setNews(JSON.parse(result.dataTable));
    setPaginationServer(result.pagination);
    setTotals(result.totals);
    //Reset the states
    setSelectedRowKeys( [] );
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

  const startDelete = async () => {
    setLoading(true);
    setLoadingStatus(true);
    const current = new URLSearchParams(searchParams);
    const sorter = getOrderPara(sortedInfo, status, false);
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
    current.set("tag", tag);
    current.set("lang", lang);

    //add sorter here
    const searchPara = current.toString();
    const query = searchPara ? `?${searchPara}` : "";
    //router.push(`${pathName}${query}`);
    let { result, res } = await callAPI( await fetch(`/api/news${query}`, {
      method: 'GET',
      cache: 'no-store'
    }),
    ( msg ) => { setErrorMessage( msg ) },
    () => { router.push('/login') },
    () => { setLoginForm( true ) },
  );
  if ( res.status == 200 ) {
    setInitStates( result );
  }
  setLoadingStatus( false );  //when request is sending, and wait for the response, loadingstatus is set true. That disabled all the link, components
  setLoading( false );        //loading is similar to loadingstatus but it is used to display loading message on the button 'bulk delete'

  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async (value) => {
    //set state sorter to init state, that means sort follow the date column
    setSearch(value);
    setLoadingStatus( true );
    const orderPara = orderParaInit;
    // router.push(`${pathName}?status=${status}&lang=${lang}&size=${paginationServer.pageSize}&search=${value}${orderPara}`);
    let query = `?status=${status}&lang=${lang}&size=${paginationServer.pageSize}&search=${value}${orderPara}`;
    let { result, res } = await callAPI( await fetch(`/api/news${query}`, {
        method: 'GET',
        cache: 'no-store'
      }),
      ( msg ) => { setErrorMessage( msg ) },
      () => { router.push('/login') },
      () => { setLoginForm( true ) },
    );
    if ( res.status == 200 ) {
      setInitStates( result );
    }
    setLoadingStatus( false );  //when request is sending, and wait for the response, loadingstatus is set true. That disabled all the link, components
    setLoading( false );        //loading is similar to loadingstatus but it is used to display loading message on the button 'bulk delete'

    //reset the state of filter, we just dont reset filter of status and language.
    setSortedInfo(initSort);
    setAuthor("");
    setCategory("");
    setTag("");
  };

  const handlePostStatus = async (post_status) => {
    //set state sorter to init state, that means sort follow the date column
    setLoadingStatus(true);
    const orderPara = getOrderPara(initSort, post_status, true);
    // router.refresh();
    // router.push(`${pathName}?status=${post_status}&lang=${lang}&size=${paginationServer.pageSize}${orderPara}`);
    let query = `?status=${post_status}&lang=${lang}&size=${paginationServer.pageSize}${orderPara}`;
    let { result, res } = await callAPI( await fetch(`/api/news${query}`, {
        method: 'GET',
        cache: 'no-store'
      }),
      ( msg ) => { setErrorMessage( msg ) },
      () => { router.push('/login') },
      () => { setLoginForm( true ) },
    );
    if ( res.status == 200 ) {
      setInitStates( result );
    }
    setLoadingStatus( false );  //when request is sending, and wait for the response, loadingstatus is set true. That disabled all the link, components
    setLoading( false );        //loading is similar to loadingstatus but it is used to display loading message on the button 'bulk delete'

    //Reset all below states
    setSortedInfo(initSort);
    setStatus(post_status);
    setSearch("");
    setAuthor("");
    setCategory("");
    setTag("");
  };

  const handleAuthorFilter = async (post_author) => {
    const orderPara = orderParaInit;
    setLoadingStatus(true);
    // router.push(`${pathName}?status=${status}&lang=${lang}&size=${paginationServer.pageSize}&author=${post_author}${orderPara}`);

    let query = `?status=${status}&lang=${lang}&size=${paginationServer.pageSize}&author=${post_author}${orderPara}`;
    let { result, res } = await callAPI( await fetch(`/api/news${query}`, {
        method: 'GET',
        cache: 'no-store'
      }),
      ( msg ) => { setErrorMessage( msg ) },
      () => { router.push('/login') },
      () => { setLoginForm( true ) },
    );
    if ( res.status == 200 ) {
      setInitStates( result );
    }
    setLoadingStatus( false );  //when request is sending, and wait for the response, loadingstatus is set true. That disabled all the link, components
    setLoading( false );        //loading is similar to loadingstatus but it is used to display loading message on the button 'bulk delete'

    //Reset all below states
    setSortedInfo(initSort);
    setSearch("");
    setCategory("");
    setTag("");
    setAuthor(post_author);
  };

  const handleCategoryFilter = async (cat) => {
    setLoadingStatus(true);
    const orderPara = orderParaInit;
    // router.push(`${pathName}?status=${status}&lang=${lang}&size=${paginationServer.pageSize}&category=${cat}${orderPara}`);

    let query = `?status=${status}&lang=${lang}&size=${paginationServer.pageSize}&category=${cat}${orderPara}`;
    let { result, res } = await callAPI( await fetch(`/api/news${query}`, {
        method: 'GET',
        cache: 'no-store'
      }),
      ( msg ) => { setErrorMessage( msg ) },
      () => { router.push('/login') },
      () => { setLoginForm( true ) },
    );
    if ( res.status == 200 ) {
      setInitStates( result );
    }
    setLoadingStatus( false );  //when request is sending, and wait for the response, loadingstatus is set true. That disabled all the link, components
    setLoading( false );        //loading is similar to loadingstatus but it is used to display loading message on the button 'bulk delete'

    //Reset all below states
    setSortedInfo(initSort);
    setSearch("");
    setAuthor("");
    setTag("");
    setCategory(cat);
  };

  const handleTagFilter = async (tag) => {
    setLoadingStatus(true);
    const orderPara = orderParaInit;
    // router.push(`${pathName}?status=${status}&lang=${lang}&size=${paginationServer.pageSize}&tag=${tag}${orderPara}`);

    let query = `?status=${status}&lang=${lang}&size=${paginationServer.pageSize}&tag=${tag}${orderPara}`;
    let { result, res } = await callAPI( await fetch(`/api/news${query}`, {
        method: 'GET',
        cache: 'no-store'
      }),
      ( msg ) => { setErrorMessage( msg ) },
      () => { router.push('/login') },
      () => { setLoginForm( true ) },
    );
    if ( res.status == 200 ) {
      setInitStates( result );
    }
    setLoadingStatus( false );  //when request is sending, and wait for the response, loadingstatus is set true. That disabled all the link, components
    setLoading( false );        //loading is similar to loadingstatus but it is used to display loading message on the button 'bulk delete'

    //reset the other filters
    setSortedInfo(initSort);
    setSearch("");
    setAuthor("");
    setCategory("");
    setTag(tag);
  };

  //getOrderParameter for URL
  //parameter: sorter: sort state of the table
  //statusPara: status of table: publish, draft, trash, priority
  const getOrderPara = (sorter, statusPara, stringResult) => {
    if (sorter.order) {
      let order;
      if (sorter.order == "ascend") order = "asc";
      if (sorter.order == "descend") order = "desc";
      let orderby;
      if (sorter.columnKey === "date")
        orderby =
          statusPara === myConstant.post.POST_STATUS_PUBLISH
            ? "post_date"
            : "post_modified";
      else orderby = sorter.columnKey;
      return stringResult
        ? `&orderby=${orderby}&order=${order}`
        : { orderby, order };
    } else return stringResult ? "" : { orderby: null, order: null };
  };
  //set orderPara string
  orderParaDefault = getOrderPara(sortedInfo, status, true);
  orderParaInit = getOrderPara(initSort, status, true);
  //set languages for the languages select box
  let langOptions = langTable.map((lang) => {
    return { value: lang.code, label: lang.name };
  });

  const handleChange = async (pagination, filters, sorter) => {
    setLoadingStatus(true);
    setSortedInfo(sorter);
    const orderPara = getOrderPara(sorter, status, true);
    // router.push(
    //   `${pathName}?page=${pagination.current}&size=${pagination.pageSize}&status=${status}&lang=${lang}&author=${author}&category=${category}&tag=${tag}&search=${search}${orderPara}`
    // );
    let query = `?page=${pagination.current}&size=${pagination.pageSize}&status=${status}&lang=${lang}&author=${author}&category=${category}&tag=${tag}&search=${search}${orderPara}`;
    let { result, res } = await callAPI( await fetch(`/api/news${query}`, {
        method: 'GET',
        cache: 'no-store'
      }),
      ( msg ) => { setErrorMessage( msg ) },
      () => { router.push('/login') },
      () => { setLoginForm( true ) },
    );
    if ( res.status == 200 ) {
      setInitStates( result );
    }
    setLoadingStatus( false );  //when request is sending, and wait for the response, loadingstatus is set true. That disabled all the link, components
    setLoading( false );        //loading is similar to loadingstatus but it is used to display loading message on the button 'bulk delete'

  };

  const handleChangeLanguage = async (langValue) => {
    setLoadingStatus(true);
    setSortedInfo(initSort);
    const orderPara = orderParaInit;
    // router.push(
    //   `${pathName}?status=${status}&size=${paginationServer.pageSize}${orderPara}&lang=${langValue}`
    // );

    let query = `?status=${status}&size=${paginationServer.pageSize}${orderPara}&lang=${langValue}`;
    let { result, res } = await callAPI( await fetch(`/api/news${query}`, {
        method: 'GET',
        cache: 'no-store'
      }),
      ( msg ) => { setErrorMessage( msg ) },
      () => { router.push('/login') },
      () => { setLoginForm( true ) },
    );
    if ( res.status == 200 ) {
      setInitStates( result );
    }
    setLoadingStatus( false );  //when request is sending, and wait for the response, loadingstatus is set true. That disabled all the link, components
    setLoading( false );        //loading is similar to loadingstatus but it is used to display loading message on the button 'bulk delete'

    //reset the other filters

    setSearch("");
    setAuthor("");
    setCategory("");
    setTag("");
    setLang(langValue);
  };

  //console.log('props.cate :', props.cate);
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      fixed: "left",
      sorter: () => {},
      sortOrder: sortedInfo.columnKey === "title" ? sortedInfo.order : null,
      render: (_, record) => {
        //let orderPara = orderParaDefault;
        return (
          <>
            <div className="text-base font-medium pb-2">
              {record.title}
              {record.post_status == "draft" &&
                searchParams.get("status") == "" && (
                  <span className="text-xs"> (Draft)</span>
                )}
              {record.news_position == 1 &&
                searchParams.get("status") == "" && (
                  <span className="text-xs"> (Sticky)</span>
                )}
            </div>
            <div className="flex gap-2">
              {record.post_status !== myConstant.post.POST_STATUS_TRASH ? (
                <>
                { props.roles[props.user.role]?.news?.edit === true && (
                  <>
                    <a href="#" className={loadingStatus == true ? 'disabled-link' : undefined } onClick={ () => {
                      setLoadingStatus(true);
                      router.push(`/admin/news/edit/${record.id}`);
                    }} >
                      <span className="btn-edit">
                        <EditOutlined className="pr-1" />
                        Edit
                      </span>
                    </a>{" "}
                    |
                  </>
                )}
                  { props.roles[props.user.role]?.news?.moveTrash === true && (
                    <>
                      <a href="#" className={loadingStatus == true ? 'disabled-link' : undefined }  onClick={ async () => {
                          setLoadingStatus(true);
                          let query = `?trash=${record.id}&size=${paginationServer.pageSize}&status=${status}&author=${author}&category=${category}&tag=${tag}&search=${search}${orderParaDefault}`;
                          let { result, res } = await callAPI( await fetch(`/api/news${query}`, {
                              method: 'GET',
                              cache: 'no-store'
                            }),
                            ( msg ) => { setErrorMessage( msg ) },
                            () => { router.push('/login') },
                            () => { setLoginForm( true ) },
                          );
                          if ( res.status == 200 ) {
                            setInitStates( result );
                          }
                          setLoadingStatus( false );  //when request is sending, and wait for the response, loadingstatus is set true. That disabled all the link, components
                          setLoading( false );        //loading is similar to loadingstatus but it is used to display loading message on the button 'bulk delete'

                        }} >
                        <span className="btn-trash"  >
                          <DeleteOutlined className="pr-1" />
                          Trash
                        </span>
                      </a>
                    |{" "}
                    </>
                  )}
                  <a href="#"  className={loadingStatus == true ? 'disabled-link' : undefined } onClick={ () => {
                      setLoadingStatus(true);
                      router.push(`/vi/news/preview/${record.id}`);
                    }} >
                    <span className="btn-preview">
                      <EyeOutlined className="pr-1" />
                      Preview
                    </span>
                  </a>
                </>
              ) : (
                <>
                  { props.roles[props.user.role]?.news?.recover === true && (
                    <>
                      <a href="#" className={loadingStatus == true ? 'disabled-link' : undefined }  onClick={ async () => {
                          setLoadingStatus(true);
                          let query = `?recover=${record.id}&size=${paginationServer.pageSize}&status=${status}&author=${author}&category=${category}&tag=${tag}&search=${search}${orderParaDefault}`;
                          let { result, res } = await callAPI( await fetch(`/api/news${query}`, {
                              method: 'GET',
                              cache: 'no-store'
                            }),
                            ( msg ) => { setErrorMessage( msg ) },
                            () => { router.push('/login') },
                            () => { setLoginForm( true ) },
                          );
                          if ( res.status == 200 ) {
                            setInitStates( result );
                          }
                          setLoadingStatus( false );  //when request is sending, and wait for the response, loadingstatus is set true. That disabled all the link, components
                          setLoading( false );        //loading is similar to loadingstatus but it is used to display loading message on the button 'bulk delete'

                        }} >
                        <span className="btn-recover" >
                          <SyncOutlined className="pr-1" />
                          Recover
                        </span>
                      </a>
                      |{" "}
                    </>
                  )}
                    { props.roles[props.user.role]?.news?.delete === true && (
                      <>
                          <a href="#" className={loadingStatus == true ? 'disabled-link' : undefined }  onClick={ async () => {
                              setLoadingStatus(true);
                              let query = `?del=${record.id}&size=${paginationServer.pageSize}&status=${status}&author=${author}&category=${category}&tag=${tag}&search=${search}${orderParaDefault}`;
                              let { result, res } = await callAPI( await fetch(`/api/news${query}`, {
                                  method: 'GET',
                                  cache: 'no-store'
                                }),
                                ( msg ) => { setErrorMessage( msg ) },
                                () => { router.push('/login') },
                                () => { setLoginForm( true ) },
                              );
                              if ( res.status == 200 ) {
                                setInitStates( result );
                              }
                              setLoadingStatus( false );  //when request is sending, and wait for the response, loadingstatus is set true. That disabled all the link, components
                              setLoading( false );        //loading is similar to loadingstatus but it is used to display loading message on the button 'bulk delete'

                            }}>
                            <span className="btn-delete" >
                              <DeleteOutlined className="pr-1" />
                              Delete
                            </span>
                          </a>
                      </>
                    )}
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
      width: 100,
      render: (_, record) => {
        return (
          <a href="#" onClick={() => handleAuthorFilter(record.post_author)} className={loadingStatus == true ? 'disabled-link' : undefined }>
            {record.post_author}
          </a>
        );
      },
    },
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
      width: 200,
      render: (_, record) => {
        const categories = record.categories
          ? record.categories.split(",").map((cat) => cat.trim())
          : [];
        return (
          <>
            {categories.map((cat, index) => (
              <a href="#" onClick={() => handleCategoryFilter(cat)} className={loadingStatus == true ? 'disabled-link' : undefined } key={index}>
                <Tag color="green" style={{ marginBottom: "4px" }}>
                  {cat}
                </Tag>
              </a>
            ))}
          </>
        );
      },
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      width: 200,
      render: (_, record) => {
        const tags = record.tags
          ? record.tags.split(",").map((cat) => cat.trim())
          : [];

        return (
          <>
            {tags.map((tag, index) => (
              <a href="#" onClick={() => handleTagFilter(tag)} key={index} className={loadingStatus == true ? 'disabled-link' : undefined }>
                <Tag color="blue" style={{ marginBottom: "4px" }}>
                  {tag}
                </Tag>
              </a>
            ))}
          </>
        );
      },
    },
    {
      title: "Short",
      dataIndex: "excerpt",
      key: "excerpt",
      render: (_, record) => {
        return <div>{record.excerpt}</div>;
      },
    },

    {
      title: "Date",
      dataIndex: "post_modified",
      key: "date",
      fixed: "right",
      width: 200,
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
     <div className="text-red-500 font-bold">
          { errorMessage }
      </div>
      <div className="flex justify-between mb-4 gap-x-4">
        <div className="flex gap-x-5">
          <p className="font-semibold text-xl pr-4">News</p>
          { props.roles[props.user.role]?.news?.add === true && (
            <Link href={`/admin/news/add`}>
              <Button>Add News </Button>
            </Link>
          )}
          <Select
            defaultValue={myConstant.DEFAULT_LANGUAGE}
            value={lang}
            style={{
              width: 120,
            }}
            onChange={handleChangeLanguage}
            options={langOptions}
          />
        </div>
        <Search
          placeholder="input search text"
          value={search}
          disabled={ loadingStatus }
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
          <span>
            Bulk Delete <DeleteOutlined />
          </span>
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
            defaultValue={searchParams.get("status") ?? ""}
            onChange={(e) => {
              handlePostStatus(e.target.value);
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
        dataSource={news}
        rowKey="id"
        onChange={handleChange}
        pagination={{ ...paginationServer, disabled: loadingStatus }}
        // bordered={true}
        scroll={{
          x: 1300,
        }}
      />
    </>
  );
}
