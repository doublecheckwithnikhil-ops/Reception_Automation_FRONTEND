import { Form, Select, Input, InputNumber, Checkbox, DatePicker } from "antd";
import EmmployeeList from "../employeeList";
import VendorInput from "../../pages/VendorInput";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { disableFutureDates } from "../../utils/utils";

const { Option } = Select;
const TextArea = Input.TextArea;

const ReceiveForm = React.memo(({ form, handleVendorSelect }) => {
    const type = Form.useWatch('type', form);
    const receiverName = Form.useWatch('receiverName', form);
    const receiverNameFromReception = Form.useWatch('receiverNameFromReception', form);
    const [isSame, setIsSame] = useState(false);
    // useEffect(() => {
    //     console.log(receiverName);
    //     const pick = isSame ? receiverName : "";
    //     console.log({ receiverName, pick });

    //     form.setFieldsValue({ receiverNameFromReception: pick, materialDescription: "test" })
    // }, [isSame, receiverName])

    // console.log({ receiverNameFromReception });
    // console.log({ receiverName: form.getFieldValue('receiverName') });


    return (
        <>
            <Form.Item
                name="inDate"
                label="Receive Date"
                rules={[{ required: true, message: 'Please enter date!' }]}
            >
                <DatePicker placeholder="Enter Date " className="w-full" disabledDate={disableFutureDates} />
            </Form.Item>
            <Form.Item
                name="type"
                label="Type"
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
                        name="senderIdIndex"
                        label="Vendor Name"
                        rules={[{ required: true, message: 'Please enter a vendor!' }]}
                    >
                        <VendorInput onChange={handleVendorSelect} />
                    </Form.Item>
                    <Form.Item name="senderName" hidden>
                        <input />
                    </Form.Item>
                    <Form.Item name="senderId" hidden>
                        <input />
                    </Form.Item>
                    <Form.Item
                        name="senderAddress"
                        label="Vendor Address"
                        rules={[{ required: true, message: 'Please sender Address!' }]}

                    >
                        <TextArea rows={2} readOnly placeholder="Enter address or it will auto-populate" />
                    </Form.Item>
                    <Form.Item
                        name="senderContactNo"
                        label="Vendor Contact"
                        rules={[{ required: true, message: 'Please sender contact!' }]}
                    >
                        <InputNumber readOnly placeholder="Enter contact or it will auto-populate" className="w-full" />
                    </Form.Item>
                </>
            ) : (

                <>
                    <Form.Item
                        name="senderName"
                        label="Sender Name"
                    rules={[{ required: true, message: 'Please enter Sender name!' }]}
                    >
                        <EmmployeeList placeholder="Sender (Employee Name)" />
                    </Form.Item>
                    <Form.Item
                        name="senderAddress"
                        label="Sender Address"
                    rules={[{ required: true, message: 'Please enter the address!' }]}
                    >
                        <TextArea rows={2} placeholder="Enter address or it will auto-populate" />
                    </Form.Item>
                </>
            )}
            {/* Receiver at Reception */}

            <Form.Item
                name="receiverName"
                label="Receiver"
                rules={[{ required: true, message: 'Please enter Receiver/Sender Employee!' }]}
            >
                <EmmployeeList placeholder="Receiver Employee Name" />
            </Form.Item>
            <Form.Item
                name="receiveThrough"
                label="Receive Through"
            // rules={[{ required: true, message: `Please select Receive Through!` }]}
            >
                <Select placeholder="Select method">
                    <Option value="Courier">Courier</Option>
                    <Option value="Porter">Porter</Option>
                    {/* <Option value="Porter">Porter</Option> */}
                    <Option value="By Hand">By Hand</Option>
                    <Option value="Self">Vehicle</Option>
                </Select>
            </Form.Item>
            <Form.Item shouldUpdate={(prev, curr) => isSame && prev.receiverName !== curr.receiverName}>
                {({ getFieldValue, setFieldValue }) => {
                    // console.log(getFieldValue('receiverNameFromReception'));
                    // setFieldValue("receiverNameFromReception", getFieldValue('receiverName'))
                    return (
                        <Form.Item
                            name="receiverNameFromReception"
                            label="Pick By"
                        // rules={[{ required: true, message: 'Please enter Receiver/Sender Employee!' }]}
                        >
                            <EmmployeeList placeholder="Pick By Employee Name" />
                            {/* {
                                isSame ?
                                    <EmmployeeList placeholder="Pick By Employee Name" value={getFieldValue('receiverName')} readOnly />
                                    :
                                    <EmmployeeList placeholder="Pick By Employee Name" />
                            }
                            <Checkbox checked={isSame} onChange={() => setIsSame(pre => !pre)}>Same as Receiver</Checkbox> */}
                        </Form.Item>
                    )
                }}
            </Form.Item>
        </>
    );
});

export default ReceiveForm;;