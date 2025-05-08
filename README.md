# Reto Técnico: Procesamiento de Transacciones Bancarias (CLI)

## Objetivo:

Desarrollar una aplicación de línea de comandos (CLI) que procese un archivo CSV con transacciones bancarias y genere un reporte que incluya:

- **Balance Final:**  
  Suma de los montos de las transacciones de tipo "Crédito" menos la suma de los montos de las transacciones de tipo "Débito".

- **Transacción de Mayor Monto:**  
  Identificar el ID y el monto de la transacción con el valor más alto.

- **Conteo de Transacciones:**  
  Número total de transacciones para cada tipo ("Crédito" y "Débito").

## Enfoque y Solución
La lógica implementada comienza leyendo y almacenando los datos del archivo CSV en una variable. Para ello, decidí convertir cada fila del archivo en un objeto JSON utilizando la librería `csv-parser`. Esta herramienta permite transformar cada línea del CSV en un objeto, donde los encabezados del archivo se convierten en claves, y los valores correspondientes en sus respectivos valores. Al final de este proceso, se obtiene un array de objetos que representan todas las transacciones.

Luego, se desarrollaron funciones específicas para cumplir con los requerimientos del reto.

### Balance Final
Para calcular el balance, primero obtuve la suma de los montos de las transacciones de cada tipo y luego resté ambas, en el orden solicitado. Para facilitar este proceso, creé una función que filtra las transacciones según su tipo, lo que permite calcular de forma precisa la suma de los montos de cada categoría.

Funciones utilizadas:
  - `obtenerTransaccionesPorTipo(transacciones: Transaccion[], tipo: TipoTransaccion): Transaccion[]`
  
  - `calcularMontoTotalPorTipo(transacciones: Transaccion[], tipo: TipoTransaccion): Decimal`
  
  - `calcularBalanceFinal(transacciones: Transaccion[]): Decimal`

### Transacción de Mayor Monto
Para este punto se utilizó el método `reduce` para recorrer el array de transacciones e ir comparando los montos de cada uno de los objetos. De esta manera, en cada iteración se va conservando la transacción con el monto más alto encontrado hasta ese momento.

Función utilizada:
  - `obtenerTransaccionConMayorMonto(transacciones: Transaccion[]): Transaccion`


### Conteo de Transacciones 
Para contar la cantidad de transacciones por tipo, se reutilizó la función que filtra las transacciones por tipo, y luego se contó la longitud de los arrays resultantes.

Funciones utilizadas:
  - `obtenerTransaccionesPorTipo(transacciones: Transaccion[], tipo: TipoTransaccion): Transaccion[]`
  
  - `obtenerNumTransaccionesPorTipo(transacciones: Transaccion[], tipo: TipoTransaccion): number`

## Estructura del Proyecto

```text
├── README.md  
├── eslint.config.js  
├── node_modules
├── package-lock.json  
├── package.json  
├── src  
│   ├── config  
│   │   └── config.ts  
│   ├── data  
│   │   ├── data.csv  
│   │   └── data2.csv  
│   ├── index.ts  
│   ├── interfaces  
│   │   └── transaccionInterface.ts  
│   ├── mappers  
│   │   └── transaccionMapper.ts  
│   ├── services  
│   │   └── transaccionesService.ts  
│   └── utils  
│       └── archivoUtils.ts  
└── tsconfig.json
```

Tal como se muestra en el árbol de arriba, el contenido principal de la aplicación se centra en la carpeta `src`. Dentro de esta, se encuentran el archivo principal `index.ts` y las siguientes subcarpetas con sus respectivos archivos:

### config 
Contiene configuraciones generales del proyecto.
  - `config.ts`: Contiene las constantes necesarias para la aplicación, como la ruta del archivo CSV de entrada.

### data
Almacena el archivo `.csv` que contienen las transacciones bancarias de entrada.

### interfaces
Define las estructuras necesarias para tipar correctamente los datos utilizados.
  - `transaccionInterface.ts`: Define la interfaz `Transaccion`, que especifica la estructura de una transacción bancaria.

### mappers
Encapsula la lógica de transformación de datos crudos a objetos válidos.
  - `transaccionMapper.ts`: Contiene una función que transforma los datos de entrada del `.csv` a objetos de tipo `Transaccion`.

### services
Reúne archivos involucrados con la lógica del negocio. Esta capa centraliza las operaciones clave del sistema.
  - **transaccionService.ts**: Agrupa las funciones principales de la aplicación, como el cálculo del balance, transacciones mayores y conteo por tipo. 

### utils
Incluye funciones auxiliares de apoyo.
  - **archivoUtil.ts**: Define la función  
  `leerArchivoCSV(rutaArchivoCSV: string, callback: (transacciones: Transaccion[]) => void): void`  
  encargada de leer y parsear archivos CSV. Cada fila del archivo se transforma en un objeto de tipo `Transaccion`, y el conjunto de transacciones procesadas se retorna mediante un callback.

### index.ts
Este es el punto de entrada de aplicación.

Se le añadió una funcionalidad adicional que permite pasar la ruta de un archivo CSV como argumento desde la línea de comandos, en caso se quiera probar con un archivo personalizado. Si no se especifica ningún argumento, se utiliza por defecto el archivo ubicado en `src/data/data.csv`.

El archivo `index.ts` se encarga de:
  - Leer los argumentos desde la línea de comandos para obtener la ruta del archivo CSV, en caso no exista alguno se toma el valor por defecto.

  - Verificar si el archivo existe en la ruta indicada; de lo contrario, se finaliza el proceso.

  - Llamar a la función `leerArchivoCSV` para procesar los datos del archivo.  A partir de los datos obtenidos, se ejecutan las siguientes funciones:
    - Calcular el balance final.

    - Obtener la transacción con el monto más alto.

    - Contar la cantidad de transacciones por tipo (“Crédito” y “Débito”).

  - Finalmente, mostrar un reporte con los resultados en la consola.

## Instrucciones de Ejecución
Para ejecutar correctamente esta aplicación, asegúrese de contar con los siguientes requisitos:

  - Node.js versión **22.7.0** o superior
  - `npm` instalado

### Pasos para ejecutar
1. Instalar las dependencias del proyecto
  ```bash
  npm install
  ```

2.	Ejecutar la aplicación
  ```bash
  npm start
  ```

Si desea probar con su propio archivo CSV, puede proporcionar la ruta como argumento
  ```bash
  npm start /Users/user/data/data.csv
  ```

⚠️ **Recuerda:** Solo debe pasarse un único argumento. Si se proporciona más de uno, la aplicación finalizará automáticamente.