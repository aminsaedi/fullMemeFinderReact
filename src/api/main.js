import { trackPromise } from "react-promise-tracker";

import client from "./client";

export const getWelcomeMessage = () => trackPromise(client.get("/"));
