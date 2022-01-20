import Stripe from "stripe";

// Stripe is a class we instantiate
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2020-08-27",
});

export { stripe };
