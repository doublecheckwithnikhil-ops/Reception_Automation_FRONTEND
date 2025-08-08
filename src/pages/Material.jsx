import {
    Table,
    Button,
    Space,
    message,
    Input,
    Select,
    Typography,
    Modal,
    Form,
    InputNumber,
    Radio,
    Switch,
    Card,
} from 'antd';

import { CloseOutlined, SearchOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title } = Typography;
const { TextArea } = Input;

import Template from "../template/template";
import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { employeeList } from '../utils/constant';
// import MaterialForm from '../components/MaterialForm';
const MaterialForm = React.lazy(() => import('../components/MaterialForm'))
import { useCreateVendor, useGetVendorList } from '../apis/vendor';
import { useCreateSendMaterial, useGetSendMaterials } from '../apis/sendMaterial';
import { useCreateReceiveMaterial, useGetReceiveMaterials } from '../apis/receiveMaterial';
import VendorForm from '../components/VendorForm';
import ViewDetailButton from '../components/ViewDetailButton';
import { getFormatedDate, getFormatedTime } from '../utils/utils';
import { useAppContext } from '../context/AppContext';
import { Helmet } from 'react-helmet';
import EditButton from '../components/EditButton';
import { RefreshCwOff } from 'lucide-react';
import dayjs from 'dayjs';
import MaterialDetailView from '../components/MaterialDetailView';
import PageTitle from '../components/PageTitle';
// import MaterialForm from './../components/MaterialForm12';

// Initial dummy material data (empty for now, but ready for future additions)
const initialMaterials = [];

// Columns for the Material Table

