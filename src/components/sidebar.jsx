import { Button, Popover } from "antd";
import { CarTaxiFront, Info, LayoutDashboard, LogOut, Package, Truck, User, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { useAppContext } from "../context/AppContext";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true); // State to manage sidebar open/close
    const location = useLocation(); // Get the current location for active link highlighting

    const { logout, user, checkUserIsLogin } = useAppContext();

    // Function to toggle sidebar state
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Array of sidebar items
    const sidebarItems = [
        { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/' },
        { name: 'Courier', icon: <Package className="w-5 h-5" />, path: '/courier/receive' },
        { name: 'Vendor Visit', icon: <Truck className="w-5 h-5" />, path: '/vendor-visit' },
        { name: 'Candidate Visit', icon: <Users className="w-5 h-5" />, path: '/candidate-visit' }, // Using Home icon as a placeholder for Candidate Visit
        // { name: 'Driver', icon: <CarTaxiFront className="w-5 h-5" />, path: '/driver' },
        // { name: 'Vendor', icon: <Users className="w-5 h-5" />, path: '/vendor' },
    ];

    const content = (
        <div>{`${user?.name} (${user?.eCode})`}</div>
    );

    console.log("CHECK USER LOGIN" , { user });
    return (
        <div
            className={`fixed w-52 left-0 top-0  h-screen flex flex-col bg-gray-800 text-white transition-all duration-300 ease-in-out `} // Sidebar width for desktop (md and up) and mobile (collapsed/expanded)
        >
            {/* Sidebar Header with Toggle Button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h5 className='text-xl font-medium'>Reception Management</h5>
            </div>

            {/* Sidebar Navigation Items */}
            <nav className="flex-1 px-2 py-4 space-y-2">
                {sidebarItems.map((item) => (
                    <Link
                        to={item.path}
                        key={item.name}
                        href="#" // Placeholder for actual navigation links
                        className={`flex items-center p-3 rounded-lg text-gray-300 hover:scale-95 hover:text-white transition-colors duration-200 ${location.pathname == item.path ? 'bg-gray-700' : ''}`}
                    >
                        <div className="flex-shrink-0 !text-gray-300">
                            {item.icon}
                        </div>
                        {isOpen && <span className="ml-3 text-lg whitespace-nowrap !text-gray-300">{item.name}</span>}
                    </Link>
                ))}
            </nav>

            {/* Spacer to push content up if needed */}
            <div className="flex-grow"></div>

            {/* Optional: Footer or user info */}
            {isOpen && (
                <>

                    {user ? <div className="p-4 border-t border-gray-700 text-sm flex items-center justify-between text-gray-400">
                        <div
                            className="flex items-center rounded-lg text-gray-300 hover:scale-95 hover:text-white transition-colors duration-200 cursor-pointer"
                            onClick={logout}
                        >
                            <div className="flex-shrink-0">
                                <LogOut />
                            </div>
                            <span className="ml-3 text-lg whitespace-nowrap">Logout</span>
                        </div>
                        <Popover content={content} title="Login User">
                            {/* <Button type="primary">Hover me</Button> */}
                            <span className="cursor-pointer"><Info /></span>
                        </Popover>
                    </div> :
                        <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
                            <div
                                className="flex items-center rounded-lg text-gray-300 hover:scale-95 hover:text-white transition-colors duration-200 cursor-pointer"
                                onClick={checkUserIsLogin}
                            >
                                <div className="flex-shrink-0">
                                    <User />
                                </div>
                                <span className="ml-3 text-lg whitespace-nowrap">Login</span>
                            </div>
                        </div>}
                    <div className="p-4 border-t border-gray-700 text-xs text-gray-400">
                        <p>Copyright © 2025 V2 Retail Ltd </p>
                    </div>
                </>
            )}
        </div>
    );
}

