import apiInstance from "../utils/axios";

export const register = async (data) =>
  await apiInstance.post("/auth/register", data).then((res) => res.data);
