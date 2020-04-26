import * as express from "express";
import db from "../../db";

const router = express.Router();

const isLoggedIn: express.RequestHandler = (req: any, res, next) => {
  if (!req.user || req.user.role !== "guest") {
    return res.sendStatus(401);
  } else {
    next();
  }
};

// Returns an array of all blogs
router.get("/", async (req, res, next) => {
  try {
    let blogs = await db.Blogs.all();
    res.json(blogs.reverse());
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// Returns one blog by id
router.get("/:id?", isLoggedIn, async (req, res, next) => {
  let id = Number(req.params.id);
  try {
    let [blog] = await db.Blogs.one(id);
    res.json(blog);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// Posts a blog
router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    let body = req.body;
    let blog = await db.Blogs.add(body);
    await db.Tags.fill(body);
    res.json(blog);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// Updates a blog
router.put("/:id", isLoggedIn, async (req, res, next) => {
  try {
    let id = Number(req.params.id);
    let body = req.body;
    let blog = await db.Blogs.update(id, body);
    res.json(blog);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// Deletes a blog
router.delete("/:id", isLoggedIn, async (req, res, next) => {
  try {
    let id = Number(req.params.id);
    let blog = await db.Blogs.remove(id);
    res.json(blog);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

export default router;
