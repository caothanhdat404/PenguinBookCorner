import styled from 'styled-components'
import { Row } from 'antd'

export const WrapperProductPage = styled(Row)`
    padding: 116px 64px 0;
    background-color: #efefef;
    height: 1200px;
`

export const WrapperCategory = styled.div`
    width: 1005;
    height: 70px;
    margin-bottom: 10px;
    padding: 16px;
    background-color: #fff; 
    box-sizing: border-box;
    display: flex;
    align-items: center;
`

export const WrapperCardProduct = styled.div`
    width: 100%;
    display: flex; 
    align-items: center;
    gap: 10px; 
    background-color: #fff; 
    margin-bottom: 10px;
    padding: 20px;
    border-radius: 4px; 
    box-sizing: border-box;
`

export const WrapperFooter = styled.div`
    width: 100%;
    height: 345px;
    padding: 16px;
    margin-bottom: 10px;
    background-color: #fff;
    border-radius: 4px;
    box-sizing: border-box;

     > div {
        border: none;
        padding-right: 40px;
        padding-left: 40px;
    }
`

export const WrapperNavbar = styled.div`
    width: 95%;
    height: 450px;
    background-color: white;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;

    div {
        margin-bottom: 8px;
        padding-left: 16px;
        font-weight: 700;
        font-size: 14px;
        line-height: 150%;
        color: rgb(39, 39, 42);
    }
`

export const WrapperSubNavbar = styled.div`
    width: 95%;
    height: 140px;
    background-color: white;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;
    margin-top: 10px;

    div {
        margin-bottom: 8px;
        padding-left: 16px;
        font-weight: 700;
        font-size: 14px;
        line-height: 150%;
        color: rgb(39, 39, 42);
    }
`