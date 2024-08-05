import { Router } from "express";
import * as UsersController from "./users.controller";
import { requestValidator } from "../../middlewares";
import { User } from "./users.model";

const router = Router();

router.post("/login", requestValidator({ body: User}), UsersController.login);
router.post("/register", requestValidator({ body: User}), UsersController.register);

export default router;
