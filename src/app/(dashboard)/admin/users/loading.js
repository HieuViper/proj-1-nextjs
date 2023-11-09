import { Spin } from "antd";

const loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spin spinning={true} fullscreen />
    </div>
  );
};

export default loading;
