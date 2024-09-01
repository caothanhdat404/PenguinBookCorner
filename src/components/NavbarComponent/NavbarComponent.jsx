import React from 'react';
import { StyleMenu } from './style'
import { useNavigate } from 'react-router-dom';

const NavbarComponent = (props) => {
    const { items, isNavigate, sendData } = props;
    const navigate = useNavigate();

    const handleChangePage = (path) => {
        navigate(`/${path}`, { replace: true });
    };

    const menuItems = items.map(item => ({
        key: item.key,
        label: item.icon ? (
            <span>{item.icon} {item.label}</span>
        ) : item.label,
        onClick: isNavigate ? () => item.path && handleChangePage(item.path) : () => sendData(item.key)
    }));

    return (
        <StyleMenu
            mode="inline"
            items={menuItems}
        />
    );
};

export default NavbarComponent;