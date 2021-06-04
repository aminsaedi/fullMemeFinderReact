import { trackPromise } from "react-promise-tracker";

import client from "./client";

const base = "/api/memes";

export const getAllMemes = (limit) => {
  if (limit) return trackPromise(client.get(`${base}/?limit=${limit}`));
  return trackPromise(client.get(base + "/"));
};

export const postNewMeme = (formData) =>
  trackPromise(client.post(base, formData));

export const sendMemeOnTelegram = (memeId) =>
  trackPromise(client.get(base + "/telegram/" + memeId));

export const likeMeme = (memeId, dislike = false) =>
  trackPromise(client.put(base + "/" + memeId, { dislike }));
