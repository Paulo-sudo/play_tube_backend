const {Router} = require("express");
const BotController= require("./src/controller/BotController")
const cors = require("cors");

const routes = new Router();

var corsOptions = { origin: "*" };

routes.use(cors(corsOptions));
routes.options("*", cors(corsOptions));


routes.post("/find", cors(corsOptions), BotController.Find);

module.exports = routes;
