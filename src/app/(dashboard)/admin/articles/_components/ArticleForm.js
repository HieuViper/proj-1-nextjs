"use client";
import { SwapLeftOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Tabs,
  Upload,
  message,
} from "antd";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function ArticleForm(props) {
  const [articles, setArticles] = useState({
    title: "",
    category_id: 0,
    excerpt: "",
    content: "",
    post_author: "",
    article_code: "",
    active: false,
  });
  const router = useRouter();
  const params = useParams();
  const [form] = Form.useForm();
  const { Option } = Select;
  const [cate, setCate] = useState("");
  const [postStatus, setPostStatus] = useState();
  const [data, setData] = useState(null);
  console.log("🚀 ~ file: ArticleForm.js:25 ~ ArticleForm ~ data:", data);
  const [lang, setLang] = useState("vi");
  const [picName, setPicName] = useState();
  const [previewPic, setPreviewPic] = useState();

  useEffect(() => {
    if (params?.id) {
      const data = props.data;
      data.map((item) => {
        if (item.languageCode == lang) {
          setData(item);
          form.setFieldsValue({
            ...item,
            categories: item?.categories?.split(","),
          });
          setPicName(item.image);
        }
      });
    }
    const cate = props.cate;
    setCate(cate);
  }, []);

  async function handleSubmit(value) {
    const articleCode = value.title
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/\s/g, "-");
    if (postStatus == "publish") {
      const postDate =
        new Date().toISOString().slice(0, 10) +
        " " +
        new Date().toLocaleTimeString("en-GB");
      Object.assign(value, { post_date: postDate, article_position: 1 });
    } else {
      Object.assign(value, { article_position: 0 });
    }
    Object.assign(value, {
      post_status: postStatus,
      article_code: articleCode,
    });
    value.image = picName;

    console.log("value submit:", value);
  }

  const handleSubmitFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const getFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  //tab
  const TabComponent = (lang) => {
    return (
      <>
        <Form.Item
          label="Title"
          name={`title_${lang}`}
          rules={[
            {
              required: true,
              message: "Please input your title!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Short" name={`excerpt_${lang}`}>
          <Input />
        </Form.Item>
        <Form.Item label="content" name={`content_${lang}`}>
          <Input />
        </Form.Item>
      </>
    );
  };
  const itemsTab = [
    {
      key: "vi",
      label: "Tiếng Việt",
      children: <TabComponent lang="vi" />,
    },
    {
      key: "en",
      label: "English",
      children: <TabComponent lang="en" />,
    },
  ];
  const handleChangeTab = (key) => {
    console.log(key);
  };

  return (
    <>
      <div className="flex justify-start">
        <Button type="dashed" icon={<SwapLeftOutlined />}>
          <Link href={`/admin/articles`}>Back to ArticleList</Link>
        </Button>
      </div>
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
          article_position: 1,
        }}
        onFinish={handleSubmit}
        onFinishFailed={handleSubmitFailed}
        autoComplete="off"
        form={form}
      >
        {data?.post_status == "publish" ? (
          <div className="flex justify-around">
            <div className="flex">
              <Form.Item className="p-2">
                <Button
                  type="primary"
                  ghost
                  htmlType="submit"
                  onClick={() => setPostStatus("draft")}
                >
                  Switch to Draft
                </Button>
              </Form.Item>
              <Form.Item className="p-2">
                <Button
                  danger
                  htmlType="submit"
                  onClick={() => setPostStatus("trash")}
                >
                  Move to trash
                </Button>
              </Form.Item>
            </div>
            <Form.Item className="p-2">
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </div>
        ) : (
          <div
            className={`flex  ${params.id ? "justify-around" : "justify-end"}`}
          >
            {params.id && (
              <Form.Item className="p-2">
                <Button
                  danger
                  htmlType="submit"
                  onClick={() => setPostStatus("trash")}
                >
                  Move to trash
                </Button>
              </Form.Item>
            )}
            <div className="flex">
              <Form.Item className="p-2">
                <Button
                  type="dashed"
                  htmlType="submit"
                  onClick={() => {
                    // form.setFieldValue({ post_status: "draft" });
                    setPostStatus("draft");
                    // console.log(">>> value form ", form.getFieldsValue());
                  }}
                >
                  Save Draft
                </Button>
              </Form.Item>
              <Form.Item className="p-2">
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => setPostStatus("publish")}
                >
                  Publish
                </Button>
              </Form.Item>
            </div>
          </div>
        )}

        <Form.Item
          label="Category"
          name="categories"
          rules={[
            {
              required: true,
              message: "Please select your category!",
            },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Please category"
            allowClear
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {cate &&
              cate.map((item, index) => (
                <Option key={index} value={item.id}>
                  {item.category_code}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="author" name="post_author">
          <Input
            onChange={(e) =>
              form.setFieldValue({ post_author: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          label="code"
          name="article_code"
          rules={[
            {
              required: true,
              message: "Please input your code!",
            },
          ]}
        >
          <Input
            onChange={(e) =>
              form.setFieldValue({ article_code: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item name="image" label="Image" getValueFromEvent={getFile}>
          <Upload
            name="file"
            maxCount={1}
            // action="/api/articles/image"
            customRequest={(info) => {
              console.log(info.file.name);
              setPreviewPic(info.file);
              setPicName(info.file.name);
            }}
            showUploadList={false}
            beforeUpload={(file) => {
              return new Promise((resolve, reject) => {
                if (file.size > 9000000) {
                  reject("file size exceed");
                  message.error("File size exceed");
                } else {
                  resolve("success");
                  message.success("Upload successfully");
                }
              });
            }}
            headers={{ authorization: "authorization-text" }}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
          {previewPic && (
            <img
              src={`${URL.createObjectURL(previewPic)}`}
              className="w-32 h-32 rounded-sm shadow"
              alt={`${picName}`}
            />
          )}
          {picName && !previewPic && (
            <img
              src={`/uploads/${picName}`}
              className="w-32 h-32 rounded-sm shadow"
              alt={`${picName}`}
            />
          )}
        </Form.Item>

        <Form.Item label="position" name="article_position">
          <InputNumber
            min={1}
            max={10}
            onChange={(e) => form.setFieldValue({ article_position: e.value })}
          />
        </Form.Item>
        <div className="px-20">
          <Tabs
            defaultActiveKey="1"
            items={itemsTab}
            onChange={handleChangeTab}
          />
        </div>
      </Form>
    </>
  );
}
