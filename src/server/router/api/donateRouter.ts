import * as express from "express";
import Stripe from "stripe";
import config from "../../config";

const router = express.Router();

const stripe = new Stripe(config.stripe, {
  apiVersion: "2020-03-02",
  typescript: true,
});

const charge = (amt: number) => {
  return amt * 100;
};

router.post("/", async (req, res, next) => {
  let tokenId = req.body.token.id;
  let amount = req.body.amount;
  let currency = "usd";

  const orderAmount: number = charge(amount);

  try {
    // Create new PaymentIntent with a PaymentMethod ID from the client.
    const params: Stripe.PaymentIntentCreateParams = {
      amount: orderAmount,
      confirm: true,
      error_on_requires_action: true,
      currency,
      payment_method: tokenId,
    };

    const intent: Stripe.PaymentIntent = await stripe.paymentIntents.create(
      params
    );

    console.log("💰 Payment received!");
    // The payment is complete and the money has been moved
    // You can add any post-payment code here (e.g. shipping, fulfillment, etc)

    // Send the client secret to the client to use in the demo
    res.send({ clientSecret: intent.client_secret });
  } catch (e) {
    console.log(e);
    res.send({ err: e.message });
  }
});

export default router;
