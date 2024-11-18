const express = require("express");
const router = express.Router();
const { placeOrder, editOrder, cancelOrder } = require("../controller/orderController");
const { auth, Roles } = require("../middleware/authMiddleware"); 

// Place Order 
router.post("/place", auth([Roles.User]), placeOrder); 

// Edit Order 
router.put("/edit/:orderId", auth([Roles.User]), editOrder); 

// Cancel Order 
router.patch("/cancel/:orderId", auth([Roles.User]), cancelOrder); 

module.exports = router;
