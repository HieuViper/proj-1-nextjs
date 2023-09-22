/* eslint-disable @next/next/no-async-client-component */
"use client";
import { Button, Space, Table } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function NewsPage() {
  const router = useRouter();
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "short",
      dataIndex: "short",
      key: "short",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button>
            <Link href={`/admin/news/edit/${record.id}`}>Edit</Link>
          </Button>
          <Button
            danger
            onClick={() => {
              axios.delete("/api/news/" + record.id).then((res) => {
                setNews((prevItem) =>
                  prevItem.filter((item) => item.id !== record.id)
                );
              });
              toast.success("Task deleted");
              router.push("/admin/news");
              router.refresh();
            }}
          >
            <a>Delete</a>
          </Button>
        </Space>
      ),
    },
  ];

  const [news, setNews] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get("/api/news");
        console.log(
          "🚀 ~ file: ProductForm.js:20 ~ fetchProduct ~ data:",
          data
        );
        setNews(data);
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
          <Link href={`/admin/news/add`}>Add News</Link>
        </Button>
      </div>
      <Table columns={columns} dataSource={news} rowKey="id" />
    </>
  );
}

export default NewsPage;
