import * as express from "express";
import * as morgan from "morgan";
import apiRouter from "./router";
import * as path from "path";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));

app.use("/api", apiRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
