'use client'
import { callAPI } from '@/library/client/callAPI'
import myConstant from '@/store/constant'
import { useLogin } from '@/store/login'
import { Button, Popconfirm, Select, Table } from 'antd'
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    QuestionCircleOutlined,
    SyncOutlined,
} from "@ant-design/icons";
import Search from 'antd/es/input/Search'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { callNon } from '@/library/api'

const ProductList = (props) => {
    const [loadingDataTable, setLoadingDataTable] = useState(false)
    const [loadingChangePage, setLoadingChangePage] = useState(false)
    const [loadingBulkDelete, setLoadingBulkDelete] = useState(false);

    const [langTable, setLangTable] = useState([])
    const [lang, setLang] = useState(myConstant.DEFAULT_LANGUAGE);
    const [search, setSearch] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const defaultPagination = {
        current: 1,
        disable: false,
        pageSize: 10,
        total: 0,
    }
    const [pagination, setPagination] = useState(defaultPagination);
    const router = useRouter();
    const { setLoginForm } = useLogin();
    const [dataTable, setDataTable] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);


    const handleChangePage = async (values) => {
        setPagination(values)
        callProduct()
        router.refresh()
    }
    let langOptions = langTable.map((lang) => {
        return { value: lang.code, label: lang.name };
    });
    const handleChangeLanguage = async (langValue) => {
        setLang(langValue);
        callProduct()
        router.refresh()
    }
    const handleSearch = async (e) => {
        setPagination(defaultPagination)
        setSearch(e)
        callProduct()
        router.refresh()
    }
    //  BULK DELETE
    const confirmBulkDelete = async () => {
        setLoadingBulkDelete(true);
        const ids = selectedRowKeys
            .map((item) => `${item},`)
            .join("")
            .slice(0, -1);
        // let query = `?page=${pagination.current}&limit=${pagination.pageSize}&search=${search}&lang=${lang}&bulkdel=${bulkdel}`;
        let { result, res } = await callAPI(await fetch(`/api/products`, {
            method: 'DELETE',
            cache: 'no-store',
            body: JSON.stringify({ ids: ids })
        }),
            (msg) => { setErrorMessage(msg) },
            () => { router.push('/login') },
            () => { setLoginForm(true) },
        );
        if (res.status == 200) {
            router.refresh()
        }

        toast.success("Tasks deleted");
        setLoadingBulkDelete(false);
    };
    const onSelectChange = (SelectedRowKeys) => {
        setSelectedRowKeys(SelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    let hasSelected = selectedRowKeys.length > 0;

    //  DELETE
    const confirmDelete = async (id) => {
        let { result, res } = await callAPI(await fetch(`/api/products/${id}`, {
            method: 'DELETE',
            cache: 'no-store',
        }),
            (msg) => { setErrorMessage(msg) },
            () => { router.push('/login') },
            () => { setLoginForm(true) },
        );
        if (res.status == 200) {
            router.refresh()
        }
        toast.success("Task deleted");
    };
    const columns = [
        {
            title: 'Name',
            width: 150,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            render: (_, record) => (<div>
                <div className="text-base font-medium pb-2">{record.name}</div>
                <div className="flex gap-2">
                    <Link href={`/admin/products/edit/${record.id}`}>
                        <Button size='small' type="primary" ghost icon={<EditOutlined />}>Edit</Button>
                    </Link>

                    <Popconfirm
                        title="Delete the task"
                        description={`Are you sure to delete ${record.name}?`}
                        onConfirm={() => confirmDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button size='small' danger icon={<DeleteOutlined />}>Delete</Button>
                    </Popconfirm>
                </div>
            </div>)
        },
        {
            title: 'Image',
            width: 100,
            dataIndex: 'main_image',
            key: 'main_image',
            render: (image) => <div>
                <img src={image} alt="main_image" />
            </div>
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: 50,
        },
        {
            title: 'Discount Price',
            dataIndex: 'discount_price',
            key: 'discount_price',
            width: 50,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            width: 50,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 50,
        },
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            width: 50,
        },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
            width: 50,
        },

    ];
    const callProduct = async () => {
        let query = `?page=${pagination.current}&limit=${pagination.pageSize}&search=${search}&lang=${lang}`;
        let { result, res } = await callAPI(await fetch(`/api/products${query}`, {
            method: 'GET',
            cache: 'no-store',
        }),
            (msg) => { setErrorMessage(msg) },
            () => { router.push('/login') },
            () => { setLoginForm(true) },
        );
        if (res.status == 200) {
            setDataTable(result.data)
        }
    }
    const formatProducts = (data) => {
        return data.map(item => {
            const language = item.product_languages[0];

            return {
                ...item,
                name: language.name || '',
                short: language.short || '',
                description: language.description || ''
            };
        });
    };

    const products = formatProducts(dataTable);
    const test = async () => {
        let query = `?page=${pagination.current}&limit=${pagination.pageSize}&search=${search}&lang=${lang}`;
        const test = await callNon(`/api/products${query}`, "GET");
        console.log('test :', test);

    }
    useEffect(() => {
        //redirect to login page if user is not authorized
        // if (props.isAuthorize == false) {
        //     handleNotAuthorized(
        //         () => { router.push('/login') },
        //         (msg) => { setErrorMessage(msg) }
        //     );
        // }
        callProduct()
        const { data } = props.langTable && JSON.parse(props.langTable)
        setLangTable(data)
    }, [props]);

    return (
        <div>

            <div className="flex justify-between mb-4 gap-x-4">
                <div className="flex gap-x-5">
                    <p className="font-semibold text-xl pr-4">Products</p>
                    {/* {props.roles[props.user.role]?.products?.add === true && ( */}
                    <Link href={`/admin/products/add`}>
                        <Button>Add product </Button>
                    </Link>
                    {/* )} */}
                    <Select
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
                    // value={search}
                    // disabled={loadingStatus}
                    // onChange={(e) => onSearchChange(e)}
                    onSearch={(e) => handleSearch(e)}
                    enterButton
                    style={{
                        width: 250,
                    }}
                />
            </div>
            <div className="flex justify-end pb-2">
                <div
                    style={{
                        marginLeft: 8,
                        marginRight: 8,
                    }}
                >
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
                </div>
                <Popconfirm
                    title="Delete the task"
                    description="Are you sure to bulk delete this task?"
                    onConfirm={confirmBulkDelete}
                    okText="Yes"
                    cancelText="No"
                    placement="left"
                >
                    <Button
                        type="primary"
                        danger
                        disabled={!hasSelected}
                        loading={loadingBulkDelete}
                    >
                        Bulk Delete
                    </Button>
                </Popconfirm>
            </div>
            <Table
                style={{ marginTop: 10 }}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={products}
                rowKey="id"
                onChange={handleChangePage}

                pagination={{ ...pagination, disabled: loadingChangePage }}
                bordered={true}
                loading={loadingDataTable}
            // scroll={{
            //     x: 1300,
            //     y: 500,
            // }}
            />
        </div>
    )
}

export default ProductList