const Material = () => {
    const [rowId, setRowId] = useState(null);
    // const [materials, setMaterials] = useState(initialMaterials);SS
    const [filteredMaterials, setFilteredMaterials] = useState(initialMaterials);
    const [isSend, setIsSend] = useState(false);
    const [isInternal, setIsInternal] = useState(false);
    const [initialFormData, setInitialFormData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        search: '',
        type: undefined,
    });
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isModalNewVendor, setIsModalNewVendor] = useState(false);

    const columns = [
        {
            title: 'Date',
            dataIndex: 'createdOn',
            key: 'date',
            render: getFormatedDate

        },
        // {// send/Receive 
        //     title: 'Time',
        //     dataIndex: 'createdOn',
        //     key: 'date',
        //     render: getFormatedTime

        // },// send/Receive 
        { title: 'Type', dataIndex: 'type', key: 'type' },
        { title: 'Sender Name', dataIndex: 'senderName', key: 'senderName' },
        // { title: 'Receptionist', dataIndex: 'reception', key: 'atReception' },

        { title: 'Receiver Name', dataIndex: 'receiverName', key: 'receiverName' },
        { title: 'Medium', dataIndex: 'sendThrough', key: 'sendThrough' },
        // { title: 'Address', dataIndex: 'reciverAddress', key: 'reciverAddress' },
        // { title: 'Consignment No', dataIndex: 'consignmentNo', key: 'consignmentNo' },
        // { title: 'Weight/Count', dataIndex: 'weightOrCount', key: 'weightOrCount' },
        { title: 'Division', dataIndex: 'division', key: 'division' },
        // { title: 'Gate Pass No', dataIndex: 'gatePassNumber', key: 'gatePassNumber' },
        // { title: 'Material Description', dataIndex: 'materialDescription', key: 'materialDescription' },
        // { title: 'Bill/Challan No', dataIndex: 'billOrChallanNumber', key: 'billOrChallanNumber' },
        // { title: 'Person Detail', dataIndex: 'personDetail', key: 'personDetail' },
        // { title: 'Vehicle Detail', dataIndex: 'vehicleDetail', key: 'vehicleDetail' },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (text, row) => (
                <div className='flex justify-between w-9'>
                    <ViewDetailButton data={row}  title={`Courier ${row.status}`}><MaterialDetailView data={row}/></ViewDetailButton>
                    <EditButton onClick={() => handleEditTransction(row, isSend, true,)} />
                </div>)
        },
    ];

    const [columnsState, setColumns] = useState(columns)

    const [form] = Form.useForm();
    const [formNewVendor] = Form.useForm();

    const { checkUserIsLogin, user } = useAppContext();

    const empty = useMemo(() => [], []);
    // const isSkip = useMemo(() => !isSend, [isSend]);
    /* SEND MATERIAL APIS */
    const { data: sendMaterials = empty, isLoading: isGetSendMaterialLoading } = useGetSendMaterials(isSend);
    const { mutate: sendMatrialTransction, isPending: isPostSendMaterialLoading } = useCreateSendMaterial();
    /* RECEIVE MATERIAL APIS */
    const { data: receiveMaterial = empty, isGetReceiveMaterialLoading } = useGetReceiveMaterials(!isSend);
    const { mutate: receiveMatrialTransction, isPending: isPostReceiveMaterialLoading } = useCreateReceiveMaterial();

    const { mutate: createVendor, isLoading: isCreating, error: createError } = useCreateVendor();
    const { data: vendorList = empty, isLoading: isLoadingVendor } = useGetVendorList();

    const materials = useMemo(() => {

        return isSend ? sendMaterials : receiveMaterial;
    }, [isSend, sendMaterials, receiveMaterial]);

    const type = Form.useWatch('type', form);

    const transactionType = Form.useWatch('transactionType', form);

    const recieverName = Form.useWatch('receiverName', form);
    const senderName = Form.useWatch('senderName', form);

    const handleEditTransction = (row, isSend, isUpdate = false) => {
        if (!user) {
            checkUserIsLogin();
        } else {
            if (isUpdate) {
                setRowId(row.id)
            }

            let transactionType,
                receiverName,
                receiverNameFromReception,
                senderIdIndex,
                senderName,
                receiverIdIndex;

            const isSendStatus = row.status === "Sent";
            if (!isSendStatus) {
                transactionType = "receive";
                const { pickedByCode,
                    pickedById,
                    pickedByName,
                    receiverCode,
                    receiverId,
                    receiverName: Rname,
                    senderId,
                    senderName: Sname,
                    senderCode
                } = row;
                receiverName = [receiverId, Rname, receiverCode].join("_")
                receiverNameFromReception = [pickedById, pickedByName, pickedByCode].join("_");
                if (row.type == "vendor") {
                    senderIdIndex = vendorList.findIndex(v => v?.vendorContactNumber?.includes(row.senderContactNo));
                } else {
                    senderName = [senderId, Sname, senderCode].join("_");
                }
            } else {
                // send
                transactionType = "send";
                const { pickedByCode,
                    pickedById,
                    pickedByName,
                    receiverCode,
                    receiverId,
                    receiverName: Rname,
                    senderId,
                    senderName: Sname,
                    senderCode
                } = row;
                senderName = [senderId, Sname, senderCode].join("_")
                // receiverNameFromReception = [pickedById, pickedByName, pickedByCode].join("_");
                if (row.type == "vendor") {
                    receiverIdIndex = vendorList.findIndex(v => v?.vendorContactNumber?.includes(row.receiverContactNo));


                } else {
                    receiverName = [receiverId, Rname, receiverCode].join("_")
                }
            }

            // const {
            //     concernedPersonEcode,
            //     concernedPersonId,
            //     concernedPersonName,
            // } = row;
            // const concernedPersonNameGroup = [concernedPersonId, concernedPersonName, concernedPersonEcode].join("_");
            const init = {
                ...row,
                senderIdIndex,
                receiverIdIndex,
                transactionType,
                receiverName,
                receiverNameFromReception,
                outDate: dayjs(row.outDate),
                inDate: dayjs(row.inDate)
            };

            form.setFieldsValue(init)
            setIsModalVisible(true)
            setInitialFormData(init)

        }
    }

    useEffect(() => {
        const isVendor = type == "vendor";
        const isSendT = transactionType == "send";
        const secondEntity = isSendT ? recieverName : senderName;
        const isOther = isVendor ? secondEntity == "other" : false;

        if (isOther) {
            setIsModalNewVendor(true)
        }
    }, [transactionType, type, recieverName, senderName])

    // Effect to re-filter data whenever the filters or initial data change
    useEffect(() => {
        let newFilteredData = materials;

        // Filter by search term (e.g., material description, consignment no)
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            newFilteredData = newFilteredData.filter(material =>
                // (material.materialDescription?.toLowerCase().includes(searchTerm)) ||
                // (material.consignmentNo?.toLowerCase().includes(searchTerm))
                JSON.stringify(material).toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by type
        if (filters.type) {
            newFilteredData = newFilteredData.filter(material => material.type === filters.type);
        }

        setFilteredMaterials(newFilteredData);
    }, [filters, materials]);

    // Function to open the Add New Material modal
    const handleAddData = () => {
        const key = 'message';

        if (!user) {
            checkUserIsLogin();
        } else {

            setIsModalVisible(true);
            form.resetFields(); // Clear form fields when opening
            form.setFieldsValue({ type: 'vendor' }); // Set default type to Vendor
        }
    };

    // Function to handle form submission
    const handleFormSubmit = (values) => {
        const key = "material-loading"
        messageApi.open({
            key,
            type: 'loading',
            content: 'Submitting...',
        });

        console.log('Received values of form: ', values);

        const isReceiveTransction = transactionType == "receive";
        const isSendTransction = transactionType == "send";
        const isVendorType = type == "vendor";
        const isInternal = !isVendorType;

        let receiverId, receiverName, receiverCode,
            senderId, senderName, senderCode,
            pickedByName, pickedByCode, pickedById;

        if (isInternal) {
            [receiverId, receiverName, receiverCode] = values?.receiverName?.split('_');
            [senderId, senderName, senderCode] = values?.senderName?.split('_');

        }
        else if (isVendorType && isReceiveTransction) {
            [receiverId, receiverName, receiverCode] = values?.receiverName?.split('_');
            senderName = values.senderName;
            senderId = +values.senderId
        } else if (isVendorType && isSendTransction) {
            [senderId, senderName, senderCode] = values?.senderName?.split('_');
            receiverName = values.receiverName;
            receiverId = +values.receiverId
        }

        if (isReceiveTransction) {
            if (values?.receiverNameFromReception) {
                [pickedById, pickedByName, pickedByCode] = values?.receiverNameFromReception?.split('_');
            } else {
                [pickedById, pickedByName, pickedByCode] = values?.receiverName?.split('_');
            }
        }

        const user = JSON.parse(sessionStorage.getItem("employess"))

        const objForm = {
            // employeeAtReception: "Receptionist",
            receiverName,
            senderName,
            senderId: (+senderId),
            senderCode,
            receiverCode,
            receiverId: (+receiverId),
            employeeAtReception: user?.id,
            reciverCode: receiverCode,
            reciverId: (+receiverId),
            reciverName: receiverName,
            reciverAddress: values.receiverAddress,
            pickedByName,
            pickedByCode,
            pickedById,
        }

        const wholeForm = { ...values, ...objForm }
        // return false; 
        const isNew = !rowId;

        if (isSendTransction) {
            const send = isNew ? sendMatrialTransction : sendMatrialTransction;
            send({ ...values, ...objForm }, {

                onSuccess: () => {

                    setIsModalVisible(false); // Close the modal
                    form.resetFields();
                    // let key = 'matrial-send-success';
                    messageApi.open({
                        key,
                        type: 'success',
                        content: 'Submitted Successfully',
                    });
                },
                onError: () => {
                    // let key = 'matrial-send-error';
                    messageApi.open({
                        key,
                        type: 'error',
                        content: 'Something went Wrong! Please Try Again',
                    });
                }
            })
        }
        else {
            const receive = isNew ? receiveMatrialTransction : receiveMatrialTransction;
            receive({ ...values, ...objForm }, {
                onSuccess: () => {
                    setIsModalVisible(false); // Close the modal
                    form.resetFields();
                    // let key = 'matrial-receive-success'
                    // setTimeout(() => {

                    messageApi.open({
                        key,
                        type: 'success',
                        content: 'Submitted Successfully',
                    });
                    // }, 3000);
                },
                onError: () => {
                    // let key = 'matrial-receive-error'
                    messageApi.open({
                        key,
                        type: 'error',
                        content: 'Something went Wrong! Please Try Again',
                    });
                }
            })
        }

        // For demonstration, add a new material to the list
        // setMaterials(prevMaterials => [...prevMaterials, newMaterial]);
    };

    // Function to handle modal cancellation
    const handleModalCancel = () => {
        setIsModalVisible(false);
        form.resetFields(); // Optional: reset fields on cancel
    };

    const handleFilterChange = (key, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value?.trim(),
        }));
    };


    // Callback for when Sender Name (vendor) is selected
    const sender = ["senderName", "senderAddress", "senderContactNo", "senderId", "senderIdIndex"];
    const receiver = ["receiverName", "receiverAddress", "receiverContactNo", "receiverId", "receiverIdIndex"];

    const handleVendorSelect = useCallback((vendorOrIndex) => {
        message.success('Material entry added successfully!');
        const [name, address, contact, id, indexkey] = transactionType == 'send' ? receiver : sender;
        // const selectedVendor = vendorList.find(v => v.id === (vendor.vendorId || vendor )|| vendor?.vendorContactNumber == v.vendorContactNumber);
        const index = (vendorOrIndex?.vendorContactNumber && -1) || vendorOrIndex;
        const selectedVendor = (!isNaN(index)) && vendorList.at(index);
        if (selectedVendor) {
            form.setFieldsValue({
                [name]: selectedVendor.vendorName,
                [address]: selectedVendor.vendorAddress,
                [contact]: selectedVendor.vendorContactNumber,
                [id]: selectedVendor.id
            });

            if (index == -1) {
                form.setFieldsValue({ [indexkey]: vendorList.length - 1 });
            }
        } else {
            form.setFieldsValue({
                [name]: vendor?.vendorName || "",
                [address]: vendor?.vendorAddress || "",
                [contact]: vendor?.vendorContactNumber || "",
                [id]: vendor.id
            }); // Clear address if no vendor selected or invalid
        }
    }, [transactionType, vendorList, form]);


    useEffect(() => {
        const mediumSendColumn = { title: 'Medium', dataIndex: 'sendThrough', key: 'sendThrough' };
        const mediumReceiveColumn = { title: 'Medium', dataIndex: 'receiveThrough', key: 'receiveThrough' };
        const medium = isSend ? mediumSendColumn : mediumReceiveColumn
        columnsState.splice(4, 1, medium)
        setColumns([...columnsState]);
    }, [isSend])

    const materialProps = {
        // title: "Material Management",
        columns: columnsState,
        openForm: () => setIsModalVisible(true),
        AddNewLabel: "Add Material Transction"
    }

    const handleFormSubmitNewVendor = values => {
        const formobj = {
            vendorName: values?.newVendorName,
            // category: '',
            // status: 'Active',
            vendorAddress: values?.newVendorAddress,
            vendorContactNumber: values?.newVendorContact,
            createdBy: "Admin",
        }

        createVendor(formobj, {
            onSuccess: (data) => {
                console.log("successfully submitted", data)
                const sender = ["senderName", "senderAddress", "senderContactNo"];
                const receiver = ["receiverName", "receiverAddress", "receiverContactNo"]

                message.success('Material entry added successfully!');
                const [name, address, contact] = transactionType == 'Send' ? receiver : sender;
                form.setFieldValue(name, values?.newVendorName)
                form.setFieldValue(address, values?.newVendorAddress)
                form.setFieldValue(contact, values?.newVendorContact)

                setIsModalNewVendor(false); // Close the modal
                formNewVendor.resetFields();
            },
            onError: () => {
                console.log("error got");
            }
        });
    }

    const handleModalCancelNewVendor = () => {
        setIsModalNewVendor(false);
        form.resetFields(); // Optional: reset fields on cancel
    };

    const isFormSubmitting = isPostReceiveMaterialLoading || isPostSendMaterialLoading;

    return (
        <>
            {contextHolder}
            <Helmet>
                <title>Courier Detail</title>
            </Helmet>
            <Space style={{ marginBottom: 16 }} className=' flex w-full justify-between' >
                <PageTitle>Courier Management</PageTitle>
                <Button onClick={handleAddData} className='bg-white border !border-gray-800 text-gray-700 hover:!bg-gray-800 hover:!text-white hover:!ring-0'>
                    Add Courier Transaction
                </Button>
            </Space>

            {/* Filter Container */}
            <div style={{ marginBottom: 16 }} className='grid grid-cols-3'>
                <Input
                    placeholder="Search by info"
                    prefix={<SearchOutlined />}
                    style={{ width: 300 }}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    allowClear
                />
                {/* <Space> 
                    <Switch 
                        unCheckedChildren="Internal" 
                        checkedChildren="Vendor" 
                        defaultChecked 
                        size='50'
                        onChange={(checked) => handleFilterChange('type', checked ? 'Vendor' : 'Internal')} 
                    />
                    <Switch 
                        unCheckedChildren="Send" 
                        checkedChildren="Receive" 

                        defaultChecked 
                        onChange={(checked) => form.setFieldValue("transactionType", checked ? "Receive" : "Send")} 
                    /> */}
                {/* <Select
                        placeholder="Select Category"
                        style={{ width: 200 }}
                        onChange={(value) => handleFilterChange('category', value)}
                        value={filters.category}
                        allowClear
                        showSearch // Enables searching within the dropdown
                    >
                        <Option value="Electronics">Electronics</Option>
                        <Option value="Handicrafts">Handicrafts</Option>
                        <Option value="Software">Software</Option>
                    </Select> */}
                {/* </Space> */}

                <Radio.Group
                    defaultValue="a"
                    buttonStyle="solid"
                    onChange={({ target }) => setIsSend(target.value == "send")}
                    value={isSend ? "send" : "receive"}

                >
                    <Radio.Button value="receive">Receive</Radio.Button>
                    <Radio.Button value="send">Send</Radio.Button>
                </Radio.Group>

                {/* <Switch
                    unCheckedChildren="Receive"
                    className='w-24 '
                    // unCheckedChildren={() => <span className='bg-black text-white'>RECEIVER</span>}
                    checkedChildren="Send"
                    value={isSend}
                    defaultChecked
                    onChange={(checked) => {
                        setIsSend(checked);
                    }}
                /> */}
                {/* <Switch
                    // unCheckedChildren={() => <span className='bg-black text-white'>RECEIVER</span>}
                    unCheckedChildren="Vendor"
                    checkedChildren="Internal"
                    className='w-24'
                    value={isInternal}
                    defaultChecked
                    onChange={(checked) => {
                        setIsInternal(checked);
                    }}
                /> */}
            </div>
            <Template
                data={filteredMaterials || []}
                {...materialProps}
            />


            {isModalVisible && <Modal
                title="Add New Material Entry"
                open={isModalVisible}
                onCancel={handleModalCancel}
                footer={null}
                width={800} // Adjust modal width for better form layout
                className="top-7 "
            >
                <Card>
                    <Suspense fallback={<div className='h-screen flex justify-center items-center'>Loading form...</div>}>
                        <MaterialForm
                            {...{
                                form,
                                handleFormSubmit,
                                handleModalCancel,
                                handleVendorSelect,
                                isFormSubmitting
                            }}
                        />
                    </Suspense>
                </Card>
            </Modal>}
            <Modal
                title="Add New Vendor"
                open={isModalNewVendor}
                onCancel={handleModalCancelNewVendor}
                footer={null}
                width={500}
            >
                <Form
                    form={formNewVendor}
                    layout="vertical"
                    name="add_new_vendor_form"
                    onFinish={handleFormSubmitNewVendor}
                    initialValues={{ type: 'vendor', transactionType: "receive" }} // Default type
                >
                    <VendorForm handleModalCancelNewVendor={handleModalCancelNewVendor} />
                </Form>
            </Modal>
        </>

    )
}

export default Material;