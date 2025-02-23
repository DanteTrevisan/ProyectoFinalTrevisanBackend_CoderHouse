import express from 'express';
import { PORT } from './utils/ports.js';
import { rootPath } from './utils/paths.js';
import  productsRouter  from './routes/products.route.js';
import  cartsRouter from './routes/carts.route.js';
import { apiRoute, productsRoute, cartsRoute } from './utils/routes.js';

const app = express();
app.listen(PORT, () => {
    console.log(`Server de Express.js en puerto: ${PORT}`)
})

app.use(express.urlencoded({ extended: true}))
app.use(express.static(`${rootPath}/public`))
app.use(express.json)

app.use(apiRoute + productsRoute, productsRouter)
app.use(apiRoute + cartsRoute, cartsRouter)



