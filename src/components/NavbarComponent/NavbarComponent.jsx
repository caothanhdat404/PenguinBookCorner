import React from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { StyleMenu } from './style'
const items = [
    {
        key: 'sub1',
        label: 'VĂN HỌC',
        icon: <MailOutlined />,
        children: [
            {
                key: '1.1',
                label: 'Văn Học Đương Đại',
            },
            {
                key: '1.2',
                label: 'Văn Học Cổ Điển',
            },
            {
                key: '1.3',
                label: 'Truyện Ngắn/Tản Văn',
            },
            {
                key: '1.4',
                label: 'Tình Cảm/Lãng Mạn',
            },
            {
                key: '1.5',
                label: 'Truyện Lịch Sử',
            },
            {
                key: '1.6',
                label: 'Truyện Kinh Dị',
            },
            {
                key: '1.7',
                label: 'Truyện Trinh Thám',
            },
            {
                key: '1.8',
                label: 'Phóng Sự/Ký Sự',
            },
            {
                key: '1.9',
                label: 'Light Novel',
            },
        ],
    },
    {
        key: 'sub2',
        label: 'KHOA HỌC',
        icon: <AppstoreOutlined />,
        children: [
            {
                key: '2.1',
                label: 'Khoa Học Tự Nhiên',
            },
            {
                key: '2.2',
                label: 'Khoa Học Xã Hội',
            },
        ],
    },
    {
        key: 'sub3',
        label: 'THIẾU NHI',
        icon: <MailOutlined />,
        children: [
            {
                key: '3.1',
                label: 'Truyện Cổ Tích/Ngụ Ngôn',
            },
            {
                key: '3.2',
                label: 'Sách Tranh',
            },
            {
                key: '3.3',
                label: 'Kiến Thức Bách Khoa',
            },
        ],
    },
    {
        key: 'sub4',
        label: 'KINH TẾ',
        icon: <MailOutlined />,
        children: [
            {
                key: '4.1',
                label: 'Quản Trị Kinh Doanh',
            },
            {
                key: '4.2',
                label: 'Marketing/Bán Hàng',
            },
            {
                key: '4.3',
                label: 'Tài Chính/Kế Toán',
            },
            {
                key: '4.4',
                label: 'Quản Trị Nhân Sự',
            },
            {
                key: '4.5',
                label: 'Câu Chuyện Kinh Doanh',
            },
        ],
    },
    {
        key: 'sub5',
        label: 'KỸ NĂNG',
        icon: <MailOutlined />,
        children: [
            {
                key: '5.1',
                label: 'Kỹ Năng Sống',
            },
            {
                key: '5.2',
                label: 'Kỹ Năng Công Việc',
            },
        ],
    },
    {
        key: 'sub6',
        label: 'TRUYỆN TRANH',
        icon: <MailOutlined />,
        children: [
            {
                key: '6.1',
                label: 'Manga',
            },
            {
                key: '6.2',
                label: 'Comic',
            },
            {
                key: '6.3',
                label: 'Truyện Tranh',
            },
        ],
    },
    {
        key: 'sub7',
        label: 'SGK/STK',
        icon: <MailOutlined />,
        children: [
            {
                key: '7.1',
                label: 'Lớp 1',
            },
            {
                key: '7.2',
                label: 'Lớp 2',
            },
            {
                key: '7.3',
                label: 'Lớp 3',
            },
            {
                key: '7.4',
                label: 'Lớp 4',
            },
            {
                key: '7.5',
                label: 'Lớp 5',
            },
            {
                key: '7.6',
                label: 'Lớp 6',
            },
            {
                key: '7.7',
                label: 'Lớp 7',
            },
            {
                key: '7.8',
                label: 'Lớp 8',
            },
            {
                key: '7.9',
                label: 'Lớp 9',
            },
            {
                key: '7.10',
                label: 'Lớp 10',
            },
            {
                key: '7.11',
                label: 'Lớp 11',
            },
            {
                key: '7.12',
                label: 'Lớp 12',
            },
        ],
    },
    {
        key: 'grp',
        type: 'group',
        children: [
            { key: '13', label: 'VĂN PHÒNG PHẨM' },
            { type: 'divider' },
            { key: '14', label: 'KHÁC' },
        ],
    },
];

const NavbarComponent = () => {
    
    return (
        <StyleMenu
            defaultSelectedKeys={['1.1']}
            mode="inline"
            items={items}
        />
    );
};

export default NavbarComponent