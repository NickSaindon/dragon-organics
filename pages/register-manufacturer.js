import axios from 'axios';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useContext, useEffect } from 'react';
import Image from "next/image";
import StateOptions from "../utils/stateOptions";
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
// import { getError } from '../utils/error';
import NumberFormat from "react-number-format";
import { ToastContainer, toast, Slide } from "react-toastify";

const RegisterVendor = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [states, setStates] = useState("");
  const stateOption = StateOptions.states;

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);

  const submitHandler = async ({ name, email, phone, companyName, address, city, state, zipCode, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      toast.error("Passwords don't match", {
        theme: "colored"
      });
      return;
    }
    try {
      const { data } = await axios.post('/api/users/register', {
        name,
        email,
        phone,
        companyName,
        address,
        city,
        state,
        zipCode,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', data);
      router.push(redirect || '/');
    } catch (err) {
    //   toast.error(getError(err), {
    //     theme: "colored"
    //   });   
    }
  };

  return (
    <Layout
      title="Dragon Organics | Register Page"
      description="Register for Dragon Organics and start purchasing some of the best quality Thai botanicals.">
      <div className="register-container bg-black text-white text-center">
        <ToastContainer 
          position="top-center" 
          draggable={false} 
          transition={Slide} 
          autoClose={5000}
          hideProgressBar={true}
          className="toast-alert"
        />
        <main className="form-register">
          <div className="row justify-content-md-center">
            <form onSubmit={handleSubmit(submitHandler)} className="col-lg-4 col-md-12 col-sm-12">
              <Image src="/images/do-logo-title-under.png" width={150} height={195} alt=""/>
              <h1 className="h3 py-3 mb-3 fw-normal">Please Register as a Manufacturer</h1>
              <div className="form-floating">
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 2,
                  }}
                  render={({ field }) => (
                    <input 
                      type="text" 
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      id="name" 
                      placeholder="Full Name" 
                      {...field}
                    />
                  )}
                />
                <div className="invalid-feedback">
                  {
                    errors.name
                      ? errors.name.type === 'minLength'
                        ? 'Name length is more than 1'
                        : 'Name is required'
                      : ''
                  }
                </div>
                <label htmlFor="name">Full Name</label>
              </div>
              <div className="form-floating">
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  }}
                  render={({ field }) => (
                    <input 
                      type="email" 
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email" 
                      placeholder="Email" 
                      {...field}
                    />
                  )}
                />
                <div className="invalid-feedback">
                  {
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'Email is not valid'
                        : 'Email is required'
                      : ''
                  }
                </div>
                <label htmlFor="name">Email</label>
              </div>
              <div className="form-floating">
                <Controller 
                  name="phone"
                  control={control}
                  rules={{
                    required: true,
                    pattern: /^\(?\b[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}\b$/
                    ,
                  }}
                  render={({ field: {onChange, name, value} }) => (
                    <NumberFormat
                      format="(###) ###-####"
                      name={name}
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      value={value}
                      id="phone" 
                      placeholder="Phone Number" 
                      onChange={onChange}
                    />
                  )}
                />
                <div className="invalid-feedback">
                    {errors.phone
                          ? errors.phone.type === 'pattern'
                            ? 'Phone number is not completed'
                            : 'Phone number is required'
                          : ''
                    }
                </div>
                <label htmlFor="floatingInput">Phone Number</label>
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
              <div className="form-floating">
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 6,
                  }}
                  render={({ field }) => (
                    <input 
                      type="password" 
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id="password" 
                      placeholder="Password" 
                      {...field}
                    />
                  )}
                />
                <div className="invalid-feedback">
                  {
                    errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Password length is more than 5'
                        : 'Password is required'
                      : ''
                  }
                </div>
                <label htmlFor="password">Password</label>
              </div>
              <div className="form-floating">
                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 6,
                  }}
                  render={({ field }) => (
                    <input 
                      type="password" 
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      id="confirmPassword" 
                      placeholder="Confirm Password" 
                      {...field}
                    />
                  )}
                />
                <div className="invalid-feedback">
                  {
                    errors.password
                      ? errors.confirmPassword.type === 'minLength'
                        ? 'Password Confirmation length is more than 5'
                        : 'Password Confirmation is required'
                      : ''
                  }
                </div>
                <label htmlFor="confirmPassword">Confirm Password</label>
              </div>
              <button className="w-100 btn btn-lg btn-outline-primary light" type="submit">
                Register
              </button>
              <p className="mt-5 mb-3 text-white">
                Already have an account? &nbsp;
                <Link href={`/login?redirect=${redirect || '/'}`} legacyBehavior>
                  <a>Login</a>
                </Link>
              </p>
            </form>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default RegisterVendor;