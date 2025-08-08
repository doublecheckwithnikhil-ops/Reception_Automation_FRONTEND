// src/pages/Vendor.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, message, Input, Select, Typography, Skeleton } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title } = Typography;

// Dummy data for demonstration
const initialVendors = [
    { id: '1', name: 'Global Supplies Inc.', category: 'Electronics', status: 'Active', address: '123 Tech Lane' },
    { id: '2', name: 'Artisan Crafts Co.', category: 'Handicrafts', status: 'Inactive', address: '456 Art Street' },
    { id: '3', name: 'Software Solutions Ltd.', category: 'Software', status: 'Active', address: '789 Code Blvd' },
    { id: '4', name: 'Hardware Hub', category: 'Electronics', status: 'Active', address: '101 Tool Road' },
    { id: '5', name: 'Creative Designs', category: 'Handicrafts', status: 'Active', address: '202 Art Alley' },
    { id: '6', name: 'Global Supplies Inc.', category: 'Electronics', status: 'Active', address: '123 Tech Lane' },
    { id: '7', name: 'Artisan Crafts Co.', category: 'Handicrafts', status: 'Inactive', address: '456 Art Street' },
    { id: '8', name: 'Software Solutions Ltd.', category: 'Software', status: 'Active', address: '789 Code Blvd' },
    { id: '9', name: 'Hardware Hub', category: 'Electronics', status: 'Active', address: '101 Tool Road' },
    { id: '10', name: 'Global Supplies Inc.', category: 'Electronics', status: 'Active', address: '123 Tech Lane' },
    { id: '12', name: 'Artisan Crafts Co.', category: 'Handicrafts', status: 'Inactive', address: '456 Art Street' },
    { id: '13', name: 'Software Solutions Ltd.', category: 'Software', status: 'Active', address: '789 Code Blvd' },
    { id: '14', name: 'Hardware Hub', category: 'Electronics', status: 'Active', address: '101 Tool Road' },
    { id: '15', name: 'Global Supplies Inc.', category: 'Electronics', status: 'Active', address: '123 Tech Lane' },
    { id: '16', name: 'Artisan Crafts Co.', category: 'Handicrafts', status: 'Inactive', address: '456 Art Street' },
    { id: '17', name: 'Software Solutions Ltd.', category: 'Software', status: 'Active', address: '789 Code Blvd' },
    { id: '18', name: 'Hardware Hub', category: 'Electronics', status: 'Active', address: '101 Tool Road' },
    { id: '19', name: 'Global Supplies Inc.', category: 'Electronics', status: 'Active', address: '123 Tech Lane' },
    { id: '20', name: 'Artisan Crafts Co.', category: 'Handicrafts', status: 'Inactive', address: '456 Art Street' },
    { id: '21', name: 'Software Solutions Ltd.', category: 'Software', status: 'Active', address: '789 Code Blvd' },
    { id: '24', name: 'Hardware Hub', category: 'Electronics', status: 'Active', address: '101 Tool Road' },

];

const Template = ({ title, columns, openForm, data, AddNewLabel, isLoding }) => {
    const [vendors, setVendors] = useState(data);
    const [filteredVendors, setFilteredVendors] = useState(data);
    const [filters, setFilters] = useState({
        search: '',
        category: undefined,
    });

    // Effect to re-filter data whenever the filters or initial data change
    useEffect(() => {
        let newFilteredData = vendors;

        // Filter by search term
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            newFilteredData = newFilteredData.filter(vendor =>
                vendor.name.toLowerCase().includes(searchTerm) ||
                vendor.address.toLowerCase().includes(searchTerm)
            );
        }

        // Filter by category
        if (filters.category) {
            newFilteredData = newFilteredData.filter(vendor => vendor.category === filters.category);
        }

        setFilteredVendors(newFilteredData);
    }, [filters, vendors]);

    const handleAddData = () => {
        openForm()
        // Logic to add new data (e.g., open a modal, redirect to a form)
        message.info('Add new vendor functionality will be here!');
    };

    const handleFilterChange = (key, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    const defaultColumn = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    return (
        <>
            
            <Space style={{ marginBottom: 16, display: 'flex', alignItems: 'center', width: '100%' }}>
                {
                    (isLoding) ? 
           
                <Skeleton.Node active={true} style={{ width: 460 }} />
                :

            <Table
                columns={columns || defaultColumn}
                dataSource={data}
                locale={{ emptyText: 'No data found' }}
                style={{ width: '100%' }}
                tableLayout='fixed'
                rowKey="id"
                rowClassName="cursor-pointer even:bg-gray-100 odd:bg-gray-300 even:text-gray-600 hover:text-gray-800 transition-colors duration-200"
                // loading={{ spinning: true , indicator:<Skeleton.Node active={true} className='' /> }}
                // components={() => <Skeleton.Node active={true} style={{ width: 460 }} />}

            // headerClassName="bg-gray-800 text-white"

            />
                }
            </Space>
        </>
    );
};

export default Template;