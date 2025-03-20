# PREENTREGA 2 PROGRAMACION BACKEND: WEBSOCKETS

Segunda Preentrega del proyecto final del curso de Programacion Backend de CoderHouse:

- Además, crear una vista “realTimeProducts.handlebars”, la cual vivirá en el endpoint **“/realtimeproducts”** en nuestro views router, ésta contendrá la misma lista de productos, sin embargo, ésta trabajará con **websockets**.

    - Al trabajar con websockets, cada vez que creemos un producto nuevo, o bien cada vez que eliminemos un producto, se debe actualizar automáticamente en dicha vista la lista.

## Consigna

- Configurar nuestro proyecto para que trabaje con Handlebars y websocket.

Aspectos a incluir

- Configurar el servidor para integrar el motor de plantillas Handlebars e instalar un servidor de socket.io al mismo.

- Crear una vista “home.handlebars” la cual contenga una lista de todos los productos agregados hasta el momento

## Nota aparte

- Tambien se han agregado caracteristicas en lo referente a persistencias de datos, mas precisamente la utilizacion de **MOONGODB** como sistema de persistencia principal.
- Tambien se han definido ENDPOINTS para trabajar con productos y carritos (aclaracion: falta trabajos sobre esos).
- Se intento optimizacion de consultas con filtros, paginacion y ordenamiento ('asc', 'desc').

## Dependencies

- `npm i express`

> **Express.js** es un framework **framework** minimalista y flexible para **Node.js** que simplifica el desarrollo de aplicaciones web y **APIs** al proporcionar características esenciales como enrutamiento, manejo de **middleware**, integración con motores de plantillas, gestión de errores, y más. Su enfoque modular y su extensibilidad permiten a los desarrolldores construir aplicaciones de manera rápida y eficiente, adaptándose a las necesidades específicas de sus proyectos. Express.js es ampliamente utilizado en la comunidad de **Node.js** debido a su facilidad de uso y su capacidad para construir aplicaciones web escalables y robustas.

- `npm i zod`

> **Zod** es una biblioteca de validación de datos para **Typescript** y **Javascript**. Proporciona una fomar simple y robusta de definir esquemas de datos y validarlos en tiempo de ejecución. Permite definir fáacilmente la estructura y restricciones de datos, y luego utilizar esos esquemas para validar entradas de usuario, datos de **API**, y mas.

- `npm i express-handlebars`

> **Handlebars** es un motor de plantillas para **JavaScript** que permite generar **HTML** de forma dinámica al combinar datos con plantillas **HTML** predefinidas. Es especialmente útil en aplicaciones web para renderizar vistas del lado del servidor con datos dinámicos.

- `npm i socket.io`

> **Socket.io** es una biblioteca de **JavaScript** que permite la comunicación bidireccional en tiempo real entre clientes web y servidores. Proporciona una abstracción sobre **WebSockets** y otros mecanismos de transporte, lo que facilita el desarrollo de aplicaciones web en tiempo real.

- `npm i mongodb`

> Controlador oficial de **MongoDB** para **Node.js**, lo que permite a las aplicaciones **Node.js** interactuar con una base de datos **MongoDB**.

- `npm i dotenv`

> **Dotenv** es una biblioteca de **Node.js** que permite cargar variables de entorno desde un archivo **.env** en tu aplicación.

- `npm i mongoose`

> **Mongoose** es una biblioteca de modelado de objetos de **MongoDB** para **Node.js**. Proporciona una solución basada en esquemas para modelar datos de aplicaciones utilizando **MongoDB**, lo que facilita la interacción con la base de datos **MongoDB** desde una aplicación **Node.js**.


- `npm i mongoose-paginate-v2`

> **mongoose-paginate-v2** proporciona funcionalidades de paginación para consultas en **MongoDB** utilizando **Mongoose**.

## devDependencies

- `npm i tailwindcss -D`

- `npm i @tailwindcss/forms -D` (Conjunto de estilos predefinidos diseñados específicamente para mejorar el aspecto y la funcionalidad de los formularios **HTML**)

## Ejecucion

- **"start"**: `node ./src/app.js`.
- **"dev"**: `node --watch ./src/app.js`

