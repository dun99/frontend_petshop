import axiosClient from "./axiosClient";

const orderItemApi = {
  createOrderItem: (order) => {
    const url = "/order-item";
    return axiosClient.post(url, order);
  },

  getListOrderItemByUserId: (params) => {
    const url = "/order-item";
    return axiosClient.get(url, { params });
  },

  getAll: (params) => {
    const url = "/order-item";
    return axiosClient.get(url, { params });
  },

  getById: (id) => {
    const url = `/order-item/${id}`;
    return axiosClient.get(url);
  },

  update: (data) => {
    const url = `/order-item/${data.id}`;
    return axiosClient.put(url, data);
  },

  delete: (id) => {
    const url = `/order-item/${id}`;
    return axiosClient.delete(url);
  },
};

export default orderItemApi;
