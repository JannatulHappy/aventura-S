import express from "express";
const router = express.Router(); //build in router in express

import { signup,signin} from "../controllers/user.js";

router.post("/signup", signup);
router.post("/signin", signin);

export default router;
