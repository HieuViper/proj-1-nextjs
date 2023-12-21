import { Form, Input } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";

export function EditImgForm( props ) {
    const [formEdit] = Form.useForm();
    const [metadata, setMetadata] =useState();
    useEffect (() => {
        formEdit.setFieldsValue( props.image );
        setMetadata( props.metadata );
    }, [props]);

    return (
        <>
            <div className="p-3">
            <div className="text-sm flex flex-col gap-2">
                <div className="flex items-center gap-2">
                <p className="font-[500]">Upload On: </p> { metadata?.creationTime }
                </div>
                <div className="flex items-center gap-2">
                <p className="font-[500]">File Name: </p> {metadata?.fileName}
                </div>
                <div className="flex items-center gap-2">
                <p className="font-[500]">File Type: </p> {metadata?.fileType}
                </div>
                <div className="flex items-center gap-2">
                <p className="font-[500]">File Size: </p> {metadata?.size} KB
                </div>
                <div className="flex items-center gap-2">
                <p className="font-[500]">Dimensions: </p>{" "}
                {metadata?.dimensions.width} x {metadata?.dimensions.height}{" "}
                pixels
                </div>
            </div>

            <hr className="my-4" />
            <div className="flex items-center justify-center gap-6 ">
                <div className="basis-1/3">
                <Image
                    src={props.image.url}
                    alt={props.image.alt}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                    width={0}
                    height={0}
                    className="rounded-lg shadow-lg"
                />
                </div>
                <div className="basis-2/3">
                <Form
                    name="editImage"
                    id="formEditImage"
                    form={formEdit}
                    labelCol={{
                    span: 6,
                    }}
                    wrapperCol={{
                    span: 16,
                    }}
                    style={{
                    maxWidth: 600,
                    }}
                    onFinish={props.onFinishEdit}
                    onFinishFailed={props.onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item label="id" name="id" className="hidden">
                    <Input />
                    </Form.Item>
                    <Form.Item label="URL" name="url">
                    <Input disabled={true} />
                    </Form.Item>
                    <Form.Item label="Alternative Text" name="alt">
                    <Input onChange={() => { formEdit.setFieldValue('changeValue', 'true' ) }} />
                    </Form.Item>
                    <Form.Item label="Caption" name="caption">
                    <Input  onChange={() => { formEdit.setFieldValue('changeValue', 'true' ) }}/>
                    </Form.Item>
                    <Form.Item label="Source Set" name="srcset">
                    <Input disabled={true} />
                    </Form.Item>
                    <Form.Item label="changeValue" name="changeValue" className="hidden">
                    <Input />
                    </Form.Item>
                </Form>
                </div>
            </div>
            </div>
        </>
    );
}