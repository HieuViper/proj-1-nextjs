"use client";
import { Button, Space, Table } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ArticlePage = () => {
  const router = useRouter();
  const [articles, setArticles] = useState();
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Short",
      dataIndex: "short",
      key: "short",
    },
    {
      title: "author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Category_id",
      dataIndex: "category_id",
      key: "category_id",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render(text, record) {
        return {
          children: <div>{text == 1 ? "True" : "False"}</div>,
        };
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button>
            <Link href={`/admin/articles/edit/${record.id}`}>Edit</Link>
          </Button>
          <Button
            danger
            onClick={() => {
              axios.delete("/api/articles/" + record.id).then((res) => {
                setArticles((prevItem) =>
                  prevItem.filter((item) => item.id !== record.id)
                );
              });
              toast.success("Task deleted");
              router.push("/admin/articles");
              router.refresh();
            }}
          >
            <a>Delete</a>
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get("/api/articles");
        console.log(
          "🚀 ~ file: ArticlesForm.js:20 ~ fetchProduct ~ data:",
          data
        );
        setArticles(data);
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
          <Link href={`/admin/articles/add`}>Add article</Link>
        </Button>
      </div>
      <Table columns={columns} dataSource={articles} rowKey="id" />
    </>
  );
};

export default ArticlePage;
