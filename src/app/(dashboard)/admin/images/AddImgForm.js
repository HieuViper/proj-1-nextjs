import Dragger from "antd/es/upload/Dragger";
import { DeleteFilled, InboxOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import Image from "next/image";
import { Button, Tooltip } from "antd";
const myConstant = require('@/store/constant')
import { Form, Input } from "antd";

export function AddImgForm( props )  {
    const [formAdd] = Form.useForm();
    useEffect( () => {
        formAdd.resetFields();
    }, [props]);
    return (
        <>
            <div className="p-3">
            <div className="flex flex-col items-center justify-center gap-6 ">
                <div className="w-full">
                {!props.previewPic ? (
                    <Dragger
                    name="imageUpload"
                    maxCount={1}
                    customRequest={(info) => {
                        console.log(info);
                        props.setPreviewPic(info.file);
                    }}
                    showUploadList={false}
                    beforeUpload={(file) => {
                        console.log(
                        "🚀 ~ file: AddImageForm.js:498 ~ AddImageForm ~ file:",
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

                        const isLt2M =
                            file.size / 1024 / 1024 <=
                            myConstant.image.FILE_LIMITED_SIZE;
                        // check the file size
                        if (!isLt2M) {
                            message.error(
                            `Image must smaller than ${myConstant.image.FILE_LIMITED_SIZE}MB!`
                            );
                            reject(false);
                        } else {
                            console.log("vao day");
                            resolve(true);
                        }
                        });
                    }}
                    headers={{ authorization: "authorization-text" }}
                    >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                        Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                        Support for a single upload. Please upload a file under 2MB
                        size.
                    </p>
                    </Dragger>
                ) : (
                    <div className="flex justify-center ">
                    <div className="relative group">
                        <Image
                        src={URL.createObjectURL(props.previewPic)}
                        alt={"new image"}
                        // sizes="100vw"
                        style={{ width: "200px", height: "200px" }}
                        width={0}
                        height={0}
                        className="rounded-lg shadow-lg object-cover"
                        />
                        <div className="hidden absolute inset-0 bg-[rgba(0,0,0,0.5)] rounded-lg group-hover:flex justify-end p-3">
                        <div className="">
                            <Tooltip title="Remove">
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<DeleteFilled />}
                                onClick={() => setPreviewPic(null)}
                            />
                            </Tooltip>
                        </div>
                        </div>
                    </div>
                    </div>
                )}
                </div>

                <div className="w-full">
                <Form
                    name="addImage"
                    id="formAddImage"
                    form={formAdd}
                    labelCol={{
                    span: 5,
                    }}
                    wrapperCol={{
                    span: 17,
                    }}
                    style={{
                    maxWidth: 1000,
                    }}
                    onFinish={props.onFinishAdd}
                    onFinishFailed={props.onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item label="Alternative Text" name="alt">
                    <Input />
                    </Form.Item>
                    <Form.Item label="Caption" name="caption">
                    <Input />
                    </Form.Item>
                </Form>
                </div>
            </div>
            </div>
        </>
    );
}