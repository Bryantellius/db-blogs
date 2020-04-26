import * as express from "express";
import * as passport from "passport";
import tagRouter from "./tagRouter";
import blogRouter from "./blogRouter";

const router = express.Router();

router.use((req, res, next) => {
  passport.authenticate("bearer", { session: false }, (err, user, info) => {
    if (user) req.user = user;
    return next();
  })(req, res, next);
});

router.use("/blogs", blogRouter);

router.use("/tags", tagRouter);

export default router;
