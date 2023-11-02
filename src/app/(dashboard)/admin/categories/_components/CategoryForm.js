"use client";
import { Button, Form, Input, Tabs, TreeSelect } from "antd";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function CategoryForm(props) {
  console.log('props :', props);
  const [category, setCategory] = useState({
    name: "",
    description: "",
    price: 0,
  });
  const [loading, setLoading] = useState(false);
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
    setLoading(true)
    try {
      if (params?.id) {
        await axios.put("/api/categories/" + params.id, {
          name: value.name,
          type: value.type,
          description: value.description,
        });
        props.handleModal()
        toast.success("Task Updated", {
          position: "bottom-center",
        });
        setLoading(false)
        props.handleModal
      } else {
        await axios.post("/api/categories", value);

        toast.success("Task Saved");
        setLoading(false)
        props.handleModal
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

  const items = [
    {
      key: '1',
      label: 'Việt Nam',
      children:
        <>
          <Form.Item
            label="Name:"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your category name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description:"
            name="description"
          >
            <Input.TextArea rows={4} />
          </Form.Item>,
        </>
    },
    {
      key: '2',
      label: 'English',
      children: <>
        <Form.Item
          label="Name:"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your category name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description:"
          name="description"
        >
          <Input.TextArea rows={4} />
        </Form.Item>,
      </>
    },
  ];
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 16,
      }}
      wrapperCol={{
        offset: 1,
        span: 21,
      }}
      style={{
        // maxWidth: 2000,
        // width: '100%',
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={handleSubmit}
      onFinishFailed={handleSubmitFailed}
      autoComplete="off"
      form={form}
      layout={params?.id ? "horizontal" : "vertical"}
    >
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        indicatorSize={(origin) => origin - 16}
        centered
      />
      <Form.Item
        label="Category code:"
        name="category_code"

      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Parent:"
        name="parent"
      >

        <TreeSelect
          showSearch
          allowClear
          treeDefaultExpandAll
          treeData={[
            { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }, { title: 'Bamboo', value: 'bamboo' }] },
          ]}
        />
      </Form.Item>

      {/* <Form.Item
        label="Description:"
        name="description"
      >
        <Input.TextArea rows={4} />
      </Form.Item> */}


      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        {params?.id ? <Button type="primary" htmlType="submit" loading={loading}>
          Update
        </Button> : <Button type="primary" htmlType="submit">
          Add News Categories
        </Button>}
      </Form.Item>

    </Form>
  );
}
