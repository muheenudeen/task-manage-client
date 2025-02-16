import axios from "axios";

const BASE_URL = "https://task-manager-server-n2uz.onrender.com/api";

export const api = {
  tasks: {
    getAll: (userId) =>
      axios.get(`${BASE_URL}/user/task/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => res.data),

    add: (userId, task) =>
      axios.post(`${BASE_URL}/user/task/${userId}`, task, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => res.data),

    update: (userId, taskId, task) =>
      axios.put(`${BASE_URL}/user/${userId}/task/${taskId}`, task, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => res.data),

    delete: (userId, taskId) =>
      axios.delete(`${BASE_URL}/user/${userId}/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => res.data),

      downloadPdf: (userId) =>
        axios.get(`${BASE_URL}/user/task/pdf/${userId}`, {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
  },

  auth: {
    login: (email, password) =>
      axios.post(`${BASE_URL}/login`, { email, password }, {
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.data),

    signup: (name, email, password) =>
      axios.post(`${BASE_URL}/signup`, { name, email, password }, {
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.data),
  },
};
