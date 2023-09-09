const {
    createOrder,
    getOrders,
    getOrdersByOrderID,
    updateOrders,
    deleteOrders} =require("./order.controller");
const router = require("express").Router();

router.post("/",createOrder);
router.get("/",getOrders);
router.get("/:id",getOrdersByOrderID);
router.patch("/",updateOrders);
router.delete("/",deleteOrders);
module.exports = router;