import apiInstance from "../utils/axios";

export const getEquipmentList = async (page, limit, token) =>
  await apiInstance
    .get(`/equipments?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

export const postEquipment = async (data, token) =>
  await apiInstance
    .post("/equipment/create", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

export const putEquipment = async (id, data, token) =>
  await apiInstance
    .put(`/equipment/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

export const deleteEquipment = async (id, token) =>
  await apiInstance
    .delete(`/equipment/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
