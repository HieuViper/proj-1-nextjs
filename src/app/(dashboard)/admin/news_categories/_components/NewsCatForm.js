"use client";
const myConstant = require('@/store/constant')
import { Button, Form, Input, Tabs, TreeSelect } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function CategoryForm(props) {
  const router = useRouter();
  const { addNewsCate, editNewsCate, handleModal, dataCate, langTable, lang, categories, setCategories } = props
  const id = dataCate && dataCate[0]?.id
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [form] = Form.useForm();
  const [isChangeCode, setIsChangeCode] = useState(false)
  const [value, setValue] = useState();
  // const [category, setCategory] = useState([]);

  function getNewsValue(property, news, lang) {
    let rs
    news.forEach(element => {
      if (element.LanguageCode == lang) {
        rs = element[property];
      }
    });
    return rs
  }

  // SUBMIT FORM
  const handleSubmit = async (value) => {
    const newsLangs = langTable.map(lang => {
      delete value[`name_${lang.code}`];    //delete unsused properties
      delete value[`description_${lang.code}`];
      return {
        name: form.getFieldValue(`name_${lang.code}`) ?? '',
        description: form.getFieldValue(`description_${lang.code}`) ?? '',
        LanguageCode: lang.code,
        NewsCategoryId: id,
      };
    });
    setLoading(true)
    try {
      if (id) {
        await editNewsCate(value, newsLangs, id, lang).then((res) => {
          setCategories(res.cateList.reverse())
          handleModal()
          toast.success("Update category success ",);
          setLoading(false)
        })
      } else {
        if (form.getFieldValue('category_code').length <= 0) {
          value = {
            ...value, category_code: newsLangs[0].name.trim().normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd')
              .replace(/Đ/g, 'D')
              .replace(/\s/g, "-")
          }
        }
        await addNewsCate(value, newsLangs, lang).then((res) => {
          setCategories(res.cateList.reverse())
          toast.success("Create category success");
          setLoading(false)
          form.resetFields()
        })
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
      setIsChangeCode(false)
    } else {
      setIsChangeCode(true)
    }
  }
  function generateCateCode(e) {
    let cateCode = e.trim().normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/\s/g, "-")
    if (!isChangeCode) {
      form.setFieldValue('category_code', cateCode);
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
              message: 'Please input your name!',
            },
          ]}
          className="mb-0"
        >
          {lang == myConstant.DEFAULT_LANGUAGE ?
            <Input onChange={(e) => generateCateCode(e.target.value)} placeholder="Input name" />
            :
            <Input placeholder="Input name" />}
        </Form.Item>
        <div className="py-2 px-6 text-[#646970] text-left text-xs">The name is how it appears on your site.</div>
        <Form.Item
          label={<span className="font-medium">Description:</span>}
          name={`description_${lang}`}
          className="mb-0"

        >
          <Input.TextArea rows={4} placeholder="Input description" />
        </Form.Item>
        <div className="py-2 px-6 text-[#646970] text-left text-xs">The description is not prominent by default; however, some themes may show it.</div>

      </>
    )
  }
  const itemsTab = langTable?.map(item => (
    {
      key: item.code,
      label: item.name,
      children: <>
        <TabComponent lang={item.code} />
      </>
    }
  ))

  const onChange = (key) => {
    // console.log(key);
  };

  // CREATE TREE DATA
  function buildTreeData(data, parent = null) {
    return data
      .filter((item) => item.parent === parent)
      .map((item) => ({
        title: item.name,
        value: item.category_code,
        children: buildTreeData(data, item.id),
      }));
  }
  const treeData = categories && buildTreeData(categories, null);

  const onChange1 = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (dataCate) {
      let newsData = (dataCate);
      let mainNewsContent = {};

      langTable?.forEach((lang) => {
        mainNewsContent[`name_${lang.code}`] = getNewsValue('name', newsData, lang.code);
        mainNewsContent[`description_${lang.code}`] = getNewsValue('description', newsData, lang.code);
      })
      let data1 = { ...newsData[0], ...mainNewsContent };
      form.setFieldsValue(data1)
      // setCategory(data1)
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
        defaultActiveKey="vi"
        items={itemsTab}
        onChange={onChange}
        indicatorSize={(origin) => origin - 16}
        centered
      />
      {!id && <Form.Item
        label={<span className="font-medium ">Category code:</span>}
        name="category_code"
        className="mb-0"
      >
        <Input onChange={(e) => changeCode(e.target.value)} placeholder="Input category code" />
      </Form.Item>}
      {!id && <div className="py-2 px-6 text-[#646970] text-left text-xs">The “Category code” is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens.</div>}

      <Form.Item
        label={<span className="font-medium">Parent:</span>}
        name="parent"
        className="mb-0"
      >
        <TreeSelect
          showSearch
          allowClear
          treeDefaultExpandAll
          treeData={treeData}
          value={value}
          onChange={onChange1}
          dropdownStyle={{
            maxHeight: 400,
            overflow: 'auto',
          }}
          placeholder="Select parent"
        />
      </Form.Item>
      <div className="py-2 px-6 text-[#646970] text-left text-xs">Categories, unlike tags, can have a hierarchy. You might have a Jazz category, and under that have children categories for Bebop and Big Band. Totally optional.</div>

      <Form.Item
        wrapperCol={{
          offset: 10,
          span: 16,
        }}
      >
        {id ? <Button type="primary" htmlType="submit" disabled={loading} loading={loading}>
          Update
        </Button> : <Button type="primary" htmlType="submit" loading={loading}>
          Add News Categories
        </Button>}
      </Form.Item>

    </Form>
  );
}
