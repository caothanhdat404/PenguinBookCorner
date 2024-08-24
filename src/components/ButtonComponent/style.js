import styled from "styled-components";
import { Button } from 'antd'

export const StyleButton = styled(Button)`
    &:disabled {
        opacity: 0.5;
    }
`