"use client";
import { Button, Form, Input, Tabs } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function TagForm(props) {
  const { addTag, editTag, handleModal, dataTag, langTable, lang, setTags } =
    props;
  const id = dataTag && dataTag[0]?.id;
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [form] = Form.useForm();
  const [isChangeCode, setIsChangeCode] = useState(false);

  function getTagValue(property, tag, lang) {
    let rs;
    tag.forEach((element) => {
      if (element.languageCode == lang) {
        rs = element[property];
      }
    });
    return rs;
  }

  // SUBMIT FORM
  const handleSubmit = async (value) => {
    const tagLangs = langTable.map((lang) => {
      delete value[`name_${lang.code}`]; //delete unsused properties
      delete value[`description_${lang.code}`];
      return {
        name: form.getFieldValue(`name_${lang.code}`) ?? "",
        description: form.getFieldValue(`description_${lang.code}`) ?? "",
        languageCode: lang.code,
        TagId: id,
      };
    });
    setLoading(true);
    try {
      if (id) {
        await editTag(value, tagLangs, id, lang).then((res) => {
          setTags(res.tagList.data);
          handleModal();
          toast.success("Update Tag success ");
          setLoading(false);
        });
      } else {
        if (form.getFieldValue("tag_code").length <= 0) {
          value = {
            ...value,
            tag_code: tagLangs[0].name
              .trim()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/đ/g, "d")
              .replace(/Đ/g, "D")
              .replace(/\s/g, "-"),
          };
        }

        console.log("value :", value);
        await addTag(value, tagLangs, lang).then((res) => {
          setTags(res.tagList.data);
          toast.success("Create Tag success");
          setLoading(false);
          form.resetFields();
        });
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const handleSubmitFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // CHANGE NAME TO CODE
  const changeCode = (e) => {
    if (e.length <= 0) {
      setIsChangeCode(false);
    } else {
      setIsChangeCode(true);
    }
  };
  function generateTagCode(e) {
    let tagCode = e
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/\s/g, "-");
    if (!isChangeCode) {
      form.setFieldValue("tag_code", tagCode);
    }
  }

  // TABS
  const TabComponent = ({ lang }) => {
    return (
      <>
        <Form.Item
          label={<span className="font-medium ">Name:</span>}
          name={`name_${lang}`}
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
          className="mb-0"
        >
          {lang == process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE ? (
            <Input
              onChange={(e) => generateTagCode(e.target.value)}
              placeholder="Input name"
            />
          ) : (
            <Input placeholder="Input name" />
          )}
        </Form.Item>
        <div className="py-2 px-6 text-[#646970] text-left text-xs">
          The name is how it appears on your site.
        </div>
        <Form.Item
          label={<span className="font-medium">Description:</span>}
          name={`description_${lang}`}
          className="mb-0"
        >
          <Input.TextArea rows={4} placeholder="Input description" />
        </Form.Item>
        <div className="py-2 px-6 text-[#646970] text-left text-xs">
          The description is not prominent by default; however, some themes may
          show it.
        </div>
      </>
    );
  };
  const itemsTab = langTable?.map((item) => ({
    key: item.code,
    label: item.name,
    children: (
      <>
        <TabComponent lang={item.code} />
      </>
    ),
  }));

  useEffect(() => {
    if (dataTag) {
      let tagData = dataTag;
      let mainTagContent = {};

      langTable?.forEach((lang) => {
        mainTagContent[`name_${lang.code}`] = getTagValue(
          "name",
          tagData,
          lang.code
        );
        mainTagContent[`description_${lang.code}`] = getTagValue(
          "description",
          tagData,
          lang.code
        );
      });
      let data1 = { ...tagData[0], ...mainTagContent };
      form.setFieldsValue(data1);
    }
  }, [props]);
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
      style={
        {
          // maxWidth: 2000,
          // width: '100%',
        }
      }
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
        defaultActiveKey="vi"
        items={itemsTab}
        indicatorSize={(origin) => origin - 16}
        centered
      />
      {!id && (
        <Form.Item
          label={<span className="font-medium ">Tag code:</span>}
          name="tag_code"
          className="mb-0"
        >
          <Input
            onChange={(e) => changeCode(e.target.value)}
            placeholder="Input Tag code"
          />
        </Form.Item>
      )}
      {!id && (
        <div className="py-2 px-6 text-[#646970] text-left text-xs">
          The “Tag code” is the URL-friendly version of the name. It is usually
          all lowercase and contains only letters, numbers, and hyphens.
        </div>
      )}

      <Form.Item
        wrapperCol={{
          offset: 10,
          span: 16,
        }}
      >
        {id ? (
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
            Add New Tags
          </Button>
        )}
      </Form.Item>
    </Form>
  );
}
