const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);


// const stripe_key = process.env.STRIPE_KEY;



router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
        console.log('Fuck you')
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;