import * as express from "express";
import db from "../db";

const router = express.Router();

// Returns a list of tag names
router.get("/", async (req, res) => {
  try {
    let tags = await db.Tags.all();
    res.json(tags);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Returns all blogs associated a tag
router.get("/filter/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let filteredBlogs = await db.Tags.filter(id);
    res.json(filteredBlogs[0]);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Returns all tags associated with a blog
router.get("/forBlogs/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let tags = await db.Tags.tagsPerBlog(id);
    res.json(tags);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
