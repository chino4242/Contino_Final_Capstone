import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Get called");
});

router.post("/", async (req, res) => {
  res.send("POST called");
});

export default router;
