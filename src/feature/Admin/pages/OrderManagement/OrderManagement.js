import { Select, Space, Table } from "antd";
import PaginationApp from "components/Pagination/Pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  deleteOrderRequest,
  fetchOrdersRequest,
  updateOrderRequest,
} from "redux/ordersSlice";
import { formatMoney } from "util/formatMoney";
function OrderManagement() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const orders = useSelector((state) => state.orders.list);
  const filters = useSelector((state) => state.orders.filters);
  const totalCount = useSelector((state) => state.orders.count);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      dispatch(fetchOrdersRequest(filters));
      setLoading(false);
    }, 1000);
  }, [filters]);

  const updateOrder = (value, record) => {
    const newOrder = {
      ...record,
      orderStatus: value,
    };
    dispatch(updateOrderRequest(newOrder));
  };

  const handleDeleteOrder = (record) => {
    dispatch(deleteOrderRequest(record));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Products",
      dataIndex: "cart",
      key: "name",
      render: (cart) => {
        return cart.cartItem.map((item) => {
          return (
            <>
              <p>{item.name}</p>
              <span>Quantity: {item.quantity}</span>
            </>
          );
        });
      },
    },
    {
      title: "Total",
      dataIndex: "cart",
      key: "total",
      render: (cart) => {
        return <div>{formatMoney(cart.cartTotalAmount)}</div>;
      },
    },
    {
      title: "Customer",
      dataIndex: "info",
      key: "info",
      render: (info) => {
        return (
          <>
            <div>Name: {info.name}</div>
            <div>Address: {info.address}</div>
            <div>Phone: {info.phone}</div>
          </>
        );
      },
    },
    {
      title: "Status",
      key: "orderStatus",
      dataIndex: "orderStatus",
      render: (status, record) => {
        return (
          <>
            <Select
              defaultValue={record.orderStatus}
              style={{ width: 120 }}
              onChange={(value) => updateOrder(value, record)}
            >
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="confirm">Confirm</Select.Option>
              <Select.Option value="shipping">Shipping</Select.Option>
              <Select.Option value="success">Success</Select.Option>
            </Select>
          </>
        );
      },
      filters: [
        {
          text: "pending",
          value: "pending",
        },
        {
          text: "confirm",
          value: "confirm",
        },
        {
          text: "shipping",
          value: "shipping",
        },
        {
          text: "success",
          value: "success",
        },
      ],
      onFilter: (value, record) => {
        return record.orderStatus.indexOf(value) === 0;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleDeleteOrder(record)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ToastContainer autoClose={2000} />
      <Table
        loading={loading}
        columns={columns}
        dataSource={orders}
        total={totalCount}
        pagination={false}
      />
      <PaginationApp totalCount={totalCount} />
    </>
  );
}

export default OrderManagement;
