import React from 'react'
import { CheckCircleFilled, TransactionOutlined, RedoOutlined, TruckFilled, TagFilled } from '@ant-design/icons'
import { WrapperUndertakeHeader, WrapperUndertake, WrapperTag, Tag } from './style'
const UndertakeComponent = () => {
  return (
    <div>
        <WrapperUndertakeHeader>
            <WrapperUndertake>
                <div style={{color: 'rgb(26, 148, 255)', fontSize: '14px'}}>Cam kết</div>
                <WrapperTag>
                    <Tag>
                        <CheckCircleFilled style={{color: 'rgb(26, 148, 255)', paddingRight: '2px'}} />
                        <div>100% Hàng thật</div>
                    </Tag>
                    <Tag>
                        <TransactionOutlined style={{color: 'rgb(26, 148, 255)', paddingRight: '2px'}}/> 
                        <div>Hoàn trả 200% nếu hàng giả</div>
                    </Tag>
                    <Tag>
                        <RedoOutlined style={{color: 'rgb(26, 148, 255)', paddingRight: '2px'}}/>
                        <div>30 ngày đổi trả</div>
                    </Tag>
                    <Tag>
                        <TruckFilled style={{color: 'rgb(26, 148, 255)', paddingRight: '2px'}}/>
                        <div>Giao nhanh 2h</div>
                    </Tag>
                    <Tag>
                        <TagFilled style={{color: 'rgb(26, 148, 255)', paddingRight: '2px'}}/>
                        <div>Giá siêu rẻ</div>
                    </Tag>
                </WrapperTag>
            </WrapperUndertake>
        </WrapperUndertakeHeader>
    </div>
  )
}

export default UndertakeComponent