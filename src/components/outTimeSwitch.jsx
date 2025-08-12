import { message, Switch } from "antd";
import { useEffect, useState } from "react"
import { getFormatedTime } from "../utils/utils";

const OutTimeSwitch = ({ id, outTime, updateOutTime, isPending }) => {
    const [isOutTimeChecked, setIsOutTimeChecked] = useState(!!outTime);
     const [messageApi, contextHolder] = message.useMessage();


    useEffect(() => {
        console.log(isOutTimeChecked, !outTime);
        const idOutTime = isOutTimeChecked && !outTime;
        if (idOutTime) {
            const key = "outtime-update"
            messageApi.open({
                key,
                type: 'loading',
                content: 'Submitting...',
            });
            updateOutTime(id, {
                onSuccess: () => {
                    messageApi.open({
                        key,
                        type: 'success',
                        content: 'Out Time Updated Successfully',
                    });
                },
                onError: () => {
                    setIsOutTimeChecked(false);
                    messageApi.open({
                        key,
                        type: 'error',
                        content: 'Something went Wrong! Please Try Again',
                    });
                }
            })
        }
    }, [isOutTimeChecked]);

    return (<>
        {contextHolder}
        {(outTime && getFormatedTime("2023-01-01T" + outTime.split(".")[0])) || <Switch
            loading={isPending}
            unCheckedChildren="In"
            // className='w-24 
            // unCheckedChildren={() => <span className='bg-black text-white'>RECEIVER</span>}
            checkedChildren="Out"
            value={isOutTimeChecked}
            // defaultChecked
            onChange={(checked) => {
                setIsOutTimeChecked(checked)
            }}
        />}
    </>
    )
}

export default OutTimeSwitch;