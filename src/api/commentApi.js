import axiosClient from "./axiosClient";

const commentApi = {
  getAll: (productId) => {
    const url = `/comments/product/${productId}`;
    return axiosClient.get(url);
  },

  create: (data) => {
    console.log("comment dtaa", data);
    const url = "/comments";
    return axiosClient.post(url, data);
  },
};

export default commentApi;
