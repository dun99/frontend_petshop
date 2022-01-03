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
import { fetchOrderItemRequest } from "redux/orderItemSlice";
import { formatMoney } from "util/formatMoney";
function OrderManagement() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const orders = useSelector((state) => state.orders.list);
  const orderItem = useSelector((state) => state.orderItem.list);
  const filters = useSelector((state) => state.orders.filters);
  const totalCount = useSelector((state) => state.orders.count);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      dispatch(fetchOrdersRequest(filters));
      dispatch(fetchOrderItemRequest());
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
      title: "No.",
      render: (text, record, index) => index + 1,
      key: "index",
    },
    {
      title: "Products",
      dataIndex: "cart",
      key: "name",
      render: (cart) => {
        return cart.map((item) => {
          return (
            <div className="item">
              <img width="100px" src={item.image} />
              <div className="item__detail">
                <div>{item.name}</div>
                <div>Quantity: {item.quantity}</div>
              </div>
            </div>
          );
        });
      },
    },
    {
      title: "Total",
      dataIndex: "orderTotalAmount",
      key: "orderTotalAmount",
      render: (orderTotalAmount) => {
        return <div>{orderTotalAmount}</div>;
      },
    },
    {
      title: "Total Quantity",
      dataIndex: "orderTotalQuantity",
      key: "orderTotalQuantity",
      render: (orderTotalQuantity) => {
        return <div>{orderTotalQuantity}</div>;
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
      <h1>Orders Management</h1>
      <Table
        loading={loading}
        columns={columns}
        dataSource={orders}
        total={totalCount}
        pagination={false}
      />
      {/* <Table
        loading={loading}
        columns={columnsOrderItem}
        dataSource={orderItem}
        total={totalCount}
        pagination={false}
      /> */}
      <PaginationApp totalCount={totalCount} />
    </>
  );
}

export default OrderManagement;
