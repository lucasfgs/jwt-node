const router = require("express").Router();
const verifyToken = require("./middlewares/verifyToken");

router.get("/", verifyToken, (req, res) => {
  res.send("OK");
});

module.exports = router;
