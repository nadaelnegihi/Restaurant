const express = require('express');
const router = express.Router();
const { createReservation, editReservation,cancelReservation, manageReservation,getAllReservations} = require('../controller/reservationController');
const { auth, Roles } = require('../middleware/authMiddleware');

// cancel reservation (both)
router.patch('/cancel/:reservationId', cancelReservation); 

// User Routes
// create reservation
router.post('/create', auth([Roles.User]), createReservation); 
// edit reservation
router.put('/edit/:reservationId', auth([Roles.User]), editReservation); 


// Admin Routes
// manage reservations 
router.put('/manage/:reservationId', auth([Roles.Admin]), manageReservation); // Admin Manage Reservation (Edit or Cancel)



module.exports = router;
