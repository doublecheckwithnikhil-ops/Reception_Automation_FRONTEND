import { Button, Modal, Typography } from "antd"
import { Delete, Trash } from "lucide-react";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useState } from "react";

const { Text } = Typography;
const { confirm } = Modal;

const DeleteButton = ({ onClick }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return <>
        <Button
            variant="link"
            className="border-0 p-0 bg-transparent hover:to-blue-600 hover:underline focus:outline-0"
            onClick={() => setIsModalOpen(true)}
        // disabled={!data}
        >
            <Trash size={15} />
        </Button>
        {/* {contextHolder} */}
        <Modal
            open={isModalOpen}
            title={
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <ExclamationCircleOutlined style={{ color: "#faad14", fontSize: 20 }} />
                    Delete Item
                </span>
            }
            centered
            onCancel={() => setIsModalOpen(false)}
            footer={[
                <Button key="cancel" onClick={() => setIsModalOpen(false)}>
                    Cancel
                </Button>,
                <Button
                    key="delete"
                    type="primary"
                    danger
                    onClick={() => onClick()}
                >
                    Delete
                </Button>,
            ]}
        >
            <Text>Are you sure you want to delete this item? This action cannot be undone.</Text>
        </Modal>
    </>
}

export default DeleteButton;