import React from 'react'
import { StyleMenu } from './style'

const NavbarComponent = (props) => {
    const { items } = props
    return (
        <StyleMenu
            mode="inline"
            items={items}
        />
    );
};

export default NavbarComponent