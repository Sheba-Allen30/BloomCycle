const router = require("express").Router();
const { askAi } = require("../controllers/aiController");

router.post("/ask", askAi);

module.exports = router;
