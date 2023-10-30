"use client";
import axios from "axios";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button, Form, Input, Select, Switch, Tooltip, Tabs } from 'antd';
import { SwapLeftOutlined } from '@ant-design/icons';
import Editor from "@/components/Editor";
import Link from "next/link";
import { addNews, editNews } from "@/library/updateNews";
import FormItem from "antd/es/form/FormItem";



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
  const [tags, setTags] = useState();
  const [newsPosition, setNewsPosition] = useState();

  const authors = [{
    value: 'huy',
    label: 'Jack Huy',
  },
  {
    value: 'Cao',
    label: 'Peter Cao',
  }];

  useEffect(() => {
    if (params?.id) {
      const data = JSON.parse(props.data);
      //format data to be suitable for the form fields
      form.setFieldsValue({ ...data, categories: (data?.categories).split(',').map(Number) })
      setData(data);
      setPostStatus(data.post_status);
      setNewsPosition(data.news_position);
    }
    const cate = JSON.parse(props.cate);
    setCate(cate);
    const tags = JSON.parse(props.tags);
    setTags(tags);

  }, [props])


  //Generate newsCode for the post. It pick the Title of the default language
  function generateNewsCode() {
    let newsCode = form.getFieldValue(`title_${process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE}`).trim().normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/\s/g, "-")
    form.setFieldValue('news_code', newsCode);
  }

  //Handle submit form data to server
  async function handleSubmit(value) {
    console.log('value submit:', value);
    const newsCode = value.titlevi.trim().normalize('NFD')
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
      //post_status: postStatus,
      news_code: newsCode,
      type: process.env.POST_TYPE_NEWS,
    });
    try {
      //editing news
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
      //adding news
      else {
        await addNews(value).then((message) => {console.log("message from server:", message)})
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
  //Set value for post_status field
  const setStatusHidden = ( value ) => {
    form.setFieldValue('post_status', value);
    console.log("value of form,", form.getFieldValue('post_status'));
  }






// tab handle

  const TabComponent = ({lang}) => {
    return (
      <>
      <Form.Item
          label="Title"
          name={`title_${lang}`}
          rules={[
            {
              required: true,
              message: 'Please input your title!',
            },
          ]}
        >
          {
          lang == process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE && data?.post_status != process.env.NEXT_PUBLIC_PS_PUBLISH ?
            <Input onChange={() => generateNewsCode()} />
            :
            <Input />
         }


        </Form.Item>
        <Form.Item
          label="Excerpt"
          name={`excerpt${lang}`}
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
          name={`content${lang}`}
          rules={[
            {
              required: true,
              message: 'Please input your content!',
            },
          ]}
        >
          <Editor />
        </Form.Item>
      </>
    )
  }
  const itemTab = [
    {
      key: 'vi',
      label: 'Tieng Viet',
      children: <>
        <TabComponent lang='vi' />
      </>,
    },
    {
      key: 'en',
      label: 'English',
      children: <TabComponent lang='en' />,
    },
  ];

  const handleChangeTab = (key) => {
    console.log('>>> key tab ', key);
  }

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
        {
          //Handle display Action buttons
        postStatus == "publish" ?
          ( <div className="flex justify-around">
            <div className="flex">
              <Form.Item
                className="p-2"
              >
                <Button type="primary" ghost htmlType="submit" onClick={() => setStatusHidden(process.env.NEXT_PUBLIC_PS_DRAFT)}>
                  Switch to Draft
                </Button>
              </Form.Item>
              <Form.Item
                className="p-2"
              >
                <Button danger htmlType="submit" onClick={() => setStatusHidden(process.env.NEXT_PUBLIC_PS_TRASH)}>
                  Move to trash
                </Button>
              </Form.Item>
            </div>
            <Form.Item
              className="p-2"
            >
              <Button type="primary" htmlType="submit" onClick={() => setStatusHidden(postStatus)}>
                Update
              </Button>
            </Form.Item>
          </div>
          )
          :
          (
          <div className={`flex  ${params.id ? 'justify-around' : 'justify-end'}`}>
            {
            params.id &&
            <Form.Item className="p-2">
              <Button danger htmlType="submit" onClick={() => setStatusHidden(process.env.NEXT_PUBLIC_PS_TRASH)}>
                Move to trash
              </Button>
            </Form.Item>
            }
            <div className="flex">
              <Form.Item
                className="p-2"
              >
                <Button type="dashed" htmlType="submit" onClick={() => setStatusHidden(process.env.NEXT_PUBLIC_PS_DRAFT)}>
                  Save Draft
                </Button>
              </Form.Item>
              <Form.Item

                className="p-2"
              >
                <Button type="primary" htmlType="submit" onClick={() => setStatusHidden(process.env.NEXT_PUBLIC_PS_PUBLISH)} >
                  Publish
                </Button>

              </Form.Item>
            </div>
          </div>
          )
        }

        <Form.Item
          label="Priority"
          name="news_position"
        >
          <Tooltip title="Can active when status is publish">
            <Switch checked={newsPosition == 1 ? true : false} onChange={onChangePosition} />
          </Tooltip>
        </Form.Item>

        <Form.Item
          label="Slug"
          name="news_code"
        >
          <Input disabled={
            data?.post_status == process.env.NEXT_PUBLIC_PS_PUBLISH ? true : false  //disabled this field if the post already has newscode
          }
          />
        </Form.Item>

        <Form.Item label="Author" name="post_author" rules={[
          {
            required: true,
            message: 'Please select your category!',
          },
        ]}
        >
          <Select
            //value={}
            style={{
              width: 120,
            }}
            //onChange={handleChangeLanguage}
            options={authors}
          />
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
              <Option key={index} value={item.id}>{item.category_code}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Tags" name="tags" rules={[
          {
            required: true,
            message: 'Please add your tags!',
          },
        ]}
        >
          <Select mode="multiple" placeholder="Please tags" allowClear filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            {tags && tags.map((item, index) => (
              <Option key={index} value={item.id}>{item.tag_code}</Option>
            ))}
          </Select>
        </Form.Item>

           {/* Manage multilanguages here */}

           <Tabs defaultActiveKey="1" items={itemTab} onChange={handleChangeTab} />

      <Form.Item
        name="post_status"
        style={{ display: 'none' }} // Hide the field using CSS
        // or className="hidden-field" // Apply a CSS class to hide the field
      >
        <Input />
      </Form.Item>

      </Form>
    </>
  );
}
