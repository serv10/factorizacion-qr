export function redondear(valor: number, decimales: number = 2): number {
  const factor = 10 ** decimales;
  const redondeado = Math.round(valor * factor) / factor;
  return limpiarNumero(redondeado);
}

export function limpiarNumero(numero: number) {
  return Object.is(numero, -0) ? 0 : numero;
}
