/* eslint-disable @next/next/no-async-client-component */
"use client";
import { Button, Space, Table } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function CategoriesPage() {
  const router = useRouter();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category Code",
      dataIndex: "category_code",
      key: "category_code",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button>
            <Link href={`/admin/categories/edit/${record.id}`}>Edit</Link>
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

  const [categories, setCategories] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get("/api/categories");
        console.log(
          "🚀 ~ file: ProductForm.js:20 ~ fetchProduct ~ data:",
          data
        );
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button>
          <Link href={`/admin/categories/add`}>Add Category</Link>
        </Button>
      </div>
      <Table columns={columns} dataSource={categories} rowKey="id" />
    </>
  );
}

export default CategoriesPage;
