import { trackPromise } from "react-promise-tracker";

import client from "./client";

const base = "/api/keywords";

export const addNewKeyword = (title) => trackPromise(client.post(base,{title}));

export const getKeywords = () => trackPromise(client.get(base));
