import { useEffect, useState } from "react";
import Template from "../template/template";
import { Button, Card, Form, Input, message, Modal, Select, Space, Switch, Typography } from "antd";
import { employeeList } from "../utils/constant";
import { useCreateCandidateVisit, useDeleteCandidateVisit, useGetCandidateVisits, useUpdateCandidateVisit, useUpdateCandidateVisitOutTime } from "../apis/candidateVisit";
import { getFormatedDate, getFormatedTime } from "../utils/utils";
import { useAppContext } from "../context/AppContext";
import EmployeeList from "../components/employeeList";
import { Helmet } from "react-helmet";
import EditButton from "../components/EditButton";
import OutTimeSwitch from "../components/outTimeSwitch";
import ViewDetailButton from "../components/ViewDetailButton";
import DeleteButton from "../components/DeleteButton";
import CandidateVisitDetail from "../components/CandidateVisitDetail";
import PageTitle from "../components/PageTitle";

const { Title } = Typography;

const CandidateVisit = () => {
    // const [candidate, setCandidate] = useState(dummyCandidateData);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [rowId, setRowId] = useState(null);
    const [initialFormData, setInitialFormData] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();
    const { checkUserIsLogin, user } = useAppContext();

    const { data: candidate = [], isLoading } = useGetCandidateVisits();
    const { mutate: createCandidateVisitEntry, isPending: isCreating, error: createError } = useCreateCandidateVisit();
    const { mutate: updateCandidateVisit, isPending: isUpdatingVisit } = useUpdateCandidateVisit();
    const { mutate: updateOutTime, isPending: isUpdating } = useUpdateCandidateVisitOutTime();
    const { mutate: deleteCandidateVisit, isPending: isDeleteing } = useDeleteCandidateVisit();

    const handleEditDetail = (row, isUpdate = false) => {

        if (!user) {
            checkUserIsLogin();
        } else {
            if (isUpdate) {
                setRowId(row.id)
            }
            // const vendorIdIndex = vendorList.findIndex(v => v?.vendorContactNumber?.includes(row.vendorContactNo));
            // const isAppointment = row.isAppointment ? "yes" : "no";
            const {
                hrId,
                hrECode,
                hrName,
            } = row;
            const concernedPersonNameGroup = [hrId, hrName, hrECode].join("_");
            const init = { ...row, hrECode: concernedPersonNameGroup, };
            form.setFieldsValue(init)
            setIsModalVisible(true)
            setInitialFormData(init)
        }
    }

    const columns = [
        {
            title: 'Date',
            dataIndex: 'inDate',
            key: 'date',
            render: getFormatedDate,
            // Optional: Add sorter if you want to sort by date
            // sorter: (a, b) => new Date(a.date) - new Date(b.date),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',

            // Optional: Add filter for name
            // filterSearch: true,
            // onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: 'Contact',
            dataIndex: 'contactNumber',
            key: 'contact',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            // Optional: Add filter for location
            // filters: [
            //   { text: 'Bangalore', value: 'Bangalore' },
            //   { text: 'Chennai', value: 'Chennai' },
            //   { text: 'Hyderabad', value: 'Hyderabad' },
            //   { text: 'Mumbai', value: 'Mumbai' },
            //   { text: 'Delhi', value: 'Delhi' },
            // ],
            // onFilter: (value, record) => record.location.indexOf(value) === 0,
        },
        {
            title: 'HR Name',
            dataIndex: 'hrName',
            key: 'hrName',
        },
        {
            title: 'Time',
            dataIndex: 'inDate',
            key: 'time',
            render: getFormatedTime,
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
                />
            )
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, row) => (<div className="flex justify-between w-14 ">
                <ViewDetailButton data={row} >
                    <CandidateVisitDetail data={row} />
                </ViewDetailButton>
                <EditButton onClick={() => handleEditDetail(row, true)} />
                <DeleteButton onClick={() => handleDelete(row)} />
            </div>),
        },
        // You might also want an 'Action' column for Edit/Delete buttons
        // {
        //   title: 'Action',
        //   key: 'action',
        //   render: (_, record) => (
        //     <Space size="middle">
        //       <a>Edit {record.name}</a>
        //       <a>Delete</a>
        //     </Space>
        //   ),
        // },
    ];

    const [form] = Form.useForm();

    const handleModalCancel = () => {
        setIsModalVisible(false);
        form.resetFields(); // Optional: reset fields on cancel
    };

    const handleDelete = (row) => {
        messageApi.open({
            type: 'loading',
            content: 'Deleting...',
            key: 'candidate-visit-delete',
        });
        deleteCandidateVisit(row.id, {
            onSuccess: () => {
                messageApi.open({
                    type: 'success',
                    content: 'Candidate Visit deleted successfully!',
                    key: 'candidate-visit-delete',
                });
            },
            onError: () => {
                messageApi.open({
                    type: 'error',
                    content: 'Failed to delete Candidate Visit. Please try again.',
                    key: 'candidate-visit-delete',
                });
            }
        });
    }


    // useEffect(() => {
    //     fetch('http://192.168.151.36:8171/api/Candidate/update--outtime', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json', // Important for JSON body
    //         },
    //         body: JSON.stringify({
    //             id: 19
    //         })
    //     })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json(); // Parse JSON response
    //         })
    //         .then(data => {
    //             console.log('Success:', data);
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    // });
    // const candidateOther = Form.useWatch('candidate');

    const handleFormSubmit = (values) => {
        const key = "candidate-visit-loading"
        messageApi.open({
            key,
            type: 'loading',
            content: 'Submitting...',
        });
        console.log('Received values of form: ', values);
        debugger;
        // 114423_RANJEET KUMAR  _V38597
        const [hrId, hrName, hrECode] = values.hrECode.split("_");

        const payload = {
            ...initialFormData,
            ...values,
            // hrName: employeeList.find(emp => emp.empId === values.hrECode)?.name || values.hrCode,
            hrId,
            hrName,
            hrECode,
            id: rowId,
            outTime: rowId ? initialFormData.outTime : undefined
        }

        //     {
        //     id: 'c1',
        //     date: '2024-07-24',
        //     name: 'John Doe',
        //     contact: '9876543210',
        //     location: 'Bangalore',
        //     hrName: 'Priya Sharma',
        //     time: '10:00 AM',
        // },
        const postData = rowId ? updateCandidateVisit : createCandidateVisitEntry;

        postData(payload, {
            onSuccess: () => {
                messageApi.open({
                    key,
                    type: 'success',
                    content: 'Candidate Visit Entry Created',
                });
                setIsModalVisible(false); // Close the modal
                setInitialFormData(null);
                form.resetFields();
            },
            onError: () => {
                messageApi.open({
                    key,
                    type: 'error',
                    content: 'Something went Wrong! Please Try Again',
                });
            }
        });
        // message.success('Material entry added successfully!');

        // For demonstration, add a new material to the list
        const newCandidateVisit = {
            ...values,
            id: `mat-${candidate.length + 1}`, // Simple ID generation
            date: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
            time: ""
        };
        // setCandidate(prev => [...prev, newCandidateVisit]);
        setIsModalVisible(false); // Close the modal
        form.resetFields();
    };


    const candidateProps = {
        title: "Candidate Visit",
        columns,
        openForm: () => setIsModalVisible(true),
        data: candidate,
        AddNewLabel: "Add Candidate Visit"
    }

    const handleAddData = () => {
        if (!user) {
            checkUserIsLogin();
        } else {
            setIsModalVisible(true);
            form.resetFields(); // Clear form fields when opening
            form.setFieldsValue({ type: 'vendor' }); // Set default type to Vendor
        }
    };

    return (
        <>
            <Helmet>
                <title>Candidate Visit</title>
            </Helmet>
            {contextHolder}
            <Space style={{ marginBottom: 16 }} className=' flex w-full justify-between'>
                <PageTitle>Candidate Visit</PageTitle>
                <Button
                    onClick={(handleAddData)}
                    className='bg-white border !border-gray-800 text-gray-700 hover:!bg-gray-800 hover:!text-white hover:!ring-0'>
                    Add Candidate Visit
                </Button>
            </Space>
            <Template
                {...candidateProps}
            />
            {/* <Modal
                title="Add New Material Entry"
                open={isModalVisible}
                onCancel={handleModalCancel}
                footer={null}
                width={700} // Adjust modal width for better form layout
            > */}
            <Modal
                title="Add Candidate Visit"
                open={isModalVisible}
                onCancel={handleModalCancel}
                footer={null}
                width={700}
                className="top-1"
                classNames={{
                    header: "uppercase mb-4",
                }}
            >
                <Card>
                    <Form
                        form={form}
                        layout="vertical"
                        name="add_candidate_visit"
                        onFinish={handleFormSubmit}
                        initialValues={{ type: 'vendor', transactionType: "Receive" }}
                    >
                        {/* <Form.Item
                            name="candidate"
                            label="Candidate Name"
                            rules={[{ required: true, message: 'Please select candidate!' }]}
                        > */}
                        {/* <Select
                                placeholder="Select candidate"
                                showSearch
                                filterOption={(input, option) =>
                                    (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {employeeList.map(emp => (
                                    <Select.Option key={emp.id} value={emp.name}>
                                        {emp.name} ({emp.empId})
                                    </Select.Option>
                                ))}
                                <Option key="other" value={"other"} children="Other">
                                    Other
                                </Option>
                            </Select> */}

                        <Form.Item
                            name="name"
                            label="Enter Candidate Name"
                            rules={[{ required: true, message: 'Please enter candidate name!' }]}
                        >
                            <Input placeholder="Enter candidate name" />
                        </Form.Item>

                        {/* </Form.Item> */}
                        <Form.Item
                            name="contactNumber"
                            label="Contact Number"
                            rules={[{ required: true, message: 'Please enter contact number!' },
                            {
                                pattern: /^\d{10}$/, // Regex for exactly 10 digits
                                message: 'Please enter a 10-digit mobile number!',
                            },
                            ]
                            }
                        >
                            <Input placeholder="Enter contact number" />
                        </Form.Item>
                        <Form.Item
                            name="location"
                            label="Location"
                        >
                            <Input placeholder="Enter Location(optional)" />
                        </Form.Item>
                        <Form.Item
                            name="hrECode"
                            label="HR Name"
                            rules={[{ required: true, message: 'Please enter HR Name!' }]}
                        >
                            <EmployeeList placeholder="Enter HR Name" />
                        </Form.Item>
                        <Form.Item
                            name="purposeOfVisit"
                            label="Purpose of Visit"
                        >
                            <Input placeholder="Enter Purpose of Visit(optional)" />
                        </Form.Item>
                        <Form.Item
                            name="remarks"
                            label="Remarks"
                        >
                            <Input placeholder="Enter Remarks" />
                        </Form.Item>
                        <Form.Item style={{ marginTop: 20, width: '100%', textAlign: "center" }}>
                            <Space>
                                <Button type="default" onClick={handleModalCancel} disabled={isCreating}>
                                    Cancel
                                </Button>
                                <Button type="primary" htmlType="submit" loading={isCreating}>
                                    Submit
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Card>
            </Modal>
            {/* </Modal> */}
        </>

    )
}

export default CandidateVisit;