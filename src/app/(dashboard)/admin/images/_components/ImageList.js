"use client";
import { DeleteFilled, InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Tooltip,
  Upload,
  message,
} from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
const { Dragger } = Upload;

const ImageList = (props) => {
  const [imageList, setImageList] = useState([]);
  console.log("🚀 ~ file: ImageList.js:19 ~ ImageList ~ imageList:", imageList);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [metadata, setMetadata] = useState(null);
  console.log("🚀 ~ file: ImageList.js:11 ~ ImageList ~ metadata:", metadata);
  const [previewPic, setPreviewPic] = useState(null);

  // ------------- Function
  // Form Handler
  // *****FOR EDIT MODAL
  const onFinishEdit = async (values) => {
    console.log("Success:", values);

    const rs = await props.updateImage(values, values.id);
    if (rs) {
      message.success("Update Successfully");
      setImageList(rs.data);
    } else {
      message.error("Something went wrong");
    }
    // close modal
    setIsModalEditOpen(false);
  };

  // *****FOR ADD MODAL
  const uploadPicToServer = async () => {
    const body = new FormData();
    body.append("file", previewPic);
    let newData;
    //call api to move image to folder upload
    const response = await fetch("/api/articles/image", {
      method: "POST",
      body,
    }).then(async (rs) => {
      const image = await rs.json();
      console.log(
        "🚀 ~ file: AddImageForm.js:181 ~ uploadPicToServer ~ image:",
        image
      );

      //add image to table image
      const result = await props.addImage({
        url: image.url,
        alt: formAdd.getFieldValue("alt") ?? "",
        caption: formAdd.getFieldValue("caption") ?? "",
        srcset: "",
      });
      console.log(
        "🚀 ~ file: AddImageForm.js:189 ~ uploadPicToServer ~ result:",
        result
      );
      newData = result;
    });
    return newData;
  };
  const onFinishAdd = async (values) => {
    // check if user upload image yet
    if (!previewPic) {
      message.error("Please upload an Image!!!");
    } else {
      const result = await uploadPicToServer();
      if (result) {
        message.success("Add Image Successfully");
        setImageList(result.data);
      } else {
        message.error("Something went wrong");
      }
      // close modal
      setIsModalAddOpen(false);
      setPreviewPic(null);
      formAdd.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // --------------
  // Modal Handler
  const showModalEdit = async (item) => {
    console.log("🚀 ~ file: ImageList.js:103 ~ showModalEdit ~ item:", item);
    const rsMetadata = await props.getInfoImage(item.url);
    console.log(
      "🚀 ~ file: ImageList.js:30 ~ showModalEdit ~ rsMetadata:",
      rsMetadata
    );
    setMetadata(rsMetadata);
    formEdit.setFieldsValue(item);
    setIsModalEditOpen(true);
  };
  const showModalAdd = async (item) => {
    setIsModalAddOpen(true);
  };
  const handleCancelModalEdit = () => {
    setIsModalEditOpen(false);
  };
  const handleCancelModalAdd = () => {
    setPreviewPic(null);
    setIsModalAddOpen(false);
  };

  // Func to Delete Image
  const handleDeleteImage = async (id) => {
    const rs = await props.dellImage(id);
    console.log("🚀 ~ file: ImageList.js:125 ~ handleDeleteImage ~ rs:", rs);
    if (rs) {
      message.success("Delete Successfully");
      setImageList(rs.data);
    } else {
      message.error("Something went wrong");
    }
    setIsModalEditOpen(false);
  };

  // -----------
  // USE EFFECT
  useEffect(() => {
    setImageList(JSON.parse(props.data));
  }, [props]);

  return (
    <>
      <div className="flex items-center gap-4 mb-5">
        <h1 className="text-2xl font-[500]">Images Gallery</h1>
        <Button type="primary" onClick={showModalAdd}>
          Add New Image
        </Button>
      </div>

      <div className="grid grid-cols-6 gap-4">
        {imageList &&
          imageList.map((item) => (
            <div
              className="flex items-center justify-center bg-gray-200 shadow-md cursor-pointer hover:border hover:scale-110 duration-300 rounded-lg"
              key={item.url}
              onClick={() => showModalEdit(item)}
            >
              <Image
                src={item.url}
                alt={item.alt}
                width={150}
                height={150}
                className="object-cover rounded-lg"
              />
            </div>
          ))}
      </div>

      {/* Modal Section */}

      {/* Modal Edit */}
      <Modal
        title="Image Detail"
        open={isModalEditOpen}
        onCancel={handleCancelModalEdit}
        width={720}
        footer={[
          <Button key="back" onClick={handleCancelModalEdit}>
            Cancel
          </Button>,
          <Popconfirm
            key="delete"
            title="Delete the Image Permanently"
            description="Are you sure to delete this image?"
            onConfirm={() => handleDeleteImage(formEdit.getFieldValue("id"))}
            onCancel={() => {}}
            okText="Yes"
            cancelText="Cancel"
          >
            <Button type="dashed" danger>
              Delete Permanently
            </Button>
          </Popconfirm>,
          <a
            href={formEdit.getFieldValue("url")}
            download={formEdit.getFieldValue("caption") ?? "download-image"}
            key="download"
            className="mx-2"
          >
            <Button type="dashed">Download File</Button>
          </a>,
          <Button
            key="submit"
            form="formImage"
            htmlType="submit"
            type="primary"
          >
            Save
          </Button>,
        ]}
      >
        <div className="p-3">
          <div className="text-sm flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="font-[500]">Upload On: </p> {metadata?.creationTime}
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
                src={formEdit.getFieldValue("url")}
                alt={formEdit.getFieldValue("alt")}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                width={0}
                height={0}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="basis-2/3">
              <Form
                name="basic"
                id="formImage"
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
                onFinish={onFinishEdit}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item name="id" className="hidden"></Form.Item>
                <Form.Item label="URL" name="url">
                  <Input disabled={true} />
                </Form.Item>
                <Form.Item label="Alternative Text" name="alt">
                  <Input />
                </Form.Item>
                <Form.Item label="Caption" name="caption">
                  <Input />
                </Form.Item>
                <Form.Item label="Source Set" name="srcset">
                  <Input disabled={true} />
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal Add */}
      <Modal
        title="Add New Image"
        open={isModalAddOpen}
        onCancel={handleCancelModalAdd}
        width={720}
        footer={[
          <Button key="back" onClick={handleCancelModalAdd}>
            Cancel
          </Button>,
          <Button
            key="submit"
            form="formAddImage"
            htmlType="submit"
            type="primary"
          >
            Save
          </Button>,
        ]}
      >
        <div className="p-3">
          <div className="flex flex-col items-center justify-center gap-6 ">
            <div className="w-full">
              {!previewPic ? (
                <Dragger
                  name="imageUpload"
                  maxCount={1}
                  customRequest={(info) => {
                    console.log(info);
                    setPreviewPic(info.file);
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
                        process.env.NEXT_PUBLIC_FILE_LIMITED_SIZE;
                      // check the file size
                      if (!isLt2M) {
                        message.error(
                          `Image must smaller than ${process.env.NEXT_PUBLIC_FILE_LIMITED_SIZE}MB!`
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
                      src={URL.createObjectURL(previewPic)}
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
                onFinish={onFinishAdd}
                onFinishFailed={onFinishFailed}
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
      </Modal>
    </>
  );
};

export default ImageList;
