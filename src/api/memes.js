import { trackPromise } from "react-promise-tracker";

import client from "./client";

const base = "/api/memes";

export const getAllMemes = (limit) => {
  if (limit) return trackPromise(client.get(`${base}/?limit=${limit}`));
  return trackPromise(client.get(base + "/"));
};
