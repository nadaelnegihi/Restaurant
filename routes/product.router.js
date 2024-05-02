const { addProduct, deleteProduct , updateProduct } = require("../controller/productController")
const router = require("express").Router()
const { auth ,Roles } = require("../middleware/authMiddleware");







router.post("/addProduct",auth([Roles.Admin]),addProduct)


//router.post('/removeProduct',auth(), deleteProduct);
//router.post('/editProduct', auth(), updateProduct);



module.exports=router