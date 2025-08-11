import { Select } from "antd";
import { useGetAllEmployees } from "../apis/employee";
import React, { useMemo, useState } from "react";

const { Option } = Select;

const EmployeeList = React.memo(({ placeholder, ...rest }) => {
    
    const [searchTerm, setSearchTerm] = useState("");
    const { data , isLoading: isEmployeeLoading } = useGetAllEmployees(
        {
            searchTerm,
            pageNumber: 1,
            pageSize: 1000
        }
    );

    const allEmployees = useMemo(() => data, [data])

    return (
        <Select
            placeholder={placeholder || "Select Employee"}
            showSearch
            allowClear
            filterOption={(input, option) =>
                (option?.children ?? '')?.join("")?.toLowerCase().includes(input.toLowerCase())
            }
            {...rest}
        >
            {allEmployees.map(emp => (
                <Option key={emp.id} value={`${emp.id}_${emp.name}_${emp.ecode}`}>
                    {emp.name} ({emp.ecode})
                </Option>
            ))}
        </Select>
    );
});

export default EmployeeList;