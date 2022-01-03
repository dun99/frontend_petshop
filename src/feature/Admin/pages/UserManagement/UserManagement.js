import { Select, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { deleteUser, fetchUser, updateUser } from "redux/userSlice";

function UserManagement() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const users = useSelector((state) => state.users.listUser);

  useEffect(() => {
    if (users.length > 0) return;
    setLoading(true);
    setTimeout(() => {
      dispatch(fetchUser());
      setLoading(false);
    }, 2000);
  }, [users]);

  const updateRoleUser = (value, record) => {
    dispatch(
      updateUser({
        ...record,
        role: value,
      })
    );
  };

  const handleDeleteUser = (record) => {
    dispatch(deleteUser(record.id));
  };

  const columns = [
    {
      title: "No.",
      key: "index",
      render: (text, record) => <span>{users.indexOf(record) + 1}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Nickname",
      dataIndex: "nickname",
      key: "nickname",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role, record) => {
        return (
          <>
            <Select
              defaultValue={role}
              style={{ width: 120 }}
              onChange={(value) => updateRoleUser(value, record)}
            >
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="customer">Customer</Select.Option>
            </Select>
          </>
        );
      },
      filters: [
        {
          text: "Admin",
          value: "Admin",
        },
        {
          text: "Customer",
          value: "Customer",
        },
      ],
      onFilter: (value, record) => {
        return record.role.indexOf(value) === 0;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleDeleteUser(record)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ToastContainer autoClose={2000} />
      <h1>Users Management</h1>
      <Table
        loading={loading}
        columns={columns}
        dataSource={users}
        pagination={false}
      />
    </>
  );
}

export default UserManagement;
