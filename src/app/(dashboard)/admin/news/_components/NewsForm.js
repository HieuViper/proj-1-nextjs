"use client";
import axios from "axios";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button, Form, Input, Select, Switch, Tooltip, Tabs } from 'antd';
import { SwapLeftOutlined } from '@ant-design/icons';
import Link from "next/link";



export function NewsForm(props) {
  const { TextArea } = Input;
  const { Option } = Select;
  const router = useRouter();
  const params = useParams();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [form] = Form.useForm();

 // const [cate, setCate] = useState([]);
  const [tags, setTags] = useState([]);
  const [langTable, setLangTable] = useState([]);
  const [postStatus, setPostStatus] = useState('');
  const [data, setData] = useState([]);
  const [catTree, setCatTree] = useState([]);

  const authors = [{
    value: 'huy',
    label: 'Jack Huy',
  },
  {
    value: 'Cao',
    label: 'Peter Cao',
  }];


  //get the the title, content, excerpt from news data
  //property: name of the column  you want to get the value
  //lang: language of the content
  // news: an array of news_lang
  function getNewsValue( property, news, lang ) {
    // console.log('vao day');
    let rs
    news.forEach(element => {
      if( element.languageCode == lang )
      {
        rs=  element[property];
      }
    });
    return rs
  }


  useEffect(() => {
    //const cate = (props.cate);

    //setCate( props.cate );
    //const  catTree  = buildCategoryTree( cate );
    setCatTree( buildCategoryTree( JSON.parse( props.cate )) );
    //const tags = (props.tags);
    setTags( JSON.parse(props.tags) );
    //get languages Table
    //const langTable = (props.langTable);
    setLangTable( JSON.parse(props.langTable) ); //set languageTable for news
    if (params?.id) {
      //get the news, newsdata is an array it's each row is a language's news
      let newsData = (props.data);
      //Build the data for title, excerpt, content
      let mainNewsContent = {};

      langTable?.forEach((lang) => {
        mainNewsContent[`title_${lang.code}`] = getNewsValue('title', newsData, lang.code);
        mainNewsContent[`excerpt_${lang.code}`] = getNewsValue('excerpt', newsData, lang.code);
        mainNewsContent[`content_${lang.code}`] = getNewsValue('content', newsData, lang.code);
      })
      //format data to be suitable for the form fields
      let data1 = {...newsData[0], ...mainNewsContent};    //get the first row of news to join with the new properties

      data1= {...data1,
        categories: data1.categories?.split(','),  //set an array of category code to the field categories
        tags: data1?.tags?.split(','),                 //set an array of tag code to the field tags
        news_position: data1?.news_position == 1 ? true : false,
      }
      form.setFieldsValue( data1 );  //the data for the all the fields of form is done formating
      setData(data1);        //set state for news
      setPostStatus(data1.post_status);
      notifyAddNewsSuccess();
    }

    console.log('effect');

  }, [props])


  //Generate newsCode for the post. It pick the Title of the default language
  function generateNewsCode() {
    let newsCode = form.getFieldValue(`title_${process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE}`).trim().normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/\s/g, "-")
    form.setFieldValue('news_code', newsCode);
  }

  //Handle submit form data to server
  async function handleSubmit(value) {
    console.log('value submit:', value);
    //Reformat value data make it be suitable
    value.categories = (value.categories).toString();
    value.tags = value.tags?.toString() ?? '';
    //value.news_position = newsPosition ? 1 : 0;
    console.log('news_position 2: ', form.getFieldValue('news_position'));
    value.news_position = form.getFieldValue('news_position') ?? false;
    value.news_position = value.news_position ? 1 : 0;
    if(form.getFieldValue('publish')){
      value = {...value, post_date: '1'}; //add property post_date into the value object
    }
    delete value['publish'];
    //Creating an array of records for inserting into news_lamguages table
    const newsLangs = langTable.map( lang => {
      delete value[`title_${lang.code}`];    //delete unsused properties
      delete value[`excerpt_${lang.code}`];
      delete value[`content_${lang.code}`];
      return {
        title: form.getFieldValue(`title_${lang.code}`) ?? '',
        excerpt: form.getFieldValue(`excerpt_${lang.code}`) ?? '',
        content: form.getFieldValue(`excerpt_${lang.code}`) ?? '',
        languageCode: lang.code,
        newsId: params?.id,
      };
    });

   // try {
      //editing news
      if (params?.id) {
        if(value.post_status == process.env.NEXT_PUBLIC_PS_TRASH)
          //await delNews(value, newsLangs, params.id);
          await props.dell(value, newsLangs, params.id);
        else{
          await props.editNews(value, newsLangs, params.id).then((message) => {
            if( message.message == 1 ) { //signal of success edit on server
              setPostStatus(form.getFieldValue('post_status')); //set postStatus state to rerender action buttons
              let messageNotify = form.getFieldValue('post_status') == process.env.NEXT_PUBLIC_PS_DRAFT ?
                  'Save Draft Success'
                  :
                  'Save Publish Success';
              toast.success(messageNotify, {
                position: "top-center",
              });
            } else {  //signal of faillure on server
              let messageNotify = 'Cannot update news, please try again or inform admin';
              toast.success(messageNotify, {
                position: "top-center",
              });
            }
          });
        }
      }
      //adding news
      else {
        await props.addNews(value, newsLangs).then(( message ) => {
          console.log('message from server:', message);
          if( message && message != 1) {
            let messageNotify = 'Cannot update news, please try again or inform admin' + message;
              toast.success(messageNotify, {
                position: "top-center",
              });
          }
        }
        );
      }
  }

  const handleSubmitFailed = (errorInfo) => {
    console.log('Failed to submit:', errorInfo);
  };
  //i dont see this function is useful, we can delete it
  const handleChangeTab = (key) => {
    console.log('>>> key tab ', key);
  }

  //Notify success adding new from /admin/add
  function notifyAddNewsSuccess() {
    //get message redirected from add news route
    if(searchParams.get('message')){
      const message = searchParams.get('message') ?? '';
      if( message == 1 ){ //signal of success edit on server
        let messageNotify = 'Add news successfully';
        toast.success(messageNotify, {
          position: "top-center",
        });
      } else {  //signal of faillure on server
        let messageNotify = `Cannot add new news, please try again or inform admin: ${message}`;
        toast.success(messageNotify, {
          position: "top-center",
        });
      }
    }
  }
  const onChangePosition = (checked) => {
    form.setFieldValue('news_position', checked);
  };
  //Set value for post_status field
  //parameters: value: the state of post_status
  //            publish: boolean, is publish button pressed?
  const setStatusHidden = ( value, publish = false ) => {
    form.setFieldValue('post_status', value);
    form.setFieldValue('publish', publish);
  }
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
        {Array(level).fill('—').join(' ')} {category.name}
      </Option>
    );

    if (category.children) {
      for (const childCategory of category.children) {
        options.push(...renderCategoryOptions(childCategory, level + 1));
      }
    }

    return options;
  }

