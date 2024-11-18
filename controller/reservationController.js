const reservationModel = require('../models/reservationModel');
//const { Roles } = require('../middlewares/authMiddleware');

// create  --user 
const createReservation = async (req,res)=>{
    try {
        const { table_number, reservation_time } = req.body;
        const customer_id = req.user.id; 

        const newReservation = new reservationModel({
            customer_id,
            table_number,
            reservation_time,
          });

          const savedReservation = await newReservation.save();
          res.status(201).json({
            message: 'Reservation created successfully',
            reservation: savedReservation,
          });
    }
    catch (error){
        res.status(400).json({ error: error.message });
    }
};

// edit --user 

const editReservation = async (req,res)=>{
    try {
        const { reservationId } = req.params;
        const { table_number, reservation_time } = req.body;
        const customer_id = req.user.id;

        // Find the reservation by ID
       const reservation = await reservationModel.findById(reservationId);
       if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' });
       }

       reservation.table_number = table_number || reservation.table_number;
       reservation.reservation_time = reservation_time || reservation.reservation_time;
       const updatedReservation = await reservation.save();
   
       res.status(200).json({
         message: 'Reservation updated successfully',
         reservation: updatedReservation,
       });
    }catch(error){
        res.status(400).json({ error: error.message });
    }
};

// cancel --user 

const cancelReservation = async(req,res)=>{
    try{
        const { reservationId } = req.params;
        const customer_id = req.user.id;
        
        const reservation = await reservationModel.findById(reservationId);
        if (!reservation) {
         return res.status(404).json({ error: 'Reservation not found' });
        }

        reservation.status = 'canceled';
        const canceledReservation = await reservation.save();

        res.status(200).json({
        message: 'Reservation canceled successfully',
        reservation: canceledReservation,
    });
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}

// manage -- admin 

const manageReservation = async (req, res) =>{
    try{
        const { reservationId } = req.params;
        const { status } = req.body; 

        // Find the reservation by ID
       const reservation = await reservationModel.findById(reservationId);
       if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' });
       }
       reservation.status = status || reservation.status;
       const updatedReservation = await reservation.save();

       res.status(200).json({
       message: 'Reservation status updated successfully',
       reservation: updatedReservation,
    });
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createReservation,
    editReservation,
    cancelReservation,
    manageReservation,
  };