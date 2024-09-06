import React from 'react'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import { HomeOutlined } from '@ant-design/icons';

import { WrapperBreadcrumd } from '../ProductPage/style'

const ProductDetailsPage = () => {
  const { id } = useParams()
  const location = useLocation();
  const data = location.state

  const itemRender = (currentRoute, items, paths) => {
    const isLast = currentRoute?.path === items[items.length - 1]?.path;

    return isLast ? (
      <span>{currentRoute.title}</span>
    ) : (
      <Link to={`/${paths.join("/")}`}>{currentRoute.title}</Link>
    );
  }
  return (
    <div style={{ padding: '116px 120px 10px', backgroundColor: '#efefef', height: '650px' }}>
      <WrapperBreadcrumd>
        <Breadcrumb
          separator=">"
          itemRender={itemRender}
          items={[
            {
              path: '/',
              title: <HomeOutlined />,
            },
            {
              title: 'Chi tiết sản phẩm',
            },
            {
              title: data
            }
          ]}
        />
      </WrapperBreadcrumd>

      <ProductDetailsComponent idProduct={id} />
    </div>
  )
}

export default ProductDetailsPage