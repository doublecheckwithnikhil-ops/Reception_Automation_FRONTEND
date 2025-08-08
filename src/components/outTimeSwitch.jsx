import { Switch } from "antd";
import { useEffect, useState } from "react"

const OutTimeSwitch = ({ id, outTime, updateOutTime, isPending }) => {
    const [isOutTimeChecked, setIsOutTimeChecked] = useState(!!outTime);

    useEffect(() => {
        console.log(isOutTimeChecked, !outTime);
        const idOutTime =isOutTimeChecked && !outTime ;
        if(idOutTime) {
            updateOutTime(id, {
                onSuccess: () => {
                    console.log("success fully developer ");
                    
                }
            })
        }
    }, [isOutTimeChecked])
    return (
        <Switch
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
            />
    )
}

export default OutTimeSwitch;