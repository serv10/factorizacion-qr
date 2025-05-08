# API Refactorización QR
Este servicio proporciona una API que calcula la factorización QR de una matriz utilizando el algoritmo de Gram-Schmidt.

## Instrucciones de Ejecución
Para ejecutar correctamente esta aplicación, asegúrese de contar con los siguientes requisitos:

  - Node.js versión **23.11.0** o superior
  - `npm` instalado
  - Docker

### Pasos para ejecutar localmente
1. Clonar el repositorio

2. Instalar las dependencias del proyecto
    ```bash
    npm install
    ```

3. Crear un archivo .env en la raiz del proyecto con los siguientes variables:
    ```text
    PORT=
    NODE_API_URL=
    NODE_ENV=
    HOST=
    SECRET_KEY=
    REFRESH_SECRET_KEY=
    ```

  - NODE_API_URL: Esta variable guarda la url de la api de operaciones.
  - Establece NODE_ENV=development.
  

4. Compilar la aplicación
    ```bash
    npm run build
    ```

5. Ejecutar la aplicación
    ```bash
    npm start
    ```

### Pasos para ejecutar en Docker
1. Clonar el repositorio

2. Crear una red de Docker (solo si no usas Docker Compose)  
Esto para comunicar ambas apis y establecerlas en una misma red
    ```bash
    docker network create matriz-network
    ```

3. Construir la imagen Docker
  Desde la raíz del proyecto de la API ejecutar
    ```bash
    docker build -t refactorizacion-api .
    ```

4. Crear un archivo .env en la raiz del proyecto con los siguientes variables:
    ```text
    PORT=  
    NODE_API_URL=  
    NODE_ENV=  
    HOST=  
    SECRET_KEY=  
    REFRESH_SECRET_KEY=  
    ```

  - NODE_API_URL: Debe configurarse con la URL interna del servicio de operaciones.  
  Cuando se ejecuta dentro de Docker, utiliza el nombre del servicio del contenedor (por ejemplo, operaciones-api) como hostname en lugar de localhost.

5. Ejecutar el contenedor
    ```bash
    docker run -d \
    --name factorizacion-api \
    --env-file .env \
    -p 4001:4001 \
    --network matriz-network \
    factorizacion-api
    ```

5. Acceder a la API con localhost

### Endpoint
  - POST /api/v1/factorizacion:  
  Se debe enviar en el cuerpo de la solicitud una matriz rectangular, a traves de la variable **matriz**, para obtener las matrices Q y R, la factorización de la matriz dada.  
  Cuerpo de la solicitud  
    ```json
    {
      "matriz": [
        [2,3],
        [2,4],
        [1,1]
      ]
    }
    ```

    Repuesta:
    ```json
    {
      "matrizQ": [
        [
          0.6666666667,
          -0.3333333333
        ],
        [
          0.6666666667,
          0.6666666667
        ],
        [
          0.3333333333,
          -0.6666666667
        ]
      ],
      "matrizR": [
        [
          3,
          5
        ],
        [
          0,
          1
        ]
      ]
    }
    ``` 

