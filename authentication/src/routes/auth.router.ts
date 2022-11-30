import express from "express";
import {
  adminHandler,
  getAllUsersHandler,
  loginHandler,
  registerHandler,
  userHandler,
} from "../conntroller/auth.controller";
import { authorize, protect } from "../middleware/auth";
import validate from "../middleware/validate";
import { loginSchema, rigesterSchema } from "../zod_schema/auth.schema";

const router = express.Router();

router.post("/login", validate(loginSchema), loginHandler);
router.get("/users", protect, getAllUsersHandler);
router.post("/register", validate(rigesterSchema), registerHandler);

router.get("/admin", protect, authorize("ADMIN"), adminHandler);
router.get("/user", protect, userHandler);

export default router;
