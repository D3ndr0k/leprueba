import { Router } from "express";
import { apply, login } from "../controllers/apply.controllers.js";

const router = Router();

router.post("/apply", apply);

router.post("/login", login);

// router.post("/logout", logout);

export default router;
