import { UserController } from "../controllers/UserController";
import { AuthController } from "../controllers/AuthController";
import { Authentication } from "../middleware/auth.middleware";
import ClienteController from "../controllers/ClienteController";

const express = require('express')
const routes = express.Router();

routes.get('/users/', Authentication() ,new UserController().findAll);
routes.post('/users', new UserController().store);
routes.get('/users/:id', new UserController().findOne);
routes.put('/users/:id', new UserController().update);
routes.delete('/users/:id', new UserController().delete);
routes.get("/cliente", ClienteController.findAll);
routes.get("/cliente/:id", ClienteController.findById);
routes.post("/cliente", ClienteController.create);
routes.put("/cliente/:id", ClienteController.update);
routes.delete("/cliente/:id", ClienteController.delete);

routes.post('/auth/login', new AuthController().login)

export default routes;