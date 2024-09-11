import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Form, Input, Select, Space } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import Loading from '../LoadingComponent/Loading'
import * as message from '../Message/Message'

import * as ProductService from '../../services/ProductService'
import { useMutationHook } from '../../hooks/useMutationHook'
import { getBase64, renderOptions } from '../../utils'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../ModalComponent/ModalComponent'

const AdminProduct = () => {
  const user = useSelector((state) => state?.user)

  const [rowSelected, setRowSelected] = useState('')

  const { form } = Form.useForm()

  // Lấy sản phẩm và render
  const getAllProduct = async () => {
    const res = await ProductService.getAllProduct()
    return res
  }

  const queryProduct = useQuery({ queryKey: ['product'], queryFn: getAllProduct })
  const { isPending: isLoadingProducts, data: products } = queryProduct

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    return res
  }

  const queryTypeProduct = useQuery({ queryKey: ['type=product'], queryFn: fetchAllTypeProduct })

  const handleOnChangeSelect = (value) => {
    setStateProduct({
      ...stateProduct,
      type: value
    })
  }

  // Tạo sản phẩm
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [stateProduct, setStateProduct] = useState({
    name: '',
    type: '',
    countInStock: '',
    price: '',
    rating: '',
    discount: '',
    description: '',
    image: '',
    newType: '',
  })

  const mutation = useMutationHook(
    (data) => {
      const { name, type, countInStock, price, rating, discount, description, image } = data
      const res = ProductService.createProduct({ name, type, countInStock, price, rating, discount, description, image })
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

  const onFinish = () => {
    const params = {
      name: stateProduct.name,
      type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
      countInStock: stateProduct.countInStock,
      price: stateProduct.price,
      rating: stateProduct.rating,
      discount: stateProduct.discount,
      description: stateProduct.description,
      image: stateProduct.image,
    }
    mutation.mutate(params, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setStateProduct({
      name: '',
      type: '',
      countInStock: '',
      price: '',
      rating: '',
      discount: '',
      description: '',
      image: ''
    })
    // form.resetFields()
  }

  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeImage = async ({fileList}) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
      file.status = 'done'
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview
    })
  }

  // Update sản phẩm
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isPendingUpdate, setIsPendingUpdate] = useState(false)

  const [stateProductDetail, setStateProductDetail] = useState({
    name: '',
    type: '',
    countInStock: '',
    price: '',
    rating: '',
    discount: '',
    description: '',
    image: ''
  })

  const mutationUpdate = useMutationHook(
    (data) => {
      const { id, token, ...rests } = data
      const res = ProductService.updateProduct(id, token, { ...rests })
      return res
    },
  )

  const { data: dataUpdated, isPending: isPendingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate

  const fetchDetailProduct = async (rowSelected) => {
    const res = await ProductService.getDetailProduct(rowSelected)
    if (res?.data) {
      setStateProductDetail({
        name: res?.data?.name,
        type: res?.data?.type,
        countInStock: res?.data?.countInStock,
        price: res?.data?.price,
        rating: res?.data?.rating,
        discount: res?.data?.discount,
        description: res?.data?.description,
        image: res?.data?.image
      })
    }
    setIsPendingUpdate(false)
  }

  const handleOnChangeDetail = (e) => {
    setStateProductDetail({
      ...stateProductDetail,
      [e.target.name]: e.target.value
    })
  }

  // useEffect(() => {
  //   form.setFieldsValue(stateProductDetail)
  // }, [form, stateProductDetail])

  useEffect(() => {
    if (rowSelected) {
      setIsPendingUpdate(true)
      fetchDetailProduct(rowSelected)
    }
  }, [rowSelected])

  const handleDetailProduct = () => {
    setIsOpenDrawer(true)
  }

  const onUpdateProduct = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateProductDetail }, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  }

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false)
    setStateProductDetail({
      name: '',
      type: '',
      countInStock: '',
      price: '',
      rating: '',
      description: '',
      image: ''
    })
    // form.resetFields()
  }



  const handleOnchangeImageDetail = async ({fileList}) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
      file.status = 'done'
    }
    setStateProductDetail({
      ...stateProductDetail,
      image: file.preview
    })
  }

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success()
      handleCloseDrawer()
    } else if (isErrorUpdated) {
      message.error()
    }
  }, [isSuccessUpdated, isErrorUpdated])

  // Delete sản phẩm
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)

  const mutationDelete = useMutationHook(
    (data) => {
      const { id, token } = data
      const res = ProductService.deleteProduct(id, token)
      return res
    },
  )

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }

  const { data: dataDeleted, isPending: isPendingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      message.success()
      handleCancelDelete()
    } else if (isErrorDeleted) {
      message.error()
    }
  }, [isSuccessDeleted, isErrorDeleted])

  const handleDeleteProduct = () => {
    mutationDelete.mutate({ id: rowSelected, token: user?.access_token }, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })

  }
  //Filter, sort, search
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);




  //Others action
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
        <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailProduct} />
      </div>
    )
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: '>= 50',
          value: '>=',
        },
        {
          text: '<= 50',
          value: '<',
        },
      ],
      onFilter: (value, record) => {
        if (value === '>=') {
          return record.price >= 50
        } else {
          return record.price < 50
        }
      }
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: '0 - 1',
          value: 0,
        },
        {
          text: '1 - 2',
          value: 1,
        },
        {
          text: '2 - 3',
          value: 2,
        },
        {
          text: '3 - 4',
          value: 3,
        },
        {
          text: '4 - 5',
          value: 4,
        },
        {
          text: '=5',
          value: 5,
        },
      ],
      onFilter: (value, record) => {
        if (value === 0) {
          return Number(record.rating) >= 0 && Number(record.rating) < 1
        } else if (value === 1) {
          return Number(record.rating) >= 1 && Number(record.rating) < 2
        } else if (value === 2) {
          return Number(record.rating) >= 2 && Number(record.rating) < 3
        } else if (value === 3) {
          return Number(record.rating) >= 3 && Number(record.rating) < 4
        } else if (value === 4) {
          return Number(record.rating) >= 4 && Number(record.rating) < 5
        } else {
          return Number(record.rating) === 5
        }
      }
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

      <ModalComponent forceRender title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} onOk={onFinish}>
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
              <Select
                name="type"
                onChange={handleOnChangeSelect}
                options={renderOptions(queryTypeProduct?.data?.data)}
                value={stateProduct.type}
              />
            </Form.Item>
            {stateProduct.type === 'add_type' && (
              <Form.Item
                label="New Type"
                name="newType"
                rules={[
                  {
                    required: true,
                    message: 'Please input type of product',
                  },
                ]}
              >
                <Input value={stateProduct.newType} onChange={handleOnChange} name="newType" />
              </Form.Item>
            )}
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
              label="Discount"
              name="discount"
              rules={[
                {
                  required: true,
                  message: 'Please input discount of product',
                },
              ]}
            >
              <Input value={stateProduct.discount} onChange={handleOnChange} name="discount" />
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
                <img src={stateProduct?.image} alt='image product' style={{
                  height: '60px',
                  width: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} />
              )}
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>

      <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Loading isLoading={isPendingUpdate || isPendingUpdated}>
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
            onFinish={onUpdateProduct}
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
              label="Discount"
              name="discount"
              rules={[
                {
                  required: true,
                  message: 'Please input discount of product',
                },
              ]}
            >
              <Input value={stateProductDetail.discount} onChange={handleOnChangeDetail} name="discount" />
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
                  // required: true,
                  message: 'Please input image of product',
                },
              ]}
            >
              <WrapperUploadFile onChange={handleOnchangeImageDetail} maxCount={1}>
                <Button >Chọn tệp</Button>
              </WrapperUploadFile>
              {stateProductDetail?.image && (
                <img src={stateProductDetail?.image} alt='image product' style={{
                  height: '60px',
                  width: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} />
              )}
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type='primary' htmlType='submit'>
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>

      <ModalComponent forceRender title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct}>
        <Loading isLoading={isPendingDeleted}>
          <div>Xóa sản phẩm?</div>
        </Loading>
      </ModalComponent>
    </div >
  )
}

export default AdminProduct