import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useState, useContext, useEffect } from 'react';
import StateOptions from "../utils/stateOptions";
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import CheckoutWizard from '@/components/CheckoutWizard';
import Link from 'next/link';

const Shipping = () => {
  const {
    handleSubmit,
    register,
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
    setValue('firstName', shippingAddress.firstName);
    setValue('lastName', shippingAddress.lastName);
    setValue('email', shippingAddress.email);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('state', shippingAddress.state);
    setValue('zipCode', shippingAddress.zipCode);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ firstName, lastName, email, address, city, state, zipCode }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { firstName, lastName, email, address, city, state, zipCode },
    });
    Cookies.set(
      'cart', 
      JSON.stringify({
        ...cart,
        shippingAddress: {
          firstName,
          lastName,
          email,
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
            <h5><b className="text-white">Have an accout? <Link className="text-primary" href="/signin">Sign in</Link></b></h5>
          </div>
        </div>
        <main className="form-shipping">
          <div className="container">
            <div className="row justify-content-md-center">
              <form onSubmit={handleSubmit(submitHandler)} className="col-lg-6 col-md-12 col-sm-12">
                <div className="form-floating">
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 2,
                    }}
                    render={({ field }) => (
                      <input 
                        type="text" 
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        id="firstName" 
                        placeholder="Full Name" 
                        {...field}
                      />
                    )}
                  />
                  <div className="invalid-feedback">
                    {
                      errors.firstName
                      ? errors.firstName.type === 'minLength'
                      ? 'First Name length is more than 1'
                      : 'First Name is required'
                      : ''
                    }
                  </div>
                  <label htmlFor="firstName">First Name</label>
                </div>
                <div className="form-floating">
                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 2,
                    }}
                    render={({ field }) => (
                      <input 
                        type="text" 
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                        id="lastName" 
                        placeholder="Last Name" 
                        {...field}
                      />
                    )}
                  />
                  <div className="invalid-feedback">
                    {
                      errors.lastName
                      ? errors.lastName.type === 'minLength'
                      ? 'Last Name length is more than 1'
                      : 'Last Name is required'
                      : ''
                    }
                  </div>
                  <label htmlFor="lastName">Last Name</label>
                </div>
                <div className="form-floating">
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Please enter email',
                      pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                        message: 'Please enter valid email',
                      },
                    })}
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                  <label htmlFor="name">Email</label>
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
