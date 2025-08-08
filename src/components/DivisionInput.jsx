import { Select } from "antd";
import { useGetDivisions } from "../apis/division";
const { Option } = Select;

const options = ["Mens", "Womens", "Kids"];

const DivisionInput = ({  ...rest }) => {
    const { data: divisionList, isLoading: isDivisionLoading } = useGetDivisions();
    return (
        <Select
            placeholder="Select division"
            showSearch
            filterOption={(input, option) =>
                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
            }
            {...rest}
        >
            {divisionList.length > 0 ?
                divisionList.map((v) => <Option key={v.id} value={v.id}>{v.division}</Option>)
                : null
            }
        </Select>
    )
}

export default DivisionInput;