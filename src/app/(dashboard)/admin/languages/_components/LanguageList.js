"use client";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Modal, Popconfirm, Row, Table, Tag } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LanguageForm from "./LanguageForm";

const LanguageList = (props) => {
  const {
    getLanguage,
    addLanguage,
    editLanguage,
    delLanguage,
    delBulkLanguage,
    searchLanguage,
  } = props;
  const [data, setData] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataOneLang, setDataOneLang] = useState(null);

  //Search
  const handleSearch = async (e) => {
    const rs = await searchLanguage(e);
    setData(rs);
  };

  // HANDLE POPUP CONFIRM BULK DELETE
  const confirmBulkDelete = async () => {
    setLoadingDelete(true);
    console.log(selectedRowKeys);
    await delBulkLanguage(selectedRowKeys).then(() => {
      setData((prevItem) =>
        prevItem.filter(
          (item) => !rowSelection.selectedRowKeys.includes(item.code)
        )
      );
      setSelectedRowKeys([]);
      toast.success("Delete Successfully !");
      setLoadingDelete(false);
    });
  };
  const onSelectChange = (tagSelectedRowKeys) => {
    setSelectedRowKeys(tagSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  let hasSelected = selectedRowKeys.length > 0;

  // HANDLE POPUP CONFIRM DELETE
  const confirmDelete = async (code) => {
    await delLanguage(code).then((res) => {
      setData((prevItem) => prevItem.filter((item) => item.code !== code));
    });
    toast.success("Language deleted");
  };

  // HANDLE POPUP EDIT
  const showModal = async (code) => {
    setIsModalOpen(true);
    getLanguage(code).then((res) => {
      setDataOneLang(res);
    });
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //USE EFFECT
  useEffect(() => {
    setData(JSON.parse(props.data));
  }, []);

  // COLUMNS TABLE
  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      fixed: "left",
      width: 150,
      sorter: (a, b) => a.name.length - b.name.length,
      render: (_, record) => {
        return (
          <>
            <div className="text-base font-medium pb-2">{record.name}</div>
            <div className="flex gap-2">
              <>
                <span
                  className="btn-edit cursor-pointer"
                  onClick={() => {
                    showModal(record.code);
                  }}
                >
                  <EditOutlined className="pr-1" />
                  Edit
                </span>
                |
                <Popconfirm
                  title="Delete The Language"
                  description="Are you sure to delete this language?"
                  onConfirm={() => confirmDelete(record.code)}
                  okText="Yes"
                  cancelText="Cancle"
                >
                  <span className="btn-trash cursor-pointer">
                    <DeleteOutlined className="pr-1" />
                    Delete
                  </span>
                </Popconfirm>
              </>
            </div>
          </>
        );
      },
    },
    {
      title: "Language Code",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => a.code.length - b.code.length,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 300,
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (_, record) => {
        return (
          <Tag color={record.active == 1 ? "green" : "red"}>
            {record.active == 1 ? "Active" : "Disable"}
          </Tag>
        );
      },
    },
  ];
  return (
    <div>
      <div className="flex justify-between gap-4">
        <div className="text-lg font-semibold">Languages</div>
        <div className="flex gap-4">
          <Search
            placeholder="Input Search Text"
            onSearch={(e) => handleSearch(e)}
            enterButton
            style={{
              width: 200,
            }}
            className=" w-56"
          />
        </div>
      </div>
      <Divider />
      <Row type="flex" justify="space-between">
        <Col xs={24} md={10} lg={8}>
          <LanguageForm {...{ addLanguage, data, setData }} />
        </Col>
        <Col xs={24} md={14} lg={15} className="pb-4">
          <div className="flex justify-end items-center pb-2">
            <div className="mx-2">
              {hasSelected ? (
                <i className="text-xs">
                  Selected {selectedRowKeys.length} items
                </i>
              ) : (
                ""
              )}
            </div>
            <Popconfirm
              title="Delete Action"
              description="Are you sure to bulk delete this item?"
              onConfirm={confirmBulkDelete}
              okText="Yes"
              cancelText="Cancel"
              placement="left"
            >
              <Button
                type="primary"
                danger
                disabled={!hasSelected}
                loading={loadingDelete}
                icon={<DeleteOutlined />}
              >
                Bulk Delete
              </Button>
            </Popconfirm>
          </div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            rowKey="code"
            scroll={{
              x: 700,
            }}
          />
        </Col>
      </Row>
      {/* Modal */}
      <Modal
        title="Edit Language"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <LanguageForm
          handleModal={handleOk}
          {...{
            getLanguage,
            addLanguage,
            editLanguage,
            delLanguage,
            dataOneLang,
            data,
            setData,
          }}
        />
      </Modal>
    </div>
  );
};

export default LanguageList;
