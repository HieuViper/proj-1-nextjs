"use client";
import axios from "axios";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button, Form, Input, Select, Switch, Tooltip } from 'antd';
import { SwapLeftOutlined } from '@ant-design/icons';
import Editor from "@/components/Editor";
import Link from "next/link";
import { addNews, editNews } from "@/library/getNews";

export function NewsForm(props) {
  const { TextArea } = Input;
  const { Option } = Select;
  const router = useRouter();
  const params = useParams();
  const pathName = usePathname();
  const [form] = Form.useForm();
  const [cate, setCate] = useState()
  const [postStatus, setPostStatus] = useState()
  const [data, setData] = useState();
  const [newsPosition, setNewsPosition] = useState()

  useEffect(() => {
    if (params?.id) {
      const data = JSON.parse(props.data)
      form.setFieldsValue({ ...data, categories: (data?.categories).split(',').map(Number) })
      setData(data)
      setPostStatus(data.post_status)
      setNewsPosition(data.news_position)
    }
    const cate = JSON.parse(props.cate)
    setCate(cate)
  }, [props])

  async function handleSubmit(value) {
    console.log('value submit:', value);
    const newsCode = value.title.trim().normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/\s/g, "-")
    value.categories = (value.categories).toString()

    if (postStatus == "publish") {
      const postDate = new Date().toISOString().slice(0, 10) + " " + new Date().toLocaleTimeString('en-GB')
      Object.assign(value, { post_date: postDate, news_position: 1 });
    }
    else {
      Object.assign(value, { news_position: 0 });
    }
    Object.assign(value, {
      post_author: 1,
      post_status: postStatus,
      news_code: newsCode,
      type: process.env.POST_TYPE_NEWS,
    });
    try {
      if (params?.id) {
        await editNews(value, params.id).then(() => {
          router.push(`${pathName}`)

          if (postStatus == 'trash') {
            toast.success("Move to trash Success", {
              position: "top-center",
            });
            router.push('/admin/news')
          } else if (postStatus == 'draft') {
            toast.success("Save Draft Success", {
              position: "top-center",
            });
          } else {
            toast.success("Save Publish Success", {
              position: "top-center",
            });
          }
        })

      }
      else {
        await addNews(value)
        if (postStatus == 'draft') {
          toast.success("Save Draft Success", {
            position: "top-center",
          });
        } else {
          toast.success("Save Publish Success", {
            position: "top-center",
          });
        }
      }
    }
    catch (error) {
      toast.error(error.response.data.message);
      throw new Error('Fail to submit news');
    }
  }

  // const handleSubmit = async (value) => {
  //   console.log("value", value)
  //   const newsCode = value.title.trim().normalize('NFD')
  //     .replace(/[\u0300-\u036f]/g, '')
  //     .replace(/đ/g, 'd')
  //     .replace(/Đ/g, 'D')
  //     .replace(/\s/g, "-")

  //   if (postStatus == "publish") {
  //     const postDate = new Date().toISOString().slice(0, 10) + " " + new Date().toLocaleTimeString('en-GB')
  //     Object.assign(value, { post_date: postDate });
  //   }

  //   Object.assign(value, {
  //     post_author: 1,
  //     post_status: postStatus,
  //     news_code: newsCode, news_position: newsPosition
  //   });

  //   try {
  //     if (params?.id) {
  //       await axios.put("/api/news/" + params.id, value);
  //       toast.success("Task Updated", {
  //         position: "bottom-center",
  //       });
  //       window.location.reload();
  //       // router.push("/admin/news");
  //       // router.refresh();
  //     } else {
  //       await axios.post("/api/news", value).then((res) => {
  //         console.log("res", res)
  //         router.push(`/admin/news/edit/${res.data.id}`);
  //       })

  //       toast.success("Task Saved", {
  //         position: "bottom-center",
  //       });
  //     }

  //     // router.push("/admin/news");
  //     router.refresh();
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   }
  //   // form.resetFields()
  // };
  const handleSubmitFailed = (errorInfo) => {
    console.log('Failed to submit:', errorInfo);
  };

  const onChangePosition = (checked) => {
    if (checked == true) {
      setNewsPosition(1)
    } else {
      setNewsPosition(0)
    }
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
        {data?.post_status == "publish"
          ? <div className="flex justify-around">
            <div className="flex">
              <Form.Item
                className="p-2"
              >
                <Button type="primary" ghost htmlType="submit" onClick={() => setPostStatus("draft")}>
                  Switch to Draft
                </Button>
              </Form.Item>
              <Form.Item
                className="p-2"
              >
                <Button danger htmlType="submit" onClick={() => setPostStatus("trash")}>
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
          : <div className={`flex  ${params.id ? 'justify-around' : 'justify-end'}`}>
            {params.id && <Form.Item
              className="p-2"
            >
              <Button danger htmlType="submit" onClick={() => setPostStatus("trash")}>
                Move to trash
              </Button>
            </Form.Item>}
            <div className="flex">
              <Form.Item
                className="p-2"
              >
                <Button type="dashed" htmlType="submit" onClick={() => setPostStatus("draft")}>
                  Save Draft
                </Button>
              </Form.Item>
              <Form.Item

                className="p-2"
              >
                <Button type="primary" htmlType="submit" onClick={() => setPostStatus("publish")} >
                  Publish
                </Button>

              </Form.Item>
            </div>
          </div>}

        <Form.Item
          label="Priority"
          name="news_position"
        >
          <Tooltip title="Can active when status is publish">
            <Switch checked={newsPosition == 1 ? true : false} onChange={onChangePosition} />
          </Tooltip>
        </Form.Item>

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
        <Form.Item label="Category" name="categories" rules={[
          {
            required: true,
            message: 'Please select your category!',
          },
        ]}
        >
          <Select mode="multiple" placeholder="Please category" allowClear filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            {cate && cate.map((item, index) => (
              <Option key={index} value={item.id}>{item.name}</Option>
            ))}
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
