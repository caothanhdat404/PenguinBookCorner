import { Upload } from 'antd'
import styled from 'styled-components'

export const WrapperProfile = styled.div`
    padding: 116px 240px 20px;
    background-color: #efefef;
    height: 600px;
`

export const WrapperHeaderProfile = styled.div`
    width: 100%;
    height: 35px;
    padding: 5px 0;
    box-sizing: border-box;
    color: #333;
    font-size: 16px;
    font-weight: 600;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    height: 550px;
    background-color: #fff;
    padding: 16px;
    border-radius: 4px;
`

export const WrapperInput = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    width: 700px;
    margin: 0 auto;
`

export const WrapperLabel = styled.label`
    color: #000;
    font-size: 12px;
    line-height: 30px;
    font-weight: 600;
    min-width: 70px;
`
export const WrapperUploadFile = styled(Upload)`
    &.ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%
    }
    &.ant-upload-list-item-info {
        display: none
    }
`