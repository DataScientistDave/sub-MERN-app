import express from "express";
import User from "../models/user";
import { checkAuth } from "../middleware/checkAuth";
import { stripe } from "../utils/stripe";

const router = express.Router();

// this is authenticated route, hence checkAuth
router.get("/prices", checkAuth, async (req, res) => {
  const prices = await stripe.prices.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  });

  return res.json(prices);
});

router.post("/session", checkAuth, async (req, res) => {
  // user is part of request
  const user = await User.findOne({ email: req.user });

  // creates checkout session
  const session = await stripe.checkout.sessions.create(
    {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          // price id is part of request body
          price: req.body.priceId,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/articles",
      cancel_url: "http://localhost:3000/article-plans",
      // each customer we create we also need to create them in stripe, had to do this in auth
      customer: user.stripeCustomerId,
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );
  return res.json(session);
});

export default router;
