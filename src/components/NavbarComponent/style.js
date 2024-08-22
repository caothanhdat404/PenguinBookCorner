import styled from 'styled-components'
import { Menu } from 'antd'


export const StyleMenu = styled(Menu)`
    width: 100%;
    border: none !important;

    li > span > span {
        display: flex;
        align-items: center;

        svg {
            margin-right: 4px;
        }
    }
`