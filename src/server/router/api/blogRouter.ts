import * as express from "express";
import db from "../../db";

const router = express.Router();

const isAdmin: express.RequestHandler = (req: any, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.sendStatus(401);
  } else {
    next();
  }
};

// Returns one blog by id, or an array of all blogs
router.get("/:id?", async (req, res, next) => {
  let id = Number(req.params.id);
  if (id) {
    try {
      let [blog] = await db.Blogs.one(id);
      res.json(blog);
    } catch (e) {
      console.log(e);
      next(e);
    }
  } else {
    try {
      let blogs = await db.Blogs.all();
      res.json(blogs.reverse());
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
});

// Posts a blog
router.post("/", isAdmin, async (req, res, next) => {
  let body = req.body;
  console.log(`inside post`);
  try {
    await db.Blogs.add(body);
    await db.Tags.fill(body);
    res.json({ msg: `blog added` });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// Updates a blog
router.put("/:id", isAdmin, async (req, res, next) => {
  let id = Number(req.params.id);
  let body = req.body;
  try {
    await db.Blogs.update(id, body);
    res.json({ msg: `blog updated` });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// Deletes a blog
router.delete("/:id", isAdmin, async (req, res, next) => {
  let id = Number(req.params.id);
  try {
    await db.Blogs.remove(id);
    res.json({ msg: `blog deleted` });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

export default router;
