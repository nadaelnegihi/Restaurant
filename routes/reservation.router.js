const express = require('express');
const router = express.Router();
const { createReservation, editReservation,cancelReservation, manageReservation,} = require('../controller/reservationController');
const { auth, Roles } = require('../middleware/authMiddleware');


router.patch('/cancel/:reservationId', cancelReservation); 


// User Routes
router.post('/create', auth([Roles.User]), createReservation); 
router.put('/edit/:reservationId', auth([Roles.User]), editReservation); 


// Admin Routes
router.put('/manage/:reservationId', auth([Roles.Admin]), manageReservation); // Admin Manage Reservation (Edit or Cancel)

module.exports = router;
