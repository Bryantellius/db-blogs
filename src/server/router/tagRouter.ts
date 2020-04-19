import * as express from "express";
import db from "../db";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let tags = await db.Tags.all();
    res.json(tags);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/filter/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let filteredBlogs = await db.Tags.filter(id);
    res.json(filteredBlogs);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
