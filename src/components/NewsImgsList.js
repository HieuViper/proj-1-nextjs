"use client";

import {
  Button,
  List,
  Modal,
  Popconfirm,
  Upload,
  message,
} from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { callAPI, handleNotAuthorized } from "@/library/client/callAPI";
import { useLogin } from "@/store/login";
import Search from "antd/es/input/Search";
import { EditImgForm } from "./EditImgForm";
import { AddImgForm } from "./AddImgForm";

const ImageList = (props) => {
  const router = useRouter();
  const [paginationServer, setPaginationServer] = useState({
    pageSize: 10,
    total: 0,
    current: 1,
  });

  const [imageList, setImageList] = useState([]);
  // console.log("🚀 ~ file: ImageList.js:19 ~ ImageList ~ imageList:", imageList);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [metadata, setMetadata] = useState(null);
  // console.log("🚀 ~ file: ImageList.js:11 ~ ImageList ~ metadata:", metadata);
  const [previewPic, setPreviewPic] = useState(null);
  const [search, setSearch] = useState("");
  // const [totals, setTotals] = useState({
  //   itemsOfTable: 0,
  // });
  const [choosenImg, setChoosenImg] = useState();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');   //display the serious error
  const { setLoginForm } = useLogin();    //use to set global state allowing enable the login form.



  useEffect(() => {
    //redirect to login page if user is not authorized
  //   if( props.isAuthorize == false ) {
  //    handleNotAuthorized(
  //      () => { router.push('/login') },
  //      ( msg ) => { setErrorMessage( msg ) }
  //    );
  //  }

   setInitStates( props );
  //  setLoadingStatus( false );  //when request is sending, and wait for the response, loadingstatus is set true. That disabled all the link, components

 }, [props]);

  function setInitStates( result ) {
    setImageList(JSON.parse(result.data));
    setPaginationServer(result.pagination);
    // setTotals(result.totals);
  }

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async (value) => {
    //set state sorter to init state, that means sort follow the date column
    setSearch(value);
    setLoadingStatus( true );

    let query = `?size=${paginationServer.pageSize}&search=${value}`;
    let { result, res } = await callAPI( await fetch(`/api/news_imgs${query}`, {
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
    let { result, res } = await callAPI( await fetch(`/api/news_imgs${query}`, {
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
    //alt and caption are changed, need to update to server
    if( values.changeValue == true ) {
      setLoadingStatus(true);
      let { result, res } = await callAPI( await fetch(`/api/news_imgs/update`, {
          method: 'PUT',
          cache: 'no-store',
          body: JSON.stringify({
            imageInfo: values,
            query: {
                  page: paginationServer.current,
                  size: paginationServer.pageSize,
                  search: search,
            }
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
    }
    // console.log('values:', values);
    // console.log('editor:', props.editor);
    // const imageUtils = props.editor.plugins.get( 'ImageUtils' );
    // imageUtils.insertImage( { src: values.url,
    //                           srcset: values.srcset,
    // } );
    // close modal
    setIsModalEditOpen(false);
    props.setIsModalPicOpen( false );
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
        alt: values.alt ?? "",
        caption: values.caption ?? "",
      } ));
      body.append('query', JSON.stringify( {
        size: paginationServer.pageSize,
        page: 1,
      } ));
      let { result, res } = await callAPI( await fetch(`/api/news_imgs/add`, {
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
      }

      setLoadingStatus( false );
      // close modal
      setIsModalAddOpen(false);
      setPreviewPic(null);

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

    let { result, res } = await callAPI( await fetch(`/api/news_imgs/info`, {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify( { imgUrl: item.url } )
      }),
      ( msg ) => { setErrorMessage( msg ) },
      () => { router.push('/login') },
      () => { setLoginForm( true ) },
    );
    if (res.ok == true ) {
      setMetadata( result );
      console.log('metadata:', metadata);
      setChoosenImg(item);
      setIsModalEditOpen(true);
    }
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
    let { result, res } = await callAPI( await fetch(`/api/news_imgs${query}`, {
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


  //set Buttons for Edit image form
  let fButtonEditModal = [];
    fButtonEditModal.push(<Button key="back" onClick={handleCancelModalEdit}>
    Cancel
  </Button>);
  if( props.roles[props.user.role]?.news_imgs?.delete === true  ) {
    fButtonEditModal.push( <Popconfirm
      key="delete"
      title="Delete the Image Permanently"
      description="Are you sure to delete this image?"
      onConfirm={() => handleDeleteImage( choosenImg?.id )}
      onCancel={() => {}}
      okText="Yes"
      cancelText="Cancel"
    >
      <Button type="dashed" danger>
        Delete Permanently
      </Button>
    </Popconfirm> );
  }
  fButtonEditModal.push( <a
    href={ choosenImg?.url }
    download={ choosenImg?.caption ?? "download-image"}
    key="download"
    className="mx-2"
  >
    <Button type="dashed">Download File</Button>
  </a> );
  fButtonEditModal.push( <Button
    key="submit"
    form="formEditImage"
    htmlType="submit"
    type="primary"
  >
    Pick Image
  </Button> );

  // -----------
  // USE EFFECT

  return (
    <>
      <div className="text-red-500 font-bold">
          { errorMessage }
      </div>
      { props.roles[props.user.role]?.news_imgs?.add === true && (
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
          }}
          grid={{
            gutter: 16,
            column: 6,
          }}
          dataSource={imageList}
          renderItem={(item) => (
            <>
            { props.roles[props.user.role]?.news_imgs?.edit === true ? (
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
        footer={fButtonEditModal}
      >
        <EditImgForm
          image = { choosenImg }
          metadata = { metadata }
          editor = { props.editor }
          {...{onFinishEdit, onFinishFailed}}
        />
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
        <AddImgForm
            {...{ setPreviewPic, previewPic, onFinishAdd, onFinishFailed }}
        />
      </Modal>
    </>
  );
};

export default ImageList;
