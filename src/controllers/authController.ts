import { Request, Response } from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import authService from "../services/authService";

// ------------------------------------ Schemas ------------------------------------------------------------------------

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// ------------------------------------ Login Controller ---------------------------------------------------------------

async function login(req: Request, res: Response) {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json(error.message);

    const user = await authService.loginUser(value.email, value.password);
    const token = jwt.sign(
      { id: user.id, email: user.email, iat: Date.now() },
      process.env.JWT_SECRET_KEY || "secret",
      { expiresIn: "3d" }
    );
    res.status(200).send({ id: user.id, email: user.email, token });
  } catch (error) {
    console.error(error);
    res.status(400).json("Authentication failed!");
  }
}

// ------------------------------------ Register Controller ------------------------------------------------------------

async function register(req: Request, res: Response) {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json(error.message);

    await authService.registerUser(value.name, value.email, value.password);
    res.status(200).json("User created!");
  } catch (error) {
    console.error(error);
    res.status(400).json("Registration failed!");
  }
}

// ------------------------------------ Authenticated User Controller --------------------------------------------------

async function me(req: Request, res: Response) {
  const email = req.user?.email;
  if (!email) return res.status(401).json("Unauthorized");

  const user = await authService.getUser(email);
  res.status(200).send({ id: user.id, email: user.email, name: user.name });
}

export default { login, register, me };
