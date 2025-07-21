import apiInstance from "../utils/axios";

export const getRegisteredUsers = async (token) =>
  await apiInstance
    .get("/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

export const updateUser = async (data, token) =>
  await apiInstance
    .put(
      `/admin/activation?id=${data.id}&activate=${data.activate}`,
      null, // Use null instead of {} to indicate no request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data);
