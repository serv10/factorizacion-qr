export const productoPunto = (vectorA: number[], vectorB: number[]) => {
  let suma = 0;

  for (let i = 0; i < vectorA.length; i++) {
    suma += vectorA[i] * vectorB[i];
  }

  return suma;
};

export const modulo = (vector: number[]) => {
  let sumaCuadrados = 0;

  for (const valor of vector) {
    sumaCuadrados += valor * valor;
  }

  return Math.sqrt(sumaCuadrados);
};

export const multiplicarEscalar = (vector: number[], escalar: number) => {
  return vector.map((valor) => valor * escalar);
};

export const restarVectores = (vectorA: number[], vectorB: number[]) => {
  return vectorA.map((valor, i) => valor - vectorB[i]);
};

export const esMatriz = (val: unknown) => {
  return (
    Array.isArray(val) &&
    val.every(
      (fila) =>
        Array.isArray(fila) && fila.every((elem) => typeof elem === "number"),
    )
  );
};

export const esMatrizValida = (val: unknown): val is number[][] =>
  esMatriz(val) && val.length > 0;
