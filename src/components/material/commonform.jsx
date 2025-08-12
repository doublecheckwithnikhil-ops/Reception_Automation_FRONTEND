import { AutoComplete, Form, Input, InputNumber, Select } from "antd";
import { useGetDivisions } from "../../apis/division";
import React, { useMemo } from "react";
import DivisionInput from "../DivisionInput";
import { CourierCompany } from "../../utils/constant";

const { Option } = Select;
const { TextArea } = Input;

const CommonForm = React.memo(() => {
    return (
        <>
            <Form.Item
                name="materialDescription"
                label="Material Description"
            >
                <Input placeholder="Enter material description (optional)" />
            </Form.Item>
            {/* Receiver at Reception */}
            <Form.Item
                name="divisionId"//change to divisionId
                label="Division"
                rules={[{ required: true, message: 'Please select a division!' }]}
            >
                <DivisionInput />
            </Form.Item>
            <Form.Item
                name="containerType"
                label="Container Type"
            // rules={[
            //     { 
            //         pattern: /^\d+$/, 
            //         message: 'Count must be digits only!' 
            //     }
            // ]}
            >
                <Select placeholder="Select type">
                    <Option value="beg">Bag(s)</Option>
                    <Option value="box">Box(es)</Option>
                    <Option value="packet">Packet(s)</Option>
                    <Option value="piece">Piece(s)</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="materialCount"
                label="Count"
                rules={[
                    {
                        pattern: /^\d+$/,
                        message: 'Count must be digits only!'
                    }
                ]}
            >
                <InputNumber placeholder="Enter weight or count (optional)" className="w-full" />
            </Form.Item>

            {/* Weight Or Count */}
            <Form.Item
                name="materialWeight"
                label="Weight (Kgs.)"
                rules={[
                    {
                        pattern: /^\d*\.?\d*$/,
                        message: 'Weight must be digits and optionally a dot!'
                    }
                ]}
            >
                <InputNumber placeholder="Enter weight or count (optional)" className="w-full" />
            </Form.Item>
            <Form.Item
                name="courierCompany"
                label="Courier Company"
            >
                <AutoComplete
                    options={CourierCompany}
                    placeholder="Enter purpose of visit"
                    filterOption={(inputValue, option) =>
                        option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                />
            </Form.Item>
            <Form.Item
                name="consignmentNo"
                label="Consignment No"
            >
                <Input placeholder="Enter consignment number (optional)" />
            </Form.Item>

            {/* Person Detail */}
            <Form.Item
                name="courierPersonDetails"
                label="Courier Person Detail"
            >
                <Input placeholder="Enter person detail (optional)" />
            </Form.Item>

            {/* Vehicle Detail */}
            <Form.Item
                name="vehicleDetails"
                label="Vehicle Detail"
            >
                <Input placeholder="Enter vehicle detail (optional)" />
            </Form.Item>

            <Form.Item
                name="gatePassNumber"
                label="Gate Pass Number"
            >
                <Input placeholder="Enter gate pass number (optional)" />
            </Form.Item>
            <Form.Item
                name="billOrChallanNumber"
                label="Bill Or Challan Number"
            >
                <Input placeholder="Enter bill or challan number (optional)" />
            </Form.Item>
            <Form.Item
                name="amount"
                label="Amount"
                rules={[
                    {
                        pattern: /^\d+$/,
                        message: 'Amount must be digits only!'
                    }
                ]}
            >
                <InputNumber placeholder="Enter Amount (optional)" className="w-full" />
            </Form.Item>
            {/* Bill Or Challan Number */}
            <Form.Item
                name="remarks"
                label="Remarks"
            >
                <Input placeholder="Enter bill or challan number (optional)" />
            </Form.Item>

        </>
    );
});

export default CommonForm;
