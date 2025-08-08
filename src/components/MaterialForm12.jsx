import { Button, Col, Form, Input, Radio, Select, Space } from "antd";
import { employeeList } from "../utils/constant";
import { useEffect, useMemo, useState } from "react";
import CommonForm from "./material/commonform";
import SendForm from "./material/SendForm";
import ReceiveForm from "./material/ReceiveForm";
import { getAllEmployees } from './../apis/employee';
import InitialStep from "./material/InitialStep";

const { Option } = Select;
const { TextArea } = Input;

const MaterialForm = ({ form, handleFormSubmit, handleModalCancel, handleVendorSelect, isFormSubmitting }) => {
    const [step, setStep] = useState(1)
    const transactionType = Form.useWatch('transactionType', form);
    const type = Form.useWatch('type', form);

    return (
        <Form
            form={form}
            layout="vertical"
            name="add_material_form"
            onFinish={handleFormSubmit}
            initialValues={{ type: 'vendor', transactionType: "Receive" }} // Default type
        >

            {
                step == 1 &&
                <InitialStep />
            }
            {step == 2 && <div className="grid grid-cols-2 gap-4">
                {
                    transactionType === "Send" ?
                        (
                            <SendForm
                                form={form}
                                handleVendorSelect={handleVendorSelect}
                            />
                        ) : (
                            <ReceiveForm
                                form={form}
                                handleVendorSelect={handleVendorSelect}
                            />
                        )
                }

                <CommonForm />
            </div>}

            {/* </Col> */}
            {/* <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item> */}

            {step == 1 && <Form.Item style={{ marginTop: 20, width: '100%', textAlign: "center" }}>
                <Space>
                    <Button type="default" onClick={handleModalCancel}>
                        Cancel
                    </Button>
                    <Button type="primary" onClick={() => setStep(2)}>
                        Next
                    </Button>
                </Space>
            </Form.Item>}
            {step == 2 && <Form.Item style={{ marginTop: 20, width: '100%', textAlign: "center" }}>
                <Space>
                    <Button type="default" onClick={() => setStep(1)}>
                        Prev
                    </Button>
                    <Button type="primary" htmlType="submit" loading={isFormSubmitting}>
                        Submit
                    </Button>
                </Space>
            </Form.Item>}
        </Form>
    )

}
export default MaterialForm;



