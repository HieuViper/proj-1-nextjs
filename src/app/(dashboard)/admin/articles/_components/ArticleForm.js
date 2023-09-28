"use client";
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function ArticleForm() {
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
    const fetchCate = async () => {
      try {
        const cate = await axios.get("/api/categories");
        console.log("cate", cate.data);
        setCate(cate?.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCate();
  }, []);
  useEffect(() => {
    const fetcharticles = async (id) => {
      try {
        const { data } = await axios.get("/api/articles/" + id);
        console.log(
          "🚀 ~ file: articlesForm.js:20 ~ fetcharticles ~ data:",
          data
        );
        setArticles(data);
        form.setFieldsValue(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (params?.id) {
      fetcharticles(params.id);
    }
  }, [params.id]);

  const handleChange = ({ target: { name, value } }) =>
    setArticles({ ...articles, [name]: value });

  const handleSubmit = async (e) => {
    // e.preventDefault();
    console.log(form.getFieldsValue());
    try {
      if (params?.id) {
        await axios.put("/api/articles/" + params.id, form.getFieldsValue());

        toast.success("Task Updated", {
          position: "bottom-center",
        });
      } else {
        const rs = await axios.post("/api/articles", form.getFieldsValue());
        console.log("🚀 ~ file: ArticleForm.js:75 ~ handleSubmit ~ rs:", rs);

        toast.success("Task Saved", {
          position: "bottom-center",
        });
      }

      router.push("/admin/articles");
      router.refresh();
    } catch (error) {
      toast.error(error.response.data.message);
    }
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
