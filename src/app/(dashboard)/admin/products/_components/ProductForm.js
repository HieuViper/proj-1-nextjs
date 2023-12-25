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

    const test = {
        list_image: [1, 2],
        // id: 5,
        product_code: " ProductCode-5",
        main_image: null,
        sub_image: null,
        categories: "default",
        price: null,
        discount_price: null,
        product_author: "",
        modified_by: null,
        product_position: 0,
        active: null,
        status: null,
        color: null,
        createdAt: "2023-12-18T09:07:22.000Z",
        updatedAt: "2023-12-18T09:07:22.000Z",
        manufacturerId: null,
        product_languages: [
            {
                id: 9,
                name: "test",
                short: null,
                description: "mô tả của product 5",
                productId: 5,
                languageCode: "vi",
            },
            {
                id: 9,
                name: "test",
                short: null,
                description: "mô tả của product 5",
                productId: 5,
                languageCode: "en",
            }
        ]
    }
    const test2 = {
        "list_image": [1, 2
        ],
        // "id": 5,
        "product_code": "ProductCode-5",
        "main_image": null,
        "sub_image": null,
        "categories": "default",
        "price": null,
        "discount_price": null,
        "product_author": "",
        "modified_by": null,
        "product_position": 0,
        "active": null,
        "status": null,
        "color": null,
        "createdAt": "2023-12-18T09:07:22.000Z",
        "updatedAt": "2023-12-18T09:07:22.000Z",
        "manufacturerId": null,
        "product_languages": [
            {
                "id": 9,
                "name": "Tên Product 5",
                "short": null,
                "description": "mô tả của product 5",
                "productId": 5,
                "languageCode": "vi",
                "languages": {
                    "code": "vi",
                    "name": "tiếng việt",
                    "description": "tiếng việt",
                    "active": true
                }
            }
        ]
    }
    const test3 = {
        list_image: [{}, {}],
        product_code: "test16",
        main_image: null,
        sub_image: null,
        categories: "default",
        price: null,
        discount_price: null,
        product_author: "",
        modified_by: null,
        product_position: 0,
        active: null,
        status: null,
        color: null,
        createdAt: "2023-12-18T09:07:22.000Z",
        updatedAt: "2023-12-18T09:07:22.000Z",
        manufacturerId: null,
        product_languages: [
            {
                id: 1,
                name: "Tên Product 1",
                short: null,
                description: "mô tả của product 5",
                productId: 5,
                languageCode: "vi"
            },
            {
                id: 2,
                name: "Tên Product 1",
                short: null,
                description: "mô tả của product 5",
                productId: 5,
                languageCode: "en"
            }
        ]
    }
    const handleSubmit = async (value) => {
        console.log('valueForm :', value);
        const body = new FormData();
        body.append('main_image', value.main_image);
        body.append('sub_image', value.sub_image);
        // const product = {
        //     code: value.code,
        //     price: value.price,
        //     discount_price: value.discount_price,
        //     category: value.category,
        //     driver: value.driver,
        //     position: value.position,
        //     mainImageURL: value.main_image,
        //     images: value.listImage,
        //     active: value.active,
        //     status: value.status,
        //     color: value.color,
        //     manufacturerId: null,
        //     product_languages: [
        //         {
        //             name: value.name_vi,
        //             short: value.short_vi,
        //             description: value.description_vi,
        //             languageCode: 'vi'
        //         },
        //         {
        //             name: value.name_en,
        //             short: value.short_en,
        //             description: value.description_en,
        //             languageCode: 'en'
        //         }
        //     ]
        // }
        // setLoadingSubmit(true);
        // let { result, res } = await callAPI(await fetch(`/api/products`, {
        //     method: 'POST',
        //     cache: 'no-store',
        //     body: JSON.stringify(test3)
        // }),
        //     (msg) => { setErrorMessage(msg) },
        //     () => { router.push('/login') },
        //     () => { setLoginForm(true) },
        // );

        // if (res.status == 200) {
        //     // router.push("/admin/products")
        //     console.log('result ADD test :', result);
        // }
        body.append("product", JSON.stringify(test3))
        console.log('body :', body);

        try {
            if (id) {
                const product = {
                    id: value.id,
                    code: value.code,
                    price: value.price,
                    discount_price: value.discount_price,
                    category: value.category,
                    driver: value.driver,
                    position: value.position,
                    mainImageURL: value.main_image,
                    images: value.listImage,
                    active: value.active,
                    status: value.status,
                    color: value.color,
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
                setLoadingSubmit(true);
                let { result, res } = await callAPI(await fetch(`/api/products/${id}`, {
                    method: 'PUT',
                    cache: 'no-store',
                    body: JSON.stringify(product)
                }),
                    (msg) => { setErrorMessage(msg) },
                    () => { router.push('/login') },
                    () => { setLoginForm(product) },
                );
                if (res.status == 200) {
                    toast.success("Update Product success ")
                }
                setLoadingSubmit(false);
            } else {
                const product = {
                    code: value.code,
                    price: value.price,
                    discount_price: value.discount_price,
                    category: value.category,
                    driver: value.driver,
                    position: value.position,
                    mainImageURL: value.main_image,
                    images: value.listImage,
                    active: value.active,
                    status: value.status,
                    color: value.color,
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
                let { result, res } = await callAPI(await fetch(`/api/products`, {
                    method: 'POST',
                    cache: 'no-store',
                    // body: JSON.stringify(product)
                    body: body
                }),
                    (msg) => { setErrorMessage(msg) },
                    () => { router.push('/login') },
                    () => { setLoginForm(product) },
                );
                if (res.status == 200) {
                    toast.success("Create Product success");
                    form.resetFields();
                }
                setLoadingSubmit(false);
            }
        } catch (error) {
            toast.error(error);
        }



        // const tagLangs = langTable.map((lang) => {
        //     delete value[`name_${lang.code}`]; //delete unsused properties
        //     delete value[`description_${lang.code}`];
        //     return {
        //         name: form.getFieldValue(`name_${lang.code}`) ?? "",
        //         description: form.getFieldValue(`description_${lang.code}`) ?? "",
        //         LanguageCode: lang.code,
        //         TagId: id,
        //     };
        // });
        // setLoading(true);
        // try {
        //     if (id) {
        //         await editTag(value, tagLangs, id, lang).then((res) => {
        //             setTags(res.tagList.data);
        //             handleModal();
        //             toast.success("Update Tag success ");
        //             setLoading(false);
        //         });
        //     } else {
        //         if (form.getFieldValue("tag_code").length <= 0) {
        //             value = {
        //                 ...value,
        //                 tag_code: tagLangs[0].name
        //                     .trim()
        //                     .normalize("NFD")
        //                     .replace(/[\u0300-\u036f]/g, "")
        //                     .replace(/đ/g, "d")
        //                     .replace(/Đ/g, "D")
        //                     .replace(/\s/g, "-"),
        //             };
        //         }

        //         console.log("value :", value);
        //         await addTag(value, tagLangs, lang).then((res) => {
        //             setTags(res.tagList.data);
        //             toast.success("Create Tag success");
        //             setLoading(false);
        //             form.resetFields();
        //         });
        //     }
        // } catch (error) {
        //     toast.error(error);
        // }
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
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);
    console.log('fileList :', fileList);

    const onChangeListImage = ({ fileList: newFileList }) => {
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
        if (props.isAuthorize == false) {
            handleNotAuthorized(
                () => { router.push('/login') },
                (msg) => { setErrorMessage(msg) }
            );
        }
        const { data } = JSON.parse(props.langTable)
        setLangTable(data)
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
                            label={<span className="font-medium">Category </span>}
                            name="category"
                        >
                            <Select placeholder="Select Category" >

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
                <div id='image' className='grid grid-cols-2 gap-2'>
                    <div id="main-image" className="flex flex-col justify-center items-center " >
                        <div className='grid grid-cols-3'>
                            <div className='col-span-1'>
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
                            {mainPicURL || previewMainPic ? (
                                <div className='col-span-2 flex flex-col justify-center'>
                                    <Form.Item name="capMainPic" label="Caption"
                                        labelCol={{
                                            span: 5,
                                        }}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name="altMainPic" label="Alt" labelCol={{
                                        span: 5,
                                    }}>
                                        <Input />
                                    </Form.Item>
                                </div>
                            ) : (
                                <></>
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
                        <div className='grid grid-cols-3'>
                            <div className='col-span-1'>
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
                            {subPicURL || previewSubPic ? (
                                <div className='col-span-2 flex flex-col justify-center'>
                                    <Form.Item name="capSubPic" label="Caption" labelCol={{
                                        span: 5,
                                    }}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name="altSubPic" label="Alt" labelCol={{
                                        span: 5,
                                    }}>
                                        <Input />
                                    </Form.Item>
                                </div>
                            ) : (
                                <></>
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