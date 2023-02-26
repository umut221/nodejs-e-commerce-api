const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongo = require("./db/mongoConfig");
const errorHandler = require("./helpers/error-handler");

//Route imports
const productsRouter = require("./routers/products");
const categoriesRouter = require("./routers/categories");
const ordersRouter = require("./routers/orders");
const userRouter = require("./routers/users");
const authJwt = require("./helpers/jwt");
const authRouter = require("./routers/auth");

//enviroment variables
require("dotenv/config");
const port = process.env.PORT;
const api = process.env.API_URL;
const app = express();

app.use(cors());
app.options("*", cors());

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);

//Routers
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/users`, userRouter);
app.use(`${api}/auth`, authRouter);


//server options
app.listen(port, () => {
  mongo.mongoConnect();
  console.log(`port: ${port} is listening for ${api}`);
});


module.exports = app;
