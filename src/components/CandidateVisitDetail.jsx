

import { Descriptions, Tag } from "antd";
import dayjs from "dayjs";

const CandidateVisitDetail = ({ data }) => {
    return (
        <Descriptions bordered column={2} size="small">
            <Descriptions.Item label="Name">{data?.name}</Descriptions.Item>
            <Descriptions.Item label="Location">{data?.location}</Descriptions.Item>

            <Descriptions.Item label="Contact No">{data?.contactNumber}</Descriptions.Item>
            <Descriptions.Item label="Purpose of Visit">{data?.purposeOfVisit}</Descriptions.Item>

            <Descriptions.Item label="HR Contact">
                {data?.hrName} ({data?.hrECode})
            </Descriptions.Item>

            <Descriptions.Item label="Receptionist">
                {data?.empAtRecpName
                    ? `${data.empAtRecpName} (${data.empAtRecpECode})`
                    : '—'}
            </Descriptions.Item>

            <Descriptions.Item label="In Date">
                {dayjs(data?.inDate).format('DD-MM-YYYY')}
            </Descriptions.Item>

            <Descriptions.Item label="In Time">
                {dayjs(data?.inTime, 'HH:mm:ss').format('hh:mm A')}
            </Descriptions.Item>

            <Descriptions.Item label="Out Time">
                {data?.outTime && data.outTime !== '00:00:00'
                    ? dayjs(data.outTime, 'HH:mm:ss').format('hh:mm A')
                    : '—'}
            </Descriptions.Item>

            <Descriptions.Item label="Remarks" span={2}>
                {data?.remarks || '—'}
            </Descriptions.Item>

            <Descriptions.Item label="Created On" span={2}>
                {dayjs(data?.createdOn).format('DD-MM-YYYY hh:mm A')}
            </Descriptions.Item>
        </Descriptions>
    )
}

export default CandidateVisitDetail;