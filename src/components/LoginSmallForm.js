"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useState } from "react";
import { Axios } from "axios";



const LoginSmallForm = (props) => {
  const { setLoginForm } = props;
  const [err, setErr] = useState('');


  const onFinish = async (values) => {

    //proccess login
    // await props.login( values.username, values.password ).then( ( message ) => {
    //   if ( message ) setErr(message);
    // } );
    const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username: values.username, password: values.password }),
    });
    if( res.status == 401 ) {
      let msg2 = await res.json();
      console.log('Login message:', msg2);
      setErr( msg2.msg );
    }
    if( res.status == 200 ) {
      setLoginForm( false );
    }
  };

  return (

    <Form
      name="login"
      className=""
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <div class="text-red-500 font-bold">{err}</div>
      <Form.Item
        name="username"
        rules={[
          {
            required: "true",
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: "true",
            message: "Please input your Password!",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
          autoComplete="true"
        />
      </Form.Item>
      <Form.Item>
        <div className="flex justify-between">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="#" href={null}>
            Forgot password
          </a>
        </div>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          Login
        </Button>
      </Form.Item>

    </Form>
  );
};

export default LoginSmallForm;
