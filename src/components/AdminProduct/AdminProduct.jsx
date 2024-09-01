import React, { useEffect, useState } from 'react'
import { WrapperHeader } from './style'
import { Button, Form, Input, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import Loading from '../LoadingComponent/Loading'
import * as message from '../Message/Message'

import * as ProductService from '../../services/ProductService'
import { useMutationHook } from '../../hooks/useMutationHook'

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [stateProduct, setStateProduct] = useState({
    name: '',
    type: '',
    countInStock: '',
    price: '',
    rating: '',
    description: '',
    image: ''
  })

  const mutation = useMutationHook(
    (data) => {
      const { name, type, countInStock, price, rating, description, image } = data
      const res = ProductService.createProduct({ name, type, countInStock, price, rating, description, image })
      return res
    }
  )

  const { data, isPending, isSuccess, isError } = mutation

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success()
      handleCancel()
    } else if (isError) {
      message.error()
    }
  }, [isSuccess, isError])

  const handleCancel = () => {
    setIsModalOpen(false)
    setStateProduct({
      name: '',
      type: '',
      countInStock: '',
      price: '',
      rating: '',
      description: '',
      image: ''
    })
  }

  const onFinish = () => {
    mutation.mutate(stateProduct)
  }

  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value
    })
  }


  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ margin: '20px 0' }}>
        <Button style={{ height: '150px', width: '150px', borderRadius: '4px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}><PlusOutlined style={{ fontSize: '60px' }} /></Button>
      </div>
      <div>
        <TableComponent />
      </div>
      <Modal title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} onOk={onFinish}>
        <Loading isLoading={isPending}>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input name of product',
                },
              ]}
            >
              <Input value={stateProduct.name} onChange={handleOnChange} name="name"/>
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: 'Please input type of product',
                },
              ]}
            >
              <Input value={stateProduct.type} onChange={handleOnChange} name="type"/>
            </Form.Item>

            <Form.Item
              label="In Stock"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: 'Please input the product number in stock',
                },
              ]}
            >
              <Input value={stateProduct.countInStock} onChange={handleOnChange} name="countInStock"/>
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Please input price of product',
                },
              ]}
            >
              <Input value={stateProduct.price} onChange={handleOnChange} name="price"/>
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  message: 'Please input rating of product',
                },
              ]}
            >
              <Input value={stateProduct.rating} onChange={handleOnChange} name="rating"/>
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Please input description of product',
                },
              ]}
            >
              <Input.TextArea value={stateProduct.description} onChange={handleOnChange} name="description"/>
            </Form.Item>

            {/* <Form.Item
            label="Image"
            name="Image"
            rules={[
              {
                required: true,
                message: 'Please input image of product',
              },
            ]}
          >
            <Input value={stateProduct.image} onChange={handleOnChange} name="image"/>
          </Form.Item> */}
          </Form>
        </Loading>
      </Modal>
    </div >
  )
}

export default AdminProduct