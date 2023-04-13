const { verifytokenAndAuthorization, verifytokenAndAdmin, verifyToken } = require("./verifyToken");
const Cart = require("../models/Cart");
const router = require("express").Router()

//CREATE CART

router.post("/", verifyToken, async (req,res)=> {
    // console.log(req.body)
    const newCart = new Cart(req.body);

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }catch(err){
        res.status(500).json(err)
    }

});

//UPDATE CART

router.put("/:id", verifytokenAndAuthorization, async (req, res)=>{
    
    // console.log("User Token Verified")
    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },{new:true}
            );
            res.status(200).json(updatedCart)
    }catch(err){
        res.status(err).json(err);
    }
});

//DELETE PRODUCT
router.delete("/:id", verifytokenAndAuthorization, async (req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted!")

    }catch(err){
        res.status(500).json(err)
    }
});

//GET USER CART
router.get("/find/:userId", verifytokenAndAuthorization, async (req,res)=>{
    try{
        const cart = await Cart.find({userId: req.params.userId});

        res.status(200).json(cart);

    }catch(err){
        res.status(500).json(err)
    }
})

//GET ALL 
router.get("/",verifytokenAndAdmin, async (req,res)=>{
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;