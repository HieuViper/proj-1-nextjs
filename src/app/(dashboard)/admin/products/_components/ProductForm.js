"use client";
import React, { useEffect, useState } from 'react'
import { SwapLeftOutlined, UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import {
    Button,
    Form,
    Image,
    Input,
    Select,
    Switch,
    Tabs,
    Tag,
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
import dynamic from "next/dynamic";
import { useLogin } from "@/store/login";
import { callNon } from '@/library/api';
import toast from 'react-hot-toast';
import { callAPI } from '@/library/client/callAPI';
import axios from 'axios';
const myConstant = require('@/store/constant')

const ProductForm = (props) => {
    const { TextArea } = Input;
    const { Option } = Select;
    const router = useRouter();
    // const params = useParams();
    const { id } = useParams();
    const [form] = Form.useForm();
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [langTable, setLangTable] = useState([{ name: "tiếng việt", code: "vi" }, { name: "english", code: "en" }])
    const [mainPicURL, setMainPicURL] = useState(null);
    const [previewMainPic, setPreviewMainPic] = useState(null);
    console.log('previewMainPic :', previewMainPic);
    const [subPicURL, setSubPicURL] = useState(null);
    const [previewSubPic, setPreviewSubPic] = useState(null);
    const [images, setImages] = useState([]);
    const [listImage, setListImage] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [initialFileList, setinitialFileList] = useState([{}])
    const [fileList, setFileList] = useState(initialFileList);
    const handleSubmit = async (value) => {
        setLoadingSubmit(true);
        console.log('valueForm :', value);
        const formMainImage = new FormData();
        formMainImage.append('file', previewMainPic);
        const formSubImage = new FormData();
        formSubImage.append('file', previewSubPic);
        const mainImage = previewMainPic && await axios.post('/api/products/image', formMainImage, {});
        const subImage = previewSubPic && await axios.post('/api/products/image', formSubImage, {});
        const listImage = await uploadListImage()
        console.log('listImage :', listImage);
        // const newListImage = initialFileList.concat(listImage.images)
        // console.log('newListImage :', newListImage);
        try {
            if (id) {
                const product = {
                    id: id,
                    product_code: value.product_code,
                    price: value.price,
                    discount_price: value.discount_price,
                    categories: 1,
                    driver: value.driver,
                    product_position: value.product_position,
                    active: value.active,
                    status: value.status,
                    color: value.color,
                    main_image: mainImage?.data?.url || value.main_image || "",
                    sub_image: subImage?.data?.url || value.sub_image || "",
                    list_image: listImage || {},
                    modified_by: null,
                    product_author: "",
                    manufacturerId: null,
                    product_languages: [
                        {
                            name: value.name_vi,
                            short: value.short_vi,
                            description: value.description_vi,
                            languageCode: 'vi'
                        },
                        {
                            name: value.name_en,
                            short: value.short_en,
                            description: value.description_en,
                            languageCode: 'en'
                        }
                    ]
                }
                console.log('product edit :', product);
                let { result, res } = await callAPI(await fetch(`/api/products/${id}`, {
                    method: 'PUT',
                    cache: 'no-store',
                    body: JSON.stringify(product)
                }),
                    (msg) => { setErrorMessage(msg) },
                    () => { router.push('/login') },
                    () => { setLoginForm(true) },
                );
                if (res.status == 200) {
                    toast.success("Update Product success ")
                }
                setLoadingSubmit(false);
            } else {
                const product = {
                    product_code: value.product_code,
                    price: value.price,
                    discount_price: value.discount_price,
                    categories: 1,
                    driver: value.driver,
                    product_position: value.product_position,
                    active: value.active,
                    status: value.status,
                    color: value.color,
                    main_image: mainImage.data.url || "",
                    sub_image: subImage.data.url || "",
                    list_image: listImage || {},
                    modified_by: null,
                    product_author: "",
                    manufacturerId: null,
                    product_languages: [
                        {
                            name: value.name_vi,
                            short: value.short_vi,
                            description: value.description_vi,
                            languageCode: 'vi'
                        },
                        {
                            name: value.name_en,
                            short: value.short_en,
                            description: value.description_en,
                            languageCode: 'en'
                        }
                    ]
                }
                console.log('product :', product);
                let { result, res } = await callAPI(await fetch(`/api/products`, {
                    method: 'POST',
                    cache: 'no-store',
                    body: JSON.stringify(product)
                    // body: body
                }),
                    (msg) => { setErrorMessage(msg) },
                    () => { router.push('/login') },
                    () => { setLoginForm(true) },
                );
                if (res.status == 200) {
                    toast.success("Create Product success");
                    // form.resetFields();
                }
                setLoadingSubmit(false);
            }
        } catch (error) {
            toast.error(error);
        }

    };
    const handleSubmitFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    // IMAGE
    const mainImageFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }

        return e && e.file;
    };
    const subImageFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.file;
    };


    // LIST IMAGE
    console.log('fileList :', fileList);
    const onChangeListImage = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const handleFileRemove = (file) => {
        const newFileList = fileList.filter((item) => item.uid !== file.uid);
        // Update fileList state after removing the file
        setFileList(newFileList);
    };
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
    const listImageFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    // UPLOAD IMAGE TO SERVER
    const handleFileAdd = (file) => {
        // Add the new file to the existing fileList
        const newFileList = [...fileList, file];
        setFileList(newFileList);
    };
    const uploadListImage = async () => {
        const newFiles = fileList && fileList.filter((file) => !initialFileList.some((initialFile) => initialFile?.name === file?.name));
        console.log('newFiles :', newFiles);
        const initFiles = fileList && fileList.filter(file => initialFileList.some(initialFile => initialFile?.name === file?.name));
        console.log('initFiles :', initFiles);
        if (newFiles && newFiles.length > 0) {
            const formData = new FormData();
            for (let i = 0; i < newFiles.length; i += 1) {
                formData.append('files', newFiles[i].originFileObj);
                fileList
            }

            const response = await axios.post('/api/products/images', formData, {});
            console.log('Image uploaded:', response?.data);
            const newListImage = initFiles.concat(response?.data.images)
            // setFileList(newListImage)
            // console.log('newListImage :', newListImage);
            return newListImage
        } else {
            return initFiles
        }
    }

    // COLOR
    const optionsColor = [
        { value: 'red', label: 'Red' },
        { value: 'blue', label: 'Blue' },
        { value: 'green', label: 'Green' },
        { value: 'yellow', label: 'Yellow' },
        { value: 'black', label: 'Black' },
        { value: 'white', label: 'White' },
        { value: 'grey', label: 'Grey' },
    ];

    // TABS
    const TabComponent = ({ lang }) => {
        return (
            <>
                <Form.Item
                    label={<span className="font-medium ">Name</span>}
                    name={`name_${lang}`}
                // rules={[
                //     {
                //         required: true,
                //         message: "Please input your name!",
                //     },
                // ]}
                >
                    <Input placeholder="Input name" />
                </Form.Item>
                <Form.Item
                    label={<span className="font-medium">Short</span>}
                    name={`short_${lang}`}
                >
                    <Input.TextArea rows={2} placeholder="Input short" />
                </Form.Item>
                <Form.Item
                    label={<span className="font-medium">Description</span>}
                    name={`description_${lang}`}
                >
                    <Input.TextArea rows={8} placeholder="Input description" />
                </Form.Item>
            </>
        );
    };
    const itemsTab = langTable?.map((item) => ({
        key: item.code,
        label: item.name,
        forceRender: true,
        children: (
            <>
                <TabComponent lang={item.code} />
            </>
        ),
    }));

    useEffect(() => {
        //redirect to login page if user is not authorized
        // if (props.isAuthorize == false) {
        //     handleNotAuthorized(
        //         () => { router.push('/login') },
        //         (msg) => { setErrorMessage(msg) }
        //     );
        // }
        // const { data } = JSON.parse(props.langTable)
        // setLangTable(data)
        if (id) {
            const { data } = props?.product
            console.log('data :', data);
            const langArr = data?.product_languages.map(lang => lang.languages);
            setLangTable(langArr)
            // const product_languages = data.product_languages
            const product_languages = data?.product_languages.reduce((acc, item) => {
                acc[`name_${item.languageCode}`] = item.name;
                acc[`short_${item.languageCode}`] = item.short;
                acc[`description_${item.languageCode}`] = item.description;
                return acc;
            }, {});
            const dataFields = Object.assign(data, product_languages)
            form.setFieldsValue(dataFields)
            setMainPicURL(data.main_image)
            setSubPicURL(data.sub_image)
            setFileList(data.list_image)
            setinitialFileList(data.list_image)
        }
    }, []);

    return (
        <div>
            <div className="flex justify-between mb-4">
                <Button type="dashed" icon={<SwapLeftOutlined />}>
                    <Link href={`/admin/products`}>Back to Products</Link>
                </Button>
                {id ? (
                    <Button
                        form="myForm"
                        type="primary"
                        htmlType="submit"
                        disabled={loadingSubmit}
                        loading={loadingSubmit}
                    >
                        Update
                    </Button>
                ) : (
                    <Button form="myForm" type="primary" htmlType="submit"
                        loading={loadingSubmit}
                    >
                        Add New Product
                    </Button>
                )}
            </div>
            <Form
                id="myForm"
                name="basic"
                labelCol={{
                    offset: 1,
                    span: 3,
                }}
                wrapperCol={{
                    // offset: 2,
                    span: 18
                }}
                // style={
                //     {
                //         maxWidth: 2000,
                //         width: '100%',
                //     }
                // }
                initialValues={{
                    remember: true,
                }}
                onFinish={handleSubmit}
                onFinishFailed={handleSubmitFailed}
                autoComplete="off"
                form={form}
            // layout={params?.id ? "horizontal" : "vertical"}
            >
                <div className='grid grid-cols-2'>
                    <div id="col-1" className=''>
                        <Form.Item
                            label={<span className="font-medium">Code</span>}
                            name="product_code"
                        >
                            <Input placeholder="Input Product Code" />
                        </Form.Item>
                        <Form.Item
                            label={<span className="font-medium">Price</span>}
                            name="price"
                        >
                            <Input placeholder="Input price" />
                        </Form.Item>
                        <Form.Item
                            label={<span className="font-medium">Discount </span>}
                            name="discount_price"
                        >
                            <Input placeholder="Input Discount Price" />
                        </Form.Item>
                        <Form.Item
                            label={<span className="font-medium">Categories </span>}
                            name="categories"
                        >
                            <Select placeholder="Select Categories" >

                            </Select>
                        </Form.Item>
                        <Form.Item
                            label={<span className="font-medium">Driver</span>}
                            name="driver"
                        >
                            <Input placeholder="Input Driver" />
                        </Form.Item>
                    </div>
                    <div id="col-2" className=''>
                        <Form.Item
                            label={<span className="font-medium"> Position </span>}
                            name="product_position"
                        >
                            <Input placeholder="Input Position" />
                        </Form.Item>
                        <Form.Item
                            label={<span className="font-medium">Active</span>}
                            name="active"
                        >
                            <Select placeholder="Select active" >
                                <Option value={true}>Yes</Option>
                                <Option value={false}>No</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label={<span className="font-medium">Status</span>}
                            name="status"
                        >
                            <Select placeholder="Select status" >
                                <Option value={"in"}>In Stock</Option>
                                <Option value={"out"}>Out Stock</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label={<span className="font-medium">Color </span>}
                            name="color"
                        >
                            <Select
                                style={{
                                    width: '100%',
                                }}
                                options={optionsColor}
                                placeholder="Select Color"
                            />
                        </Form.Item>
                    </div>
                </div>
                {/* IMAGE */}
                <div id='image' className='flex justify-center gap-40'>
                    <div id="main-image" className="flex flex-col justify-center items-center " >
                        <div>
                            {previewMainPic && (
                                <Image
                                    src={`${URL.createObjectURL(previewMainPic)}`}
                                    width={180}
                                    className="rounded-lg shadow"
                                    alt={`${mainPicURL}`}
                                />
                            )}
                            {mainPicURL && !previewMainPic && (
                                <Image
                                    src={`${mainPicURL}`}
                                    width={180}
                                    className="rounded-lg shadow"
                                    alt={`${mainPicURL}`}
                                />
                            )}
                        </div>


                        <div className='py-1 font-medium'> Main Image</div>
                        <div className='flex' >
                            <Form.Item
                                name="main_image"
                                getValueFromEvent={mainImageFile}
                            >
                                <Upload
                                    name="fileMain"
                                    maxCount={1}
                                    customRequest={(info) => {
                                        console.log(info);
                                        setPreviewMainPic(info.file);
                                    }}
                                    showUploadList={false}
                                    beforeUpload={(file) => {
                                        console.log(
                                            "🚀 ~ file: ArticleForm.js:498 ~ ArticleForm ~ file:",
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
                                                reject(false);
                                            }

                                            const isLt5M =
                                                file.size / 1024 / 1024 <=
                                                myConstant.news.image.FILE_LIMITED_SIZE;
                                            // check the file size
                                            if (!isLt5M) {
                                                message.error(
                                                    `Image must smaller than ${myConstant.news.image.FILE_LIMITED_SIZE}MB!`
                                                );
                                                reject(false);
                                            } else {
                                                resolve(true);
                                            }
                                        });
                                    }}
                                    headers={{ authorization: "authorization-text" }}
                                >
                                    <Button icon={<UploadOutlined />} className="mb-1">
                                        {!mainPicURL ? "Upload" : "Change Picture"}
                                    </Button>
                                </Upload>
                            </Form.Item>
                            {previewMainPic &&
                                <Button icon={<DeleteOutlined />} danger type="text" className='ml-2'
                                    onClick={() => setPreviewMainPic(null)}
                                ></Button>
                            }
                        </div>

                    </div>
                    <div id="sub-image" className="flex flex-col justify-center items-center" >
                        <div >
                            {previewSubPic && (
                                <Image
                                    src={`${URL.createObjectURL(previewSubPic)}`}
                                    width={180}
                                    className="rounded-lg shadow"
                                    alt={`${subPicURL}`}
                                />
                            )}
                            {subPicURL && !previewSubPic && (
                                <Image
                                    src={`${subPicURL}`}
                                    width={180}
                                    className="rounded-lg shadow"
                                    alt={`${subPicURL}`}
                                />
                            )}
                        </div>
                        <div className='py-1 font-medium'> Sub Image</div>
                        <div className='flex ' >
                            <Form.Item
                                name="sub_image"
                                getValueFromEvent={subImageFile}
                            >
                                <Upload
                                    name="fileSub"
                                    maxCount={1}
                                    customRequest={(info) => {
                                        console.log(info);
                                        setPreviewSubPic(info.file);
                                    }}
                                    showUploadList={false}
                                    beforeUpload={(file) => {
                                        console.log(
                                            "🚀 ~ file: ArticleForm.js:498 ~ ArticleForm ~ file:",
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
                                                reject(false);
                                            }

                                            const isLt5M =
                                                file.size / 1024 / 1024 <=
                                                myConstant.news.image.FILE_LIMITED_SIZE;
                                            // check the file size
                                            if (!isLt5M) {
                                                message.error(
                                                    `Image must smaller than ${myConstant.news.image.FILE_LIMITED_SIZE}MB!`
                                                );
                                                reject(false);
                                            } else {
                                                resolve(true);
                                            }
                                        });
                                    }}
                                    headers={{ authorization: "authorization-text" }}
                                >
                                    <Button icon={<UploadOutlined />} className="mb-1">
                                        {!subPicURL ? "Upload" : "Change Picture"}
                                    </Button>
                                </Upload>
                            </Form.Item>
                            {previewSubPic &&
                                <Button icon={<DeleteOutlined />} danger type="text" className='ml-2'
                                    onClick={() => setPreviewSubPic(null)}
                                ></Button>
                            }

                        </div>
                    </div>

                </div>
                {/* LIST IMAGE */}
                <div className='mx-20'>
                    <Form.Item
                        name="list_image"
                        label={<span className="font-medium">List Image</span>}
                        valuePropName="fileList"
                        getValueFromEvent={listImageFile}
                    >
                        <Upload
                            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                            listType="picture-card"
                            fileList={fileList}
                            multiple={true}
                            onChange={onChangeListImage}
                        // onPreview={onPreview}
                        >
                            + Upload
                        </Upload>
                    </Form.Item>
                </div>

                <Tabs
                    defaultActiveKey="vi"
                    items={itemsTab}
                    indicatorSize={(origin) => origin - 16}
                    centered
                />
            </Form>
        </div>
    )
}

export default ProductForm