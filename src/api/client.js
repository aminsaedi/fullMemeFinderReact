import { create } from "apisauce";

import {getToken} from '../auth/storage'

const client = create({ baseURL: "http://192.168.1.101:9000" });

client.addAsyncRequestTransform(async (request) => {
    const authToken =  getToken();
    if (!authToken) return;
    request.headers["x-auth-token"] = authToken;
  });

export default client;
