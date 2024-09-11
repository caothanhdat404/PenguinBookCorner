import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader } from './style'
import { Button, Form, Input, Space } from 'antd'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import Loading from '../LoadingComponent/Loading'
import * as message from '../Message/Message'

import * as UserService from '../../services/UserService'
import { useMutationHook } from '../../hooks/useMutationHook'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../ModalComponent/ModalComponent'

const AdminUser = () => {

  const user = useSelector((state) => state?.user)

  const [rowSelected, setRowSelected] = useState('')

  const { form } = Form.useForm()

  // Lấy người dùng và render
  const getAllUser = async () => {
    const res = await UserService.getAllUser()
    return res
  }

  const queryUser = useQuery({ queryKey: ['user'], queryFn: getAllUser })
  const { isPending: isLoadingUser, data: users } = queryUser

  // Update người dùng
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isPendingUpdate, setIsPendingUpdate] = useState(false)

  const [stateUserDetail, setstateUserDetail] = useState({
    name: '',
    email: '',
    phone: '',
    isAdmin: false
  })

  const mutationUpdate = useMutationHook(
    (data) => {
      const { id, token, ...rests } = data
      const res = UserService.updateUser(id, token, { ...rests })
      return res
    },
  )

  const { data: dataUpdated, isPending: isPendingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate

  const fetchDetailUser = async (rowSelected) => {
    const res = await UserService.getDetailsUser(rowSelected)
    if (res?.data) {
      setstateUserDetail({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        isAdmin: res?.data?.isAdmin
      })
    }
    setIsPendingUpdate(false)
  }

  const handleOnChangeDetail = (e) => {
    setstateUserDetail({
      ...stateUserDetail,
      [e.target.name]: e.target.value
    })
  }

  // useEffect(() => {
  //   form.setFieldsValue(stateUserDetail)
  // }, [form, stateUserDetail])

  useEffect(() => {
    if (rowSelected) {
      setIsPendingUpdate(true)
      fetchDetailUser(rowSelected)
    }
  }, [rowSelected])

  const handleDetailUser = () => {
    setIsOpenDrawer(true)
  }

  const onUpdateUser = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateUserDetail }, {
      onSettled: () => {
        queryUser.refetch()
      }
    })
  }

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false)
    setstateUserDetail({
      name: '',
      email: '',
      phone: '',
      isAdmin: false
    })
    // form.resetFields()
  }

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success()
      handleCloseDrawer()
    } else if (isErrorUpdated) {
      message.error()
    }
  }, [isSuccessUpdated, isErrorUpdated])

  // Xóa người dùng
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)

  const mutationDelete = useMutationHook(
    (data) => {
      const { id, token } = data
      const res = UserService.deleteUser(id, token)
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

  const handleDeleteUser = () => {
    mutationDelete.mutate({ id: rowSelected, token: user?.access_token }, {
      onSettled: () => {
        queryUser.refetch()
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
        <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailUser} />
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
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('email')
    },
    {
      title: 'Admin',
      dataIndex: 'isAdmin',
      filters: [
        {
          text: 'Admin',
          value: true,
        },
        {
          text: 'Not Admin',
          value: false,
        },
      ],
      onFilter: (value, record) => {
        if (value === true) {
          return record.isAdmin = true
        } else {
          return record.isAdmin = false
        }
      }
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone - b.phone,
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction
    },
  ];

  const dataTable = users?.data?.length && users?.data?.map((user) => {
    return { ...user, key: user._id }
  })

  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <div>
        <TableComponent columns={columns} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setRowSelected(record._id)
            }
          }
        }} />
      </div>

      <DrawerComponent title='Chi tiết người dùng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
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
            onFinish={onUpdateUser}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input name of user',
                },
              ]}
            >
              <Input value={stateUserDetail['name']} onChange={handleOnChangeDetail} name="name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input email of user',
                },
              ]}
            >
              <Input value={stateUserDetail['email']} onChange={handleOnChangeDetail} name="email" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Please input phone number of user',
                },
              ]}
            >
              <Input value={stateUserDetail['phone']} onChange={handleOnChangeDetail} name="phone" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type='primary' htmlType='submit'>
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>

      <ModalComponent forceRender title="Xóa người dùng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser}>
        <Loading isLoading={isPendingDeleted}>
          <div>Xóa người dùng?</div>
        </Loading>
      </ModalComponent>
    </div>
  )
}

export default AdminUser