import { useEffect, useMemo, useState } from "react";
import Template from "../template/template";
import { Button, Card, Form, Input, message, Modal, Space, Switch, Typography } from "antd";
import VendorVisitForm from "../components/VendorVisitForm";
import { useGetVendorList } from "../apis/vendor";
import { useCreateVendor } from "../apis/vendor";
import { useCreateVendorVisit, useDeleteVendorVisit, useGetVendorVisits, useUpdateVendorVisit, useUpdateVendorVisitOutTime } from "../apis/vendorVisit";
import ViewDetailButton from "../components/ViewDetailButton";
import { useAppContext } from "../context/AppContext";
import { Helmet } from "react-helmet";
import EditButton from "../components/EditButton";
import AddNewButton from "../components/AddNEwButton";
import { SearchOutlined } from '@ant-design/icons';
import { getFormatedTime } from "../utils/utils";
import OutTimeSwitch from "../components/outTimeSwitch";
import VendorVisitDetailView from "../components/VendorVisitDetailView";
import PageTitle from "../components/PageTitle";
import DeleteButton from "../components/DeleteButton";

const { Title } = Typography;

const VendorVisit = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [initialFormData, setInitialFormData] = useState(null);
    const [rowId, setRowId] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();
    const [filteredData, setFilteredData] = useState([]);
    const empty = useMemo(() => [], []);
    const { checkUserIsLogin, user } = useAppContext();
    const [filters, setFilters] = useState({
        search: '',
        type: undefined,
    });

    // const { mutate: createVendor, isLoading: isCreating, error: createError } = useCreateVendor();
    const { data: vendorList = empty, isLoading } = useGetVendorList();
    const { data: vendorVisitList = empty, isLoading: isVendorVisitLoading } = useGetVendorVisits();
    const { mutate: createVendorVisit, isPending: isCreatingVist } = useCreateVendorVisit();
    const { mutate: updateVendorVisit, isPending: isUpdatingVisit } = useUpdateVendorVisit();
    const { mutate: updateOutTime, isPending: isUpdating } = useUpdateVendorVisitOutTime();
     const { mutate: deleteVendorVisit, isPending: isDeleteing } = useDeleteVendorVisit();

    useEffect(() => {
        let newFilteredData = vendorVisitList;

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
        // if (filters.type) {
        //     newFilteredData = newFilteredData.filter(material => material.type === filters.type);
        // }

        setFilteredData(newFilteredData);
    }, [filters, vendorVisitList]);

    const [form] = Form.useForm();

    const handleFormSubmit = (values) => {

        const key = "vendor-visit-loading"
        messageApi.open({
            key,
            type: 'loading',
            content: 'Submitting...',
        });

        console.log('Received values of form: ', values, initialFormData);

        const [concernedPersonId, concernedPersonName, concernedPersonEcode] = values?.concernedPersonNameGroup?.split('_');

        const user = JSON.parse(sessionStorage.getItem("employess"))
        const submitForm = {
            ...values,
            concernedPersonId: +concernedPersonId,
            concernedPersonName,
            concernedPersonEcode,
            employeeAtReception: +user.id,
            VendorContactNumber: values.vendorContactNo,
            CreatedBy: +user.id,
            isAppointment: values.isAppointment == "yes"
        }

        const isUpdate = !!rowId;
        if (isUpdate) {
            debugger;
            const updateForm = {
                id: initialFormData.id,
                isAppointment: submitForm?.isAppointment,
                vendorName: submitForm?.vendorName,
                vendorRepresentativeName: submitForm?.vendorRepresentativeName,
                vendorAddress: submitForm?.vendorAddress,
                vendorContactNo: submitForm?.vendorContactNo,
                divisionId: submitForm?.divisionId || 0,
                employeeAtReception: initialFormData?.employeeAtReception || 0,
                concernedPersonName: submitForm?.concernedPersonName,
                concernedPersonId: submitForm?.concernedPersonId,
                concernedPersonEcode: submitForm?.concernedPersonEcode,
                purposeOfVisit: submitForm?.purposeOfVisit,
                outTime: initialFormData.outTime,
                remarks: submitForm?.remarks,
                status: initialFormData.status,
                officeLocation: submitForm?.officeLocation,
                udpatedBy: +user.id,
            }
            console.log("updateformvalues", updateForm);

            updateVendorVisit(updateForm, {
                onSuccess: () => {
                    setIsModalVisible(false); // Close the modal
                    form.resetFields();
                    setInitialFormData(null);
                    // let key = 'matrial-send-success';
                    messageApi.open({
                        key,
                        type: 'success',
                        content: 'Vendor Visit Entry Updated',
                    });

                    // setRowId
                },
                onError: () => {
                    messageApi.open({
                        key,
                        type: 'error',
                        content: 'Something went Wrong! Please Try Again',
                    });
                }
            });
        } else {

            createVendorVisit(submitForm, {
                onSuccess: () => {
                    setIsModalVisible(false); // Close the modal
                    form.resetFields();
                    setInitialFormData(null);
                    // let key = 'matrial-send-success';
                    messageApi.open({
                        key,
                        type: 'success',
                        content: 'Vendor Visit Entry Created',
                    });
                },
                onError: () => {
                    messageApi.open({
                        key,
                        type: 'error',
                        content: 'Something went Wrong! Please Try Again',
                    });
                }
            });
        }


        // For demonstration, add a new material to the list
        // setIsModalVisible(false); // Close the modal
        // form.resetFields();
    };

    // Function to handle modal cancellation
    const handleModalCancel = () => {
        setIsModalVisible(false);
        form.resetFields(); // Optional: reset fields on cancel
        setInitialFormData(null);
    };

    const handleVendorSelect = (vendorOrIndex) => {
        const index = (vendorOrIndex?.vendorContactNumber && -1) || vendorOrIndex;
        const selectedVendor = (!isNaN(index)) && vendorList.at(index);
        if (selectedVendor) {
            form.setFieldsValue({
                vendorName: selectedVendor.vendorName,
                vendorAddress: selectedVendor.vendorAddress,
                vendorContactNo: selectedVendor.vendorContactNumber,
                vendorIdIndex: index == -1 ? vendorList.length - 1 : index,

            });
        } else {
            form.setFieldsValue({
                vendorName: "",
                vendorAddress: '',
                vendorContactNo: '',

            }); // Clear address if no vendor selected or invalid
        }
    };

    const handleOpenCopyOrUpdate = (row, isUpdate = false) => {
        if (!user) {
            checkUserIsLogin();
        } else {

            if (isUpdate) {
                setRowId(row.id)
            }
            const vendorIdIndex = vendorList.findIndex(v => v?.vendorContactNumber?.includes(row.vendorContactNo));
            const isAppointment = row.isAppointment ? "yes" : "no";
            const {
                concernedPersonEcode,
                concernedPersonId,
                concernedPersonName,
            } = row;
            const concernedPersonNameGroup = [concernedPersonId, concernedPersonName, concernedPersonEcode].join("_");
            const init = { ...row, vendorIdIndex, concernedPersonNameGroup, isAppointment };
            form.setFieldsValue(init)
            setIsModalVisible(true);
            setInitialFormData(init);
        }
    }

    const handleDelete = (row) => {
        messageApi.open({
            type: 'loading',
            content: 'Deleting...',
            key: 'vendor-visit-delete',
        });
        deleteVendorVisit(row.id, {
            onSuccess: () => {
                messageApi.open({
                    type: 'success',
                    content: 'Vendorv Visit deleted successfully!',
                    key: 'vendor-visit-delete',
                });
            },
            onError: () => {
                messageApi.open({
                    type: 'error',
                    content: 'Failed to delete Vendor Visit. Please try again.',
                    key: 'vendor-visit-delete',
                });
            }
        });
    }

    const columns = useMemo(() => ([
        {
            title: 'Date',
            dataIndex: 'inDate',
            key: 'inDate',
            render: (text) => new Date(text).toLocaleDateString('en-GB').replace(/\//g, '-'),
        },// send/Receive 
        // { title: 'Vendor Type', dataIndex: 'type', key: 'type' },
        // { title: 'Appointment', dataIndex: 'isAppointmen', key: 'isAppointmen' },
        { title: 'Vendor Name', dataIndex: 'vendorName', key: 'vendorName' },
        { title: 'Contact Person', dataIndex: 'vendorRepresentativeName', key: 'contactPerson' },
        { title: 'Contact Number', dataIndex: 'vendorContactNo', key: 'contactNumber' },
        // { title: 'City', dataIndex: 'city', key: 'city' },
        // { title: 'Division', dataIndex: 'division', key: 'division' },
        // { title: 'Purpose Of Visit', dataIndex: 'purposeOfVisit', key: 'purposeOfVisit' },
        // { title: 'Concerned Person', dataIndex: 'concernedPersonName', key: 'concernPerson' },
        {
            title: 'In Time',
            dataIndex: 'inDate',
            key: 'inTime',
            render: (text) => new Date(text).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
        {
            title: 'Out Time',
            dataIndex: 'outTime',
            key: 'inTime',
            render: (text, row) => (
                <OutTimeSwitch
                    id={row.id}
                    outTime={text}
                    updateOutTime={updateOutTime}
                // isPending={isUpdating}
                />
            )

            // <Switch
            //     loading={isUpdating}
            //     unCheckedChildren="In"
            //     // className='w-24 'ss
            //     // unCheckedChildren={() => <span className='bg-black text-white'>RECEIVER</span>}
            //     checkedChildren="Out"
            //     value={!!text}
            //     onChange={(checked) => {
            //         if(checked) {
            //             updateOutTime(row.id)
            //         }
            //     }}
            // />
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, row) => (<div className="flex justify-between w-20">
                <ViewDetailButton data={row}  >
                    <VendorVisitDetailView data={row} />
                </ViewDetailButton>
                <EditButton onClick={() => handleOpenCopyOrUpdate(row, true)} />
                <AddNewButton onClick={() => handleOpenCopyOrUpdate(row)} />
                <DeleteButton onClick={() => handleDelete(row)} />
            </div>),
        },
    ]));

    const vendorProps = {
        columns,
        openForm: () => setIsModalVisible(true),
        AddNewLabel: "Add Vendor Visit",
        handleFormSubmit,
        handleModalCancel,
        form,
        handleVendorSelect,
        data: filteredData
    }

    const vendor = Form.useWatch('SenderOrReceiver', form);

    useEffect(() => {
        if (vendor == "other") {
            setIsModalNewVendor(true)
        }
    }, [vendor])

    const handleAddData = () => {
        if (!user) {
            checkUserIsLogin();
        } else {
            setIsModalVisible(true);
            form.resetFields(); // Clear form fields when opening
            setInitialFormData(null);
            form.setFieldsValue({ type: 'vendor' }); // Set default type to Vendor
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value?.trim(),
        }));
    };




    return (
        <div>
            <Helmet>
                <title>Vendor Visit</title>
            </Helmet>
            {contextHolder}
            <Space style={{ marginBottom: 16 }} className=' flex w-full justify-between'>
                <PageTitle>Vendor Visit Management</PageTitle>
                <Button
                    onClick={handleAddData}
                    className='bg-white border !border-gray-800 text-gray-700 hover:!bg-gray-800 hover:!text-white hover:!ring-0'
                >
                    Add Vendor Visit
                </Button>
            </Space>

            <div style={{ marginBottom: 16 }} className='grid grid-cols-3'>
                <Input
                    placeholder="Search by info"
                    prefix={<SearchOutlined />}
                    style={{ width: 300 }}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    allowClear
                />
            </div>

            {/* Filter Container */}
            <Template {...vendorProps} />
            {isModalVisible && <Modal
                open={isModalVisible}
                footer={null}
                onCancel={handleModalCancel}
                title="Add New Vendor Visit"
                width={800}
                className="top-1"
            >
                <VendorVisitForm
                    {...{
                        handleFormSubmit,
                        handleModalCancel,
                        form,
                        handleVendorSelect,
                        initialFormData
                    }}
                    isPending={isCreatingVist}
                />
            </Modal>}
        </div>
    )
}

export default VendorVisit;