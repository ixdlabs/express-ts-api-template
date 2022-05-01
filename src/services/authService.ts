import bcrypt from "bcrypt";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

// ------------------------------------ Login --------------------------------------------------------------------------

async function loginUser(email: string, password: string): Promise<User> {
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) throw new Error("No user found");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid password");

  return user;
}

// ------------------------------------ Register -----------------------------------------------------------------------

async function registerUser(name: string, email: string, password: string): Promise<User> {
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (user) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });

  return newUser;
}

// ------------------------------------ Get User -----------------------------------------------------------------------

async function getUser(email: string): Promise<User> {
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) throw new Error("User does not exist");
  return user;
}

export default { loginUser, registerUser, getUser };
