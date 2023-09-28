"use client";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
        form.setFieldsValue(data);
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

        toast.success("Task Saved");
      }

      router.push("/admin/categories");
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
        label="name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="category code"
        name="category_code"
        rules={[
          {
            required: true,
            message: "Please input your category code!",
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
            message: "Please input your description!",
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
