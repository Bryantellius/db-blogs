import * as express from "express";
import db from "../db";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let blogs = await db.Blogs.all();
    res.json(blogs.reverse());
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let blog = await db.Blogs.one(id);
    res.json(blog);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  try {
    let body = req.body;
    let blog = await db.Blogs.add(body);
    res.json(blog);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
