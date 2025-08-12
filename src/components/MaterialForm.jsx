import { Button, Form, Radio, Space } from "antd";
import { useEffect, useRef, } from "react";
import CommonForm from "./material/commonform";
import SendForm from "./material/SendForm";
import ReceiveForm from "./material/ReceiveForm";
import dayjs from "dayjs";
import { useParams } from "react-router";

const MaterialForm = ({ form, handleFormSubmit, handleModalCancel, handleVendorSelect, isFormSubmitting }) => {
    const ref = useRef(new Date());
     const {transtype } = useParams();

     useEffect(() => {
        form.setFieldValue('transactionType', transtype)
     }, [transtype])
     
    return (
        <Form
            form={form}
            layout="vertical"
            name="add_material_form"
            onFinish={handleFormSubmit}
            initialValues={{
                type: 'internal',
                transactionType: transtype,
                inDate: dayjs(ref.current),
                outDate: dayjs(ref.current)

            }} // Default type
        >

            {/* <Col span={12}> */}
            <Form.Item
                name="transactionType"
                label="Transaction Type"
                layout="horizontal"
                rules={[{ required: true, message: 'Please select transaction type!' }]}
            >
                <Radio.Group style={{ justifyContent: "space-between" }}>
                    <Radio value="receive">Receive</Radio>
                    <Radio value="send">Send</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item shouldUpdate={(prev, curr) => prev.transactionType !== curr.transactionType} >
                {({ getFieldValue }) => {
                    return <div className="grid grid-cols-2 gap-4">
                        {getFieldValue('transactionType') == "send" ? (
                            <SendForm
                                form={form}
                                handleVendorSelect={handleVendorSelect}
                            />
                        ) : (
                            <ReceiveForm
                                form={form}
                                handleVendorSelect={handleVendorSelect}
                            />
                        )}
                        <CommonForm />
                    </div>
                }}
            </Form.Item>

            <Form.Item style={{ marginTop: 20, width: '100%', textAlign: "center" }}>
                <Space>
                    <Button type="default" onClick={handleModalCancel}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" loading={isFormSubmitting}>
                        Submit
                    </Button>
                </Space>
            </Form.Item>
        </Form >
    )

}
export default MaterialForm;



