import { create } from "apisauce";

import {getToken} from '../auth/storage'

const client = create({ baseURL: "http://172.20.10.3:9000" });

client.addAsyncRequestTransform(async (request) => {
    const authToken =  getToken();
    if (!authToken) return;
    request.headers["x-auth-token"] = authToken;
  });

export default client;
