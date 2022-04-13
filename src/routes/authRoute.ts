import express from "express";
import authController from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register/", authController.register);
router.post("/login/", authController.login);
router.get("/me/", authMiddleware.isAuthenticated, authController.me);

export default router;
