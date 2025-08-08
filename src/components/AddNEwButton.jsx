import { Button } from "antd"
import { Copy } from "lucide-react";

const AddNewButton = ({ onClick }) => {
    return <Button
        variant="link"
        className="border-0 p-0 bg-transparent hover:to-blue-600 hover:underline focus:outline-0"
        onClick={onClick && onClick}
        // disabled={!data}
    >
       <Copy size={15}/>
    </Button>
}

export default AddNewButton;