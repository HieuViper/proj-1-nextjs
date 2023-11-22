"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useState } from "react";
import { Axios } from "axios";
const LoginForm = (props) => {
  const [err, setErr] = useState('');

  const onFinish = async (values) => {

    //proccess login
    await props.login( values.username, values.password ).then( ( message ) => {
      if ( message ) setErr(message);
    } );
    // try {
      //  await fetch(
      //     '/api/login',
      //     {
      //         method: 'POST',
              // headers: {
              //     'X-RapidAPI-Key': 'your-rapidapi-key',
              //     'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com',
              // },
              // cache: 'no-store',  //'force-cache' | 'no-store'
              // next: { revalidate: false | 0 | number, tags: ['collection'] },

          //     body: JSON.stringify({ username: values.username,
          //             password: values.password,
          //       }),
          // }
      // );


    //   console.log('come here after fetching');
    //   message = res.ok ? await res.json() : null;
    //   console.log('message from Login form:', message);
    //   if( message )
    //       setErr( 'error from post login:' + message.msg )
    // }
    // catch (error) {
    //     console.log('error when fetching:', error.message);
    //     setErr( 'error when fetching:' + error.message );
    // }
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
      <div>{err}</div>
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

export default LoginForm;
