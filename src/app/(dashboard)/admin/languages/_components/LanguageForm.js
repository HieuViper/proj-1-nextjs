"use client";
import { Button, Form, Input, Switch } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const LanguageForm = (props) => {
  const { addLanguage, editLanguage, handleModal, dataOneLang, data, setData } =
    props;
  const code = dataOneLang && dataOneLang?.code;
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [form] = Form.useForm();

  const onChangeActive = (e) => {
    e == false
      ? form.setFieldsValue({ active: false })
      : form.setFieldsValue({ active: true });
  };

  const handleSubmit = async (value) => {
    setLoading(true);

    value.active == true ? (value.active = "1") : (value.active = "0");
    console.log(value);
    //edit
    try {
      if (code) {
        await editLanguage(value, code).then((res) => {
          console.log(
            "🚀 ~ file: LanguageForm.js:28 ~ awaiteditLanguage ~ res:",
            res
          );
          setData(res.result);
          handleModal();
          toast.success("Update Language successfully!");
          setLoading(false);
        });
      }
      //add
      else {
        await addLanguage(value).then((res) => {
          console.log(
            "🚀 ~ file: LanguageForm.js:41 ~ awaitaddLanguage ~ res:",
            res
          );
          setData(res.result);
          form.setFieldsValue({
            active: true,
            name: "",
            code: "",
            description: "",
          });
          handleModal;
          toast.success("Add Language successfully!");
          setLoading(false);
        });
      }
    } catch (error) {
      toast.error("Some thing went wrong" + error, { duration: 4000 });
      setLoading(false);
    }
  };

  const handleSubmitFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (dataOneLang) {
      form.setFieldsValue(dataOneLang);
    }
  }, [props]);

  return (
    <Form
      name="basic"
      onFinish={handleSubmit}
      onFinishFailed={handleSubmitFailed}
      autoComplete="off"
      form={form}
      initialValues={{ active: true }}
      layout={"vertical"}
    >
      <Form.Item
        label={<span className="font-medium ">Language Code:</span>}
        rules={[
          {
            required: true,
            message: "Please input code language!",
          },
        ]}
        name="code"
      >
        <Input placeholder="Input Language Code" />
      </Form.Item>
      <Form.Item
        label={<span className="font-medium ">Language Name:</span>}
        rules={[
          {
            required: true,
            message: "Please input name language!",
          },
        ]}
        name="name"
      >
        <Input placeholder="Input Language Name" />
      </Form.Item>
      <Form.Item
        label={<span className="font-medium ">Description:</span>}
        name="description"
      >
        <Input placeholder="Desctiption about language" />
      </Form.Item>
      <Form.Item
        label={<span className="font-medium ">Active:</span>}
        valuePropName="checked"
        name="active"
      >
        <Switch defaultChecked />
      </Form.Item>

      {code ? (
        <Button
          type="primary"
          htmlType="submit"
          disabled={loading}
          loading={loading}
        >
          Update
        </Button>
      ) : (
        <Button type="primary" htmlType="submit" loading={loading}>
          Add New Language
        </Button>
      )}
    </Form>
  );
};

export default LanguageForm;
