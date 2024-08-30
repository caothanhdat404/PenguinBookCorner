import styled from 'styled-components'
import { InputNumber } from 'antd'


export const WrapperNameProduct = styled.h1`
    margin: 0 0 4px;
    color: rgb(36, 36, 36);
    font-size: 24px;
    font-weigh: 300;
    line-height: 32px;
    word-break: break-word;
`

export const TextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120);
`

export const PriceProduct = styled.div`
    background: rgb(250, 250, 250);
    border-radius: 4px;
`

export const PriceTextProduct = styled.h1`
    font-size: 32px;
    line-height: 40PX;
    font-weight: 500;
    margin-right: 8px;
    margin-top: 10px;
`

export const AddressCustomer = styled.div`
    span.address {
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis
    },

    span.change-address {
        color: rgb(11, 116, 229);
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;

        &:hover {
            cursor: pointer;
        }
    }
`

export const QualityProduct = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    border-radius: 4px;
    width: 120px;
    border: 1px solid #ccc;
    margin: 10px 0;
    
    button {
        border: none;
        background: transparent;
    }
`

export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number.ant-input-number-sm {
        width: 60px;
        border-top: none;
        border-bottom: none;
        
        &.ant-input-number-handler-wrap {
            display: none;
        }
    }

`
