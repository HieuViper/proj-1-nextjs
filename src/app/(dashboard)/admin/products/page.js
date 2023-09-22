"use client"
import axios from "axios";
import Link from "next/link";
import React from 'react';
import { Button, Space, Table, Tag } from 'antd';

async function loadProduct() {
  const { data } = await axios.get("http://localhost:3000/api/products");
  return data;
}


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',

  },
  {
    title: 'Short',
    dataIndex: 'short',
    key: 'short',
  },
  {
    title: 'Content',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button >
          <Link href={`/admin/products/edit/${record.id}`}>Edit</Link>
        </Button>
        <Button danger>
          <a>Delete</a>
        </Button>
      </Space>
    ),
  },
];


async function ProductsPage() {
  const products = await loadProduct();
  console.log("🚀 ~ file: page.js:11 ~ ProductsPage ~ products:", products);

  if (products.length === 0) return <h1 className="text-white">No Products</h1>;

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button >
          <Link href={`/admin/products/add`}>Add product</Link>
        </Button>
      </div>
      <Table columns={columns} dataSource={products} rowKey="id" />
    </>
  );
}

export default ProductsPage;
