import * as React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import DonateForm from '../components/DonateForm';

export const Donate: React.FC<IDonateProps> = () => {
    return (
        <StripeProvider apiKey="pk_test_5kZ8Jqphhgho6KtqLWCQjeap001MKHsi38">
            <Elements>
                <DonateForm />
            </Elements>
        </StripeProvider>
    )
}

interface IDonateProps {}

export default Donate;