import { trackPromise } from "react-promise-tracker";

import client from "./client";

const base = "/api/users";

/**
 *
 * @param {user(username,email),password} userData
 * @returns api result of calling login endpoint
 */
export const loginUser = (userData) =>
  trackPromise(client.post(base + "/login", userData));

/**
 *
 * @param {username,email,password} userData
 * @returns api result of calling register user endpoint
 */
export const registerUser = (userData) =>
  trackPromise(client.post(base + "/register", userData));
