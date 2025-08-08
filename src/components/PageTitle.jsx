import { Typography } from "antd";

const { Title } = Typography;

const PageTitle = ({ children }) => {
    return (
       <Title className="!text-3xl !font-medium" level={4}>{children}</Title>
    )
}

export default PageTitle;