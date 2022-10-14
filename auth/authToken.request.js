import { Httpx } from 'https://jslib.k6.io/httpx/0.0.6/index.js';
import { check } from 'k6';

export function authenticationToken() {
  let session = new Httpx({
    baseURL: 'https:.dev/',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  let sampleUser = {
    "clientId": "F1FFE1EB-8E2E-4E5F-B4B9-6D90B30770DC",
    "clientSecret": "6967645B-1725-4762-954D-F84AA46932C8"
  };

  let Response = session.post(`authentication-service/v1/authentication/authenticate/client`, JSON.stringify(sampleUser));
  check(Response, {
    "response code was 200 for token": (res) => res.status === 200
  })

  let obj = JSON.parse(Response.body);
  let token = obj.token;
  return token;
}