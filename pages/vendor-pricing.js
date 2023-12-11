import axios from 'axios';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useReducer, useState, useEffect } from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { ToastContainer, toast, Slide } from "react-toastify";
import { getError } from '../utils/error';
import Image from "next/image";
import VendorPricingOptions from "../utils/vendorPricingOptions";
import gsap from 'gsap';

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpdate: '' };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, errorUpdate: '' };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };

    default:
      return state;
  }
}

const VendorPricing = () => {
  const [{ loadingUpdate }, dispatch] =
  useReducer(reducer, {
    loading: true,
    error: '',
  });
  const router = useRouter();
  const [vendorPricing, setVendorPricing] = useState("");
  const vendorPriceOption = VendorPricingOptions.vendorPricing;

      useEffect(() => {
        gsap.timeline()
        .from(".home-header img", { x: -100, opacity: 0, ease: 1, duration: 0.3 })
        .from(".home-header h1", { y:-100, opacity:0, ease: 1, duration: 0.3 })
        .from(".home-header p", { opacity:0, ease: 1, duration: 0.5 })
        .delay(1.2);
      }, []);

      const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
      } = useForm();

      const submitHandler = async ({amount}) => {
        const percentageHandler = () => {
          if (amount === "5000") {
            return 0.30
          } else if (amount === "10000") {
            return 0.50;
          } else if (amount === "25000") {
            return 0.65;
          } else if (amount === "50000") {
            return 0.70;
          } else {
            return 0.80;
          }
        }

        try {
          dispatch({ type: 'UPDATE_REQUEST' });
          await axios.post(`/api/vendor`, {
            amount,
            percentage: percentageHandler()
          });
          dispatch({ type: 'UPDATE_SUCCESS' });
          toast.success("Shipment created successfully", {
            theme: "colored"
          });
          console.log(amount);
          console.log(percentage);
          // router.push('/manufacturer/manufacturer-shipments');
        } catch (err) {
          dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
          toast.error(getError(err), {
            theme: "colored"
          });
        }
      };

      const saveData = (form_data) => {
        console.log("form_data", form_data);
      };

  return (
    <Layout>
    <div className="vendor-container bg-black text-white">
        <div className="home-header">
          <div className="container">
            <div className="row py-xs-1 py-sm-1 py-md-2 py-lg-5">
            <div className="col-lg-6 mx-auto text-center home-header-img">
                <Image src="/images/vendor-account-img.png" width={500} height={350} alt="..." />
              </div>
              <div className="col-lg-6 mx-auto text-white">
                <h1 className="fw-light">Create A Vendor Account</h1>
                <p className="lead">
                  Let Dragon Organics work hard for you!  We thank you for your interest in Dragon Organics and now all that is left to is to create an account, start
                  ordering the products you want, and we will do the rest. Our process is simple and straight forward so that you get what you want with ease.
                  In this rapidly evolving and diverse market, it's crucial to partner with a business you can trust. Your business is 
                  important to us, and we're here to meet your requirements.
                </p>
              </div>

            </div>
          </div>
        </div>
            <main className="form-register">
          <div className="row justify-content-md-center text-center">
            <form onSubmit={handleSubmit(submitHandler)} className="col-lg-4 col-md-12 col-sm-12">
              <Image src="/images/do-logo-title-under.png" width={150} height={195} alt=""/>
              <p className="my-4">
                Select from our tier MSRP for our Dragon Organics product and start selecting how much Dragon Organics you want to sell today. 
              </p>
              <div className="form-floating">
                  <Controller
                    name="amount"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <select 
                        defaultValue='DEFAULT'
                        className={`form-select ${errors.amount ? 'is-invalid' : ''}`} 
                        onChange={(e) => setVendorPricing(e.target.value)}
                        value={vendorPricing}
                        {...field}
                      >
                        <option disabled value="DEFAULT">Select an Amount</option>
                        {vendorPriceOption.map((vendorPricing) => (
                          <option key={vendorPricing.value} value={vendorPricing.value}>{vendorPricing.label}</option>
                        ))}
                      </select>
                    )}
                  />
                  <div className="invalid-feedback">
                    {
                      errors.state
                      ? 'Amount is required'
                      : ''
                    }
                  </div>
                </div>
                <button className="w-100 btn btn-lg btn-outline-primary light" type="submit">
                  {loadingUpdate ? (
                    <>
                      <span className="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
                      <span className="visually-hidden">Loading...</span>
                    </>
                  ) : (
                    "Create An Account"
                  )}
                </button>
            </form>
          </div>
        </main>
    </div>
    </Layout>
  )
}

VendorPricing.auth = { vendorOnly: true }
export default VendorPricing;