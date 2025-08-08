import { Button, Card, Descriptions, Modal } from "antd";
import dayjs from "dayjs";
import { Eye, View } from "lucide-react";
import { useState } from "react";

const ViewDetailButton = ({ onClick, data, children, title }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    return (<>
        <Button
            variant="link"
            className="border-0 p-0 bg-transparent hover:to-blue-600 hover:underline focus:outline-0"
            onClick={() => setIsModalVisible(true)}
            disabled={!data}
        >
            <Eye size={15} />
        </Button>
        {isModalVisible && <Modal
            title={title}
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
            width={800} // Adjust modal width for better form layout
            className="top-1"
        >
           {children}
        </Modal>}
    </>)
}

export default ViewDetailButton;