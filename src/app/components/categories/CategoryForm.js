"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';


export function CategoryForm() {
  const [category, setCategory] = useState({
    name: "",
    description: "",
    price: 0,
  });
  const router = useRouter();
  const params = useParams();
  const [form] = Form.useForm();
  const handleChange = ({ target: { name, value } }) =>
    setCategory({ ...category, [name]: value });
  useEffect(() => {
    const fetchCategory = async (id) => {
      try {
        const { data } = await axios.get("/api/categories/" + id);
        console.log(
          "🚀 ~ file: CategoryForm.js:20 ~ fetchCategory ~ data:",
          data
        );
        setCategory(data);
        form.setFieldsValue(data)
      } catch (error) {
        console.error(error);
      }
    };

    if (params?.id) {
      fetchCategory(params.id);
    }
  }, [params.id]);



  const handleSubmit = async (value) => {

    try {
      if (params?.id) {
        await axios.put("/api/categories/" + params.id, {
          name: value.name,
          type: value.type,
          description: value.description,
        });

        toast.success("Task Updated", {
          position: "bottom-center",
        });
      } else {
        await axios.post("/api/categories", value);

        toast.success("Task Saved", {
          position: "bottom-center",
        });
      }

      router.push("/admin/categories");
      router.refresh();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    // <div className="w-full max-w-xs">
    //   <form
    //     className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
    //     onSubmit={handleSubmit}
    //   >
    //     <div className="mb-4">
    //       <label
    //         className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
    //         htmlFor="name"
    //       >
    //         Category Name
    //       </label>
    //       <input
    //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
    //         type="text"
    //         placeholder="name"
    //         id="name"
    //         name="name"
    //         onChange={handleChange}
    //         value={category.name}
    //         autoComplete="off"
    //         autoFocus
    //       />
    //     </div>

    //     <div className="mb-4">
    //       <label
    //         htmlFor="price"
    //         className="block text-gray-700 dark:text-white font-bold mb-2 text-sm"
    //       >
    //         Category Price:
    //       </label>
    //       <input
    //         type="text"
    //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
    //         name="price"
    //         placeholder="10.00"
    //         onChange={handleChange}
    //         value={category.price}
    //       />
    //     </div>

    //     <div className="mb-2">
    //       <label
    //         htmlFor="description"
    //         className="block text-gray-700 dark:text-white font-bold mb-2 text-sm"
    //       >
    //         Write a Description
    //       </label>
    //       <textarea
    //         name="description"
    //         id="description"
    //         rows="3"
    //         placeholder="Category description"
    //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
    //         onChange={handleChange}
    //         value={category.description}
    //       ></textarea>
    //     </div>

    //     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
    //       {params?.id ? "Update Category" : "Save Category"}
    //     </button>
    //   </form>
    // </div>
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 1000,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={handleSubmit}
      onFinishFailed={handleSubmitFailed}
      autoComplete="off"
      form={form}
    >
      <Form.Item
        label="name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="type"
        name="type"
        rules={[
          {
            required: true,
            message: 'Please input your type!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="description"
        name="description"
        rules={[
          {
            required: true,
            message: 'Please input your description!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
