import styled from 'styled-components'
import { Row, Radio } from 'antd'

export const WrapperPaymentPage = styled.div`
    padding: 116px 64px 0;
    background-color: #efefef;
    height: 620px;
`

export const Container = styled(Row)`

`

export const WrapperInfo = styled.div`
    padding: 20px;
    border-bottom: 1px solid #f5f5f5;
    background: #fff;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    box-sizing: border-box;
    width: 95%;
`

export const WrapperTotal = styled.div`
    width: 95%;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    box-sizing: border-box;
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