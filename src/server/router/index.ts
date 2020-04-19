import * as express from "express";
import tagRouter from "./tagRouter";
import blogRouter from "./blogRouter";

const router = express.Router();

router.use("/blogs", blogRouter);

router.use("/tags", tagRouter);

export default router;
