import { Button, Form, Input, Space } from "antd";
import TextArea from "antd/es/input/TextArea";

const VendorForm = ({ handleModalCancelNewVendor, isPending}) => {
    return (
        <>
            <Form.Item
                name="newVendorName"
                label="Vendor Name"
                rules={[{ required: true, message: `Please enter vendor name` }]}
            >
                <Input placeholder="Enter Vendor Name" />
            </Form.Item>

            {/* Weight Or Count */}
            <Form.Item
                name="newVendorAddress"
                label="Vendor Address"
                rules={[{ required: true, message: `Please enter vendor address` }]}
            >
                <TextArea rows={2} placeholder="Enter Address" />

            </Form.Item>
            <Form.Item
                name="newVendorContact"
                label="Vendor Contact Number"
                rules={[{ required: true, message: `Please enter vendor contact` },
                {
                    pattern: /^\d{10}$/, // Regex for exactly 10 digits
                    message: 'Please enter a 10-digit mobile number!',
                },
                ]}
            >
                <Input placeholder="Enter Contact Number" />
            </Form.Item>
            <Form.Item style={{ marginTop: 20, width: '100%', textAlign: "center" }}>
                <Space>

                    <Button type="default" onClick={handleModalCancelNewVendor} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" loading={isPending}>
                        Submit
                    </Button>
                </Space>
            </Form.Item>
        </>
    )
}

export default VendorForm;