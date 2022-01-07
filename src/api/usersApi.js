import axiosClient from "./axiosClient";

const usersApi = {
  creatUser: (user) => {
    const url = "/users";
    return axiosClient.post(url, user);
  },

  getUserById: (id) => {
    console.log("id", id);
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },

  getAllUser: () => {
    const url = "/users";
    return axiosClient.get(url);
  },

  update: (data) => {
    const url = `/users/${data._id}`;
    return axiosClient.put(url, data);
  },
};

export default usersApi;
