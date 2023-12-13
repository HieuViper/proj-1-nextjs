/* eslint-disable @next/next/no-async-client-component */
"use client";
import { Button, Col, Divider, Modal, Popconfirm, Row, Select, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CategoryForm } from "./NewsCatForm";
import toast from "react-hot-toast";
import Search from "antd/es/input/Search";
const myConstant = require('@/store/constant')

function CategoryList(props) {
    const { getAllNewsCate, getNewsCate, addNewsCate, editNewsCate, delNewsCate, delBulkNewsCate, searchNewsCate } = props
    const router = useRouter();
    const [categories, setCategories] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loading, setLoading] = useState(true);
    const [langTable, setLangTable] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataCate, setDataCate] = useState();
    const [lang, setLang] = useState(myConstant.DEFAULT_LANGUAGE);


    // SEARCH CATE
    const handleSearch = async (search) => {
        const rs = await searchNewsCate(search, lang)
        setCategories(rs)
    };

    //  GET ALL CATE
    const getAllCategories = async (langValue) => {
        const result = await getAllNewsCate(langValue)
        setCategories(result.reverse())
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
    let langOptions = langTable.map((lang) => {
        return { value: lang.code, label: lang.name };
    });
    //
    useEffect(() => {
        setLangTable(JSON.parse(props.langTable));
        setCategories(JSON.parse(props.dataTable));
        setLoading(false)
        // getAllCategories(lang)
    }, []);

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
    const catTree = categories && buildCategoryTree(categories)

    // function renderCategoryOptions(category, level = 0) {
    //     const options = [];
    //     category.name = Array(level).fill('—').join(' ') + category.name;
    //     options.push(category);

    //     if (category.children) {
    //         for (const childCategory of category.children) {
    //             options.push(...renderCategoryOptions(childCategory, level + 1));
    //         }
    //     }

    //     return options;
    // }
    // const newCategoryList = [];
    // console.log('newCategoryList :', newCategoryList);

    // catTree?.forEach((category) => {
    //     newCategoryList.push(...renderCategoryOptions(category));
    // })
    // console.log(newCategoryList)

    return (
        <>
            <div className="flex justify-between gap-4">
                <div className="text-lg font-semibold px-4">
                    News Categories

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
                    <CategoryForm langTable={langTable}   {...{ addNewsCate, lang, getAllCategories, categories, setCategories }} />
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
                <CategoryForm handleModal={handleOk}
                    dataCate={dataCate}
                    langTable={langTable}
                    {...{ getNewsCate, addNewsCate, editNewsCate, delNewsCate, lang, getAllCategories, categories, setCategories }}
                />
            </Modal>
        </>
    );
}

export default CategoryList;
