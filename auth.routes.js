import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import expressValidator from "../middleware/expressValidator.js";
import { registerValidator, loginValidator } from "../validators/auth.validators.js";
import {
  register,
  login,
  refreshToken,
  logout,
  me
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registerValidator, expressValidator, register);
router.post("/login", loginValidator, expressValidator, login);
router.post("/refresh-token", refreshToken);
router.post("/logout", authenticate, logout);
router.get("/me", authenticate, me);

export default router;
