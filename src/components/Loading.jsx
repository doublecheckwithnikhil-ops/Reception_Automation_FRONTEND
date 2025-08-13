import { Spin } from "antd";

const Loading = () => {
    return <div className='absolute top-1/4 z-10  right-1/2'>
        <Spin tip="Loading" />
    </div>
}

export default Loading;