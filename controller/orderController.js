const orderModel = require("../models/orderModel")
const menuItemModel = require("../models/menuModel")
const reservationModel = require("../models/reservationModel");

//place order 
const placeOrder = async (req, res)=> {
    try {
      const {reservation_id, items } = req.body;
      const customer_id = req.user.id;

      const reservation = await reservationModel.findById(reservation_id);
      if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
     }
    //ensures that all the database queries complete before moving to the next step
    const itemDetails = await Promise.all( // P is uppercase

        items.map(async(item)=>{
          const menuItem = await menuItemModel.findById(item.item_id);
          if(!menuItem){
            throw new Error ("Menu item not found");
          }
          return{
            item_id: menuItem._id,
            name: menuItem.name,
            quantity: item.quantity,
            price: menuItem.price,
            total: menuItem.price * item.quantity,
          };
        })
    );
    ///The reduce() function calculates the total price for the entire order by summing up the total field of each item.
    const total_price = itemDetails.reduce((sum, item) => sum + item.total, 0);

      // Create and save the order
      const newOrder = new orderModel({
        customer_id,
        reservation_id, 
        items: itemDetails,
        total_price,
        status: 'in-progress', 
      });

      const savedOrder = await newOrder.save();
      res.status(201).json({
        message: 'Order placed successfully',
        order: savedOrder,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }



//edit order
const editOrder = async (req,res)=>{
    try {
        const { orderId } = req.params;
        const { items } = req.body; 
        const order = await orderModel.findById(orderId);
        if (!order) {
          return res.status(404).json({ error: "Order not found" });
        }
       const itemDetails = await Promise.all(
           items.map(async (item)=>{
            const menuItem = await menuItemModel.findById(item.item_id);
            if(!menuItem){
                throw new Error ("Menu item not found");
            }
            return{
               item_id: menuItem._id,
               name: menuItem.name,
               quantity: item.quantity,
               price: menuItem.price,
               total: menuItem.price * item.quantity,
            };
           })
       );
       // Recalculate the total price for the updated order
       const total_price = itemDetails.reduce((sum, item) => sum + item.total, 0);

       order.items=itemDetails;
       order.total_price=total_price;

       const updatedOrder = await order.save();
       
       res.status(200).json({
        message: "Order updated successfully",
        order: updatedOrder,
       });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//cancel order 
// for this case we are not removing the cancelled orders in the db 
const cancelOrder = async (req, res) => {
  try {
      const { orderId } = req.params;

      const order = await orderModel.findById(orderId);
      if (!order) {
          return res.status(404).json({ error: "Order not found" });
      }

      order.status = 'canceled';

      const updatedOrder = await order.save();

      res.status(200).json({
          message: 'Order canceled',
          order: updatedOrder,
      });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};



module.exports = {
    placeOrder,
    editOrder,   
    cancelOrder,
}; 

