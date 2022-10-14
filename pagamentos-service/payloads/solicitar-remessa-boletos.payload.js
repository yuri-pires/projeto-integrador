import { getConta} from '../utils/utils.js'

function boletoLinhaDigitavel() {
  let payload =
  {
    "linhaDigitavel": "34191101213456788005871234570001616670000012345",
    "seuNumero": getConta(),
    "tipo": "FORNECEDORES",
    "favorecido": {
      "cnpj": "19111502000118",
      "nome": "FAVORECIDO LinhaDigitavel"
    },
    "calendario": {
      "dataVencimento": "2022-12-31",
      "dataPagamento": "2022-12-31"
    },
    "valor": {
      "nominal": "999.45"
    }
  }
  return payload;
}

function boletoCodigoBarra() {
  let payload = {
    "codigoBarras": "88999999999999999999999999999999999999999933",
    "seuNumero": getConta(),
    "tipo": "FORNECEDORES",
    "favorecido": {
      "cpf": "39111655879",
      "nome": "FAVORECIDO CodigoBarra"
    },
    "calendario": {
      "dataVencimento": "2022-12-31",
      "dataPagamento": "2022-12-31"
    },
    "valor": {
      "nominal": "888.45"
    }
  }
  return payload;
}

function payloadCollectionBoletos() {
  var payload = []
  for (let index = 0; index < 10 ; index++) {
    payload.push(boletoCodigoBarra());
    payload.push(boletoLinhaDigitavel());
  }
  return payload;
}

export function payloadBoletoCollectionParcial() {
  let payload = {
    "instituicaoFinanceira": {
      "numero": "341"
    },
    "pagador": {
      "cnpj": "64333576000153",
      "nome": "CLIENTE PAGADOR",
      "agencia": {
        "numero": "9999"
      },
      "conta": {
        "numero": "9898",
        "digito": "9"
      },
      "convenio": "84519"
    },
    "pagamentos": payloadCollectionBoletos()
  }
  return payload;
}