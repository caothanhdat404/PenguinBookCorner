import React, { useEffect, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Form, Input, Modal } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import Loading from '../LoadingComponent/Loading'
import * as message from '../Message/Message'

import * as ProductService from '../../services/ProductService'
import { useMutationHook } from '../../hooks/useMutationHook'
import { getBase64 } from '../../utils'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [stateProduct, setStateProduct] = useState({
    name: '',
    type: '',
    countInStock: '',
    price: '',
    rating: '',
    description: '',
    image: ''
  })

  const [stateProductDetail, setStateProductDetail] = useState({
    name: '',
    type: '',
    countInStock: '',
    price: '',
    rating: '',
    description: '',
    image: ''
  })

  const { form } = Form.useForm()

  const mutation = useMutationHook(
    (data) => {
      const { name, type, countInStock, price, rating, description, image } = data
      const res = ProductService.createProduct({ name, type, countInStock, price, rating, description, image })
      return res
    }
  )

  const getAllProduct = async () => {
    const res = await ProductService.getAllProduct()
    return res
  }

  const fetchDetailProduct = async (rowSelected) => {
    const res = await ProductService.getDetailProduct(rowSelected)
    if (res?.data) {
      setStateProductDetail({
        name: res?.data?.name,
        type: res?.data?.type,
        countInStock: res?.data?.countInStock,
        price: res?.data?.price,
        rating: res?.data?.rating,
        description: res?.data?.description,
        image: res?.data?.image
      })
    }
  }

  useEffect(() => {
    form.setFieldsValue(stateProductDetail)
  }, [form, stateProductDetail])

  useEffect(() => {
    if (rowSelected) {
      fetchDetailProduct(rowSelected)
    }
  }, [rowSelected])

  const handleDetailProduct = () => {
    if (rowSelected) {
      fetchDetailProduct()
    }
    setIsOpenDrawer(true)
  }

  const { data, isPending, isSuccess, isError } = mutation

  const { isPending: isLoadingProducts, data: products } = useQuery({ queryKey: ['product'], queryFn: getAllProduct })

  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} />
        <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailProduct} />
      </div>
    )
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
    }, {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction
    },
  ];

  const dataTable = products?.data?.length && products?.data?.map((product) => {
    return { ...product, key: product._id }
  })

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
    form.resetFields()
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

  const handleOnChangeDetail = (e) => {
    setStateProductDetail({
      ...stateProductDetail,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeImage = async (fileList) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview
    })
  }

  const handleOnchangeImageDetail = async (fileList) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setStateProductDetail({
      ...stateProductDetail,
      image: file.preview
    })
  }

  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ margin: '20px 0' }}>
        <Button style={{ height: '150px', width: '150px', borderRadius: '4px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}><PlusOutlined style={{ fontSize: '60px' }} /></Button>
      </div>
      <div>
        <TableComponent columns={columns} data={dataTable} isLoading={isLoadingProducts} onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setRowSelected(record._id)
            }
          }
        }} />
      </div>
      <Modal title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} onOk={onFinish}>
        <Loading isLoading={isPending}>
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={onFinish}
            autoComplete="on"
            form={form}
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
              <Input value={stateProduct.name} onChange={handleOnChange} name="name" />
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
              <Input value={stateProduct.type} onChange={handleOnChange} name="type" />
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
              <Input value={stateProduct.countInStock} onChange={handleOnChange} name="countInStock" />
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
              <Input value={stateProduct.price} onChange={handleOnChange} name="price" />
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
              <Input value={stateProduct.rating} onChange={handleOnChange} name="rating" />
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
              <Input.TextArea value={stateProduct.description} onChange={handleOnChange} name="description" />
            </Form.Item>

            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: 'Please input image of product',
                },
              ]}
            >
              <WrapperUploadFile onChange={handleOnchangeImage} maxCount={1}>
                <Button >Chọn tệp</Button>
              </WrapperUploadFile>
              {stateProduct?.image && (
                <img src={stateProduct?.image} alt='avatar' style={{
                  height: '60px',
                  width: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} />
              )}
            </Form.Item>
          </Form>
        </Loading>
      </Modal>
      <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Loading isLoading={isPending}>
          <Form
            name="basic"
            labelCol={{
              span: 2,
            }}
            wrapperCol={{
              span: 22,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={onFinish}
            autoComplete="on"
            form={form}
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
              <Input value={stateProductDetail.name} onChange={handleOnChangeDetail} name="name" />
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
              <Input value={stateProductDetail.type} onChange={handleOnChangeDetail} name="type" />
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
              <Input value={stateProductDetail.countInStock} onChange={handleOnChangeDetail} name="countInStock" />
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
              <Input value={stateProductDetail.price} onChange={handleOnChangeDetail} name="price" />
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
              <Input value={stateProductDetail.rating} onChange={handleOnChangeDetail} name="rating" />
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
              <Input.TextArea value={stateProductDetail.description} onChange={handleOnChangeDetail} name="description" />
            </Form.Item>

            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: 'Please input image of product',
                },
              ]}
            >
              <WrapperUploadFile onChange={handleOnchangeImageDetail} maxCount={1}>
                <Button >Chọn tệp</Button>
              </WrapperUploadFile>
              {stateProductDetail?.image && (
                <img src={stateProductDetail?.image} alt='avatar' style={{
                  height: '60px',
                  width: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} />
              )}
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
    </div >
  )
}

export default AdminProduct