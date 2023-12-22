"use client";
const myConstant = require('@/store/constant')
import { Button, Form, Input, Tabs } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function ArticleForm(props) {
  const { addArticle, editArticle, handleModal, dataArticle, langTable, lang, setArticles } = props
  const id = dataArticle && dataArticle[0]?.id
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [form] = Form.useForm();
  const [isChangeCode, setIsChangeCode] = useState(false)



  function getArticleValue(property, article, lang) {
    let rs
    article.forEach(element => {
      if (element.languageCode == lang) {
        rs = element[property];
      }
    });
    return rs
  }

  // SUBMIT FORM
  const handleSubmit = async (value) => {
    const articleLangs = langTable.map(lang => {
      delete value[`name_${lang.code}`];    //delete unsused properties
      delete value[`description_${lang.code}`];
      return {
        name: form.getFieldValue(`name_${lang.code}`) ?? '',
        description: form.getFieldValue(`description_${lang.code}`) ?? '',
        languageCode: lang.code,
        article_categoryId: id,
      };
    });
    setLoading(true)
    try {
      if (id) {
        await editArticle(value, articleLangs, id, lang).then((res) => {
          setArticles(res.articleList.reverse())
          handleModal()
          toast.success("Update Article success ",);
          setLoading(false)
        })
      } else {
        if (form.getFieldValue('category_code').length <= 0) {
          value = {
            ...value, category_code: articleLangs[0].name.trim().normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd')
              .replace(/Đ/g, 'D')
              .replace(/\s/g, "-")
          }
        }
        await addArticle(value, articleLangs, lang).then((res) => {
          setArticles(res.articleList.reverse())
          toast.success("Create Article success");
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
  function generateArticleCode(e) {
    let articleCode = e.trim().normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/\s/g, "-")
    if (!isChangeCode) {
      form.setFieldValue('category_code', articleCode);
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
            <Input onChange={(e) => generateArticleCode(e.target.value)} placeholder="Input name" />
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

  useEffect(() => {
    if (dataArticle) {
      let articleData = (dataArticle);
      let mainArticleContent = {};

      langTable?.forEach((lang) => {
        mainArticleContent[`name_${lang.code}`] = getArticleValue('name', articleData, lang.code);
        mainArticleContent[`description_${lang.code}`] = getArticleValue('description', articleData, lang.code);
      })
      let data1 = { ...articleData[0], ...mainArticleContent };
      form.setFieldsValue(data1)
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
        indicatorSize={(origin) => origin - 16}
        centered
      />
      {!id && <Form.Item
        label={<span className="font-medium ">Article code:</span>}
        name="category_code"
        className="mb-0"
      >
        <Input onChange={(e) => changeCode(e.target.value)} placeholder="Input Article code" />
      </Form.Item>}
      {!id && <div className="py-2 px-6 text-[#646970] text-left text-xs">The “Article code” is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens.</div>}

      <Form.Item
        wrapperCol={{
          offset: 10,
          span: 16,
        }}
      >
        {id ? <Button type="primary" htmlType="submit" disabled={loading} loading={loading}>
          Update
        </Button> : <Button type="primary" htmlType="submit" loading={loading}>
          Add New Articles
        </Button>}
      </Form.Item>

    </Form>
  );
}
