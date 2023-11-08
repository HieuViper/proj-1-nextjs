"use client";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  SwapLeftOutlined,
  SyncOutlined,
  UploadOutlined,
  WarningTwoTone,
} from "@ant-design/icons";
import { Button, Form, Input, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";

const roles = [
  {
    value: "subcriber",
    label: "Subcriber",
  },
  {
    value: "contributor",
    label: "Contributor",
  },
  {
    value: "editor",
    label: "Editor",
  },
  {
    value: "admin",
    label: "Administrator",
  },
];

const UserForm = () => {
  const [form] = Form.useForm();
  const params = useParams();
  const [isSetNewPassword, setIsSetNewPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [picName, setPicName] = useState("");
  const [previewPic, setPreviewPic] = useState(null);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  //Generate Password
  const generatePassword = () => {
    const length = 12;
    const charset =
      "!@#$%^&*()0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let newPass = "";
    for (let i = 0; i < length; i++) {
      newPass += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    console.log(
      "🚀 ~ file: UserForm.js:53 ~ generatePassword ~ newPass:",
      newPass
    );
    setPassword(newPass);
    form.setFieldsValue({ new_password: newPass });
    form.setFieldsValue({ password: newPass });
  };

  //Handle upload picture
  const getFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };
  return (
    <div>
      <div className="flex justify-start mb-4">
        <Link href={`/admin/users`}>
          <Button type="dashed" icon={<SwapLeftOutlined />}>
            Back to User List
          </Button>
        </Link>
      </div>

      <div className="mx-auto">
        <Form
          className="w-full"
          style={
            {
              // maxWidth: 600,
              // width: "100%",
            }
          }
          labelCol={{
            xs: {
              span: 12,
            },
            sm: {
              span: 3,
            },
          }}
          wrapperCol={{
            xs: {
              span: 12,
            },
            sm: {
              span: 8,
            },
          }}
          form={form}
          name="user-form"
          onFinish={onFinish}
          initialValues={{}}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
            extra={`${params?.id ? "Usernames cannot be changed." : ""}`}
          >
            <Input disabled={params?.id} />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input placeholder="example@gmail.com" />
          </Form.Item>

          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
              },
            ]}
          >
            <Input placeholder="Văn Anh" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
              },
            ]}
          >
            <Input placeholder="Nguyễn" />
          </Form.Item>

          <Form.Item label="Website" name="website">
            <Input placeholder="https://my-website.com" />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: "Please select role for user!",
              },
            ]}
          >
            <Select
              style={{
                width: 200,
              }}
              options={roles}
            />
          </Form.Item>

          {!params?.id ? (
            <>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <>
                  <Input.Password
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      form.setFieldsValue({ password: e.target.value });
                    }}
                  />
                  <PasswordStrengthBar
                    password={password}
                    scoreWords={[
                      "Very Weak",
                      "Weak",
                      "Medium",
                      "Strong",
                      "Very Strong",
                    ]}
                    shortScoreWord="Too short"
                  />
                  <Button
                    onClick={() => generatePassword()}
                    icon={<SyncOutlined spin />}
                  >
                    Generate Password
                  </Button>
                </>
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || password === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The confirm password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item label="Facebook profile URL" name="facebook_url">
                <Input prefix={<FacebookOutlined />} />
              </Form.Item>
              <Form.Item label="Instagram profile URL" name="instagram_url">
                <Input prefix={<InstagramOutlined />} />
              </Form.Item>
              <Form.Item label="LinkedIn profile URL" name="linkedin_url">
                <Input prefix={<LinkedinOutlined />} />
              </Form.Item>

              <p className="text-xl font-semibold my-3">About the user</p>
              <Form.Item
                label="Biographical Info"
                name="bio"
                extra="Share a little biographical information to fill out your profile. This may be shown publicly."
              >
                <TextArea
                  rows={4}
                  placeholder="My name is Alex Drysdale and I am a junior web developer for Oswald Technologies..."
                  className="placeholder:text-xs"
                />
              </Form.Item>

              <Form.Item
                name="image"
                label="Profile Picture"
                getValueFromEvent={getFile}
              >
                <Upload
                  name="file"
                  maxCount={1}
                  // action="/api/articles/image"
                  customRequest={(info) => {
                    console.log(info);
                    setPreviewPic(info.file);
                    setPicName(info.file.name);
                  }}
                  showUploadList={false}
                  beforeUpload={(file) => {
                    return new Promise((resolve, reject) => {
                      if (file.size > 9000000) {
                        reject("file size exceed");
                        message.error("File size exceed");
                      } else {
                        resolve("success");
                        message.success("Upload successfully");
                      }
                    });
                  }}
                  headers={{ authorization: "authorization-text" }}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
                {previewPic && (
                  <img
                    src={`${URL.createObjectURL(previewPic)}`}
                    className="w-32 h-32 rounded-sm shadow"
                    alt={`${picName}`}
                  />
                )}
                {picName && !previewPic && (
                  <img
                    src={`/uploads/${picName}`}
                    className="w-32 h-32 rounded-sm shadow"
                    alt={`${picName}`}
                  />
                )}
              </Form.Item>

              <p className="text-xl font-semibold my-3">Account Management</p>
              <Form.Item name="new_pass" label="Password Reset">
                <Button
                  onClick={() => setIsSetNewPassword(true)}
                  icon={<WarningTwoTone twoToneColor="#ffcc00 " />}
                >
                  Set New Password
                </Button>
              </Form.Item>

              {isSetNewPassword && (
                <div className="mt-4">
                  <Form.Item
                    name="old_password"
                    label="Old Password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your old password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="new_password"
                    label="New Password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your new password!",
                      },
                    ]}
                  >
                    <Input.Password
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <PasswordStrengthBar
                      password={password}
                      scoreWords={[
                        "Very Weak",
                        "Weak",
                        "Medium",
                        "Strong",
                        "Very Strong",
                      ]}
                      shortScoreWord="Too short"
                    />
                  </Form.Item>

                  <div className="flex items-center gap-3 mb-5 ml-8">
                    <Button
                      type="text"
                      danger
                      onClick={() => setIsSetNewPassword(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => generatePassword()}
                      icon={<SyncOutlined spin />}
                    >
                      Generate Password
                    </Button>
                  </div>
                </div>
              )}
              <Form.Item name="reset_pass" label="Password Reset">
                <Button>Send Reset Link</Button>
              </Form.Item>
            </>
          )}

          {/* Submit Button Form */}
          <div className="w-full flex justify-start items-center mt-6">
            <Button type="primary" htmlType="submit">
              {params?.id ? "Update User" : "Add New User"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UserForm;
