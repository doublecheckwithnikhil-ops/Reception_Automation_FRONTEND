import { Link } from "react-router";
import { getFormatedTime, isTodaysData } from './../utils/utils';

const CandidateData = ({ data }) => {
    return data?.length > 0 ? data.map((item) => (
        <div key={item.id} className="even:bg-gray-50 uppercase text-sm grid grid-cols-3 w-full px-3 opacity-80 hover:opacity-100">
            <h4 className=" font-normal text-gray-800 text-left">{item.name}</h4>
            <span className="text-gray-600 ">{item.hrName}</span>
            <span className="text-gray-600 text-right">{new Date(item.inDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>)) : (
        <div className='text-gray-400 text-xs text-center'>No Data</div>
    )
}

const MaterialSendData = ({ data }) => {
    return data?.length > 0 ? data.map((item) => (
        <div key={item.id} className="even:bg-gray-50 uppercase text-sm grid grid-cols-4 w-full opacity-80 hover:opacity-100">
            <h4 className=" font-normal text-gray-800 text-left">{item.receiverName}</h4>
            <span className="text-gray-600">{item.type}</span>
            <span className="text-gray-600">{item.division}</span>
            <span className="text-gray-600 text-right">{getFormatedTime(item.outDate)}</span>
        </div>)) : (
        <div className='text-gray-400 text-xs text-center'>No Data</div>
    )
}

const MaterialReceiveData = ({ data }) => {
    return data?.length > 0 ? data.map((item) => (
        <div key={item.id} className="even:bg-gray-50 text-sm uppercase grid grid-cols-4 w-full px-3 opacity-80 hover:opacity-100">
            <h4 className=" font-normal text-gray-800 text-left">{item.senderName}</h4>
             <span className="text-gray-600">{item.type}</span>
            <span className="text-gray-600">{item.division}</span>
            <span className="text-gray-600 text-right">{getFormatedTime(item.inDate)}</span>
            {/* <p className="text-gray-600 text-right">{new Date(item.inDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p> */}
        </div>)) : (
        <div className='text-gray-400 text-xs text-center'>No Data</div>
    )
}

const VendorData = ({ data }) => {
    return data?.length > 0 ? data.map((item) => (
        <div key={item.id} className="even:bg-gray-50 text-sm grid uppercase grid-cols-3 w-full px-3 opacity-80 hover:opacity-100">
            <h4 className=" font-normal text-gray-800 text-left">{item.vendorName}</h4>
            <span className="text-gray-600 ">{item.vendorAddress}</span>
            <span className="text-gray-600 text-right">{getFormatedTime(item.inDate)}</span>
        </div>)) : (
        <div className='text-gray-400 text-xs text-center'>No Data</div>
    )
}

const displayData = {
    "receiver": MaterialReceiveData,
    "send": MaterialSendData,
    "candidate": CandidateData,
    "vendor": VendorData
}

const CustomCard = ({ title, data, path, compKey }) => {
    const DataDisplay = displayData[compKey];
    return (
        <div className="bg-white p-2 rounded-lg shadow-md">
            <h3 className="text-md uppercase text-center font-semibold text-gray-800 mb-2">{title}</h3>
            <div className={`flex flex-col items-center  h-32 overflow-auto no-scrollbar ${ data.length > 0 ? "" : "justify-center"}`} >
                <DataDisplay {...{ data }} />
            </div>
            <div className='flex justify-between mt-2 p-1'>
                <div className="rounded-full p-1.5 text-xs border border-gray-400 text-gray-500 font-medium px-2.5">Count: {data.length}</div>
                <Link className='rounded-2xl py-1 text-xs hover:underline' to={path}>View All</Link>
            </div>
        </div>
    )
}





export default CustomCard;  