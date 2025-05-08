import type { FactorizacionResponse } from "../interfaces/factorizacion-response.interface.ts";
import {
  modulo,
  multiplicarEscalar,
  productoPunto,
  restarVectores,
} from "../utils/matriz.util";

export function calcularFactorizacionQR(
  matriz: number[][],
): [Error?, FactorizacionResponse?] {
  // Obtenemos el número de filas y columnas de la matriz
  // para realizar validaciones
  const filas = matriz.length;
  const columnas = matriz[0]?.length || 0;

  // Verificamos que el número de columnas no sea mayor que el número de filas
  if (columnas > filas) {
    return [
      new Error(
        `El número de columnas es mayor que el número de filas. No se puede calcular la factorización QR. Recibido: ${filas}x${columnas}`,
      ),
    ];
  }

  // Verificamos que la matriz no sea cuadrada
  if (columnas === filas) {
    return [
      new Error(`La matriz no es rectangular. Recibido: ${filas}x${columnas}`),
    ];
  }

  // Verificamos que alguna columna no tenga ceros en su totalidad
  for (let i = 0; i < filas; i++) {
    const fila = matriz[i];
    const esCero = fila.every((valor) => valor === 0);
    if (esCero) {
      return [
        new Error(`La fila ${i + 1} está compuesta completamente por ceros.`),
      ];
    }
  }

  // Verificamos que alguna fila no tenga ceros en su totalidad
  for (let col = 0; col < columnas; col++) {
    const columna = matriz.map((fila) => fila[col]);
    const esCero = columna.every((valor) => valor === 0);
    if (esCero) {
      return [
        new Error(
          `La columna ${col + 1} está compuesta completamente por ceros.`,
        ),
      ];
    }
  }

  // Creamos las matrices Q y R iniciales con ceros
  const Q: number[][] = Array.from({ length: filas }, () =>
    Array(columnas).fill(0),
  );
  const R: number[][] = Array.from({ length: columnas }, () =>
    Array(columnas).fill(0),
  );

  // Lista de vectores ortogonales (columnas de Q)
  const vectoresOrtogonales: number[][] = [];

  // Aplicación del algoritmo de Gram-Schmidt
  for (let j = 0; j < columnas; j++) {
    // Tomamos la j-ésima columna de la matriz original
    let v = matriz.map((fila) => fila[j]);

    // Proyectamos el vector v sobre los vectores ortogonales anteriores
    // No entra en la primera iteración
    for (let i = 0; i < j; i++) {
      // Tomamos el i-ésimo vector ortogonal
      const q = vectoresOrtogonales[i];

      // Calculamos el coeficiente de proyección
      const r = productoPunto(q, v);

      // Lo colocamos en la matriz R
      R[i][j] = r;

      // Calculamos la proyección y la restamos de v
      const proyeccion = multiplicarEscalar(q, r);
      v = restarVectores(v, proyeccion);
    }

    // Calculamos la norma (módulo) del vector resultante
    const moduloV = modulo(v);
    R[j][j] = moduloV;

    // Normalizamos v para obtener el vector unitario qj
    // y lo almacenamos en la lista de vectores ortogonales
    const qj = multiplicarEscalar(v, 1 / moduloV);
    vectoresOrtogonales.push(qj);

    // Asignamos qj como columna j de Q
    for (let fila = 0; fila < filas; fila++) {
      Q[fila][j] = qj[fila];
    }
  }

  // Devolvemos las matrices resultantes
  return [undefined, { matrizQ: Q, matrizR: R }];
}
