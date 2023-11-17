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
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";


import PasswordStrengthBar from "react-password-strength-bar";

const UserForm = (props) => {
  const [form] = Form.useForm();
  const params = useParams();
  const searchParams = useSearchParams();

  const [isSetNewPassword, setIsSetNewPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [picName, setPicName] = useState("");
  const [previewPic, setPreviewPic] = useState(null);
  const [displayName, setDisplayName] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(()=>{
    //set role options for the field role
    const rolesData = props.roles;
    setRoles( Object.keys( rolesData ).map((role) => ({
      value: role,
      key: role,
      label: role,
    })) );
    //set user data for the form
    if( props.data ){
     // console.log('user: ', JSON.parse(props.data));
      let formdata = JSON.parse(props.data);
      formdata.old_email = formdata.email;    //add new value for new field old_email. We keep this value to make sure user has change their email
      form.setFieldsValue(formdata);
    }
  }, [props])

  //submit value
  const onFinish = (values) => {


    if(params.id){
      //update current user
      let {new_password, ...user} = values;
      if( isSetNewPassword )
        user.password = new_password;
      props.updateUser( user ).then(( message ) => {
        //success update user
        if( message == 1 ) {
          let messageNotify =
            "Update user successfully - ";
          toast.success(messageNotify, {
            position: "top-center",
            duration: 5000
          });
        } else {  //fail to update user
          let messageNotify =
          "Fail to update user. Try again or inform system's admin - " + message;
        toast.error(messageNotify, {
          position: "top-center",
          duration: 5000,
        });
        }
      }) ;
    } else {
      //add new user
      let { confirmPassword, ...user } = values;
      console.log("Received values of form: ", user);
      props.addUser( user ).then(( message ) => {
        //console.log("message from server:", message);
        if (message && message != 1) {
          let messageNotify =
            "Cannot add user, please try again or inform admin - " + message;
          toast.error(messageNotify, {
            position: "top-center",
            duration: 5000,
          });
        }
      });
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
  function generateDisplay( ) {
    setDisplayName([
      {
        value: form.getFieldValue('nick_name'),
        key:  'nickName',
        label: form.getFieldValue('nick_name'),
      },
      {
        value: form.getFieldValue('first_name'),
        key: 'firstName',
        label: form.getFieldValue('first_name'),
      },
      {
        value: form.getFieldValue('last_name'),
        key: 'lastName',
        label: form.getFieldValue('last_name'),
      },
      {
        value: form.getFieldValue('last_name') + " " + form.getFieldValue('first_name'),
        key: "LastFirstName",
        label: form.getFieldValue('last_name') + " " + form.getFieldValue('first_name'),
      },
      {
        value: form.getFieldValue('first_name') + " " + form.getFieldValue('last_name'),
        key: "firstLastName",
        label: form.getFieldValue('first_name') + " " + form.getFieldValue('last_name'),
      },
    ]);
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
      <div className="flex justify-start mb-4">
        <Link href={`/admin/users`}>
          <Button type="dashed" icon={<SwapLeftOutlined />}>
            Back to User List
          </Button>
        </Link>
      </div>

      <div className="mx-auto">
        <Form
          //className="w-full"
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
                message: "Please input username!",
              },
            ]}
            extra={`${params?.id ? "Usernames cannot be changed." : ""}`}
          >
            <Input disabled={params?.id} />
          </Form.Item>

          <Form.Item
            label="First Name"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please input first name!",
              },
            ]}
          >
            <Input placeholder="Văn Anh"
              onChange={(e) => generateDisplay()}
            />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please input last name!",
              },
            ]}
          >
            <Input placeholder="Nguyễn"
             onChange={(e) => generateDisplay()}
             />
          </Form.Item>

          <Form.Item
            label="Nick Name"
            name="nick_name"
            rules={[
              {
                required: true,
                message: "Please input nick name!",
              },
            ]}
          >
            <Input placeholder="Nguyễn"
             onChange={(e) => generateDisplay()} />
          </Form.Item>

          <Form.Item
            label="Display name"
            name="display_name"
            rules={[
              {
                required: true,
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
              {displayName && displayName.map((item) => (
                <Select.Option key={ item.key } value={ item.value }>{ item.label }</Select.Option>
              ))}
            </Select>
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
             // options={roles}
            >
              { roles && roles.map((item) => (
                <Select.Option key={ item.key } value={ item.value }>{ item.label }</Select.Option>
              )) }
            </Select>
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

          <Form.Item name="old_email" style={{ display: "none" }} >
            <Input />
          </Form.Item>

          <Form.Item label="Website" name="website">
            <Input placeholder="https://my-website.com" />
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input placeholder="0906627987" />
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
                     // form.setFieldsValue({ password: e.target.value }); //may be no need
                    }}
                  />

                </>
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
                  <Button
                    onClick={() => generatePassword()}
                    icon={<SyncOutlined spin />}
                  >
                    Generate Password
                  </Button>

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
              <Form.Item label="Facebook profile URL" name="facebook_profile">
                <Input prefix={<FacebookOutlined />} />
              </Form.Item>
              <Form.Item label="Instagram profile URL" name="instagram_profile">
                <Input prefix={<InstagramOutlined />} />
              </Form.Item>
              <Form.Item label="LinkedIn profile URL" name="linkedin_profile">
                <Input prefix={<LinkedinOutlined />} />
              </Form.Item>

              <p className="text-xl font-semibold my-3">About the user</p>
              <Form.Item
                label="Biographical Info"
                name="biographical"
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

                <Input style={{ display: "none" }} />
              </Form.Item>

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
                        required: true,
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
                        required: true,
                        message: "Please input new password!",
                      },
                    ]}
                  >
                    <Input.Password
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      icon={<SyncOutlined spin />}
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
