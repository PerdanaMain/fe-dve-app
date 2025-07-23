import apiInstance from "../utils/axios";

export const getEquipmentList = async (page, limit, token) =>
  await apiInstance
    .get(`/equipments?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
