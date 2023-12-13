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
import { Button, Form, Input, Select, Upload, Image } from "antd";
import TextArea from "antd/es/input/TextArea";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import PasswordStrengthBar from "react-password-strength-bar";
import { callAPI, handleNotAuthorized } from "@/library/client/callAPI";
import { useLogin } from "@/store/login";
const myConstant = require('@/store/constant')

const UserForm = (props) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const params = useParams();
  const searchParams = useSearchParams();

  const [isSetNewPassword, setIsSetNewPassword] = useState(false);
  const [password, setPassword] = useState("");
  // const [picName, setPicName] = useState("");
  // const [previewPic, setPreviewPic] = useState(null);
  const [displayName, setDisplayName] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadPic, setUploadPic] = useState(null);
  const [picURL, setPicURL] = useState(null);
  const { setLoginForm } = useLogin();    //use to set global state allowing enable the login form.

  useEffect(() => {

    if( props.isAuthorize == false ) {
      handleNotAuthorized(
        () => { router.push('/login') },
        ( msg ) => { setErrorMessage( msg ) });
    }
    //set role options for the field role
    const rolesData = props.roles;
    setRoles(
      Object.keys(rolesData).map((role) => ({
        value: role,
        key: role,
        label: role,
      }))
    );
    //set user data for the form
    if (props.data) {
      // console.log('user: ', JSON.parse(props.data));
      let formdata = JSON.parse(props.data);
      setPicURL( formdata.image );
      formdata.old_email = formdata.email; //add new value for new field old_email. We keep this value to make sure user has change their email
      form.setFieldsValue(formdata);
    }
    if ( props.mainImage ) {
      let mainImage = JSON.parse( props.mainImage )
      form.setFieldsValue( mainImage );
    }
  }, [props, router, form]);


  //submit value
  const onFinish = async (values) => {
    let imageInfo = null;
    console.log("values:", values);
    const body = new FormData();
    body.append('imageFile', uploadPic);    //attach uploaded image
    if( picURL || uploadPic ) {
      imageInfo = {
        alt: values.alt ?? "",
        caption: values.caption ?? "",
      }
      // let { alt, caption, ...values2 } = values;
      delete values.alt;
      delete values.caption;
    }
    body.append('imageInfo', JSON.stringify(imageInfo));  //attach image information
    if (params.id) {
      //update current user
      let { new_password, ...user } = values;
      if (isSetNewPassword) user.password = new_password;
      user.image = picURL;          //set the old image url back to user.image
      body.append('user', JSON.stringify(user));          //attach user information

      let { result, res } = await callAPI( await fetch(`/api/users/update`, {
          method: 'POST',
          cache: 'no-store',
          body
        }),
        ( msg ) => { setErrorMessage( msg ) },
        () => { router.push('/login') },
        () => { setLoginForm( true ) },
      );

      //success update user
      if ( res.ok == true ) {
        let messageNotify = "Update user successfully - ";
        toast.success(messageNotify, {
          position: "top-center",
          duration: 5000,
        });
      }
    } else {
      //add new user
      let { confirmPassword, ...user } = values;
      console.log("Received values of form: ", user);
      body.append('user', JSON.stringify(user));          //attach user information
      //await props.addUser(user).then((message) => {
      let { result, res } = await callAPI( await fetch(`/api/users/add`, {
          method: 'POST',
          cache: 'no-store',
          body
        }),
        ( msg ) => { setErrorMessage( msg ) },
        () => { router.push('/login') },
        () => { setLoginForm( true ) },
      );

        if( res.ok == true ) {
          let messageNotify = "Add user successfully - ";
          toast.success(messageNotify, {
            position: "top-center",
            duration: 5000,
          });
          router.refresh();
          router.push('/admin/users');
        }
      //});
    }
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
    form.setFieldsValue({ password: newPass }); //no need
  };

  //generate display options for the field display_name
  function generateDisplay() {
    setDisplayName([
      {
        value: form.getFieldValue("nick_name"),
        key: "nickName",
        label: form.getFieldValue("nick_name"),
      },
      {
        value: form.getFieldValue("first_name"),
        key: "firstName",
        label: form.getFieldValue("first_name"),
      },
      {
        value: form.getFieldValue("last_name"),
        key: "lastName",
        label: form.getFieldValue("last_name"),
      },
      {
        value:
          form.getFieldValue("last_name") +
          " " +
          form.getFieldValue("first_name"),
        key: "LastFirstName",
        label:
          form.getFieldValue("last_name") +
          " " +
          form.getFieldValue("first_name"),
      },
      {
        value:
          form.getFieldValue("first_name") +
          " " +
          form.getFieldValue("last_name"),
        key: "firstLastName",
        label:
          form.getFieldValue("first_name") +
          " " +
          form.getFieldValue("last_name"),
      },
    ]);
  }

  function goBackUserList(event) {
    console.log("comer here link");
    event.preventDefault();
    router.refresh();
    // const decoratePath = new URL('http://localhost:3000/admin');
    router.push("/admin/users");
  }

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
      <div className="text-red-500 font-bold">
        { errorMessage }
      </div>
      <div className="flex justify-start mb-4">
        <Link href={`/admin/users`} onClick={(e) => goBackUserList(e)}>
          <Button type="dashed" icon={<SwapLeftOutlined />}>
            Back to User List
          </Button>
        </Link>
      </div>

      <div className="mx-auto">
        <Form
          style={
            {
              // maxWidth: 600,
              // width: "100%",
            }
          }
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 8,
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
                required: "true",
                message: "Please input username!",
              },
            ]}
            extra={`${params?.id ? "Usernames cannot be changed." : ""}`}
          >
            <Input disabled={params?.id} key="usernameIn" />
          </Form.Item>

          <Form.Item
            label="First Name"
            name="first_name"
            rules={[
              {
                required: "true",
                message: "Please input first name!",
              },
            ]}
          >
            <Input
              key="firstName"
              placeholder="Văn Anh"
              onChange={(e) => generateDisplay()}
            />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[
              {
                required: "true",
                message: "Please input last name!",
              },
            ]}
          >
            <Input
              key="lastName"
              placeholder="Nguyễn"
              onChange={(e) => generateDisplay()}
            />
          </Form.Item>

          <Form.Item
            label="Nick Name"
            name="nick_name"
            rules={[
              {
                required: "true",
                message: "Please input nick name!",
              },
            ]}
          >
            <Input
              key="nickName"
              placeholder="Nguyễn"
              onChange={(e) => generateDisplay()}
            />
          </Form.Item>

          <Form.Item
            label="Display name"
            name="display_name"
            rules={[
              {
                required: "true",
                message: "Please select display name for user!",
              },
            ]}
          >
            <Select
              style={{
                width: 200,
              }}
              //options={displayName}
            >
              {displayName &&
                displayName.map((item) => (
                  <Select.Option key={item.key} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: "true",
                message: "Please select role for user!",
              },
            ]}
          >
            <Select
              style={{
                width: 200,
              }}
              // options={roles}
            >
              {roles &&
                roles.map((item) => (
                  <Select.Option key={item.key} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>


        <Form.Item name="image" label="Image" getValueFromEvent={getFile}>
          {/* <Input style={{ display: "none" }} /> */}
          <Upload
            name="file"
            maxCount={1}
            customRequest={(info) => {
              console.log(info);
              setUploadPic(info.file);
            }}
            showUploadList={false}
            fileList={[]}
            beforeUpload={(file) => {
              console.log(
                "🚀 ~ file: NewsForm.js:498 ~ NewsForm ~ file:",
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
                  reject(false);  //put reason here
                }

                const isLt5M =
                  file.size / 1024 / 1024 <=
                  myConstant.image.FILE_LIMITED_SIZE;
                // check the file size
                if (!isLt5M) {
                  message.error(
                    `Image must smaller than ${myConstant.image.FILE_LIMITED_SIZE}MB!`
                  );
                  reject(false);  //put some reason here
                } else {
                  resolve(true);
                }
              });
            }}
            headers={{ authorization: "authorization-text" }}
          >
            <Button icon={<UploadOutlined />} className="mb-1">
              {!picURL ? "Upload" : "Change Picture"}
            </Button>
          </Upload>
        </Form.Item>


        <div className="ml-32 mb-5">
          {uploadPic && (
            <Image
              src={`${URL.createObjectURL(uploadPic)}`}
              width={160}
              className="rounded-lg shadow"
              alt=""
            />
          )}
          {picURL && !uploadPic && (
            <Image
              src={`${picURL}`}
              width={160}
              className="rounded-lg shadow"
              alt=""
            />
          )}
        </div>

        {(picURL || uploadPic) && (
          <>
            <Form.Item name="caption" label="Caption">
              <Input />
            </Form.Item>
            <Form.Item name="alt" label="Alt">
              <Input />
            </Form.Item>
          </>
        )}

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: "true",
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input key="emailIn" placeholder="example@gmail.com" />
          </Form.Item>

          <Form.Item name="old_email" style={{ display: "none" }}>
            <Input key="oldEmail" />
          </Form.Item>

          <Form.Item label="Website" name="website">
            <Input key="websiteIn" placeholder="https://my-website.com" />
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input key="phoneIn" placeholder="0906627987" />
          </Form.Item>

          {!params?.id ? (
            <>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: "true",
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <>
                  <Input.Password
                    key="pass"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      // form.setFieldsValue({ password: e.target.value }); //may be no need
                    }}
                    autoComplete="false"
                  />
                </>
              </Form.Item>
              <Form.Item>
                <div className="ml-40 w-80">
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
                    icon={<SyncOutlined />}
                  >
                    Generate Password
                  </Button>
                </div>
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: "true",
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
                <Input.Password key="confirmPass" autoComplete="false" />
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item label="Facebook profile URL" name="facebook_profile">
                <Input key="Facebook" prefix={<FacebookOutlined />} />
              </Form.Item>
              <Form.Item label="Instagram profile URL" name="instagram_profile">
                <Input key="Instagram" prefix={<InstagramOutlined />} />
              </Form.Item>
              <Form.Item label="LinkedIn profile URL" name="linkedin_profile">
                <Input key="linkedIn" prefix={<LinkedinOutlined />} />
              </Form.Item>

              <p className="text-xl font-semibold my-3">About the user</p>
              <Form.Item
                label="Biographical Info"
                name="biographical"
                extra="Share a little biographical information to fill out your profile. This may be shown publicly."
              >
                <TextArea
                  key="bio"
                  rows={4}
                  placeholder="My name is Alex Drysdale and I am a junior web developer for Oswald Technologies..."
                  className="placeholder:text-xs"
                />
              </Form.Item>
{/*
              <Form.Item
                name="image"
                label="Profile Picture"
                getValueFromEvent={getFile}
              >

                <>
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
                </>
              </Form.Item> */}

              <p className="text-xl font-semibold my-3">Account Management</p>
              {/* <Form.Item name="new_pass" label="Password Reset"> */}
              <Button
                onClick={() => setIsSetNewPassword(true)}
                icon={<WarningTwoTone twoToneColor="#ffcc00 " />}
              >
                Set New Password
              </Button>
              {/* </Form.Item> */}

              {isSetNewPassword && (
                <div className="mt-4">
                  {/* <Form.Item
                    name="old_password"
                    label="Old Password"
                    rules={[
                      {
                        required: "true",
                        message: "Please input your old password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item> */}

                  <Form.Item
                    name="new_password"
                    label="New Password"
                    rules={[
                      {
                        required: "true",
                        message: "Please input new password!",
                      },
                    ]}
                  >
                    <Input.Password
                      key="new_pass"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="false"
                    />
                  </Form.Item>
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
                  <div className="flex items-center gap-3 mb-5 ml-8">
                    <Button
                      type="text"
                      danger
                      onClick={() => {
                        setIsSetNewPassword(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => generatePassword()}
                      icon={<SyncOutlined />}
                    >
                      Generate Password
                    </Button>
                  </div>
                </div>
              )}
              {/* <Form.Item name="reset_pass" label="Password Reset"> */}
              <Button>Send Reset Link</Button>
              {/* </Form.Item> */}
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