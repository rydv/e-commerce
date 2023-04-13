const { verifytokenAndAuthorization, verifytokenAndAdmin, verifyToken } = require("./verifyToken");
const Order = require("../models/Order");
const router = require("express").Router()

//CREATE ORDER

router.post("/", verifyToken, async (req,res)=> {
    // console.log(req.body)
    const newOrder = new Order(req.body);

    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }catch(err){
        res.status(500).json(err)
    }

});

//UPDATE ORDER

router.put("/:id", verifytokenAndAdmin, async (req, res)=>{
    
    // console.log("User Token Verified")
    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },{new:true}
            );
            res.status(200).json(updatedOrder)
    }catch(err){
        res.status(err).json(err);
    }
});

//DELETE ORDER
router.delete("/:id", verifytokenAndAdmin, async (req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted!")

    }catch(err){
        res.status(500).json(err)
    }
});

//GET USER ORDERS
router.get("/find/:userId", verifytokenAndAuthorization, async (req,res)=>{
    try{
        const orders = await Order.find({userId: req.params.userId});

        res.status(200).json(orders);

    }catch(err){
        res.status(500).json(err)
    }
})

//GET ALL 
router.get("/",verifytokenAndAdmin, async (req,res)=>{
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET MONTHLY INCOME

router.get("/income", verifytokenAndAdmin, async (req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth()-1));
    
    try {
        const income = await Order.aggregate([
            { $match : { createdAt: { $gte: previousMonth}}},
            {
                $project: {
                    month : {$month: "$createdAt"},
                    sales: "$amount"
                },
            },
            {
                $group:{
                    _id: "$month",
                    total:{$sum: "$sales"}
                }
            }
        ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;