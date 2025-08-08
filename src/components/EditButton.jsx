import { Button } from "antd"
import { Edit } from "lucide-react";

const EditButton = ({ onClick }) => {
    return <Button
        variant="link"
        className="border-0 p-0 bg-transparent hover:to-blue-600 hover:underline focus:outline-0"
        onClick={onClick}
        // disabled={!data}
    >
        <Edit size={15}/>
    </Button>
}

export default EditButton;