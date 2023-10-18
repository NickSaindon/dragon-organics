import React from 'react';

const CheckoutWizard = ({ activeStep = 0 }) => {

  return (
    <div className="container-fluid">
      <div className="mb-2 d-flex py-5">
        {['User Login', 'Shipping Address', 'Place Order'].map(
          (step, index) => (
            <div
              key={step}
              className={`flex-fill border-bottom border-2 text-center 
                ${
                  index <= activeStep
                    ? 'border-bottom border-primary text-primary'
                    : 'border-bottom border-light text-light'
                }
              `}
            >
              {step}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default CheckoutWizard;