import * as express from "express";
import db from "../db";

const router = express.Router();

// Returns an array of all blogs
router.get("/", async (req, res) => {
  try {
    let blogs = await db.Blogs.all();
    res.json(blogs.reverse());
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Returns an array with a single blog
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

// Posts a blog
router.post("/", async (req, res) => {
  try {
    let body = req.body;
    let blog = await db.Blogs.add(body);
    await db.Tags.fill(body);
    res.json(blog);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Updates a blog
router.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;
    let blog = await db.Blogs.update(id, body);
    res.json(blog);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Deletes a blog
router.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let blog = await db.Blogs.remove(id);
    res.json(blog);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
