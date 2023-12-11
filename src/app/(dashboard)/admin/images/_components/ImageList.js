"use client";
import { myConstant } from "@/store/constant";
import { DeleteFilled, InboxOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Form,
  Input,
  List,
  Modal,
  Popconfirm,
  Tooltip,
  Upload,
  message,
} from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { callAPI, handleNotAuthorized } from "@/library/client/callAPI";
import { useLogin } from "@/store/login";
import Search from "antd/es/input/Search";
const { Dragger } = Upload;

const ImageList = (props) => {
  const [paginationServer, setPaginationServer] = useState({
    pageSize: 10,
    total: 0,
    current: 1,
  });

  const [imageList, setImageList] = useState([]);
  console.log("🚀 ~ file: ImageList.js:19 ~ ImageList ~ imageList:", imageList);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [metadata, setMetadata] = useState(null);
  console.log("🚀 ~ file: ImageList.js:11 ~ ImageList ~ metadata:", metadata);
  const [previewPic, setPreviewPic] = useState(null);
  const [search, setSearch] = useState("");
  const [totals, setTotals] = useState({
    itemsOfTable: 0,
  });
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');   //display the serious error
  const { setLoginForm } = useLogin();    //use to set global state allowing enable the login form.



  useEffect(() => {
    //redirect to login page if user is not authorized
    if( props.isAuthorize == false ) {
     handleNotAuthorized(
       () => { router.push('/login') },
       ( msg ) => { setErrorMessage( msg ) }
     );
   }

   setInitStates( props );
   setLoadingStatus( false );  //when request is sending, and wait for the response, loadingstatus is set true. That disabled all the link, components

 }, [props]);

  function setInitStates( result ) {
    setImageList(JSON.parse(result.data));
    setPaginationServer(result.pagination);
    setTotals(result.totals);
  }

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async (value) => {
    //set state sorter to init state, that means sort follow the date column
    setSearch(value);
    setLoadingStatus( true );

    let query = `?size=${paginationServer.pageSize}&search=${value}`;
    let { result, res } = await callAPI( await fetch(`/api/images${query}`, {
        method: 'GET',
        cache: 'no-store'
      }),
      ( msg ) => { setErrorMessage( msg ) },
      () => { router.push('/login') },
      () => { setLoginForm( true ) },
    );
    if ( res.status == 200 ) {
      setInitStates( result );
    }
    setLoadingStatus( false );  //when request is sending, and wait for the response, loadingstatus is set true. That disabled all the link, components

  };
  //change pagination
  const handleChange = async ( page, pageSize ) => {
    setLoadingStatus(true);
    console.log(pageSize + '  ' + page);
    let query = `?page=${page}&size=${pageSize}&search=${search}`;
    let { result, res } = await callAPI( await fetch(`/api/images${query}`, {
        method: 'GET',
        cache: 'no-store'
      }),
      ( msg ) => { setErrorMessage( msg ) },
      () => { router.push('/login') },
      () => { setLoginForm( true ) },
    );
    if ( res.status == 200 ) {
      setInitStates( result );
    }
    setLoadingStatus( false );  //when request is sending, and wait for the response, loadingstatus is set true. That disabled all the link, components
  };

  // ------------- Function
  // Form Handler
  // *****FOR EDIT MODAL
  const onFinishEdit = async (values) => {
    console.log("Success:", values);
    setLoadingStatus(true);
    // const rs = await props.updateImage(values, values.id);
    let { result, res } = await callAPI( await fetch(`/api/images/update`, {
      method: 'PUT',
      cache: 'no-store',
      body: JSON.stringify({
        imageInfo: values,
        // query: {
        //       page: paginationServer.current,
        //       size: paginationServer.size,
        //       search: search,
        // }
      })
    }),
    ( msg ) => { setErrorMessage( msg ) },
    () => { router.push('/login') },
    () => { setLoginForm( true ) },
  );
    if (res.ok == true ) {
      message.success("Update Successfully");
      setInitStates( result );
      // setImageList(rs.data);
    }
    setLoadingStatus( false );
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

  //When user submit AddForm
  const onFinishAdd = async (values) => {
    // check if user upload image yet
    if (!previewPic) {
      message.error("Please upload an Image!!!");
    } else {
      // const result = await uploadPicToServer();

      setLoadingStatus(true);
      const body = new FormData();
      body.append("imageFile", previewPic);
      body.append('imageInfo', JSON.stringify( {
        alt: formAdd.getFieldValue("alt") ?? "",
        caption: formAdd.getFieldValue("caption") ?? "",
      } ));
      body.append('query', JSON.stringify( {
        size: paginationServer.pageSize,
        page: 1,
      } ));
      let { result, res } = await callAPI( await fetch(`/api/images/add`, {
        method: 'POST',
        cache: 'no-store',
        body
      }),
      ( msg ) => { setErrorMessage( msg ) },
      () => { router.push('/login') },
      () => { setLoginForm( true ) },
    );
      if (res.ok == true ) {
        message.success("Add Image Successfully");
        setInitStates( result );
        // setImageList(rs.data);
      }

      setLoadingStatus( false );
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
    setLoadingStatus( true );
    const rsMetadata = await props.getInfoImage(item.url);
    // const query = `?id=${item.id}`
    // let { result, res } = await callAPI( await fetch(`/api/images/info${query}`, {
    //     method: 'GET',
    //     cache: 'no-store',
    //   }),
    //   ( msg ) => { setErrorMessage( msg ) },
    //   () => { router.push('/login') },
    //   () => { setLoginForm( true ) },
    // );
    // if (res.ok == true ) {
    //   setMetadata(rsMetadata);
    //   formEdit.setFieldsValue(item);
    //   setIsModalEditOpen(true);
    // }
    setMetadata(rsMetadata);
    formEdit.setFieldsValue(item);
    setIsModalEditOpen(true);
    // console.log(
    //   "🚀 ~ file: ImageList.js:30 ~ showModalEdit ~ rsMetadata:",
    //   result
    // );

    setLoadingStatus( false );
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
    // const rs = await props.dellImage(id);
    setLoadingStatus( true );
    // console.log("🚀 ~ file: ImageList.js:125 ~ handleDeleteImage ~ rs:", rs);
    let query = `?page=${paginationServer.current}&size=${paginationServer.pageSize}&search=${search}&del=${id}`;
    let { result, res } = await callAPI( await fetch(`/api/images${query}`, {
        method: 'GET',
        cache: 'no-store'
      }),
      ( msg ) => { setErrorMessage( msg ) },
      () => { router.push('/login') },
      () => { setLoginForm( true ) },
    );
    if (res.ok == true ) {
      message.success("Delete Successfully");
      setInitStates( result );
    }
    setLoadingStatus( false );
    setIsModalEditOpen(false);
  };

  let fButtonsAddModal = [];
    fButtonsAddModal.push(<Button key="back" onClick={handleCancelModalEdit}>
    Cancel
  </Button>);
  if( props.roles[props.user.role]?.images?.delete === true  ) {
    fButtonsAddModal.push( <Popconfirm
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
    </Popconfirm> );
  }
  fButtonsAddModal.push( <a
    href={formEdit.getFieldValue("url")}
    download={formEdit.getFieldValue("caption") ?? "download-image"}
    key="download"
    className="mx-2"
  >
    <Button type="dashed">Download File</Button>
  </a> );
  fButtonsAddModal.push( <Button
    key="submit"
    form="formImage"
    htmlType="submit"
    type="primary"
  >
    Save
  </Button> );
  // -----------
  // USE EFFECT

  return (
    <>
      <div className="text-red-500 font-bold">
          { errorMessage }
      </div>
      { props.roles[props.user.role]?.images?.add === true && (
        <div className="flex items-center  gap-4 mb-5">
          <h1 className="text-2xl font-[500] flex-1">Images Gallery</h1>
          <Button type="primary" onClick={showModalAdd}>
            Add New Image
          </Button>
          <Search
          placeholder="input search text"
          value={search}
          disabled={ loadingStatus }
          onChange={(e) => onSearchChange(e)}
          onSearch={(e) => handleSearch(e)}
          enterButton
          style={{
            width: 250,
          }}
        />
        </div>
      )}
      <List
          itemLayout="vertical"
          size="large"
          pagination={{ ...paginationServer, disabled: loadingStatus,
            onChange: handleChange,
            // onChange: (page) => {
            //   console.log(page);
            // },
            // pageSize: myConstant.image.PAGE_SIZE,
            // total:20,
            // current:1,
          }}
          grid={{
            gutter: 16,
            column: 6,
          }}
          dataSource={imageList}
          renderItem={(item) => (
            <>
            { props.roles[props.user.role]?.images?.edit === true ? (
                <List.Item
                  key={item.title}
                  style={{padding:0}}
                  className="h-[120px] flex items-center justify-center bg-gray-200 shadow-md cursor-pointer hover:border hover:scale-110 duration-300 rounded-lg"
                  onClick={() => showModalEdit(item)}
                >
                  <Image
                    src={item.url}
                    alt={item.alt}
                    width={150}
                    height={150}
                    className="object-contain rounded-lg h-full"
                  />
                </List.Item>
              )
              :
              (
                <List.Item
                key={item.title}
                className="h-[120px] flex items-center justify-center bg-gray-200 shadow-md cursor-pointer hover:border hover:scale-110 duration-300 rounded-lg"
                >
                  <Image
                    src={item.url}
                    alt={item.alt}
                    width={150}
                    height={150}
                    className="object-contain rounded-lg h-full"
                  />
                </List.Item>
              )
            }
            </>
          )}
        />

      {/* Modal Section */}

      {/* Modal Edit */}
      {

      }

      <Modal
        title="Image Detail"
        open={isModalEditOpen}
        onCancel={handleCancelModalEdit}
        width={720}
        getContainer={false}
        footer={fButtonsAddModal}
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
                onFinish={onFinishEdit}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item label="id" name="id" className="hidden">
                  <Input />
                </Form.Item>
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
        getContainer={false}
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
