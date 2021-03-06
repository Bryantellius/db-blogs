import * as React from "react";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { Alert, InputGroup, FormControl } from "react-bootstrap";
import { apiService } from "../utils/apiService";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const DonateForm: React.FC<IDonateFormProps> = () => {
  const [name, setName] = React.useState<string>("");
  const [amount, setAmount] = React.useState<string>("");
  const [error, setError] = React.useState<string>("An Error has occurred.");

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      document.querySelector("button").disabled = true;
      console.log("Stripe.js is not loaded...");
      return;
    }

    let data: any = await apiService(
      "/api/donate/create-payment-intent",
      "POST",
      {
        items: amount,
        currency: "usd",
      }
    );

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name,
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
      setError(result.error.message);
      document.getElementById("failureAlert").hidden = false;
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        // Show a success message to your customer
        console.log("Successful payment");
        document.getElementById("successAlert").hidden = false;
        setName("");
        setAmount("");
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  return (
    <main className="container">
      <Alert
        id="successAlert"
        variant="success"
        onClose={() => (document.getElementById("successAlert").hidden = true)}
        hidden
        dismissible
      >
        Payment Successful.
      </Alert>
      <Alert
        id="failureAlert"
        variant="danger"
        onClose={() => (document.getElementById("failureAlert").hidden = true)}
        hidden
        dismissible
      >
        {error}
      </Alert>
      <form
        className="mt-3 p-3 border-dark shadow rounded"
        onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => handleSubmit(e)}
      >
        <h3 className="mb-2 p-2 border-bottom border-info w-50 mx-auto">
          Enjoy our content? Donate today.
        </h3>
        <div className="form-group w-50 mx-auto">
          <label>
            <u>Name:</u>
          </label>
          <FormControl
            type="text"
            placeholder="Name as it appears on Card"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </div>
        <div className="form-group w-50 mx-auto">
          <label>
            <u>Amount:</u>
          </label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="text"
              value={amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAmount(e.target.value)
              }
            />
            <InputGroup.Append>
              <InputGroup.Text>.00</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </div>
        <div className="form-group w-50 mx-auto">
          <label>
            <u>Card Information:</u>
          </label>
          <CardElement
            options={CARD_ELEMENT_OPTIONS}
            className="p-2 border rounded"
          />
        </div>
        <button
          id="donateBtn"
          className="btn btn-outline-dark d-block w-25 mx-auto my-2"
        >
          Donate
        </button>
      </form>
    </main>
  );
};

interface IDonateFormProps {}

export default DonateForm;
