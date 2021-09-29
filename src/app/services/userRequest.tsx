// @ts-nocheck
import { UserType } from "./user";

const http = require("http");

export default function userRequest(url: string) {
  return new Promise<UserType>((resolve) => {
    // This is an example of an http request, for example to fetch
    // user data from an API.
    // This module is being mocked in __mocks__/request.js
    http.get({ path: url }, (response) => {
      let data = "";
      response.on("data", (_data) => (data += _data));
      response.on("end", () => resolve(data));
    });
  });
}
