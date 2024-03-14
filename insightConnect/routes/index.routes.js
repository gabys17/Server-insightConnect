const express = require("express");
const router = express.Router();

router.get("/signup", (req, res, next) => {
  res.json("All good in here");
});

module.exports = router;