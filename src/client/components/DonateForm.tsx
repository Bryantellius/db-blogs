import * as React from "react";
import {
  CardElement,
  injectStripe,
  ReactStripeElements,
} from "react-stripe-elements";

const DonateForm: React.FC<IDonateFormProps> = (props) => {
  const [name, setName] = React.useState<string>("");
  const [amount, setAmount] = React.useState<string>("");

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let token = await props.stripe.createToken({ name });
      console.log(token);
    } catch (e) {
      throw e;
    }
  };

  return (
    <main className="container">
      <form
        action=""
        className="mt-3 p-3 border-dark shadow rounded"
        onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => handleSubmit(e)}
      >
        <h3 className="mb-2 p-2 border-bottom border-info w-50 mx-auto">Enjoy our content? Donate today.</h3>
        <div className="form-group w-50 mx-auto">
          <label>
            <u>Name:</u>
          </label>
          <input
            type="text"
            className="form-control"
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
          <input
            type="text"
            className="form-control"
            value={amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAmount(e.target.value)
            }
          />
        </div>
        <div className="form-group w-50 mx-auto">
          <label>
            <u>Card Information:</u>
          </label>
          <CardElement className="p-3 border rounded" />
        </div>
        <button className="btn btn-outline-dark d-block w-25 mx-auto">
          Donate
        </button>
      </form>
    </main>
  );
};

interface IDonateFormProps extends ReactStripeElements.InjectedStripeProps {}

export default injectStripe(DonateForm);
