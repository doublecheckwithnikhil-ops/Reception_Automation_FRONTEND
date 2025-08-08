import { Form, Select, Input, DatePicker } from "antd";
import EmmployeeList from "../employeeList";
import VendorInput from "../../pages/VendorInput";
import { disableFutureDates } from "../../utils/utils";
import React from "react";

const { Option } = Select;
const TextArea = Input.TextArea;

const SendForm = React.memo(({ form, handleVendorSelect }) => {
    const type = Form.useWatch('type', form);

    return (
        <>
            <Form.Item
                name="outDate"
                label="Send Date"
            >
                <DatePicker placeholder="Enter Date "  className="w-full"  disabledDate={disableFutureDates}/>
            </Form.Item>
            <Form.Item
                name="type"
                label="Type sender"
                rules={[{ required: true, message: 'Please select a type!' }]}
            >
                <Select placeholder="Select type">

                    <Option value="internal">Internal</Option>
                    <Option value="vendor">Vendor</Option>
                </Select>
            </Form.Item>

            {/* Conditional Sender Name Input */}
            {type == 'vendor' ? (
                <>
                    <Form.Item
                        name="receiverIdIndex"
                        label="Vendor Name sender"
                        rules={[{ required: true, message: 'Please enter a vendor!' }]}
                    >
                        <VendorInput onChange={handleVendorSelect} />

                    </Form.Item>
                    <Form.Item name="receiverName" hidden>
                        <input />
                    </Form.Item>
                    <Form.Item name="receiverId" hidden>
                        <input />
                    </Form.Item>
                    <Form.Item
                        name="receiverAddress"
                        label="Address sender"

                    >
                        <TextArea rows={2} readOnly placeholder="Enter address or it will auto-populate" />
                    </Form.Item>
                    <Form.Item
                        name="receiverContactNo"
                        label="Contact sender"
                    // rules={[{ required: true, message: 'Please enter the address!' }]}
                    >
                        <Input readOnly placeholder="Enter contact or it will auto-populate" />
                    </Form.Item>
                </>
            ) : (

                <>
                    <Form.Item
                        name="receiverName"
                        label="Receiver Name sender"
                    // rules={[{ required: true, message: 'Please enter Receiver name!' }]}
                    >
                        <EmmployeeList placeholder="Receiver Employee Name" />
                    </Form.Item>
                    <Form.Item
                        name="receiverAddress"
                        label="Address sender"
                    // rules={[{ required: true, message: 'Please enter the address!' }]}
                    >
                        <TextArea rows={2} placeholder="Enter address or it will auto-populate" />
                    </Form.Item>
                    <Form.Item
                        name="receiverContactNo"
                        label="Receiver Contact sender"
                        rules={[
                            { required: true, message: 'Please enter the address!' },
                            {
                                pattern: /^\d{10}$/, // Regex for exactly 10 digits
                                message: 'Please enter a 10-digit mobile number!',
                            },
                        ]}
                    >
                        <Input placeholder="Enter contact or it will auto-populate" />
                    </Form.Item>
                </>
            )}
            {/* Receiver at Reception */}
            {/* <Form.Item
                name="employeeAtReception"
                label="Send By"
            // rules={[{ required: true, message: 'Please select employee at reception!' }]}
            >
                <EmmployeeList placeholder="Send by ( Employee Name )" />
            </Form.Item> */}
            <Form.Item
                name="senderName"
                label="Sender Name sender"
                rules={[{ required: true, message: 'Please enter Receiver/Sender Employee!' }]}
            >
                <EmmployeeList placeholder="Sender Name" />
            </Form.Item>
            <Form.Item
                name="sendThrough"
                label="Send Through sender"
                rules={[{ required: true, message: `Please select Send Through!` }]}
            >
                <Select placeholder="Select method">
                    <Option value="Courier">Courier</Option>
                    <Option value="Porter">Porter</Option>
                    {/* <Option value="Porter">Porter</Option> */}
                    <Option value="By Hand">By Hand</Option>
                    <Option value="Self">Vehicle</Option>
                </Select>
            </Form.Item>
        </>
    );
});

export default SendForm;