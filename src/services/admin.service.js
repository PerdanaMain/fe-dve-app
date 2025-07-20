import apiInstance from "../utils/axios";

export const getRegisteredUsers = async (token) =>
  await apiInstance.get("/admin/users", {
    headers:{
      Authorization:`Bearer ${token}`
    }
  }).then((res) => res.data);