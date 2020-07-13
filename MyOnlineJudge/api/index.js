//const express = require("express");
//const router = express.Router();
const { Router } = require("express"); // express.Router()
const router = Router();

router.use("/user", require("./user"));
router.use("/problem", require("./problem"));
router.use("/example", require("./example"));
router.use("/submit", require("./submit"));
module.exports = router;
    
