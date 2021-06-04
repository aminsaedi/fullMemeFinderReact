import client from "./client";

const base = "/api/keywords";

export const addNewKeyword = (title) => client.post(base);

export const getKeywords = () => client.get(base);
