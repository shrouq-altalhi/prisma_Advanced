import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request, Response } from "express";
import { prisma } from "../config/db";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

export const loginHandler = async (req: Request, res: Response) => {
  const { username, password } = req.body as User;
  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (!user) {
    return res.status(400).json({ message: "wrong username or password" });
  }
  const isValidPassword = await argon2.verify(user.password, password);
  if (!isValidPassword) {
    return res.status(400).json({ message: "wrong username or password" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string
  );

  return res.status(200).json({ message: "Welcom back!", token });
};

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const newUser = req.body as User;
    const hashedPassword = await argon2.hash(newUser.password);
    newUser.password = hashedPassword;
    await prisma.user.create({
      data: newUser,
    });
    return res.status(200).json({ message: "Welcom!!" });
  } catch (error) {
    console.log(error);
    const prismaError = error as PrismaClientKnownRequestError;
    return res.status(400).json({ message: prismaError.name });
  }
};

export const getAllUsersHandler = async (req: Request, res: Response) => {
  try {
    const getAllusers = await prisma.user.findMany();
    return res.status(200).json(getAllusers);
  } catch (error) {
    return res.status(500).json({ message: "Server Error!" });
  }
};

export const adminHandler = async (req: Request, res: Response) => {
  return res.status(200).json({ message: `HI ADMIN ${res.locals.user.id} 🧑‍💼` });
};

export const userHandler = async (req: Request, res: Response) => {
  return res.status(200).json({ message: `HI USER ${res.locals.user.id} 🧑‍💼` });
};
