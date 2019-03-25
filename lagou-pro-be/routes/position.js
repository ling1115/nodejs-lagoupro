const express = require("express");
const router = express.Router();

//引入position的controller
const positionController = require("../controllers/position")

// POST / /api/position/add
router.post("/add",positionController.add)
// GET / /api/position/find
router.get("/find", positionController.find);
// 这里需要传入一个动态id,因为需要根据id查找
router.get("/:id",positionController.findById);

router.post("/update",positionController.update);

router.delete("/delete",positionController.remove);

router.post("/query",positionController.query)

module.exports = router;