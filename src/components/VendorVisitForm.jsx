import { AutoComplete, Button, Col, Form, Input, Radio, Select, Space } from "antd";
import { useEffect, useMemo } from "react";
import EmployeeList from "./employeeList";
import DivisionInput from "./DivisionInput";
import VendorInput from "../pages/VendorInput";

const { Option } = Select;
const { TextArea } = Input;

const options = [
    { value: 'Meeting' },
    { value: 'Sample' },
];

const VendorVisitForm = ({ 
    form, 
    handleFormSubmit, 
    handleModalCancel, 
    handleVendorSelect, 
    isPending,
}) => {
    const transactionType = Form.useWatch('transactionType', form);
    const empty = useMemo(() => [], []);
    const type = Form.useWatch('type', form);

    // console.log("initial form data", { initialFormData });

    // useEffect(() => {
    //     return () => {
    //         form.reset
    //     }
    // })
    

    return (
        <Form
            form={form}
            layout="vertical"
            name="add_material_form"
            onFinish={handleFormSubmit}
            initialValues={{ isAppointment: 'yes', transactionType: "Receive" }} // Default type
        >

            {/* <Col span={12}> */}
            <Form.Item
                name="isAppointment"
                label="Appointment"
                layout="horizontal"
                rules={[{ required: true, message: 'Please select appointment!' }]}
            >
                <Radio.Group style={{ justifyContent: "space-between" }}>
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item name="vendorName" hidden >
                <input />
            </Form.Item>
            <Space direction="vertical" style={{ width: '100%' }} size="large" className="grid grid-cols-2">
                <Form.Item
                    name="officeLocation"
                    label="Office Location"
                    rules={[{ required: true, message: 'Please select a type!' }]}
                >
                    <Select placeholder="Select type">
                        <Option value="HO">H.O. </Option>
                        <Option value="oldHO">Old H.O.</Option>
                    </Select>
                </Form.Item>

                {/* Conditional Sender Name Input */}

                <Form.Item
                    name="vendorIdIndex"
                    label="Vendor Name"
                    rules={[{ required: true, message: 'Please enter a vendor!' }]}
                >
                    <VendorInput onChange={handleVendorSelect} />
                </Form.Item>

                <Form.Item
                    name="vendorContactNo"
                    label="Vendor's Contact Number"
                    rules={[
                        { required: true, message: 'Please enter the address!' },
                        {
                            pattern: /^[0-9]{10}$/,
                            message: 'Contact number must be 10 digits!'
                        }
                    ]}
                >
                    <Input placeholder="Enter contact Person Name" readOnly />
                </Form.Item>
                <Form.Item
                    name="vendorAddress"
                    label="Vendor's Adddress"
                // rules={[{ required: true, message: 'Please enter the address!' }]}
                >
                    <Input placeholder="Enter City " readOnly />
                </Form.Item>
                <Form.Item
                    name="vendorRepresentativeName"
                    label="Vendor's Contact Person Name"
                // rules={[{ required: true, message: 'Please enter the address!' }]}
                >
                    <Input placeholder="Enter contact or it will auto-populate" />
                </Form.Item>
                <Form.Item
                    name="divisionId"
                    label="Division"
                    rules={[{ required: true, message: 'Please select a division!' }]}
                >
                    <DivisionInput />
                </Form.Item>

                <Form.Item
                    name="concernedPersonNameGroup"
                    label="Concerned Person"
                    rules={[{ required: true, message: 'Please select Concerne Person' }]}
                >
                    <EmployeeList placeholder="Concerned Person (Employee Name)" />
                </Form.Item>
                <Form.Item
                    name="purposeOfVisit"
                    label="Purpose Of Visit"
                    rules={[{ required: true, message: 'Please enter Purpose of Visit' }]}
                >
                    <AutoComplete
                        // style={{ width: 200 }}
                        options={options}
                        placeholder="Enter purpose of visit"
                        filterOption={(inputValue, option) =>
                            option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                    />
                    {/* <Input placeholder="Enter contact or it will auto-populate" /> */}
                </Form.Item>
            </Space>
            <Form.Item style={{ marginTop: 20, width: '100%', textAlign: "center" }}>
                <Space>
                    <Button type="default" onClick={handleModalCancel} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" loading={isPending}>
                        Submit
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    )

}
export default VendorVisitForm;



