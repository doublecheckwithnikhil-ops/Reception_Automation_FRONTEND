import dayjs from "dayjs";

export const handleRequest = async (requestFn) => {
    try {
        const response = await requestFn();
        return response?.data?.data || response?.data || response;
    } catch (error) {
        // Optionally, handle error logging here
        throw error;
    }
};

export const getFormatedDate = text => new Date(text).toLocaleDateString('en-GB').replace(/\//g, '-');

export const getFormatedTime = text => new Date(text).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const todayDate = new Date();

export const isTodaysData = data => {
   
    const date = dayjs(data); // or any date
    const isToday = date.isSame(dayjs(), 'day');

    // const input = getFormatedDate(data);
    // const today = getFormatedDate(todayDate);

    // return input == today;
    return isToday;
}

export const disableFutureDates = (current) => {
    return current && current > dayjs().endOf('day');
};


