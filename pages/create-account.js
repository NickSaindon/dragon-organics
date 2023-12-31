import axios from 'axios';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useReducer, useState, useEffect } from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { ToastContainer, toast, Slide } from "react-toastify";
import { getError } from '../utils/error';

function reducer(state, action) {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true, error: '' };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, vendorAccount: action.payload, error: '' };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        state;
    }
  }

const CreateVendorAccount = () => {
    const [{ loading, error, manufacturerShipments }, dispatch] = useReducer(reducer, {
        loading: true,
        vendorAccount: {},
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
          try {
            dispatch({ type: 'FETCH_REQUEST' });
            const { data } = await axios.get(`/api/vendor`);
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
          } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
          }
      };
        fetchData();
      }, []);

    return (
        <Layout>
        <div className="place-order-container bg-black">
          <ToastContainer 
            position="top-center" 
            draggable={false} 
            transition={Slide} 
            autoClose={3000}
            hideProgressBar={true}
            className="toast-alert"
          />
          <div className="container">
            <h1 className="text-center text-white">Place Order</h1>
            {cartItems.length === 0 ?
              (
                <div className="text-center text-white">
                  <h3>Cart is Empty. <Link href="/">Go Shopping</Link></h3>
                </div>
              ) : (
                <div className="row">
                  <div className="col-lg-8">  
                    <div className="card order-card">
                          <div className="card-body">
                          <h2 className="card-title">Order Items</h2>
                          <table className="table text-white">
                              <thead>
                                <tr>
                                  <th scope="col">Image</th>
                                  <th scope="col">Name</th>
                                  <th scope="col">Size</th>
                                  <th scope="col">Quantity</th>
                                  <th scope="col">Price</th>
                                  <th scope="col">Subtotal</th>
                                </tr>
                              </thead>
                              <tbody>
                              {cartItems.map((item) => (
                                  <tr key={item._id}>
                                  <td>
                                  <Link href={`/product/${item.slug}`} passHref>
                                    <Image src={item.imageOne} width={80} height={60} alt="..." />
                                  </Link>
                                  </td>
                                  <td className="align-middle">{item.name} {item.color}</td>
                                  <td className="align-middle">{item.size}</td>
                                  <td className="align-middle">{item.quantity}</td>
                                  <td className="align-middle">${item.price.toFixed(2)}</td>
                                  <td className="align-middle">
                                      ${item.quantity * item.price}
                                  </td>
                                  </tr>
                              ))}
                              </tbody>
                          </table>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-4">
                <div className="card summary-card">
                  <div className="card-body">
                      <h2 className="card-title">Order Summary</h2>
                      <div className="summary d-flex justify-content-between">
                          <h6>Items:</h6>
                          <span className="text-white">${itemsPrice.toFixed(2)}</span>
                      </div>
                      <div className=" summary d-flex justify-content-between">
                          <h6>Tax:</h6>
                          <span className="text-white">${taxPrice.toFixed(2)}</span>
                      </div>
                      <div className=" summary d-flex justify-content-between">
                          <h6>Shipping:</h6>
                          <span className="text-white">${shippingPrice.toFixed(2)}</span>
                      </div>
                      <div className="summary-total d-flex justify-content-between">
                          <h5>Total:</h5>
                          <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      <button
                        disabled={loading}
                        onClick={placeOrderHandler}
                        className="w-100 btn btn-lg btn-outline-primary light"
                      >
                      {loading ? 'Loading...' : 'Place Order'}
                    </button>
                  </div>
                </div>
              </div>
                </div>
              )}
          </div>
        </div>
      </Layout>
    )
}

CreateVendorAccount.auth = { vendorOnly: true }
export default CreateVendorAccount;