// tab handle

  const TabComponent = ({lang}) => {
    return (
      <>
      <Form.Item
          label="Title"
          name={`title_${lang}`}
          rules={[
            {
              required: true,
              message: 'Please input your title!',
            },
          ]}
        >
          {//only generate news_code when post status is not published
          lang == process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE && data?.post_status != process.env.NEXT_PUBLIC_PS_PUBLISH ?
            <Input onChange={() => generateNewsCode()} />
            :
            <Input />
         }


        </Form.Item>
        <Form.Item
          label="Excerpt"
          name={`excerpt_${lang}`}
          rules={[
            {
              required: true,
              message: 'Please input your excerpt!',
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Content"
          name={`content_${lang}`}
          rules={[
            {
              required: true,
              message: 'Please input your content!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </>
    )
  }

  const itemTab = langTable?.map(item => (
    {
        key: item.code,
        label: item.name,
        children: <>
          <TabComponent lang={item.code} />
        </>
    }
  ))



  return (
    <>
      <div className="flex justify-start">
        <Button type="dashed" icon={<SwapLeftOutlined />}>
          <Link href={`/admin/news`}>
            Back to NewsList
          </Link>
        </Button>
      </div>
      <Form
        className="w-full"
        name="news"
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          // span: 20,
        }}
        style={{
          maxWidth: 1000,
          height: "100%"
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
        onFinishFailed={handleSubmitFailed}
        autoComplete="off"
        form={form}
      >
        {
          //Handle display Action buttons
        postStatus == "publish" ?
          ( <div className="flex justify-around">
            <div className="flex">
              <Form.Item
                className="p-2"
              >
                <Button type="primary" ghost htmlType="submit" onClick={() => setStatusHidden(process.env.NEXT_PUBLIC_PS_DRAFT)}>
                  Switch to Draft
                </Button>
              </Form.Item>
              <Form.Item
                className="p-2"
              >
                <Button danger htmlType="submit" onClick={() => setStatusHidden(process.env.NEXT_PUBLIC_PS_TRASH)}>
                  Move to trash
                </Button>
              </Form.Item>
            </div>
            <Form.Item
              className="p-2"
            >
              <Button type="primary" htmlType="submit" onClick={() => setStatusHidden(postStatus)}>
                Update
              </Button>
            </Form.Item>
          </div>
          )
          :
          (
          <div className={`flex  ${params.id ? 'justify-around' : 'justify-end'}`}>
            {
            params.id &&
            <Form.Item className="p-2">
              <Button danger htmlType="submit" onClick={() => setStatusHidden(process.env.NEXT_PUBLIC_PS_TRASH)}>
                Move to trash
              </Button>
            </Form.Item>
            }
            <div className="flex">
              <Form.Item
                className="p-2"
              >
                <Button type="dashed" htmlType="submit" onClick={() => setStatusHidden(process.env.NEXT_PUBLIC_PS_DRAFT)}>
                  Save Draft
                </Button>
              </Form.Item>
              <Form.Item

                className="p-2"
              >
                <Button type="primary" htmlType="submit" onClick={() => setStatusHidden(process.env.NEXT_PUBLIC_PS_PUBLISH, true)} >
                  Publish
                </Button>

              </Form.Item>
            </div>
          </div>
          )
        }

        <Form.Item
          label="Priority"
          name="news_position"
        >
          <Tooltip title="Can only be active when publishing the news">
            <Switch onChange={onChangePosition} />
          </Tooltip>
        </Form.Item>

        <Form.Item
          label="Slug"
          name="news_code"
        >
          <Input disabled={
            data?.post_status == process.env.NEXT_PUBLIC_PS_PUBLISH ? true : false  //disabled this field if the post already has newscode
          }
          />
        </Form.Item>

        <Form.Item label="Author" name="post_author" rules={[
          {
            required: true,
            message: 'Please select the author!',
          },
        ]}
        >
          <Select
            //value={}
            style={{
              width: 120,
            }}
            //onChange={handleChangeLanguage}
            options={authors}
          />
        </Form.Item>

        <Form.Item label="Category" name="categories" rules={[
          {
            required: true,
            message: 'Please select your category!',
          },
        ]}
        >
          <Select mode="multiple" placeholder="Please category" allowClear filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            {/*cate && cate.map((item, index) => (
              <Option key={index} value={item.category_code}>{item.name}</Option>
            ))*/
            catTree?.map((category) => renderCategoryOptions(category))
            }
          </Select>
        </Form.Item>

        <Form.Item label="Tags" name="tags" >
          <Select mode="multiple" placeholder="Please tags" allowClear filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            {tags && tags.map((item, index) => (
              <Option key={index} value={item.tag_code}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>

           {/* Manage multilanguages here */}

           <Tabs defaultActiveKey="1" items={itemTab} onChange={handleChangeTab} />

      <Form.Item
        name="post_status"
        style={{ display: 'none' }} // Hide the field using CSS
        // or className="hidden-field" // Apply a CSS class to hide the field
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="publish"
        style={{ display: 'none' }} // Hide the field using CSS
        valuePropName="checked"
        // or className="hidden-field" // Apply a CSS class to hide the field
      >
        <Switch />
      </Form.Item>

      </Form>
    </>
  );
}
