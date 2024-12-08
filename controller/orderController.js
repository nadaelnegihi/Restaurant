const orderModel = require("../models/orderModel")
const menuItemModel = require("../models/menuModel")
const reservationModel = require("../models/reservationModel");

//place order (user)
const placeOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const user_id = req.user.id;

    // Find the user's active reservation
    const reservation = await reservationModel.findOne({ user_id, status: 'active' });
    if (!reservation) {
      return res.status(404).json({ error: "No active reservation found" });
    }

    // console.log("Items from user:", items);

    // Get the menu items based on the names provided in the request body
    const menuItems = await menuItemModel.find({
      name: { $in: items.map(item => new RegExp(item.name, 'i')) } // to handle upper and lower cases
    });

    
   // console.log("Menu Items found in database:", menuItems);

    // Ensure all menu items are found
    if (menuItems.length !== items.length) {
      return res.status(400).json({ error: "One or more menu items not found" });
    }

    // Map through the items and attach menu item details (item_id, price, etc.)
    const itemDetails = items.map(item => {
      const menuItem = menuItems.find(menuItem => menuItem.name.toLowerCase() === item.name.toLowerCase());
      return {
        item_id: menuItem._id,
        name: menuItem.name,
        quantity: item.quantity,
        price: menuItem.price,
        total: menuItem.price * item.quantity
      };
    });

    // Calculate the total price
    const total_price = itemDetails.reduce((sum, item) => sum + item.total, 0);

    // Create the order object and save it
    const newOrder = new orderModel({
      user_id,
      reservation_id: reservation._id, // Use the found reservation ID
      items: itemDetails,
      total_price,
      status: 'order placed'
    });
    console.log('Saving new order:', newOrder);
    const savedOrder = await newOrder.save();
    console.log('Order saved successfully:', savedOrder);
    
    // Respond with the saved order
    res.status(201).json({
      message: 'Order placed successfully',
      order: savedOrder
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};



//edit order (user)
// const editOrder = async (req,res)=>{
//     try {
//         const { orderId } = req.params;
//         const { items } = req.body; 
//         const order = await orderModel.findById(orderId);
//         if (!order) {
//           return res.status(404).json({ error: "Order not found" });
//         }
//         const itemDetails = await Promise.all(
//           items.map(async (item) => {
//             const menuItem = await menuItemModel.findOne({
//               name: new RegExp('^' + item.name + '$', 'i') // Case-insensitive search for a single name
//             });
        
//             if (!menuItem) {
//               throw new Error("Menu item not found");
//             }
        
//             return {
//               item_id: menuItem._id,
//               name: menuItem.name,
//               quantity: item.quantity,
//               price: menuItem.price,
//               total: menuItem.price * item.quantity,
//             };
//           })
//         );
        
//        // Recalculate the total price for the updated order
//        const total_price = itemDetails.reduce((sum, item) => sum + item.total, 0);

//        order.items=itemDetails;
//        order.total_price=total_price;

//        const updatedOrder = await order.save();
       
//        res.status(200).json({
//         message: "Order updated successfully",
//         order: updatedOrder,
//        });
//     }
//     catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };




// edit Order (user)
const editOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { items } = req.body;

    // Find the order by ID
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Process each item in the order
    const itemDetails = await Promise.all(
      items.map(async (item) => {
        console.log("Searching for item:", item.name);
        const menuItem = await menuItemModel.findOne({
          name: new RegExp(`^${item.name}$`, "i"), // Case-insensitive match
        });

        console.log("Menu Item found:", menuItem);

        if (!menuItem) {
          throw new Error(`Menu item with name "${item.name}" not found`);
        }

        return {
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

    // Update the order details
    order.items = itemDetails;
    order.total_price = total_price;

    // Save the updated order
    const updatedOrder = await order.save();

    res.status(200).json({
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};




//cancel order (user)
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

