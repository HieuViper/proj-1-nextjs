import { Spin } from "antd";

const loading = () => {
    return (
        <div className="flex justify-center items-center">
            <Spin />
        </div>
    );
};

export default loading;
