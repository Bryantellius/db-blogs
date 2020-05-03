import * as React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import DonateForm from "../components/DonateForm";

const stripePromise = loadStripe("pk_test_5kZ8Jqphhgho6KtqLWCQjeap001MKHsi38");

export const Donate: React.FC<IDonateProps> = () => {
  return (
    <Elements stripe={stripePromise}>
      <DonateForm />
    </Elements>
  );
};

interface IDonateProps {}

export default Donate;
