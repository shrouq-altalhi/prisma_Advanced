import { Teacher } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../con/db";
import { teacherSchemaType } from "../zod_schema/school.schema";

export const getAllTeacher = async (req: Request, res: Response) => {
  try {
    const teacher = await prisma.teacher.findMany();
    return res.status(200).json(teacher);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error !" });
  }
};

export const getTeacherById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as Teacher;
    const teacher = await prisma.teacher.findFirst({
      where: { id },
    });
    return res.status(200).json(teacher);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error !" });
  }
};

export const addNewTeacher = async (req: Request, res: Response) => {
  try {
    const newteacher = req.body as Teacher;
    await prisma.teacher.create({
      data: newteacher,
    });
    return res.status(201).json({ message: "New teacher added !" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error !" });
  }
};
