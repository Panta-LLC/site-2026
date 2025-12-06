const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.get("/placeholder", async (_req, res) => {
  res.json({ message: "Placeholder API" });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API listening on :${port}`));
