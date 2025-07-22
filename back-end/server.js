import express from "express";
import newsRouter from "./routes/news/news.js";
import queriesRouter from "./routes/queries/queries.js";
import usersRouter from "./routes/users/users.js";

const app = express();
let PORT = process.env.PORT || 4000;

app.use(express.json());

app.use("/news", newsRouter);
app.use("/queries", queriesRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
