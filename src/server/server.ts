import * as express from "express";
import * as morgan from "morgan";
import apiRouter from "./router";
import * as path from "path";
import * as passport from "passport";
import config from "./config";
import type { Error } from "./utils/types";

import "./middleware/localstrategy";
import "./middleware/bearerstrategy";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(passport.initialize());

app.use(morgan("dev"));
app.use("/api", apiRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.sendStatus(err.status || 500);
    res.json({ errors: { err: err.message } });
  }
);

app.listen(config.port, () =>
  console.log(`Server listening on port: ${config.port}`)
);
