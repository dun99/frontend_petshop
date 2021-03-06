import { Select, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { updateUserForAdmin } from "redux/authSlice";
import { fetchUser } from "redux/userSlice";

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
  }, []);

  const updateRoleUser = (value, record) => {
    dispatch(
      updateUserForAdmin({
        ...record,
        role: value,
      })
    );
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
      title: "name",
      dataIndex: "name",
      key: "name",
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
