const express = require('express');
const router = express.Router();
const { createReservation, editReservation,cancelReservation, manageReservation,getAllReservations} = require('../controller/reservationController');
const { auth, Roles } = require('../middleware/authMiddleware');


router.patch('/cancel/:reservationId', cancelReservation); 
// User Routes
router.post('/create', auth([Roles.User]), createReservation); 
router.put('/edit/:reservationId', auth([Roles.User]), editReservation); 
// Get All Reservations
router.get('/', auth([Roles.User, Roles.Admin]), getAllReservations); // Accessible only by the authenticated user


// Admin Routes
router.put('/manage/:reservationId', auth([Roles.Admin]), manageReservation); // Admin Manage Reservation (Edit or Cancel)



module.exports = router;
