import { calcularFactorizacionQR } from "../services/factorizacion-qr.service.ts";
import { redondear } from "../utils/matematica.util.ts";
import { esMatrizValida } from "../utils/matriz.util.ts";
import { responderError } from "../utils/respuesta-error.util.ts";

export const factorizacionQR = async (req, res) => {
  // Obtenemos la matriz del cuerpo de la solicitud
  const { matriz } = req.body;

  // Verificamos que tenga valor
  if (!matriz) {
    return responderError(
      res,
      400,
      "No se ha proporcionado una matriz.",
      req.path,
      req.method,
    );
  }

  // Validamos que la matriz sea un array y que no esté vacía
  if (!esMatrizValida(matriz)) {
    return responderError(
      res,
      400,
      "La matriz no es válida.",
      req.path,
      req.method,
    );
  }

  // Obtenemos la factorización QR de ka matriz
  const [err, response] = calcularFactorizacionQR(matriz);

  // Verificamos si hubo un error
  if (err) {
    return responderError(res, 400, err.message, req.path, req.method);
  }

  // Obtenemos la matriz Q y R de la respuesta
  const { matrizQ, matrizR } = response;

  // Devolvemos la respuesta con las matrices Q y R redondeadas a 10 decimales
  return res.json({
    matrizQ: matrizQ.map((row) => row.map((value) => redondear(value, 10))),
    matrizR: matrizR.map((row) => row.map((value) => redondear(value, 10))),
  });
};
