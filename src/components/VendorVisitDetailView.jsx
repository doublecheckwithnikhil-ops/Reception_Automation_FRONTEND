import { Descriptions, Tag } from "antd";
import dayjs from "dayjs";

const VendorVisitDetailView = ({ data }) => {
    return (
        <Descriptions bordered column={2} size="small">
            <Descriptions.Item label="Vendor Name">{data?.vendorName}</Descriptions.Item>
            <Descriptions.Item label="Representative">{data?.vendorRepresentativeName}</Descriptions.Item>

            <Descriptions.Item label="Contact No">{data?.vendorContactNo}</Descriptions.Item>
            <Descriptions.Item label="Address">{data?.vendorAddress}</Descriptions.Item>

            <Descriptions.Item label="Division">{data?.division}</Descriptions.Item>
            <Descriptions.Item label="Office Location">{data?.officeLocation}</Descriptions.Item>

            <Descriptions.Item label="Concerned Person">
                {data?.concernedPersonName} ({data?.concernedPersonEcode})
            </Descriptions.Item>

            <Descriptions.Item label="Receptionist">
                {data?.empAtRecpName} ({data?.empAtRecpECode})
            </Descriptions.Item>

            <Descriptions.Item label="Purpose" span={2}>
                {data?.purposeOfVisit}
            </Descriptions.Item>

            <Descriptions.Item label="In Date">
                {dayjs(data?.inDate).format('DD-MM-YYYY')}
            </Descriptions.Item>
            <Descriptions.Item label="In Time">
                {dayjs(data?.inTime, 'HH:mm:ss').format('hh:mm A')}
            </Descriptions.Item>

            <Descriptions.Item label="Out Time">
                {data?.outTime ? dayjs(data.outTime, 'HH:mm:ss').format('hh:mm A') : '—'}
            </Descriptions.Item>

            <Descriptions.Item label="Status">
                {data?.status ? <Tag color="blue">{data.status}</Tag> : '—'}
            </Descriptions.Item>

            {data?.remarks && (
                <Descriptions.Item label="Remarks" span={2}>
                    {data.remarks}
                </Descriptions.Item>
            )}

            <Descriptions.Item label="Appointment">
                {data?.isAppointment ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>}
            </Descriptions.Item>

            <Descriptions.Item label="Created On">
                {dayjs(data?.createdOn).format('DD-MM-YYYY hh:mm A')}
            </Descriptions.Item>
        </Descriptions>
    )
}

export default VendorVisitDetailView;