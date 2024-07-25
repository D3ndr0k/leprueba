import { Router } from "express";
import {
  apply,
  login,
  refresh,
  logout,
  getUserData,
} from "../controllers/apply.controllers.js";
import { validar } from "../middlewares/validar.middleware.js";
import { registroSchema } from "../schemas/schema.js";
import authenticateToken from "../middlewares/authToken.middleware.js";
const router = Router();

router.post("/apply", validar(registroSchema), apply);

router.post("/refresh", refresh);

router.post("/login", login);

router.post("/logout", authenticateToken, logout);

router.get("/profile", getUserData);

export default router;
