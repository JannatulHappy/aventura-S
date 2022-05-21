import express from "express";
const router = express.Router(); //build in router in express

import { signup } from "../controllers/user.js";

router.post("/signup", signup);

export default router;
