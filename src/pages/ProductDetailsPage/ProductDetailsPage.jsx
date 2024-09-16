import React from 'react'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import { HomeOutlined } from '@ant-design/icons';

import { WrapperBreadcrumb } from '../ProductPage/style'

function itemRender(currentRoute, params, items, paths) {
  const isLast = currentRoute?.path === items[items.length - 1]?.path;

  return isLast ? (
    <span>{currentRoute.title}</span>
  ) : (
    <Link to={`/${paths.join("/")}`}>{currentRoute.title}</Link>
  );
}

const ProductDetailsPage = () => {
  const { id } = useParams()
  const location = useLocation();
  const data = location.state

  return (
    <div style={{ padding: '116px 120px 10px', backgroundColor: '#efefef', height: '650px' }}>
      <WrapperBreadcrumb>
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
      </WrapperBreadcrumb>

      <ProductDetailsComponent idProduct={id} />
    </div>
  )
}

export default ProductDetailsPage