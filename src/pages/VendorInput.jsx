import { Form, message, Modal, Select } from "antd";
import { useCreateVendor, useGetVendorList } from "../apis/vendor";
import VendorForm from "../components/VendorForm";
import { useEffect, useState } from "react";
const { Option } = Select;

const VendorInput = ({ handleVendorSelect, ...rest }) => {
    const { data: vendorList, isLoading, isFetched, isFetching } = useGetVendorList();
    const [newVendor, setNewVendor] = useState(null);
    const { mutate: createVendor, isPending: isCreating, error: createError } = useCreateVendor();
    const [isModalNewVendor, setIsModalNewVendor] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const { value } = rest;
    const [formNewVendor] = Form.useForm();

    useEffect(() => {
        if (newVendor?.vendorContactNumber && (!isFetching)) {
            rest?.onChange(newVendor)
        }

    }, [newVendor, isFetching])

    useEffect(() => {
        if (value == "other") {
            setIsModalNewVendor(true)
        }
    }, [value])

    const handleModalCancelNewVendor = () => {
        setIsModalNewVendor(false);
        formNewVendor.resetFields();
    }

    const handleSubmit = (values) => {
        const key = "vendor-create"
        messageApi.open({
            key,
            type: 'loading',
            content: 'Submitting...',
        });
        const formobj = {
            vendorName: values?.newVendorName,
            // category: '',
            // status: 'Active',
            vendorAddress: values?.newVendorAddress,
            vendorContactNumber: values?.newVendorContact,
            createdBy: "Admin",
        }

        createVendor(formobj, {
            onSuccess: () => {
                messageApi.open({
                    key,
                    type: 'success',
                    content: 'Vendor Created Successfully',
                });
                console.log("sucessfully submitted ")
                console.log(" sucessfully isFetching is running ", { isFetched, isFetching });
                setNewVendor(formobj);
                setIsModalNewVendor(false);
                formNewVendor.resetFields();
                // rest?.onChange(formobj)
            },
            onError: () => {
                messageApi.open({
                    key,
                    type: 'error',
                    content: 'Something went Wrong! Please Try Again',
                });
            }
        })
    }

    return (
        <>
            {contextHolder}
            <Select
                placeholder="Select vendor"
                showSearch
                filterOption={(input, option) => {
                     const optText = (option?.children ?? '').toLowerCase()
                    return optText.includes(input.toLowerCase()) || optText.includes("add new")
                }}
                {...rest}
            >
                {vendorList.map((vendor, index) => (
                    <Option key={vendor.id} value={index}>
                        {vendor.vendorName}
                    </Option>
                ))}
                <Option key="other" value={"other"} children="Other">
                    Add New
                </Option>
            </Select>
            <Modal
                title="Add New Vendor"
                open={isModalNewVendor}
                onCancel={(handleModalCancelNewVendor)}
                footer={null}
                width={500}
            >
                <Form
                    form={formNewVendor}
                    layout="vertical"
                    name="add_new_vendor_form"
                    onFinish={handleSubmit}
                    initialValues={{ type: 'vendor', transactionType: "receive" }} // Default type
                >
                    <VendorForm
                        handleModalCancelNewVendor={handleModalCancelNewVendor}
                        isPending={isCreating}
                    />
                </Form>
            </Modal>
        </>
    )
}

export default VendorInput;