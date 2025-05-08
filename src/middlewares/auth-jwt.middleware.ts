import jwt from "jsonwebtoken";

import { SECRET_KEY } from "../configs/config.ts";
import { responderError } from "../utils/respuesta-error.util.ts";
import { extraerToken } from "../utils/token.utils.ts";

const authJWT = (req, res, next) => {
  // Obtenemos el token del encabezado de autorización
  const token = extraerToken(req.headers.authorization);

  // Verificamos si el token tiene valor
  if (!token) {
    return responderError(
      res,
      401,
      "No se ha proporcionado un token de autorización",
      req.path,
      req.method,
    );
  }

  // Verificamos el token
  jwt.verify(token, SECRET_KEY, (err, payload) => {
    // Si el token no es válido, devolvemos un error
    if (err) {
      return responderError(res, 401, err.message, req.path, req.method);
    }

    // Agregamos el payload del token al objeto de solicitud
    req.payload = payload;
    next();
  });
};

export default authJWT;
