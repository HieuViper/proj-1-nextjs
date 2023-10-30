"use client";
import { Button, Form, Input, Select } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function ArticleForm(props) {
  const [articles, setArticles] = useState({
    title: "",
    category_id: 0,
    short: "",
    content: "",
    author: "",
    code: "",
    active: false,
  });
  const router = useRouter();
  const params = useParams();
  const [form] = Form.useForm();
  const { Option } = Select;
  const [cate, setCate] = useState("");

  useEffect(() => {
    if (params?.id) {
      const data = JSON.parse(props.data);
      form.setFieldsValue({
        ...data,
        categories: (data?.categories).split(",").map(Number),
      });
      setData(data);
      setPostStatus(data.post_status);
      setNewsPosition(data.news_position);
    }
    const cate = JSON.parse(props.cate);
    setCate(cate);
  }, [props]);

  const handleChange = ({ target: { name, value } }) =>
    setArticles({ ...articles, [name]: value });

  const handleSubmit = async (e) => {
    // e.preventDefault();
  };
  const handleSubmitFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
            message: "Please input your title!",
          },
        ]}
      >
        <Input
          onChange={(e) => form.setFieldValue({ title: e.target.value })}
        />
      </Form.Item>
      <Form.Item
        label="Short"
        name="short"
        rules={[
          {
            required: true,
            message: "Please input your short!",
          },
        ]}
      >
        <Input
          onChange={(e) => form.setFieldValue({ short: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        label="author"
        name="author"
        rules={[
          {
            required: true,
            message: "Please input your author!",
          },
        ]}
      >
        <Input
          onChange={(e) => form.setFieldValue({ author: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        label="code"
        name="code"
        rules={[
          {
            required: true,
            message: "Please input your code!",
          },
        ]}
      >
        <Input onChange={(e) => form.setFieldValue({ code: e.target.value })} />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category_id"
        rules={[
          {
            required: true,
            message: "Please select your category!",
          },
        ]}
      >
        <Select onChange={(e) => form.setFieldValue({ category_id: e })}>
          {cate.length > 0 &&
            cate.map((data, i) => (
              <Option key={i} value={data.id}>
                {data.name}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="active"
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
          onChange={(e) => form.setFieldValue({ active: e })}
        >
          <Option value={parseInt(0)}>Active</Option>
          <Option value={parseInt(1)}>Not Active</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="content"
        name="content"
        rules={[
          {
            required: true,
            message: "Please input your content!",
          },
        ]}
      >
        <Input
          onChange={(e) => form.setFieldValue({ content: e.target.value })}
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
