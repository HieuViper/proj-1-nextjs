/* eslint-disable @next/next/no-async-client-component */
"use client";
import { Button, Space, Table } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ProductsPage() {
  const router = useRouter();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Short",
      dataIndex: "short",
      key: "short",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button>
            <Link href={`/admin/products/edit/${record.id}`}>Edit</Link>
          </Button>
          <Button
            danger
            onClick={() => {
              axios.delete("/api/products/" + record.id).then((res) => {
                setProducts((prevItem) =>
                  prevItem.filter((item) => item.id !== record.id)
                );
              });
              toast.success("Task deleted");
              router.push("/admin/products");
              router.refresh();
            }}
          >
            <a>Delete</a>
          </Button>
        </Space>
      ),
    },
  ];

  const [products, setProducts] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get("/api/products");
        console.log(
          "🚀 ~ file: ProductForm.js:20 ~ fetchProduct ~ data:",
          data
        );
        setProducts(data);
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
          <Link href={`/admin/products/add`}>Add product</Link>
        </Button>
      </div>
      <Table columns={columns} dataSource={products} rowKey="id" />
    </>
  );
}

export default ProductsPage;
