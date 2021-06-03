import client from "./client";

const base = "/api/memes";

export const getAllMemes = (limit) => {
  if (limit) return client.get(`${base}/?limit=${limit}`);
  return client.get(base + "/");
};
