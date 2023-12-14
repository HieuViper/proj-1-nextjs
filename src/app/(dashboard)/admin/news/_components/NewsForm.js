"use client";
import { SwapLeftOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Image,
  Input,
  Select,
  Switch,
  Tabs,
  Tooltip,
  TreeSelect,
  Upload,
} from "antd";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import Editor from "@/components/Editor";
import dynamic from "next/dynamic";
import { useLogin } from "@/store/login";
import ImageList from "@/components/NewsImgsList";
const myConstant = require('@/store/constant')


export function NewsForm(props) {
  const { TextArea } = Input;
  const { Option } = Select;
  const router = useRouter();
  const params = useParams();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const [langTable, setLangTable] = useState([]);
  const [postStatus, setPostStatus] = useState("");
  const [data, setData] = useState([]);
  const [catTree, setCatTree] = useState([]);
  const [picURL, setPicURL] = useState(null);
  const [previewPic, setPreviewPic] = useState(null);
  const { setLoginForm } = useLogin();    //use to set global state allowing enable the login form.
  const [isModalPicOpen, setIsModalPicOpen] = useState( false );
  const [editor, setEditor] = useState(null);

  const Editor2 = dynamic(() => import("@/components/Editor2"), { ssr: false });
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

  //get the the title, content, excerpt from news data
  //property: name of the column  you want to get the value
  //lang: language of the content
  // news: an array of news_lang
  function getNewsValue(property, news, lang) {
    // console.log('vao day');
    let rs;
    news.forEach((element) => {
      if (element.LanguageCode == lang) {
        rs = element[property];
      }
    });
    return rs;
  }

  useEffect(() => {
    setCatTree(JSON.parse(props.cate));
    setTags(JSON.parse(props.tags));
    setLangTable(JSON.parse(props.langTable)); //set languageTable for news
    if (params?.id) {
      //get the news, newsdata is an array it's each row is a language's news
      let newsData = JSON.parse(props.data);
      //Build the data for title, excerpt, content
      let mainNewsContent = {};

      JSON.parse(props.langTable)?.forEach((lang) => {
        mainNewsContent[`title_${lang.code}`] = getNewsValue(
          "title",
          newsData,
          lang.code
        );
        mainNewsContent[`excerpt_${lang.code}`] = getNewsValue(
          "excerpt",
          newsData,
          lang.code
        );
        mainNewsContent[`content_${lang.code}`] = getNewsValue(
          "content",
          newsData,
          lang.code
        );
      });
      //format data to be suitable for the form fields
      let data1 = { ...newsData[0], ...mainNewsContent }; //get the first row of news to join with the new properties
      console.log("data1 :", data1);

      data1 = {
        ...data1,
        categories: data1.categories?.split(","), //set an array of category code to the field categories
        tags: data1?.tags?.split(","), //set an array of tag code to the field tags
        news_position: data1?.news_position == 1 ? true : false,
      };
      form.setFieldsValue(data1); //the data for the all the fields of form is done formating
      setData(data1); //set state for news
      setPicURL(data1.image ?? "");
      setPostStatus(data1.post_status);
      notifyAddNewsSuccess();

      const resultItem = JSON.parse(props.cate).filter((item) =>
        data1.categories?.includes(item.category_code)
      );
      setCatArr(resultItem);
      form.setFieldValue("mainCategory", data1.categories[0]);
      //set value for caption and alt of main image
      const mainImage = JSON.parse(props.mainImage);
      console.log(
        "🚀 ~ file: NewsForm.js:354 ~ useEffect ~ mainImage:",
        mainImage
      );
      form.setFieldsValue({ caption: mainImage?.caption, alt: mainImage?.alt });
    }
  }, [props]);

  //Generate newsCode for the post. It pick the Title of the default language
  function generateNewsCode() {
    let newsCode = form
      .getFieldValue(`title_${myConstant.DEFAULT_LANGUAGE}`)
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/\s/g, "-");
    form.setFieldValue("news_code", newsCode);
  }

  //add sizes and loading='lazy' to content
  const filterContentEditor = (a) => {
    console.log(a);
    const result = a?.replace(/<img([^>]*)>/g, (match, group) => {
      group = group.replace(/\s*sizes="[^"]*"/, ""); // Remove sizes default attribute
      return `<img${group} sizes="(min-width: 450px) 100vw, 25vw" loading="lazy"/>`;
    });
    return result;
  };

  const uploadPicToServer = async (event) => {
    const body = new FormData();
    body.append("file", previewPic);
    let imageURL;
    //call api to move image to folder upload
    const response = await fetch("/api/news/image", {
      method: "POST",
      body,
    }).then(async (rs) => {
      const image = await rs.json();
      console.log(
        "🚀 ~ file: NewsForm.js:181 ~ uploadPicToServer ~ image:",
        image
      );
      imageURL = image.url;

      //add image to table image
      const imageRs = await props.addImage({
        url: image.url,
        alt: form.getFieldValue("alt") ?? "",
        caption: form.getFieldValue("caption") ?? "",
        srcset: "",
      });
      console.log(
        "🚀 ~ file: NewsForm.js:189 ~ uploadPicToServer ~ imageRs:",
        imageRs
      );
    });
    return imageURL;
  };

  //func to update alt and caption image
  const updateInfoImage = async () => {
    const rs = await props.updateImage(
      {
        alt: form.getFieldValue("alt") ?? "",
        caption: form.getFieldValue("caption") ?? "",
      },
      JSON.parse(props.mainImage).url
    );
    console.log("🚀 ~ file: NewsForm.js:209 ~ updateInfoImage ~ rs:", rs);
  };

  //Handle submit form data to server
  async function handleSubmit(value) {
    // when user upload new foto
    const imageURL = previewPic ? await uploadPicToServer() : picURL;
    //when there is already has foto and user don't uplaod new foto, just edit alt or caption
    picURL && !previewPic && updateInfoImage();
    console.log(
      "🚀 ~ file: NewsForm.js:200 ~ handleSubmit ~ imageURL:",
      imageURL
    );
    //Reformat value data make it be suitable
    value.categories = value.categories.toString();
    value.tags = value.tags?.toString() ?? "";
    console.log("news_position 2: ", form.getFieldValue("news_position"));
    value.news_position = form.getFieldValue("news_position") ?? false;
    value.news_position = value.news_position ? 1 : 0;
    if (form.getFieldValue("publish")) {
      value = { ...value, post_date: "1" }; //add property post_date into the value object
    }
    delete value["publish"];
    //Creating an array of records for inserting into news_lamguages table
    const newsLangs = langTable.map((lang) => {
      delete value[`title_${lang.code}`]; //delete unsused properties
      delete value[`excerpt_${lang.code}`];
      delete value[`content_${lang.code}`];

      return {
        title: form.getFieldValue(`title_${lang.code}`) ?? "",
        excerpt: form.getFieldValue(`excerpt_${lang.code}`) ?? "",
        content:
          filterContentEditor(form.getFieldValue(`content_${lang.code}`)) ?? "",
        LanguageCode: lang.code,
        NewsId: params?.id,
      };
    });

    const stringCat = value.categories;
    const arrStringCat = stringCat.split(",");
    const index = arrStringCat.indexOf(mainCat);
    if (index !== -1) {
      arrStringCat.splice(index, 1);
      arrStringCat.unshift(mainCat);
      const result = arrStringCat.join(",");
      value = { ...value, categories: result };
    }

    value.image = imageURL; //set image property
    console.log("value submit:", value);
    const { alt, caption, ...newValue } = value; //remove alt and caption out of value variable to newValue
    console.log(
      "🚀 ~ file: NewsForm.js:180 ~ handleSubmit ~ newValue:",
      newValue
    );
    console.log(newsLangs);

    // editing news
    if (params?.id) {
      if (value.post_status == myConstant.post.POST_STATUS_TRASH)
        //await delNews(value, newsLangs, params.id);
        await props.dell(newValue, newsLangs, params.id);
      else {
        await props.editNews(newValue, newsLangs, params.id).then((message) => {
          if (message.message == 1) {
            //signal of success edit on server
            setPostStatus(form.getFieldValue("post_status")); //set postStatus state to rerender action buttons
            let messageNotify =
              form.getFieldValue("post_status") ==
              myConstant.post.POST_STATUS_DRAFT
                ? "Save Draft Success"
                : "Save Publish Success";
            toast.success(messageNotify, {
              position: "top-center",
            });
          } else {
            //signal of faillure on server
            let messageNotify =
              "Cannot update news, please try again or inform admin";
            toast.success(messageNotify, {
              position: "top-center",
            });
          }
        });
      }
    }
    //adding news
    else {
      await props.addNews(newValue, newsLangs).then((message) => {
        console.log("message from server:", message);
        if (message && message != 1) {
          let messageNotify =
            "Cannot update news, please try again or inform admin" + message;
          toast.success(messageNotify, {
            position: "top-center",
          });
        }
      });
    }
  }

  const handleSubmitFailed = (errorInfo) => {
    console.log("Failed to submit:", errorInfo);
  };
  //i dont see this function is useful, we can delete it
  const handleChangeTab = (key) => {
    console.log(">>> key tab ", key);
  };
  const getFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  //Notify success adding new from /admin/add
  function notifyAddNewsSuccess() {
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
  const onChangePosition = (checked) => {
    form.setFieldValue("news_position", checked);
  };
  //Set value for post_status field
  //parameters: value: the state of post_status
  //            publish: boolean, is publish button pressed?
  const setStatusHidden = (value, publish = false) => {
    form.setFieldValue("post_status", value);
    form.setFieldValue("publish", publish);
  };

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

  function buildTreeData(data, parent = null) {
    return data
      .filter((item) => item.parent === parent)
      .map((item) => ({
        title: item.name,
        value: item.category_code,
        children: buildTreeData(data, item.id),
      }));
  }
  const treeData = catTree && buildTreeData(catTree, null);

  const [mainCat, setMainCat] = useState();
  const [catSelect, setCatSelect] = useState(false);
  const [catArr, setCatArr] = useState([]);

  const onChangeCategory = (value) => {
    value.length > 0 ? setCatSelect(false) : setCatSelect(true);
    console.log("value :", value);
    const resultItem = catTree.filter((item) =>
      value?.includes(item.category_code)
    );
    setCatArr(resultItem);
    console.log("resultItem :", resultItem);
  };
  const onChangeMainCat = (value) => {
    setMainCat(value);
  };

  const clearSelectmainCat = (value) => {
    console.log("value :", value);
    if (value == mainCat) {
      setMainCat("");
    }
  };
  function printImg( editor ) {
      const imageUtils = editor.plugins.get( 'ImageUtils' );
      imageUtils.insertImage( { src: '/uploads/nov2023/4kpic.jpg',
          srcset: '/uploads/nov2023/ava3_150.jpeg 150w, /uploads/nov2023/ava3_350.jpeg 350w, /uploads/nov2023/ava3_700.jpeg 700w',
      } );
  }
  function onFinishAddPic( values ) {
      //get the item picture has picked from values
  }

  function handleCancelModalPic() {
    setIsModalPicOpen( false );
  }
  // tab handle
  const TabComponent = ({ lang }) => {
    return (
      <>
        <Form.Item
          label="Title"
          name={`title_${lang}`}
          rules={[
            {
              required: "true",
              message: "Please input your title!",
            },
          ]}
        >
          {
            //only generate news_code when post status is not published
            lang == myConstant.DEFAULT_LANGUAGE &&
            data?.post_status != myConstant.post.POST_STATUS_PUBLISH ? (
              <Input onChange={() => generateNewsCode()} />
            ) : (
              <Input />
            )
          }
        </Form.Item>
        <Form.Item
          label="Excerpt"
          name={`excerpt_${lang}`}
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input your excerpt!",
          //   },
          // ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Content"
          name={`content_${lang}`}
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input your content!",
          //   },
          // ]}
        >
          {/* <Input /> */}
          <Editor2 initialData='<h2>Hello everybody</h2>'
                    {...{setLoginForm, printImg}}
          />
        </Form.Item>
      </>
    );
  };

  const itemTab = langTable?.map((item) => ({
    key: item.code,
    label: item.name,
    children: (
      <>
        <TabComponent lang={item.code} />
      </>
    ),
  }));

  return (
    <>
      <div className="flex justify-start">
        <Button type="dashed" icon={<SwapLeftOutlined />}>
          <Link href={`/admin/news`}>Back to NewsList</Link>
        </Button>
      </div>
      <Form
        className="w-full"
        name="news"
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
        initialValues={{}}
        onFinish={handleSubmit}
        onFinishFailed={handleSubmitFailed}
        autoComplete="off"
        form={form}
      >
        {
          //Handle display Action buttons
          postStatus == "publish" ? (
            <div className="flex justify-around">
              <div className="flex">
                <Form.Item className="p-2">
                  <Button
                    type="primary"
                    ghost
                    htmlType="submit"
                    onClick={() =>
                      setStatusHidden(myConstant.post.POST_STATUS_DRAFT)
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
                      setStatusHidden(myConstant.post.POST_STATUS_TRASH)
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
              className={`flex  ${
                params.id ? "justify-around" : "justify-end"
              }`}
            >
              {params.id && (
                <Form.Item className="p-2">
                  <Button
                    danger
                    htmlType="submit"
                    onClick={() =>
                      setStatusHidden(myConstant.post.POST_STATUS_TRASH)
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
                    onClick={() =>
                      setStatusHidden(myConstant.post.POST_STATUS_DRAFT)
                    }
                  >
                    Save Draft
                  </Button>
                </Form.Item>
                <Form.Item className="p-2">
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() =>
                      setStatusHidden(myConstant.post.POST_STATUS_PUBLISH, true)
                    }
                  >
                    Publish
                  </Button>
                </Form.Item>
              </div>
            </div>
          )
        }

        <Form.Item label="Priority" name="news_position">
          <Tooltip title="Can only be active when publishing the news">
            <Switch onChange={onChangePosition} />
          </Tooltip>
        </Form.Item>

        <Form.Item label="Slug" name="news_code">
          <Input
            disabled={
              data?.post_status == myConstant.post.POST_STATUS_PUBLISH
                ? true
                : false //disabled this field if the post already has newscode
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
          // rules={[
          //   {
          //     required: true,
          //     message: 'Please select your category!',
          //   },
          // ]}
        >
          <TreeSelect
            multiple
            showSearch
            allowClear
            treeDefaultExpandAll
            treeData={treeData}
            // value={value}
            onChange={onChangeCategory}
            dropdownStyle={{
              maxHeight: 400,
              overflow: "auto",
            }}
            placeholder="Select parent"
            onDeselect={clearSelectmainCat}
          />
        </Form.Item>
        <Form.Item label="Main Category" name="mainCategory">
          <Select
            disabled={catSelect}
            onChange={onChangeMainCat}
            value={mainCat}
          >
            {catArr &&
              catArr.map((item, index) => (
                <Option key={index} value={item.category_code}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="Tags" name="tags">
          <Select
            mode="multiple"
            placeholder="Please tags"
            allowClear
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {tags &&
              tags.map((item, index) => (
                <Option key={index} value={item.tag_code}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item name="image" label="Image" getValueFromEvent={getFile}>
          <Upload
            name="file"
            maxCount={1}
            fileList={[]}
            customRequest={(info) => {
              console.log(info);
              setPreviewPic(info.file);
            }}
            showUploadList={false}
            beforeUpload={(file) => {
              console.log(
                "🚀 ~ file: NewsForm.js:498 ~ NewsForm ~ file:",
                file
              );
              return new Promise((resolve, reject) => {
                // check the file type
                const isImg =
                  file.type === "image/jpeg" ||
                  file.type === "image/jpg" ||
                  file.type === "image/png" ||
                  file.type === "image/gif";
                if (!isImg) {
                  message.error("You can only upload images");
                  reject(false);  //put reason here
                }

                const isLt5M =
                  file.size / 1024 / 1024 <=
                  myConstant.news.image.FILE_LIMITED_SIZE;
                // check the file size
                if (!isLt5M) {
                  message.error(
                    `Image must smaller than ${myConstant.news.image.FILE_LIMITED_SIZE}MB!`
                  );
                  reject(false);  //put some reason here
                } else {
                  resolve(true);
                }
              });
            }}
            headers={{ authorization: "authorization-text" }}
          >
            <Button icon={<UploadOutlined />} className="mb-1">
              {!picURL ? "Upload" : "Change Picture"}
            </Button>
          </Upload>
        </Form.Item>

        <div className="ml-32 mb-5">
          {previewPic && (
            <Image
              src={`${URL.createObjectURL(previewPic)}`}
              width={160}
              className="rounded-lg shadow"
              alt={`${picURL}`}
            />
          )}
          {picURL && !previewPic && (
            <Image
              src={`${picURL}`}
              width={160}
              className="rounded-lg shadow"
              alt={`${picURL}`}
            />
          )}
        </div>

        {picURL || previewPic ? (
          <>
            <Form.Item name="caption" label="Caption">
              <Input />
            </Form.Item>
            <Form.Item name="alt" label="Alt">
              <Input />
            </Form.Item>
          </>
        ) : (
          <></>
        )}

        {/* Manage multilanguages here */}

        <Tabs defaultActiveKey="1" items={itemTab} onChange={handleChangeTab} />

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
        >
          <Switch />
        </Form.Item>
      </Form>

      {/* Modal for picking images */}
      <Modal
        title="Pick an Image"
        open={isModalPicOpen}
        onCancel={handleCancelModalPic}
        getContainer={false}
        width={720}
        footer={[
          <Button key="back" onClick={handleCancelModalPic}>
            Cancel
          </Button>,
          <Button
            // key="submit"
            // form="formImage"
            // htmlType="submit"
            // type="primary"
          >
            Pick Image
          </Button>,
        ]}
      >
        <ImageList
            {...{ onFinishAddPic, handleSubmitFailed }}
        />
      </Modal>
    </>
  );
}
