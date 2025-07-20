import apiInstance from "../utils/axios";

export const register = async (data) =>
  await apiInstance.post("/auth/register", data).then((res) => res.data);

export const login = async (data) =>
  await apiInstance.post("/auth/login", data).then((res) => res.data);

export const verifyUser = async (token) =>
  await apiInstance.get("/auth/me", {
    headers:{
      Authorization:`Bearer ${token}`
    }
  }).then((res) => res.data);
