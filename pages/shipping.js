import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useState, useContext, useEffect } from 'react';
import StateOptions from "../utils/stateOptions";
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import CheckoutWizard from '@/components/CheckoutWizard';

const Shipping = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [states, setStates] = useState("");
  const stateOption = StateOptions.states;
  const { shippingAddress } = cart;

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('state', shippingAddress.state);
    setValue('zipCode', shippingAddress.zipCode);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, city, state, zipCode }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, state, zipCode },
    });
    Cookies.set(
      'cart', 
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          state,
          zipCode
        }
      })
    );

    router.push('/placeorder');
  };

  return (
    <Layout title="Dragon Organics | Shipping">
      <div className="shipping-container text-center bg-black">
        <CheckoutWizard activeStep={1} />
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 text-white">
              <h1> Shipping Information</h1>
              <p>* We do not ship to the following US states, counties, and cities where kratom is banned: Alabama, 
                 Arkansas, Indiana, Rhode Island, Vermont, Wisconsin, Sarasota County (FL), Union County (NC), Denver (CO), and San Diego (CA).
                 If your State is on this list you will not be able to select your State from the list of States in our form.
              </p>
            </div>
          </div>
        </div>
        <main className="form-shipping">
          <div className="container">
            <div className="row justify-content-md-center">
              <form onSubmit={handleSubmit(submitHandler)} className="col-lg-6 col-md-12 col-sm-12">
                <div className="form-floating">
                  <Controller
                    name="fullName"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 2,
                    }}
                    render={({ field }) => (
                      <input 
                        type="text" 
                        className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                        id="fullName" 
                        placeholder="Full Name" 
                        {...field}
                      />
                    )}
                  />
                  <div className="invalid-feedback">
                    {
                      errors.fullName
                      ? errors.fullName.type === 'minLength'
                      ? 'Full Name length is more than 1'
                      : 'Full Name is required'
                      : ''
                    }
                  </div>
                  <label htmlFor="name">Full Name</label>
                </div>
                <div className="form-floating">
                  <Controller
                    name="address"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 2,
                    }}
                    render={({ field }) => (
                      <input 
                        type="text" 
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        id="address" 
                        placeholder="Address" 
                        {...field}
                      />
                    )}
                  />
                  <div className="invalid-feedback">
                    {
                      errors.address
                      ? errors.address.type === 'minLength'
                      ? 'Address length is more than 1'
                      : 'Address is required'
                      : ''
                    }
                  </div>
                  <label htmlFor="address">Address</label>
                </div>
                <div className="form-floating">
                  <Controller
                    name="city"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 2,
                    }}
                    render={({ field }) => (
                      <input 
                        type="text" 
                        className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                        id="city" 
                        placeholder="City" 
                        {...field}
                      />
                    )}
                  />
                  <div className="invalid-feedback">
                    {
                      errors.city
                      ? errors.city.type === 'minLength'
                      ? 'City length is more than 1'
                      : 'City is required'
                      : ''
                    }
                  </div>
                  <label htmlFor="city">City</label>
                </div>
                <div className="form-floating">
                  <Controller
                    name="state"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <select 
                        defaultValue='DEFAULT'
                        className={`form-select ${errors.state ? 'is-invalid' : ''}`} 
                        onChange={(e) => setStates(e.target.value)}
                        value={states}
                        {...field}
                      >
                        <option disabled value="DEFAULT">Select a State</option>
                        {stateOption.map((state) => (
                          <option key={state.value} value={state.value}>{state.label}</option>
                        ))}
                      </select>
                    )}
                  />
                  <div className="invalid-feedback">
                    {
                      errors.state
                      ? 'State is required'
                      : ''
                    }
                  </div>
                </div>
                <div className="form-floating">
                  <Controller
                    name="zipCode"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 2,
                    }}
                    render={({ field }) => (
                      <input 
                        type="text" 
                        className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                        id="zipCode" 
                        placeholder="Zip Code" 
                        {...field}
                      />
                    )}
                  />
                  <div className="invalid-feedback">
                    {
                      errors.zipCode
                        ? errors.zipCode.type === 'minLength'
                          ? 'Zip Code length is more than 1'
                          : 'Zip Code is required'
                        : ''
                    }
                  </div>
                  <label htmlFor="address">Zip Code</label>
                </div>
                <button className="w-100 btn btn-3 btn-outline-primary btn-lg px-4 me-sm-3" type="submit">
                  Continue
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default Shipping;

Shipping.auth = true;
