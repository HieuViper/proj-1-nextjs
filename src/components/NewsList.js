/* eslint-disable @next/next/no-async-client-component */
'use client';
import { format } from 'date-fns';
import {
  Button,
  Space,
  Table,
  Input,
  Select,
  Radio,
  Popconfirm,
  Tag,
} from 'antd';
import Search from 'antd/es/input/Search';
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function NewsList(props) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const initSort = {
    order: 'descend',
    columnKey: 'date',
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
  const [news, setNews] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [tag, setTag] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [lang, setLang] = useState('vi');

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
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
      .join('')
      .slice(0, -1);
    if (sorter.orderby) {
      current.set('order', sorter.order);
      current.set('orderby', sorter.orderby);
    }
    current.set('keys', keys);
    current.set('status', status);
    current.set('size', paginationServer.pageSize);
    current.set('search', search);
    current.set('author', author);
    current.set('category', category);
    current.set('tag', tag);
    current.set('lang', lang);

    //add sorter here
    const searchPara = current.toString();
    const query = searchPara ? `?${searchPara}` : '';
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
    setAuthor('');
    setCategory('');
    setTag('');
  };

  const handlePostStatus = async (post_status) => {
    //set state sorter to init state, that means sort follow the date column
    setSortedInfo(initSort);
    const orderPara = getOrderPara(initSort, true);
    router.push(
      `${pathName}?status=${post_status}&lang=${lang}&size=${paginationServer.pageSize}${orderPara}`
    );
    //Reset all below states
    setSearch('');
    setAuthor('');
    setCategory('');
    setTag('');
    setStatus(post_status);
  };

  const handleAuthorFilter = (post_author) => {
    setSortedInfo(initSort);
    const orderPara = getOrderPara(initSort, true);
    router.push(
      `${pathName}?status=${status}&lang=${lang}&size=${paginationServer.pageSize}&author=${post_author}${orderPara}`
    );
    //Reset all below states
    setSearch('');
    setCategory('');
    setTag('');
    setAuthor(post_author);
  };

  const handleCategoryFilter = (cat) => {
    setSortedInfo(initSort);
    const orderPara = getOrderPara(initSort, true);
    router.push(
      `${pathName}?status=${status}&lang=${lang}&size=${paginationServer.pageSize}&category=${cat}${orderPara}`
    );
    //Reset all below states
    setSearch('');
    setAuthor('');
    setTag('');
    setCategory(cat);
  };

  const handleTagFilter = (tag1) => {
    setSortedInfo(initSort);
    const orderPara = getOrderPara(initSort, true);
    router.push(
      `${pathName}?status=${status}&lang=${lang}&size=${paginationServer.pageSize}&tag=${tag1}${orderPara}`
    );
    //reset the other filters

    setSearch('');
    setAuthor('');
    setCategory('');
    setTag(tag1);
  };

  //getOrderParameter for URL
  const getOrderPara = (sorter, stringResult) => {
    if (sorter.order) {
      let order;
      if (sorter.order == 'ascend') order = 'asc';
      if (sorter.order == 'descend') order = 'desc';
      let orderby;
      if (sorter.columnKey === 'date')
        orderby =
          status === process.env.NEXT_PUBLIC_PS_PUBLISH
            ? 'post_date'
            : 'post_modified';
      else orderby = sorter.columnKey;
      return stringResult
        ? `&orderby=${orderby}&order=${order}`
        : { orderby, order };

      //return `&orderby=${orderby}&order=${order}`;
    } else return stringResult ? '' : { orderby: null, order: null };
  };

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
    const orderPara = getOrderPara(sorter, true);
    router.push(
      `${pathName}?page=${pagination.current}&size=${pagination.pageSize}&status=${status}&lang=${lang}&author=${author}&category=${category}&tag=${tag}&search=${search}${orderPara}`
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

    setSearch('');
    setAuthor('');
    setCategory('');
    setTag('');
    setLang(langValue);
  };

  useEffect(() => {
    const newsData = JSON.parse(props.dataTable);
    setNews(newsData);
    setPagination(props.pagination);
    setTotals(props.totals);
    setSelectedRowKeys([]);
    setLoadingStatus(false);
  }, [props]);

  //console.log('props.cate :', props.cate);
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: () => {},
      sortOrder: sortedInfo.columnKey === 'title' ? sortedInfo.order : null,
      render: (_, record) => {
        return (
          <>
            <div className="text-base font-medium pb-2">{record.title}</div>
            <div className="flex gap-2">
              {record.post_status !== process.env.NEXT_PUBLIC_PS_TRASH ? (
                <>
                  <Link href={`/admin/news/edit/${record.id}`}>
                    <span className="btn-edit">
                      <EditOutlined className="pr-1" />
                      Edit
                    </span>
                  </Link>{' '}
                  |
                  <Link
                    href={`${pathName}?trash=${record.id}&size=${
                      paginationServer.pageSize
                    }&status=${status}&author=${author}&category=${category}&tag=${tag}&search=${search}${getOrderPara(
                      sortedInfo,
                      true
                    )}`}
                  >
                    <span className="btn-trash ">
                      <DeleteOutlined className="pr-1" />
                      Trash
                    </span>
                  </Link>
                  |{' '}
                  <Link href={`/vi/news/preview/${record.id}`}>
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
                    }&status=${status}&author=${author}&category=${category}&tag=${tag}&search=${search}${getOrderPara(
                      sortedInfo,
                      true
                    )}`}
                  >
                    <span className="btn-recover">
                      <SyncOutlined className="pr-1" />
                      Recover
                    </span>
                  </Link>
                  |{' '}
                  <Link
                    href={`${pathName}?del=${record.id}&size=${
                      paginationServer.pageSize
                    }&status=${status}&author=${author}&category=${category}&tag=${tag}&search=${search}${getOrderPara(
                      sortedInfo,
                      true
                    )}`}
                  >
                    <span className="btn-delete">
                      <DeleteOutlined className="pr-1" />
                      Delete
                    </span>
                  </Link>
                </>
              )}
            </div>
          </>
        );
      },
    },
    {
      title: 'Post Author',
      dataIndex: 'post_author',
      key: 'post_author',
      render: (_, record) => {
        return (
          <a href="#" onClick={() => handleAuthorFilter(record.post_author)}>
            {record.post_author}
          </a>
        );
      },
    },
    {
      title: 'Categories',
      dataIndex: 'categories',
      key: 'categories',
      width: 300,
      render: (_, record) => {
        const categories = record.categories
          ? record.categories.split(',').map((cat) => cat.trim())
          : [];
        return (
          <>
            {categories.map((cat1, index) => (
              <div key={index}>
                <a href="#" onClick={() => handleCategoryFilter(cat1)}>
                  {cat1}
                </a>
                {index < categories.length - 1 && ', '}
              </div>
            ))}
          </>
        );
      },
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (_, record) => {
        const tags = record.tags
          ? record.tags.split(',').map((cat) => cat.trim())
          : [];

        return (
          <>
            {tags.map((tag1, index) => (
              <div key={index}>
                <a href="#" onClick={() => handleTagFilter(tag1)}>
                  {tag1}
                </a>
                {index < tags.length - 1 && ', '}
              </div>
            ))}
          </>
        );
      },
    },
    {
      title: 'Date',
      dataIndex: 'post_modified',
      key: 'date',
      sorter: () => {},
      sortOrder: sortedInfo.columnKey === 'date' ? sortedInfo.order : null,
      render: (_, record) => {
        return (
          <div>
            {record.post_status == process.env.NEXT_PUBLIC_PS_PUBLISH ? (
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
          <p className="font-semibold text-xl pr-4">News</p>
          <Button className="">
            <Link href={`/admin/news/add`}>Add News</Link>
          </Button>
          <Select
            defaultValue="vi"
            value={lang}
            style={{
              width: 120,
            }}
            onChange={handleChangeLanguage}
            options={[
              {
                value: 'vi',
                label: 'Tiếng Việt',
              },
              {
                value: 'en',
                label: 'English',
              },
            ]}
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
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>

        <Space>
          <Radio.Group
            disabled={loadingStatus}
            defaultValue={''}
            onChange={(e) => {
              handlePostStatus(e.target.value), setLoadingStatus(true);
            }}
            optionType="button"
            buttonStyle="solid"
          >
            <Radio.Button value="">All ({totals.all})</Radio.Button>
            <Radio.Button value={process.env.NEXT_PUBLIC_PS_DRAFT}>
              Draft({totals.draft})
            </Radio.Button>
            <Radio.Button value={process.env.NEXT_PUBLIC_PS_PUBLISH}>
              Publish ({totals.publish})
            </Radio.Button>
            <Radio.Button value={process.env.NEXT_PUBLIC_PS_PRIORITY}>
              Priority ({totals.priority})
            </Radio.Button>
            <Radio.Button value={process.env.NEXT_PUBLIC_PS_TRASH}>
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
        pagination={paginationServer}
        // bordered={true}
      />
    </>
  );
}
