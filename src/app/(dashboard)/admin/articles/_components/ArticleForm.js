"use client";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from "antd";
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

  const handleChange = ({ target: { name, value } }) =>
    setArticles({ ...articles, [name]: value });

  const handleSubmit = async (e) => {
    // e.preventDefault();
  };
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
        article_position: 1,
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
            message: "Please input your title!",
          },
        ]}
      >
        <Input
          onChange={(e) => form.setFieldValue({ title: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Short" name="excerpt">
        <Input
          onChange={(e) => form.setFieldValue({ excerpt: e.target.value })}
        />
      </Form.Item>

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
          onChange={(e) => form.setFieldValue({ post_author: e.target.value })}
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
          onChange={(e) => form.setFieldValue({ article_code: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        name="post_status"
        label="status"
        rules={[
          {
            required: true,
            message: "Please select status!",
          },
        ]}
      >
        <Select
          placeholder="select your status"
          onChange={(e) => form.setFieldValue({ post_status: e })}
        >
          <Option value="draft">Draft</Option>
          <Option value="publish">Publish</Option>
        </Select>
      </Form.Item>

      <Form.Item name="image" label="Image" getValueFromEvent={getFile}>
        <Upload
          name="file"
          maxCount={1}
          // action="/api/articles/image"
          customRequest={(info) => {
            console.log(info);
            setPreviewPic(info.file);
            setPicName("");
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
        {picName && (
          <img
            src={`/uploads/${picName}`}
            className="w-32 h-32 rounded-sm shadow"
            alt={`${picName}`}
          />
        )}
      </Form.Item>

      <Form.Item label="content" name="content">
        <Input
          onChange={(e) => form.setFieldValue({ content: e.target.value })}
        />
      </Form.Item>

      <Form.Item label="position" name="article_position">
        <InputNumber
          min={1}
          max={10}
          onChange={(e) => form.setFieldValue({ article_position: e.value })}
        />
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
