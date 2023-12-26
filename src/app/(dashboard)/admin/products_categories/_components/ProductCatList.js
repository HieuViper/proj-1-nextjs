"use client";
import { Button, Col, Divider, Modal, Popconfirm, Row, Select, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProductCatForm from "./ProductCatForm";
import toast from "react-hot-toast";
import Search from "antd/es/input/Search";
import { callAPI, handleNotAuthorized } from "@/library/client/callAPI";
const myConstant = require('@/store/constant')

const ProductCatList = (props) => {
    const router = useRouter();
    // const [dataTable, setDataTable] = useState([])
    const [langTable, setLangTable] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataCate, setDataCate] = useState();
    const [lang, setLang] = useState(myConstant.DEFAULT_LANGUAGE);
    const [search, setSearch] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    // SEARCH CATE
    const handleSearch = async (search) => {
        setSearch(search)
        // let query = `?search=${search}&lang=${lang}`;
        // let { result, res } = await callAPI(await fetch(`/api/products_categories${query}`, {
        //     method: 'GET',
        //     cache: 'no-store',
        // }),
        //     (msg) => { setErrorMessage(msg) },
        //     () => { router.push('/login') },
        //     () => { setLoginForm(true) },
        // );
        // if (res.status == 200) {
        //     // setCategories(result)
        //     console.log('result search page :', result);
        // }
        // setCategories(rs)
        let query = `?search=${search}&lang=${lang}`;
        const rs = await callNon(`/api/products_categories${query}`, "GET");
        console.log('rs search:', rs);
    };

    //  GET ALL CATE
    const getAllCategories = async (langValue) => {
        // const result = await getAllNewsCate(langValue)
        // setCategories(result.reverse())

        // let query = `?lang=${lang}`;
        // let { result, res } = await callAPI(await fetch(`/api/products_categories${query}`, {
        //     method: 'GET',
        //     cache: 'no-store',
        // }),
        //     (msg) => { setErrorMessage(msg) },
        //     () => { router.push('/login') },
        //     () => { setLoginForm(true) },
        // );
        // if (res.status == 200) {
        //     // setInitStates(result);
        //     setCategories(result.dataTable)
        //     console.log('result all cate :', result);
        // }
    }
    // HANDLE POPUP CONFIRM BULK DELETE
    const confirmBulkDelete = () => {
        setLoadingDelete(true);
        delBulkNewsCate(rowSelection.selectedRowKeys
            .map((item) => `${item},`)
            .join("")
            .slice(0, -1))
            .then(() => {
                setCategories((prevItem) =>
                    prevItem.filter((item) => !rowSelection.selectedRowKeys.includes(item.id))
                );
                setSelectedRowKeys([])
                toast.success("Tasks deleted");
                setLoadingDelete(false);
            });
    };
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    let hasSelected = selectedRowKeys.length > 0;

    // HANDLE POPUP CONFIRM DELETE
    const confirmDelete = (id) => {
        delNewsCate(id).then((res) => {
            setCategories((prevItem) =>
                prevItem.filter((item) => item.id !== id)
            );
        });
        toast.success("Task deleted");
    };

    // HANDLE POPUP EDIT
    const showModal = async (id) => {
        setIsModalOpen(true);
        getNewsCate(id).then((res) => {
            setDataCate(res)
        })
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    // CHANGE LANG
    const handleChangeLanguage = async (lang) => {
        getAllCategories(lang)
        setLang(lang);
    };
    let langOptions = langTable?.map((lang) => {
        return { value: lang.code, label: lang.name };
    });
    //
    const checkAutor = async () => {
    }

    const formatForTable = (data) => {
        return data.map(item => {
            const language = item.product_cate_langs[0];
            return {
                ...item,
                name: language.name || '',
                description: language.description || ''
            };
        });
    };
    useEffect(() => {
        // if (props.isAuthorize == false) {
        //     handleNotAuthorized(
        //         () => { router.push('/login') },
        //         (msg) => { setErrorMessage(msg) }
        //     );
        // }
        const product_cat = props.product_cat
        setCategories(formatForTable(product_cat))
        const { data } = props.langTable && JSON.parse(props.langTable)
        setLangTable(data)
        // setLoading(false)
    }, [props]);

    // COLUMNS TABLE
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            fixed: 'left',
            minWidth: 200,
            sorter: (a, b) => a.name.length - b.name.length,
            render: (_, record) => {
                return (
                    <>
                        <div className="text-base font-medium pb-2">
                            {record.name}
                        </div>
                        <div className="flex gap-2">
                            <>
                                <span className="btn-edit cursor-pointer" onClick={() => { showModal(record.id) }}>
                                    <EditOutlined className="pr-1" />
                                    Edit
                                </span>
                                |

                                <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this task?"
                                    onConfirm={() => confirmDelete(record.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >

                                    <span className="btn-trash cursor-pointer">
                                        <DeleteOutlined className="pr-1" />
                                        Trash
                                    </span>
                                </Popconfirm>
                            </>
                        </div>
                    </>
                );
            },

        },
        {
            title: "Category Code",
            dataIndex: "category_code",
            key: "category_code",
            sorter: (a, b) => a.category_code.length - b.category_code.length,
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            width: 300,
            sorter: (a, b) => a.description.length - b.description.length,
        },
    ];


    function buildCategoryTree(categories, parent = null) {
        const categoryTree = [];

        for (const category of categories) {
            if (category.parent === parent) {
                const children = buildCategoryTree(categories, category.id);
                if (children.length > 0) {
                    category.children = children;
                }
                categoryTree.push(category);
            }
        }
        return categoryTree;
    }
    // for (let i = 0; i < 100; i++) {
    //     categories.push({
    //         key: i,
    //         // name: `Edward ${i}`,
    //         category_code: i,
    //         parent: null
    //     });
    // }
    const catTree = categories && buildCategoryTree(categories)


    return (
        <>
            <div className="flex justify-between gap-4">
                <div className="text-lg font-semibold px-4">
                    Products Categories

                </div>
                <div className="flex gap-4">
                    <Select
                        defaultValue={myConstant.DEFAULT_LANGUAGE}
                        value={lang}
                        style={{
                            width: 120,
                        }}
                        onChange={handleChangeLanguage}
                        options={langOptions}
                    />
                    <Search
                        placeholder="input search"
                        onSearch={(e) => handleSearch(e)}
                        enterButton
                        style={{
                            width: 200,
                        }}
                        className=" w-56"
                    />
                </div>
            </div>
            <Divider />
            <Row type="flex" justify="center" >
                <Col xs={24} md={10} lg={8} type="flex" justify="center" align="middle" >
                    <ProductCatForm
                        langTable={langTable}
                        {...{ lang, getAllCategories, categories, setCategories }}
                    />
                </Col>
                <Col xs={24} md={14} lg={14} className="pb-4">
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
                                loading={loadingDelete}
                            >
                                Bulk Delete
                            </Button>
                        </Popconfirm>
                    </div>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={catTree} rowKey="id"
                        scroll={{
                            x: 700,
                        }}
                        expandable={
                            { defaultExpandAllRows: true }
                        }
                        key={catTree?.length}
                        loading={loading}
                    />
                </Col>
            </Row>
            {/* Modal */}
            <Modal title="Edit Category" open={isModalOpen}
                onCancel={handleCancel} footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>

                ]}>
                <ProductCatForm handleModal={handleOk}
                    dataCate={dataCate}
                    langTable={langTable}
                    {...{ lang, getAllCategories, categories, setCategories }}
                />
            </Modal>
        </>
    )
}

export default ProductCatList