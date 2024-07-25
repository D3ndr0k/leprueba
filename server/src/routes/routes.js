import { Router } from "express";
import {
  apply,
  login,
  refresh,
  logout,
} from "../controllers/apply.controllers.js";
import { validar } from "../middlewares/validar.middleware.js";
import { registroSchema } from "../schemas/schema.js";
import authenticateToken from "../middlewares/authToken.middleware.js";
const router = Router();

router.post("/apply", validar(registroSchema), apply);

router.post("/refresh", refresh);

router.post("/login", login);

router.post("/logout", authenticateToken, logout);

router.get("/profile", authenticateToken, (req, res) => {
  if (!req.user) {
    return res.json({ error: "Unauthorized" });
  }

  res.status(200).json(req.user);
});

export default router;
