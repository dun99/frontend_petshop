import { Select, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersRequest, updateOrderRequest } from "redux/ordersSlice";
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
    }, 2000);
  }, [filters]);

  const updateOrder = (value, record) => {
    const newOrder = {
      ...record,
      orderStatus: value,
    };
    dispatch(updateOrderRequest(newOrder));
  };

  const columns = [
    {
      title: "No.",
      render: (text, record, index) => index + 1,
      key: "index",
    },
    {
      title: "Products",
      dataIndex: "items",
      key: "name",
      render: (items) => {
        return items.map((item) => {
          console.log("item", item);
          return (
            <div className="item">
              <img width="100px" src={item.item.image} />
              <div className="item__detail">
                <div>{item.item.name}</div>
                <div>Quantity: {item.quantity}</div>
              </div>
            </div>
          );
        });
      },
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount) => {
        return <div>{formatMoney(totalAmount)}</div>;
      },
    },
    {
      title: "Quantity",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
      render: (totalQuantity) => {
        return <div>{totalQuantity}</div>;
      },
    },
    {
      title: "Customer",
      dataIndex: "info",
      key: "info",
      render: (info) => {
        return (
          <>
            <div>
              <span>
                Name: {info.lastName} {info.firstName}
              </span>
            </div>
            <div>
              Address: {info.desc}, {info.district}, {info.city}
            </div>
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
  ];

  return (
    <>
      <h1>Orders Management</h1>
      <Table
        loading={loading}
        columns={columns}
        dataSource={orders}
        total={totalCount}
        pagination={false}
      />
    </>
  );
}

export default OrderManagement;
