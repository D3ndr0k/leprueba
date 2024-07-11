import { Router } from "express";
import { apply, login } from "../controllers/apply.controllers.js";
import { validar } from "../middlewares/validar.middleware.js";
import { registroSchema } from "../schemas/schema.js";
const router = Router();

router.post("/apply", validar(registroSchema), apply);

router.post("/login", login);

// router.post("/logout", logout);

export default router;
