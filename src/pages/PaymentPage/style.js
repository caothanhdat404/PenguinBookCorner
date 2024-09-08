import styled from 'styled-components'
import { Radio } from 'antd'

export const WrapperLeft = styled.div`
    width: 910px;
`

export const WrapperRight = styled.div`
    width: 320px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
`

export const WrapperInfo = styled.div`
    padding: 17px 20px;
    border-bottom: 1px solid #f5f5f5;
    background: #fff;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    width: 100%;
`

export const WrapperTotal = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 17px 20px;
    background: #fff;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
`

export const Label = styled.span`
    font-size: 12px;
    color: #000;
    font-weight: bold
`

export const WrapperRadio = styled(Radio.Group)`
    margin-top: 6px;
    background: rgb(240, 225, 225);
    border: 1px solid rgb(194, 225, 225);
    width: 500px;
    height: 100px;
    border-radius: 4px;
    padding: 16px;
    font-weight: normal;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
`