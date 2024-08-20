import styled from 'styled-components'
import { Menu } from 'antd'

export const StyleMenu = styled(Menu)`
    width: 100%;
    border: none !important;

    li.ant-menu-item-group > div {
        padding: 0 !important;
    }
`