import { message } from 'antd';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the context
const AppContext = createContext();

// Custom hook for consuming context
export const useAppContext = () => useContext(AppContext);

// Provider component
export const AppProvider = ({ children }) => {

    const [dispayLoginModal, setDisplayLoginModal] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState('');


    const login = (userData) => {
        setUser(userData);
        setDisplayLoginModal(false)
    }
    const logout = () => {
        setUser(null);
        sessionStorage.clear();
        let key="user-logout";
        messageApi.open({
            key,
            type: 'success',
            content: 'User Logout',
        });
    }

    // const addNotification = (notification) =>
    //     setNotifications((prev) => [...prev, notification]);
    // const removeNotification = (id) =>
    //     setNotifications((prev) => prev.filter((n) => n.id !== id));

    const checkUserIsLogin = () => {
        const user = JSON.parse(sessionStorage.getItem("employess"));
        if (!user?.email) {
            setDisplayLoginModal(true);
        } else {
            login(user);
            setDisplayLoginModal(false);
        }
    }

    useEffect(() => {
        checkUserIsLogin();
    }, [])

    return (
        <AppContext.Provider
            value={{
                user,
                login,
                logout,
                checkUserIsLogin,
                // addNotification,
                // removeNotification,
                dispayLoginModal,
                setDisplayLoginModal
            }}
        >
            {contextHolder}
            {children}
        </AppContext.Provider>
    );
};