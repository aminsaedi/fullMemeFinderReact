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

/**
 * api request to retest user telegram account setting to defualt values
 * @param {password} user account password
 * @returns Promis of state of reseting user telegram account
 */
export const resetTelegram = (password) =>
  trackPromise(client.post(base + "/resetTelegram", { password }));
