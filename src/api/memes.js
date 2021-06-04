import { trackPromise } from "react-promise-tracker";

import client from "./client";

const base = "/api/memes";

export const getAllMemes = (limit) => {
  if (limit) return trackPromise(client.get(`${base}/?limit=${limit}`));
  return trackPromise(client.get(base + "/"));
};

export const postNewMeme = (formData) =>
  trackPromise(client.post(base, formData));

export const setMemeOnTelegram = (memeId) =>
  trackPromise(client.post(base + "/telegram" + memeId));

export const likeMeme = (memeId) => trackPromise(client.get(base + '/like/' + memeId))