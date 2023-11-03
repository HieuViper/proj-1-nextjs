"use client";
import { SwapLeftOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Tabs,
  Upload,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function ArticleForm(props) {
  const router = useRouter();
  const params = useParams();
  const [form] = Form.useForm();
  const { Option } = Select;
  const [cate, setCate] = useState("");
  const [postStatus, setPostStatus] = useState("");
  const [data, setData] = useState(null);
  console.log("🚀 ~ file: ArticleForm.js:25 ~ ArticleForm ~ data:", data);
  const [lang, setLang] = useState("vi");
  const [picName, setPicName] = useState("");
  const [previewPic, setPreviewPic] = useState(null);
  const [catTree, setCatTree] = useState([]);
  const [langTable, setLangTable] = useState([]);

  const authors = [
    {
      value: "huy",
      label: "Jack Huy",
    },
    {
      value: "Cao",
      label: "Peter Cao",
    },
  ];

  //get the the title, content, excerpt from article data according the language
  //property: name of the column  you want to get the value
  //lang: language of the content
  // article: an array of article_lang
  function getArticleValue(property, article, lang) {
    // console.log('vao day');
    let rs;
    article.forEach((element) => {
      if (element.languageCode == lang) {
        rs = element[property];
      }
    });
    return rs;
  }

  //Set value for post_status field
  //parameters: value: the state of post_status
  //            publish: boolean, is publish button pressed?
  const setStatusHidden = (value, publish = false) => {
    form.setFieldValue("post_status", value);
    form.setFieldValue("publish", publish);
  };

  const getFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  //Notify success adding new from /admin/add
  function notifyAddArticleSuccess() {
    //get message redirected from add news route
    if (searchParams.get("message")) {
      const message = searchParams.get("message") ?? "";
      if (message == 1) {
        //signal of success edit on server
        let messageNotify = "Add news successfully";
        toast.success(messageNotify, {
          position: "top-center",
        });
      } else {
        //signal of faillure on server
        let messageNotify = `Cannot add new news, please try again or inform admin: ${message}`;
        toast.success(messageNotify, {
          position: "top-center",
        });
      }
    }
  }

  //generate slug from title
  function generateArticleCode() {
    let articleCode = form
      .getFieldValue(`title_${process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE}`)
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/\s/g, "-");
    form.setFieldValue("article_code", articleCode);
  }

  // CATEGORY
  //Build category tree from category table
  function buildCategoryTree(categories, parent = null) {
    const categoryTree = [];

    for (const category of categories) {
      if (category.parent === parent) {
        const children = buildCategoryTree(categories, category.id);
        if (children.length > 0) {
          category.children = children;
        }
        categoryTree.push(category);
      }
    }
    return categoryTree;
  }

  //render <option> for select box from category tree
  function renderCategoryOptions(category, level = 0) {
    const options = [];

    options.push(
      <Option key={category.id} value={category.category_code}>
        {Array(level).fill("—").join(" ")} {category.name}
      </Option>
    );

    if (category.children) {
      for (const childCategory of category.children) {
        options.push(...renderCategoryOptions(childCategory, level + 1));
      }
    }

    return options;
  }

  //Tab handle
  const TabComponent = ({ lang }) => {
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
          {
            //only generate article_code when post status is not published
            lang == process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE &&
            data?.post_status != process.env.NEXT_PUBLIC_PS_PUBLISH ? (
              <Input onChange={() => generateArticleCode()} />
            ) : (
              <Input />
            )
          }
        </Form.Item>
        <Form.Item label="Short" name={`excerpt_${lang}`}>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="content" name={`content_${lang}`}>
          <Input />
        </Form.Item>
      </>
    );
  };
  const itemsTab = props.langTable?.map((item) => ({
    key: item.code,
    label: item.name,
    children: (
      <>
        <TabComponent lang={item.code} />
      </>
    ),
  }));
  const handleChangeTab = (key) => {
    console.log(key);
  };

  // Handle SUBMIT FORM
  async function handleSubmit(value) {
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

  //USE EFFECT
  useEffect(() => {
    setCatTree(buildCategoryTree(props.cate));
    setLangTable(props.langTable); //set languageTable for article
    if (params?.id) {
      //get the article, articledata is an array it's each row is a language's article
      let articleData = props.data;
      //Build the data for title, excerpt, content
      let mainArticleContent = {};

      props.langTable?.forEach((lang) => {
        mainArticleContent[`title_${lang.code}`] = getArticleValue(
          "title",
          articleData,
          lang.code
        );
        mainArticleContent[`excerpt_${lang.code}`] = getArticleValue(
          "excerpt",
          articleData,
          lang.code
        );
        mainArticleContent[`content_${lang.code}`] = getArticleValue(
          "content",
          articleData,
          lang.code
        );
      });
      //format data to be suitable for the form fields
      let data1 = { ...articleData[0], ...mainArticleContent }; //get the first row of article to join with the new properties

      data1 = {
        ...data1,
        categories: data1.categories?.split(","), //set an array of category code to the field categories
        article_position: data1?.article_position == 1 ? true : false,
      };
      form.setFieldsValue(data1); //the data for the all the fields of form is done formating
      setData(data1); //set state for article
      setPostStatus(data1.post_status);
      notifyAddArticleSuccess();
    }
  }, [props]);

  return (
    <>
      <div className="flex justify-start">
        <Link href={`/admin/articles`}>
          <Button type="dashed" icon={<SwapLeftOutlined />}>
            Back to ArticleList
          </Button>
        </Link>
      </div>

      <Form
        name="article"
        labelCol={{
          span: 3,
        }}
        wrapperCol={
          {
            // span: 20,
          }
        }
        style={{
          maxWidth: 1000,
          height: "100%",
        }}
        initialValues={{
          article_position: 1,
        }}
        onFinish={handleSubmit}
        onFinishFailed={handleSubmitFailed}
        autoComplete="off"
        form={form}
      >
        {/* Display button action */}
        {postStatus == "publish" ? (
          <div className="flex justify-around">
            <div className="flex">
              <Form.Item className="p-2">
                <Button
                  type="primary"
                  ghost
                  htmlType="submit"
                  onClick={() =>
                    setStatusHidden(process.env.NEXT_PUBLIC_PS_DRAFT)
                  }
                >
                  Switch to Draft
                </Button>
              </Form.Item>
              <Form.Item className="p-2">
                <Button
                  danger
                  htmlType="submit"
                  onClick={() =>
                    setStatusHidden(process.env.NEXT_PUBLIC_PS_TRASH)
                  }
                >
                  Move to trash
                </Button>
              </Form.Item>
            </div>
            <Form.Item className="p-2">
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => setStatusHidden(postStatus)}
              >
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
                  onClick={() =>
                    setStatusHidden(process.env.NEXT_PUBLIC_PS_TRASH)
                  }
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
                    setStatusHidden(process.env.NEXT_PUBLIC_PS_DRAFT);
                  }}
                >
                  Save Draft
                </Button>
              </Form.Item>
              <Form.Item className="p-2">
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() =>
                    setStatusHidden(process.env.NEXT_PUBLIC_PS_PUBLISH, true)
                  }
                >
                  Publish
                </Button>
              </Form.Item>
            </div>
          </div>
        )}

        <Form.Item label="Slug" name="article_code">
          <Input
            disabled={
              data?.post_status == process.env.NEXT_PUBLIC_PS_PUBLISH
                ? true
                : false //disabled this field if the post already has article_code
            }
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

        <Form.Item
          label="Author"
          name="post_author"
          rules={[
            {
              required: true,
              message: "Please select the author!",
            },
          ]}
        >
          <Select
            style={{
              width: 120,
            }}
            options={authors}
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
            {catTree?.map((category) => renderCategoryOptions(category))}
          </Select>
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

        {/* Tab */}
        <div className="px-14">
          <Tabs
            defaultActiveKey="1"
            items={itemsTab}
            onChange={handleChangeTab}
          />
        </div>

        <Form.Item
          name="post_status"
          style={{ display: "none" }} // Hide the field using CSS
          // or className="hidden-field" // Apply a CSS class to hide the field
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="publish"
          style={{ display: "none" }} // Hide the field using CSS
          valuePropName="checked"
          // or className="hidden-field" // Apply a CSS class to hide the field
        >
          <Switch />
        </Form.Item>
      </Form>
    </>
  );
}
