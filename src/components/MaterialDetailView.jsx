import { Descriptions } from "antd";
import dayjs from "dayjs";

const MaterialDetailView = ({ data }) => {
    return (
        <Descriptions bordered column={2} size="small">
            <Descriptions.Item label="Type">{data?.type}</Descriptions.Item>
            {/* <Descriptions.Item label="Status">{data?.status}</Descriptions.Item> */}

            <Descriptions.Item label="Sender Name">{data?.senderName}</Descriptions.Item>
            <Descriptions.Item label="Sender Address">{data?.senderAddress}</Descriptions.Item>

            <Descriptions.Item label="Sender Contact">{data?.senderContactNo}</Descriptions.Item>
            <Descriptions.Item label="Receiver Name">{data?.receiverName}</Descriptions.Item>

            <Descriptions.Item label="Receiver Code">{data?.receiverCode}</Descriptions.Item>
            <Descriptions.Item label="Division">{data?.division}</Descriptions.Item>

            <Descriptions.Item label="Receive Through">{data?.receiveThrough}</Descriptions.Item>
            <Descriptions.Item label="Consignment No">{data?.consignmentNo}</Descriptions.Item>

            <Descriptions.Item label="Weight">{data?.materialWeight} kg</Descriptions.Item>
            <Descriptions.Item label="Count">{data?.materialCount}</Descriptions.Item>

            <Descriptions.Item label="Container Type">{data?.containerType}</Descriptions.Item>
            <Descriptions.Item label="Courier Person">{data?.courierPersonDetails}</Descriptions.Item>

            <Descriptions.Item label="Vehicle Details">{data?.vehicleDetails}</Descriptions.Item>
            <Descriptions.Item label="Courier Company">{data?.courierCompany}</Descriptions.Item>

            <Descriptions.Item label="Gate Pass Number">{data?.gatePassNumber}</Descriptions.Item>
            <Descriptions.Item label="Description">{data?.materialDescription}</Descriptions.Item>

            <Descriptions.Item label="Bill/Challan No">{data?.billOrChallanNumber}</Descriptions.Item>
            <Descriptions.Item label="Picked By">{data?.pickedByName} ({data?.pickedByCode})</Descriptions.Item>

            <Descriptions.Item label="Received By">{data?.empAtRecpName} ({data?.empAtRecpECode})</Descriptions.Item>
            <Descriptions.Item label="Amount">₹{data?.amount}</Descriptions.Item>

            <Descriptions.Item label="In Date">
                {dayjs(data?.inDate).format('DD-MM-YYYY')}
            </Descriptions.Item>
            <Descriptions.Item label="In Time">
                {dayjs(data?.inTime, 'HH:mm:ss').format('hh:mm A')}
            </Descriptions.Item>

            <Descriptions.Item label="Created On" span={2}>
                {dayjs(data?.createdOn).format('DD-MM-YYYY hh:mm A')}
            </Descriptions.Item>

            {data?.remarks && (
                <Descriptions.Item label="Remarks" span={2}>
                    {data?.remarks}
                </Descriptions.Item>
            )}
        </Descriptions>
    )
}

export default MaterialDetailView;