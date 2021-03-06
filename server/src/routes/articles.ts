import express from "express";
import User from "../models/user";
import { checkAuth } from "../middleware/checkAuth";
import { stripe } from "../utils/stripe";
import Article from "../models/article";

const router = express.Router();

router.get("/", checkAuth, async (req, res) => {
  // we need this because user has customer id for stripe
  const user = await User.findOne({ email: req.user });

  // returns a list of all subscriptions of the use
  const subscriptions = await stripe.subscriptions.list(
    {
      customer: user.stripeCustomerId,
      status: "all",
      expand: ["data.default_payment_method"],
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );

  // no subscriptions
  if (!subscriptions.data.length) return res.json([]);

  //@ts-ignore
  const plan = subscriptions.data[0].plan.nickname;

  // If basic plan return basic article
  if (plan === "Basic") {
    const articles = await Article.find({ access: "Basic" });
    return res.json(articles);
  } else if (plan === "Standard") {
    // Not findOne hence finds that you define in $in
    const articles = await Article.find({
      access: { $in: ["Basic", "Standard"] },
    });
    return res.json(articles);
  } else {
    // Empty object means find all
    const articles = await Article.find({});
    return res.json(articles);
  }
});

export default router;
