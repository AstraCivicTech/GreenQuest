import {
  fetchHandler,
  getPostOptions,
  deleteOptions,
  basicFetchOptions,
} from "../utils/fetchingUtils";

const baseUrl = "/api/auth";

export const registerUser = async ({
  email,
  username,
  password,
  confirmPassword,
  zipcode,
}) => {
  if (password !== confirmPassword) {
    return [null, { message: "Passwords do not match" }];
  }
  return await fetchHandler(
    `${baseUrl}/register`,
    getPostOptions({ email, username, password, zipcode })
  );
};

export const logUserIn = async ({ username, password }) => {
  return await fetchHandler(
    `${baseUrl}/login`,
    getPostOptions({ username, password })
  );
};

export const logUserOut = async () => {
  return await fetchHandler(`${baseUrl}/logout`, deleteOptions);
};

export const checkForLoggedInUser = async () => {
  return await fetchHandler(`${baseUrl}/me`, basicFetchOptions);
};
