import styled from 'styled-components'
import { Row } from 'antd'

export const WrapperHomePage = styled(Row)`
    padding: 10px 64px 0;
    background-color: #efefef;
    height: 1000px;
`

export const WrapperSlider = styled.div`
    width: 100%;
    height: 362px;
    padding: 16px;
    background-color: #fff;
    border-radius: 4px;
    box-sizing: border-box;
`

export const WrapperCardProduct = styled.div`
    width: 100%;
    display: flex; 
    align-items: center;
    gap: 10px; 
    background-color: #fff; 
    margin-top: 20px;
    padding: 20px;
    border-radius: 4px; 
    box-sizing: border-box;
`

export const WrapperNavbar = styled.div`
    width: 95%;
    height: 600px;
    background-color: white;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;
    overflow-y: scroll;
    scrollbar-width: none;
    position: sticky;
    left: 0;
    top: 0;
`