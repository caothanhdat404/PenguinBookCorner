import React from 'react'
import { CheckCircleFilled, TransactionOutlined, RedoOutlined, TruckFilled, TagFilled } from '@ant-design/icons'

const UndertakeComponent = () => {
    return (
        <div>
            <div className="py-3 border-b border-gray-300 bg-white hover:cursor-pointer">
                <div className="flex items-center px-6">
                    <div className="text-blue-600 text-sm">Cam kết</div>
                    <div className="flex gap-3 pl-2 text-xs items-center">
                        <div className="flex items-center">
                            <CheckCircleFilled className="text-blue-600 pr-1" />
                            <div>100% Hàng thật</div>
                        </div>
                        <div className="flex items-center">
                            <TransactionOutlined className="text-blue-600 pr-1" />
                            <div>Hoàn trả 200% nếu hàng giả</div>
                        </div>
                        <div className="flex items-center">
                            <RedoOutlined className="text-blue-600 pr-1" />
                            <div>30 ngày đổi trả</div>
                        </div>
                        <div className="flex items-center">
                            <TruckFilled className="text-blue-600 pr-1" />
                            <div>Giao nhanh 2h</div>
                        </div>
                        <div className="flex items-center">
                            <TagFilled className="text-blue-600 pr-1" />
                            <div>Giá siêu rẻ</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UndertakeComponent