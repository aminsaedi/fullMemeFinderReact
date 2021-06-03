import client from "./client";

export const getWelcomeMessage = () => client.get("/");
