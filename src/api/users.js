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
 * @param {password} user user account password
 * @returns Promis of state of reseting user telegram account
 */
export const resetTelegram = (password) =>
  trackPromise(client.post(base + "/resetTelegram", { password }));

/**
 *
 * @param {formData} formData formdata should contains image propery and max size is 3MB
 * @returns Promis result of upddating avatar
 */
export const updateAvatar = (formData) =>
  trackPromise(client.put(base + "/avatar", formData));

/**
 *
 * @returns user avatar image url
 */
export const getAvatar = () => trackPromise(client.get(base + "/avatar"));
