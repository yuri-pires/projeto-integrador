import { authenticationToken } from '../../auth/authToken.request.js';
import { thresholds, check, sleep } from 'k6';
import { Httpx } from 'https://jslib.k6.io/httpx/0.0.6/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { payloadBoletoCollectionParcial } from '../payloads/solicitar-remessa-boletos.payload.js';
import http from 'k6/http';

export const options = {
  scenarios: {
    max_request_boletos: {
      executor: 'per-vu-iterations',
      startTime: '0s',
      vus: 2,
      iterations: 1,
      maxDuration: '90s',
      gracefulStop: '90s'
    },
  },
};

export function handleSummary(data) {
  return {
    "result-Solicitar-Remessa-Boletos.html": htmlReport(data)
  };
}

export default function () {
  const params = {
    timeout: '90000',
  }


  let session = new Httpx({
    baseURL: "https://pagamentos-service/v1/pagamentos",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authenticationToken()}`
    }
  })

  let Response = session.post(`/boletos`, JSON.stringify(payloadBoletoCollectionParcial()), params)
  console.log(Response.status)
  console.log(Response.body)
  check(Response, {
    'is status code 201': (r) => r.status === 201,
  })
}