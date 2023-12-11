/* eslint-disable @next/next/no-async-client-component */
"use client";
import { Button, Col, Divider, Modal, Popconfirm, Row, Select, Space, Table } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArticleForm } from "./ArticleCatForm";
import toast from "react-hot-toast";
import Search from "antd/es/input/Search";
import { myConstant } from "@/store/constant";

function ArticleList(props) {
    const { getAllArticle, getArticle, addArticle, editArticle, delArticle, delBulkArticle, searchArticle } = props
    const router = useRouter();
    const [articles, setArticles] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loading, setLoading] = useState(true);
    const [langTable, setLangTable] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataArticle, setDataArticle] = useState();
    const [lang, setLang] = useState(myConstant.DEFAULT_LANGUAGE);


    // SEARCH ARTICLE
    const handleSearch = async (search) => {
        const rs = await searchArticle(search, lang)
        setArticles(rs)
    };

    //  GET ALL ARTICLE
    const getAllArticles = async (langValue) => {
        const result = await getAllArticle(langValue)
        setArticles(result.reverse())
    }
    // HANDLE POPUP CONFIRM BULK DELETE
    const confirmBulkDelete = () => {
        setLoadingDelete(true);
        delBulkArticle(rowSelection.selectedRowKeys
            .map((item) => `${item},`)
            .join("")
            .slice(0, -1))
            .then(() => {
                setArticles((prevItem) =>
                    prevItem.filter((item) => !rowSelection.selectedRowKeys.includes(item.id))
                );
                setSelectedRowKeys([])
                toast.success("Tasks deleted");
                setLoadingDelete(false);
            });
    };
    const onSelectChange = (articleSelectedRowKeys) => {
        setSelectedRowKeys(articleSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    let hasSelected = selectedRowKeys.length > 0;

    // HANDLE POPUP CONFIRM DELETE
    const confirmDelete = (id) => {
        delArticle(id).then((res) => {
            setArticles((prevItem) =>
                prevItem.filter((item) => item.id !== id)
            );
        });
        toast.success("Task deleted");
    };

    // HANDLE POPUP EDIT
    const showModal = async (id) => {
        setIsModalOpen(true);
        getArticle(id).then((res) => {
            setDataArticle(res)
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
        getAllArticles(lang)
        setLang(lang);
    };
    let langOptions = langTable.map((lang) => {
        return { value: lang.code, label: lang.name };
    });
    //
    useEffect(() => {
        setLangTable(JSON.parse(props.langTable));
        setArticles(JSON.parse(props.dataTable));
        setLoading(false)
        // getAllArticles(lang)
    }, []);

    // COLUMNS TABLE
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            fixed: 'left',
            width: 150,
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
            title: "Article Code",
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

    return (
        <>
            <div className="flex justify-between gap-4">
                <div className="text-lg font-semibold px-4">
                    Articles Categories

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
                    <ArticleForm langTable={langTable}   {...{ addArticle, lang, getAllArticles, articles, setArticles }} />
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
                    <Table rowSelection={rowSelection} columns={columns} dataSource={articles} rowKey="id"
                        scroll={{
                            x: 700,
                        }}
                        key={articles?.length}
                        loading={loading}
                    />
                </Col>
            </Row>
            {/* Modal */}
            <Modal title="Edit Article" open={isModalOpen}
                onCancel={handleCancel} footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>

                ]}>
                <ArticleForm handleModal={handleOk}
                    dataArticle={dataArticle}
                    langTable={langTable}
                    {...{ getArticle, addArticle, editArticle, delArticle, lang, getAllArticles, articles, setArticles }}
                />
            </Modal>
        </>
    );
}

export default ArticleList;
