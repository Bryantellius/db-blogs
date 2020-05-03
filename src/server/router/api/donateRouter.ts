import * as express from "express";
import Stripe from "stripe";
import config from "../../config";

const router = express.Router();

const stripe = new Stripe(config.stripe.stripe_sk, {
  apiVersion: "2020-03-02",
  typescript: true,
});

const calculateOrderAmount = (items: any) => {
  return items * 100;
};

router.post("/create-payment-intent", async (req, res, next) => {
  const { items, currency } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency,
  });
  res.send({
    publishableKey: config.stripe.stripe_pk,
    clientSecret: paymentIntent.client_secret,
  });
});

export default router;
