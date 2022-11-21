import { Router } from "express";
import { signUp, signIn } from "../controllers/users.controller.js";
import { signInValidation } from "../middleware/signInValidation.middleware.js";
import { signUpValidation } from "../middleware/signUpValidation.middleware.js";

const router = Router();

router.post('/signUp', signUpValidation, signUp);
router.post('/signIn', signInValidation, signIn);

export default router;