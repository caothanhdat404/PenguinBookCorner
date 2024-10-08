import styled from 'styled-components'
import { Card } from 'antd'

export const WrapperCard = styled(Card)`
    width: 200px;
    & img {
        height: 200px;
        width: 200px;
    }
`

export const NameProduct = styled.div`
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: rgb(56, 56, 61);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
`

export const WrapperReportText = styled.div`
    font-size: 11px;
    color: rgb(128, 128, 137);
    display: flex;
    align-items: center;
    margin: 6px 0 0;
`

export const WrapperPriceText = styled.div`
    color: rgb(255, 66, 78);
    font-size: 16px;
    font-weight: 500;
`

export const WrapperDiscountText = styled.span`
    color: rgb(255, 66, 78);
    font-size: 12px;
    font-weight: 500;
`
