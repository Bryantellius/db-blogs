import * as express from "express";

import db from "../../db";
import { HashPassword } from "../../utils/security/passwords";
import { CreateToken } from "../../utils/security/tokens";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    let user = req.body;
    user.password = HashPassword(user.password);
    let results: any = await db.Users.Insert(user);
    let token = await CreateToken({ userid: results.insertId });
    res.json({
      token,
      role: "guest",
      userid: results.insertId,
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
