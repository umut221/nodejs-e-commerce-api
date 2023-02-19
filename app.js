const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

//Route imports
const productsRouter = require("./routers/products")
const categoriesRouter = require("./routers/categories")
const ordersRouter = require("./routers/orders")
const userRouter = require("./routers/users");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");
const authRouter = require("./routers/auth")


require("dotenv/config");
const port = process.env.PORT;
const api = process.env.API_URL;
const connectionString = process.env.connection_string;

const app = express();

app.use(cors());
app.options("*", cors());

//Middlewares
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use((err, req, res, next) => {
    if(err){
        res.status(500).json({message: err});
    }
})

//Routers
app.use(`${api}/products`, productsRouter)
app.use(`${api}/categories`, categoriesRouter)
app.use(`${api}/orders`, ordersRouter)
app.use(`${api}/users`, userRouter)
app.use(`${api}/auth`, authRouter)



mongoose.set('strictQuery', false)
mongoose.connect(connectionString).then(() => {
    console.log('Connected to database.');
}).catch( (err) => {
    console.log(err);
});

app.listen(port, () => {
    console.log(`port: ${port} is listening for ${api}`);
})