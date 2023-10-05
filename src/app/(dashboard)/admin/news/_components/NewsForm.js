"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import React from 'react';
import { Button, Form, Input, Select, Space } from 'antd';
import { SaveOutlined, SwapLeftOutlined } from '@ant-design/icons';
import Editor from "@/components/Editor";
import { DraftButton } from "@/components/Button/DraftButton";
import { PublishButton } from "@/components/Button/PublishButton";
import Link from "next/link";

export function NewsForm() {
  const { TextArea } = Input;
  const router = useRouter();
  const params = useParams();
  const [form] = Form.useForm();
  const { Option } = Select;
  const [cate, setCate] = useState('')
  const [buttonType, setButtonType] = useState()
  const [data, setData] = useState();
  useEffect(() => {
    const fetchNews = async (id) => {
      try {
        const { data } = await axios.get("/api/news/" + id);
        console.log(
          "🚀 ~ file: NewsForm.js:20 ~ fetchNews ~ data:",
          data
        );
        form.setFieldsValue(data)
        setData(data)
        setButtonType(data.post_status)
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
  const options = [];
  cate && cate.map((item) => options.push({
    label: item.name,
    value: item.name,
  }))
  // console.log("arrCate", arrCate)

  const handleSubmit = async (value) => {
    console.log("value", value)
    const newDate = "2023-09-29 11:37:01"
    Object.assign(value, { post_author: 1, post_date: newDate });
    if (buttonType == "draft") {
      Object.assign(value, { post_status: "draft" });
    } else if (buttonType == "publish") {
      Object.assign(value, { post_status: "publish" });
    } else {
      Object.assign(value, { post_status: "trash" });
    }

    try {
      if (params?.id) {
        await axios.put("/api/news/" + params.id, {
          title: value.title,
          type: value.type,
          categories: value.categories,
          post_author: value.post_author,
          post_date: value.post_date,
          excerpt: value.excerpt,
          content: value.content,
          post_status: value.post_status,
          news_code: value.news_code,
          news_position: value.news_position
        });

        toast.success("Task Updated", {
          position: "bottom-center",
        });
        window.location.reload();
        // router.push("/admin/news");
        // router.refresh();
      } else {
        await axios.post("/api/news", value).then((res) => {
          console.log("res", res)
          router.push(`/admin/news/edit/${res.data.id}`);
        })

        toast.success("Task Saved", {
          position: "bottom-center",
        });
      }

      // router.push("/admin/news");
      router.refresh();
    } catch (error) {
      toast.error(error.response.data.message);
    }
    // form.resetFields()
  };
  const handleSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // 
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };
  return (
    <>
      <div className="flex justify-start">
        <Button type="dashed" icon={<SwapLeftOutlined />}>
          <Link href={`/admin/news`}>
            Back to NewsList
          </Link>
        </Button>
      </div>
      <Form
        className="w-full"
        name="news"
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          // span: 20,
        }}
        style={{
          maxWidth: 1000,
          height: "100%"
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
        onFinishFailed={handleSubmitFailed}
        autoComplete="off"
        form={form}
      >
        {params?.id && data?.post_status == "publish"
          ? <div className="flex justify-around">
            <div className="flex">
              <Form.Item
                className="p-2"
              >
                <Button type="primary" ghost htmlType="submit" onClick={() => setButtonType("draft")}>
                  Switch to Draft
                </Button>
              </Form.Item>
              <Form.Item
                className="p-2"
              >
                <Button p-2 danger htmlType="submit" onClick={() => setButtonType("trash")}>
                  Move to trash
                </Button>
              </Form.Item>
            </div>
            <Form.Item
              className="p-2"
            >
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </div>
          : <div className="flex justify-around">

            <Form.Item
              className="p-2"
            >
              <Button p-2 danger htmlType="submit" onClick={() => setButtonType("trash")}>
                Move to trash
              </Button>
            </Form.Item>
            <div className="flex">
              <Form.Item
                className="p-2"
              >
                <Button type="dashed" htmlType="submit" onClick={() => setButtonType("draft")}>
                  Save Draft
                </Button>
                {/* <Button type="primary"
                  icon={<SaveOutlined />}
                  loading={loadings[0]} onClick={() => enterLoading(0)}>
                  Save Draft
                </Button> */}
              </Form.Item>
              <Form.Item

                className="p-2"
              >
                <Button type="primary" htmlType="submit" onClick={() => setButtonType("publish")} >
                  Publish
                </Button>
              </Form.Item>
            </div>
          </div>}



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

        <Form.Item label="Category" name="categories" rules={[
          {
            required: true,
            message: 'Please select your category!',
          },
        ]}>
          <Select
            mode="multiple"
            allowClear
            style={{
              width: '100%',
            }}
            placeholder="Select category"
            // defaultValue={arrCate}
            // onChange={handleChange}
            options={options}
          />
          {/* <Space
            style={{
              width: '100%',
            }}
            direction="vertical"
          >
         
          </Space> */}
        </Form.Item>

        <Form.Item
          label="News Position"
          name="news_position"
          rules={[
            {
              required: true,
              message: 'Please input your news_position!',
            },
          ]}
        >
          <Select>
            <Option value={1}>On Top</Option>
            <Option value={0}>Normal</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Excerpt"
          name="excerpt"
          rules={[
            {
              required: true,
              message: 'Please input your excerpt!',
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
              message: 'Please input your content!',
            },
          ]}
        // wrapperCol={{ xs: { span: 8, offset: 12 }, sm: { span: 8, offset: 12 } }}
        >
          <Editor />
        </Form.Item>
      </Form>
    </>
  );
}
