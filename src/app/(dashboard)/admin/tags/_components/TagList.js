/* eslint-disable @next/next/no-async-client-component */
"use client";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
} from "antd";
import Search from "antd/es/input/Search";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TagForm } from "./TagForm";

function TagList(props) {
  const { getAllTag, getTag, addTag, editTag, delTag, delBulkTag, searchTag } =
    props;
  const router = useRouter();
  const [tags, setTags] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [langTable, setLangTable] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataTag, setDataTag] = useState();
  const [lang, setLang] = useState(process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE);

  // SEARCH TAG
  const handleSearch = async (search) => {
    const rs = await searchTag(search, lang);
    setTags(rs);
  };

  //  GET ALL TAG
  const getAllTags = async (langValue) => {
    const result = await getAllTag(langValue);
    setTags(result.reverse());
  };
  // HANDLE POPUP CONFIRM BULK DELETE
  const confirmBulkDelete = () => {
    setLoadingDelete(true);
    delBulkTag(
      rowSelection.selectedRowKeys
        .map((item) => `${item},`)
        .join("")
        .slice(0, -1)
    ).then(() => {
      setTags((prevItem) =>
        prevItem.filter(
          (item) => !rowSelection.selectedRowKeys.includes(item.id)
        )
      );
      setSelectedRowKeys([]);
      toast.success("Tasks deleted");
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
  const confirmDelete = (id) => {
    delTag(id).then((res) => {
      setTags((prevItem) => prevItem.filter((item) => item.id !== id));
    });
    toast.success("Task deleted");
  };

  // HANDLE POPUP EDIT
  const showModal = async (id) => {
    setIsModalOpen(true);
    getTag(id).then((res) => {
      setDataTag(res);
    });
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // CHANGE LANG
  const handleChangeLanguage = async (lang) => {
    getAllTags(lang);
    setLang(lang);
  };
  let langOptions = langTable.map((lang) => {
    return { value: lang.code, label: lang.name };
  });

  // PAGINATION

  //
  useEffect(() => {
    setLangTable(JSON.parse(props.langTable));
    setTags(JSON.parse(props.dataTable));
    setLoading(false);
    // getAllTags(lang)
  }, []);

  // COLUMNS TABLE
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
                    showModal(record.id);
                  }}
                >
                  <EditOutlined className="pr-1" />
                  Edit
                </span>
                |
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={() => confirmDelete(record.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <span className="btn-trash cursor-pointer">
                    <DeleteOutlined className="pr-1" />
                    Trash
                  </span>
                </Popconfirm>
              </>
            </div>
          </>
        );
      },
    },
    {
      title: "Tag Code",
      dataIndex: "tag_code",
      key: "tag_code",
      sorter: (a, b) => a.tag_code.length - b.tag_code.length,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 300,
      sorter: (a, b) => a.description.length - b.description.length,
    },
  ];

  return (
    <>
      <div className="flex justify-between gap-4">
        <div className="text-lg font-semibold px-4">Tags</div>
        <div className="flex gap-4">
          <Select
            defaultValue={process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE}
            value={lang}
            style={{
              width: 120,
            }}
            onChange={handleChangeLanguage}
            options={langOptions}
          />
          <Search
            placeholder="input search"
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
      <Row type="flex" justify="center">
        <Col xs={24} md={10} lg={8} type="flex" justify="center" align="middle">
          <TagForm
            langTable={langTable}
            {...{ addTag, lang, getAllTags, tags, setTags }}
          />
        </Col>
        <Col xs={24} md={14} lg={14} className="pb-4">
          <div className="flex justify-end pb-2">
            <div
              style={{
                marginLeft: 8,
                marginRight: 8,
              }}
            >
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
            </div>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to bulk delete this task?"
              onConfirm={confirmBulkDelete}
              okText="Yes"
              cancelText="No"
              placement="left"
            >
              <Button
                type="primary"
                danger
                disabled={!hasSelected}
                loading={loadingDelete}
              >
                Bulk Delete
              </Button>
            </Popconfirm>
          </div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={tags}
            rowKey="id"
            scroll={{
              x: 700,
            }}
            loading={loading}
          />
        </Col>
      </Row>
      {/* Modal */}
      <Modal
        title="Edit Tag"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <TagForm
          handleModal={handleOk}
          dataTag={dataTag}
          langTable={langTable}
          {...{
            getTag,
            addTag,
            editTag,
            delTag,
            lang,
            getAllTags,
            tags,
            setTags,
          }}
        />
      </Modal>
    </>
  );
}

export default TagList;
