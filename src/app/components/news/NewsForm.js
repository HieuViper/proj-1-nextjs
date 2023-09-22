"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import React from 'react';
import { Button, Form, Input, Select } from 'antd';


export function NewsForm() {
  const router = useRouter();
  const params = useParams();
  const [form] = Form.useForm();
  const { Option } = Select;
  const [cate, setCate] = useState('')
  useEffect(() => {
    const fetchNews = async (id) => {
      try {
        const { data } = await axios.get("/api/news/" + id);
        console.log(
          "🚀 ~ file: NewsForm.js:20 ~ fetchNews ~ data:",
          data
        );
        form.setFieldsValue(data)
      } catch (error) {
        console.error(error);
      }
    };

    if (params?.id) {
      fetchNews(params.id);
    }
  }, [params.id]);
  useEffect(() => {
    const fetchCate = async () => {
      try {
        const cate = await axios.get("/api/categories");
        console.log(
          "cate",
          cate.data
        );
        setCate(cate?.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchCate()
  }, []);


  const handleSubmit = async (value) => {

    try {
      if (params?.id) {
        await axios.put("/api/news/" + params.id, {
          name: value.name,
          type: value.type,
          category_id: value.category_id,
          short: value.short,
          description: value.description,
        });

        toast.success("Task Updated", {
          position: "bottom-center",
        });
      } else {
        await axios.post("/api/news", value);

        toast.success("Task Saved", {
          position: "bottom-center",
        });
      }

      router.push("/admin/news");
      router.refresh();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (

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
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please input your title!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Type"
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

      <Form.Item label="Category" name="category_id" rules={[
        {
          required: true,
          message: 'Please select your category!',
        },
      ]}>
        <Select optionFilterProp="children ">
          {cate.length > 0 && cate.map((data, i) => {
            <Option key={i} value={data.id}>{data.name}</Option>
          })}

        </Select>
      </Form.Item>

      <Form.Item
        label="Short"
        name="short"
        rules={[
          {
            required: true,
            message: 'Please input your short!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
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
