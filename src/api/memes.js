import { trackPromise } from "react-promise-tracker";

import client from "./client";

const base = "/api/memes";

export const getAllMemes = (limit) => {
  if (limit) return trackPromise(client.get(`${base}/?limit=${limit}`));
  return trackPromise(client.get(base + "/"));
};

export const getMemeById = (memeId) =>
  trackPromise(client.get(base + "/" + memeId));

export const postNewMeme = (formData) =>
  trackPromise(client.post(base, formData));

export const sendMemeOnTelegram = (memeId) =>
  trackPromise(client.get(base + "/telegram/" + memeId));

export const likeMeme = (memeId, dislike = false) =>
  trackPromise(client.put(base + "/" + memeId, { dislike }));

export const searchMemes = (
  page = 0,
  limit = 16,
  keywords,
  createdByUser = false,
  sortBy
) => {
  let stringModel = "";
  keywords && keywords.forEach((key) => {
    stringModel = stringModel.concat(`&keywords=${key}`);
  });
  console.log(`/search?page=${page}&limit=${limit}&sortBy=${sortBy}&createdByUser=${createdByUser}${stringModel}`)
  return trackPromise(
    client.get(
      base +
        `/search?page=${page}&limit=${limit}&sortBy=${sortBy}&createdByUser=${createdByUser}${stringModel}`
    )
  );
};
