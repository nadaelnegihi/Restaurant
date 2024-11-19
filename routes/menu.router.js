const express = require("express");
const router = express.Router();
const { addMenuItem, editMenuItem, deleteMenuItem } = require("../controller/menuController");
const { auth, Roles } = require("../middleware/authMiddleware"); 

// Add Menu Item (Admin Only)
router.post("/add", auth([Roles.Admin]), addMenuItem); 

// Edit Menu Item (Admin Only)
router.put("/edit/:itemId", auth([Roles.Admin]), editMenuItem); 

// Delete Menu Item (Admin Only)
router.delete("/delete/:itemId", auth([Roles.Admin]), deleteMenuItem);

module.exports = router;
