import { Spin } from "antd";

const loading = () => {
  return <div className="flex justify-center items-center"><Spin tip="Loading..." /></div>;
};

export default loading;
