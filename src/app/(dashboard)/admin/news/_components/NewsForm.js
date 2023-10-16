"use client";
import axios from "axios";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button, Form, Input, Select, Switch } from 'antd';
import { SwapLeftOutlined } from '@ant-design/icons';
import Editor from "@/components/Editor";
import Link from "next/link";
import { addNews, editNews } from "@/library/getNews";

export function NewsForm(props) {
  const { TextArea } = Input;
  const router = useRouter();
  const params = useParams();
  const pathName = usePathname();
  const [form] = Form.useForm();
  const [cate, setCate] = useState()
  const [postStatus, setPostStatus] = useState()
  const [data, setData] = useState();
  // useEffect(() => {
  //   const fetchNews = async (id) => {
  //     try {
  //       const { data } = await axios.get("/api/news/" + id);
  //       console.log(
  //         "🚀 ~ file: NewsForm.js:20 ~ fetchNews ~ data:",
  //         data
  //       );
  //       form.setFieldsValue(data)
  //       setData(data)
  //       setPostStatus(data.post_status)
  //       setNewsPosition(data.news_position)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   if (params?.id) {
  //     fetchNews(params.id);
  //   }
  // }, [params.id]);
  // useEffect(() => {
  //   const fetchCate = async () => {
  //     try {
  //       const cate = await axios.get("/api/categories");
  //       console.log(
  //         "cate",
  //         cate.data
  //       );
  //       setCate(cate?.data)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchCate()
  // }, []);
  // const options = [];
  // cate && cate.map((item) => options.push({
  //   label: item.name,
  //   value: item.id,
  // }))
  // console.log("arrCate", arrCate)


  console.log('prop :', props);
  useEffect(() => {
    if (params?.id) {
      const data = JSON.parse(props.data)
      form.setFieldsValue(data)
      setData(data)
      setPostStatus(data.post_status)
      setNewsPosition(data.news_position)
    }
    const cate = JSON.parse(props.cate)
    setCate(cate)
  }, [props])

  const options = cate && cate.map((item) => ({
    label: item.name,
    value: item.id,
  }))

  async function updateNews(value) {
    const newsCode = value.title.trim().normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/\s/g, "-")

    if (postStatus == "publish") {
      const postDate = new Date().toISOString().slice(0, 10) + " " + new Date().toLocaleTimeString('en-GB')
      Object.assign(value, { post_date: postDate });
    }

    Object.assign(value, {
      post_author: 1,
      post_status: postStatus,
      news_code: newsCode, news_position: newsPosition,
      type: process.env.POST_TYPE_NEWS
    });
    try {
      if (params.id) {
        await editNews(value, params.id).then(() => {
          router.push(`${pathName}`)
        })
      }
      else {
        // const sqlquery = "INSERT INTO news SET ?";
        // await pool.query(sqlquery, {
        //   title, type, categories, post_author, post_date, excerpt, content, post_status, news_code, news_position
        // }); 
        await addNews(value).then((res) => {
          console.log('res :', res);
        })
      }
    }
    catch (error) {
      throw new Error('Fail to edit news');
    }
  }

  const handleSubmit = async (value) => {
    console.log("value", value)
    const newsCode = value.title.trim().normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/\s/g, "-")

    if (postStatus == "publish") {
      const postDate = new Date().toISOString().slice(0, 10) + " " + new Date().toLocaleTimeString('en-GB')
      Object.assign(value, { post_date: postDate });
    }

    Object.assign(value, {
      post_author: 1, post_status: postStatus,
      news_code: newsCode, news_position: newsPosition
    });

    try {
      if (params?.id) {
        await axios.put("/api/news/" + params.id, value);
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


  const [newsPosition, setNewsPosition] = useState()
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
        onFinish={updateNews}
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
          : <div className="flex justify-around">

            <Form.Item
              className="p-2"
            >
              <Button danger htmlType="submit" onClick={() => setPostStatus("trash")}>
                Move to trash
              </Button>
            </Form.Item>
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
          <Switch checked={newsPosition == 1 ? true : false} onChange={onChangePosition} />
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
        {/* <Form.Item
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
        </Form.Item> */}

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
            options={options}
          />
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
