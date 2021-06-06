import client from "./client";

const base = "/api/reports";

export const postNewReport = (report) => client.post(base, report);
