// These functions all take in a body and return an options object
// with the provided body and the remaining options
import {
  fetchHandler,
  getPostOptions,
  basicFetchOptions,
} from "../utils/fetchingUtils";

const baseUrl = "/api/users";

export const createUser = async ({ username, password }) => {
  return fetchHandler(baseUrl, getPostOptions({ username, password }));
};

export const getAllUsers = async () => {
  return await fetchHandler(baseUrl, basicFetchOptions);
};

export const getUser = async (id) => {
  return fetchHandler(`${baseUrl}/${id}`, basicFetchOptions);
};

export const getUserLevelInfo = async (id) => {
  return await fetchHandler(`${baseUrl}/level/${id}`, basicFetchOptions);
};

export const updateUserLevelInfo = async (id, currentExp) => {
  return await fetchHandler(`/api/users/level/${id}`, {
    credentials: "include",
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ currentExp }),
  });
};

export const updateUsername = async ({ id, username }) => {
  return fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, username }));
};
