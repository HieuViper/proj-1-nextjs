/* eslint-disable @next/next/no-async-client-component */
"use client";
import { Button, Col, Modal, Row, Space, Table } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CategoryForm } from "./CategoryForm";
import Search from "antd/es/input/Search";
import { newsCategoriesModel } from "@/library/getNewsCategories";

function CategoryList(props) {
    const router = useRouter();
    const [categories, setCategories] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (value) => {
        const rs = await axios.get(`/api/articles/search?q=${value}`);
        setArticles(rs.data);
    };

    // bulk delete
    const startDelete = () => {
        setLoading(true);
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
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    // 


    useEffect(() => {
        const cateData = JSON.parse(props.dataTable);
        console.log('cateData :', cateData);
        setCategories(cateData.reverse())
    }, [props]);
    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name - b.name,
        },
        {
            title: "Category Code",
            dataIndex: "category_code",
            key: "category_code",
            sorter: (a, b) => a.category_code - b.category_code,
        },
        {
            title: "Parent",
            dataIndex: "parent",
            key: "parent",
            sorter: (a, b) => a.parent - b.parent,
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => { showModal(), setIdCate(record.id) }}>
                        {/* <Link href={`/admin/categories/edit/${record.id}`}>Edit</Link> */}
                        Edit
                    </Button>
                    <Button
                        danger
                        onClick={() => {
                            axios.delete("/api/categories/" + record.id).then((res) => {
                                setCategories((prevItem) =>
                                    prevItem.filter((item) => item.id !== record.id)
                                );
                            });
                            toast.success("Task deleted");
                            router.push("/admin/categories");
                            router.refresh();
                        }}
                    >
                        <a>Delete</a>
                    </Button>
                </Space>
            ),
        },
    ];
    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [idCate, setIdCate] = useState();
    const showModal = async (id) => {
        setLoadingModal(true);
        setIdCate(id)
        setIsModalOpen(true);
        // const result = 
        await newsCategoriesModel.getNewsCategories(1)
        // .then((res) => {
        //     console.log('res getNewsCategories:', res);
        //     setLoadingModal(false)
        //     toast.success("Update success");
        // })
        // const newsCata = JSON.stringify(result)
        // console.log('newsCata :', newsCata);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div className="flex justify-end">
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
            <Row type="flex" justify="center" >
                <Col xs={24} md={10} lg={8} type="flex" justify="center" align="middle" >
                    <CategoryForm />
                </Col>
                <Col xs={24} md={14} lg={14} >
                    <Button
                        type="primary"
                        danger
                        onClick={startDelete}
                        disabled={!hasSelected}
                        loading={loading}
                    >
                        Bulk Delete
                    </Button>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={categories} rowKey="id" />
                </Col>
            </Row>
            {/* Modal */}
            <Modal title="Edit Category" open={isModalOpen}
                onCancel={handleCancel} footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>

                ]}>
                <CategoryForm idCate={idCate} handleModal={handleOk} />
            </Modal>
        </>
    );
}

export default CategoryList;
