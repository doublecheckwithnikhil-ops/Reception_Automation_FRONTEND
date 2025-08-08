import { Button, Modal } from "antd"
import { Delete, Trash } from "lucide-react";
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const DeleteButton = ({ onClick }) => {
    const [modal, contextHolder] = Modal.useModal();

    const handleDelete = () => {
        modal.confirm({
            title: 'Are you sure you want to delete this item?',
            icon: <ExclamationCircleOutlined  />,
            content: 'This action cannot be undone.',
            okText: 'Yes, delete it',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: () => {
                console.log('Item deleted');
                onClick();
                // your async delete logic here
            },
            onCancel() {
                console.log("cancelled it ")
                // Call your delete API here
            }
        });
    };



    return <>
        <Button
            variant="link"
            className="border-0 p-0 bg-transparent hover:to-blue-600 hover:underline focus:outline-0"
            onClick={handleDelete}
        // disabled={!data}
        >
            <Trash size={15} />
        </Button>
        {contextHolder}
    </>
}

export default DeleteButton;