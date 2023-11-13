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
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function ArticleForm(props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const [form] = Form.useForm();
  const { Option } = Select;
  const [cate, setCate] = useState("");
  const [postStatus, setPostStatus] = useState("");
  const [data, setData] = useState(null);
  console.log("🚀 ~ file: ArticleForm.js:25 ~ ArticleForm ~ data:", data);
  const [lang, setLang] = useState("vi");
  const [picName, setPicName] = useState("");
  console.log("🚀 ~ file: ArticleForm.js:32 ~ ArticleForm ~ picName:", picName);
  const [previewPic, setPreviewPic] = useState(null);
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
    if (searchParams.get("message")) {
      const message = searchParams.get("message") ?? "";
      if (message == 1) {
        //signal of success edit on server
        let messageNotify = "Add article successfully";
        toast.success(messageNotify, {
          position: "top-center",
        });
      } else {
        //signal of faillure on server
        let messageNotify = `Cannot add new article, please try again or inform admin: ${message}`;
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

  //CATEGORY
  //Render option cate
  const renderCateOptions = () => {
    const rs = [];
    cate &&
      cate.map((item) => {
        rs.push({
          label: item.name,
          value: item.category_code,
        });
      });
    return rs;
  };

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
  const itemsTab = JSON.parse(props.langTable)?.map((item) => ({
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

  const uploadPicToServer = async (event) => {
    const body = new FormData();
    // console.log("file", image)
    // const compressedFile = await imageCompression(previewPic, {
    //   maxSizeMB: 1,
    //   maxWidthOrHeight: 1920,
    //   useWebWorker: true,
    // });
    // console.log(
    //   "🚀 ~ file: ArticleForm.js:178 ~ uploadPicToServer ~ compressedFile:",
    //   compressedFile
    // );
    body.append("file", previewPic);

    const response = await fetch("/api/articles/image", {
      method: "POST",
      body,
    });
  };

  // Handle SUBMIT FORM
  async function handleSubmit(value) {
    value.categories = value.categories.toString();
    //value.news_position = newsPosition ? 1 : 0;
    console.log("article_position 2: ", form.getFieldValue("article_position"));
    if (form.getFieldValue("publish")) {
      value = { ...value, post_date: "1" }; //add property post_date into the value object
    }
    delete value["publish"];
    //Creating an array of records for inserting into article_lamguages table
    const articleLangs = langTable.map((lang) => {
      delete value[`title_${lang.code}`]; //delete unsused properties
      delete value[`excerpt_${lang.code}`];
      delete value[`content_${lang.code}`];
      return {
        title: form.getFieldValue(`title_${lang.code}`) ?? "",
        excerpt: form.getFieldValue(`excerpt_${lang.code}`) ?? "",
        content: form.getFieldValue(`excerpt_${lang.code}`) ?? "",
        languageCode: lang.code,
        articleId: params?.id,
      };
    });

    value.image = picName.replaceAll(" ", "_");

    console.log("value submit:", value);
    console.log("articleLangs: ", articleLangs);

    //editing article
    if (params?.id) {
      if (value.post_status == process.env.NEXT_PUBLIC_PS_TRASH)
        await props.dellArticle(value, articleLangs, params.id);
      else {
        await props
          .editArticle(value, articleLangs, params.id)
          .then((message) => {
            uploadPicToServer();
            if (message.message == 1) {
              //signal of success edit on server
              setPostStatus(form.getFieldValue("post_status")); //set postStatus state to rerender action buttons
              let messageNotify =
                form.getFieldValue("post_status") ==
                process.env.NEXT_PUBLIC_PS_DRAFT
                  ? "Save Draft Success"
                  : "Save Publish Success";
              toast.success(messageNotify, {
                position: "top-center",
              });
            } else {
              //signal of faillure on server
              let messageNotify =
                "Cannot update article, please try again or inform admin";
              toast.success(messageNotify, {
                position: "top-center",
              });
            }
          });
      }
    }
    //adding article
    else {
      await props.addArticle(value, articleLangs).then((message) => {
        uploadPicToServer();
        console.log("message from server:", message);
        if (message && message != 1) {
          let messageNotify =
            "Cannot update article, please try again or inform admin" + message;
          toast.success(messageNotify, {
            position: "top-center",
          });
        }
      });
    }
  }

  const handleSubmitFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //USE EFFECT
  useEffect(() => {
    setCate(JSON.parse(props.cate));
    setLangTable(JSON.parse(props.langTable)); //set languageTable for article
    if (params?.id) {
      //get the article, articledata is an array it's each row is a language's article

      let articleData = JSON.parse(props.data);
      console.log(
        "🚀 ~ file: ArticleForm.js:273 ~ useEffect ~ articleData:",
        articleData
      );
      //Build the data for title, excerpt, content
      let mainArticleContent = {};

      JSON.parse(props.langTable)?.forEach((lang) => {
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
      };
      form.setFieldsValue(data1); //the data for the all the fields of form is done formating
      setData(data1); //set state for article
      setPicName(data1.image);
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
            options={renderCateOptions()}
          ></Select>
        </Form.Item>

        <Form.Item name="image" label="Image" getValueFromEvent={getFile}>
          <Upload
            name="file"
            maxCount={1}
            // action="/api/articles/image"
            customRequest={(info) => {
              console.log(info);
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
            defaultValue={1}
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
