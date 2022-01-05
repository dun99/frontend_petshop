import axiosClient from "./axiosClient";

const usersApi = {
  creatUser: (user) => {
    const url = "/users";
    return axiosClient.post(url, user);
  },

  getUserById: (params) => {
    const url = "/users";
    return axiosClient.get(url, { params });
  },
};

export default usersApi;
