"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularFactorizacionQR = calcularFactorizacionQR;
var matriz_util_ts_1 = require("../utils/matriz.util.ts");
function calcularFactorizacionQR(matriz) {
    var _a;
    // Obtenemos el número de filas y columnas de la matriz
    // para realizar validaciones
    var filas = matriz.length;
    var columnas = ((_a = matriz[0]) === null || _a === void 0 ? void 0 : _a.length) || 0;
    // Verificamos que el número de columnas no sea mayor que el número de filas
    if (columnas > filas) {
        return [
            new Error("El n\u00FAmero de columnas es mayor que el n\u00FAmero de filas. No se puede calcular la factorizaci\u00F3n QR. Recibido: ".concat(filas, "x").concat(columnas)),
        ];
    }
    // Verificamos que la matriz no sea cuadrada
    if (columnas === filas) {
        return [
            new Error("La matriz no es rectangular. Recibido: ".concat(filas, "x").concat(columnas)),
        ];
    }
    // Verificamos que alguna columna no tenga ceros en su totalidad
    for (var i = 0; i < filas; i++) {
        var fila = matriz[i];
        var esCero = fila.every(function (valor) { return valor === 0; });
        if (esCero) {
            return [
                new Error("La fila ".concat(i + 1, " est\u00E1 compuesta completamente por ceros.")),
            ];
        }
    }
    var _loop_1 = function (col) {
        var columna = matriz.map(function (fila) { return fila[col]; });
        var esCero = columna.every(function (valor) { return valor === 0; });
        if (esCero) {
            return { value: [
                    new Error("La columna ".concat(col + 1, " est\u00E1 compuesta completamente por ceros.")),
                ] };
        }
    };
    // Verificamos que alguna fila no tenga ceros en su totalidad
    for (var col = 0; col < columnas; col++) {
        var state_1 = _loop_1(col);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    // Creamos las matrices Q y R iniciales con ceros
    var Q = Array.from({ length: filas }, function () {
        return Array(columnas).fill(0);
    });
    var R = Array.from({ length: columnas }, function () {
        return Array(columnas).fill(0);
    });
    // Lista de vectores ortogonales (columnas de Q)
    var vectoresOrtogonales = [];
    var _loop_2 = function (j) {
        // Tomamos la j-ésima columna de la matriz original
        var v = matriz.map(function (fila) { return fila[j]; });
        // Proyectamos el vector v sobre los vectores ortogonales anteriores
        // No entra en la primera iteración
        for (var i = 0; i < j; i++) {
            // Tomamos el i-ésimo vector ortogonal
            var q = vectoresOrtogonales[i];
            // Calculamos el coeficiente de proyección
            var r = (0, matriz_util_ts_1.productoPunto)(q, v);
            // Lo colocamos en la matriz R
            R[i][j] = r;
            // Calculamos la proyección y la restamos de v
            var proyeccion = (0, matriz_util_ts_1.multiplicarEscalar)(q, r);
            v = (0, matriz_util_ts_1.restarVectores)(v, proyeccion);
        }
        // Calculamos la norma (módulo) del vector resultante
        var moduloV = (0, matriz_util_ts_1.modulo)(v);
        R[j][j] = moduloV;
        // Normalizamos v para obtener el vector unitario qj
        // y lo almacenamos en la lista de vectores ortogonales
        var qj = (0, matriz_util_ts_1.multiplicarEscalar)(v, 1 / moduloV);
        vectoresOrtogonales.push(qj);
        // Asignamos qj como columna j de Q
        for (var fila = 0; fila < filas; fila++) {
            Q[fila][j] = qj[fila];
        }
    };
    // Aplicación del algoritmo de Gram-Schmidt
    for (var j = 0; j < columnas; j++) {
        _loop_2(j);
    }
    // Devolvemos las matrices resultantes
    return [null, { matrizQ: Q, matrizR: R }];
}
