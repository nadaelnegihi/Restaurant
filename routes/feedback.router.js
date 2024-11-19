const express = require("express");
const router = express.Router();
const { submitFeedback, viewFeedback } = require("../controller/feedbackController");
const { auth, Roles } = require("../middleware/authMiddleware"); 

// Submit Feedback (User Only)
router.post("/submit", auth([Roles.User]), submitFeedback); 

// View Feedback (Admin Only)
router.get("/view", auth([Roles.Admin]), viewFeedback);

module.exports = router;
