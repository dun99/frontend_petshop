import axiosClient from "./axiosClient";

const categoryApi = {
  getAll: (params) => {
    const url = "/categories";
    return axiosClient.get(url, { params });
  },

  getById: (id) => {
    const url = `/categories/${id}`;
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = "/categories";
    return axiosClient.post(url, data);
  },

  update: (data) => {
    const url = `/categories/${data._id}`;
    return axiosClient.put(url, data);
  },

  delete: (id) => {
    const url = `/categories/${id}`;
    return axiosClient.delete(url);
  },
};

export default categoryApi;
