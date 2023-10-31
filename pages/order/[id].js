import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import { ToastContainer, toast, Slide } from "react-toastify";
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';
import moment from 'moment';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' };

    case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true };
    case 'DELIVER_SUCCESS':
      return { ...state, loadingDeliver: false, successDeliver: true };
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false };
    case 'DELIVER_RESET':
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };

    default:
      state;
  }
}
function OrderScreen() {
  const { data: session } = useSession();
  // order/:id
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { query } = useRouter();
  const orderId = query.id;

  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
      if (successDeliver) {
        dispatch({ type: 'DELIVER_RESET' });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get('/api/keys/paypal');
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPaypalScript();
    }
  }, [order, orderId, paypalDispatch, successDeliver, successPay]);
  
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        toast.success('Order is paid successgully');
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }
  function onError(err) {
    toast.error(getError(err));
  }

  async function deliverOrderHandler() {
    try {
      dispatch({ type: 'DELIVER_REQUEST' });
      const { data } = await axios.put(
        `/api/admin/orders/${order._id}/deliver`,
        {}
      );
      dispatch({ type: 'DELIVER_SUCCESS', payload: data });
      toast.success('Order is delivered', {
        theme: "colored"
      });
    } catch (err) {
      dispatch({ type: 'DELIVER_FAIL', payload: getError(err) });
      toast.error(getError(err), {
        theme: "colored"
      });
    }
  }

  return (
    <Layout title={`Order ${orderId}`}>
      <div className="place-order-container bg-black text-white">
        <ToastContainer 
          position="top-center" 
          draggable={false} 
          transition={Slide} 
          autoClose={5000}
          hideProgressBar={true}
          className="toast-alert"
        />
        <div className="container-fluid">
          {session.user.isAdmin ? (
            <Link href="/admin/orders">
            <button type="button" className="btn btn-link"><i className="bi bi-arrow-left"></i> back to orders</button>
          </Link>
          ) : (
            <Link href="/order-history">
              <button type="button" className="btn btn-link"><i className="bi bi-arrow-left"></i> back to order history</button>
            </Link>
          )}
          <h1 className="text-center">{`Order ${orderId}`}</h1>
          {loading ? (
            <div className="spinner-border customer-spinner text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div> 
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <div className="row">
              <div className="col-lg-8">
                <div className="card shipping-card">
                  <div className="card-body">
                    <h2 className="card-title">Shipping Address</h2>
                    <p>
                      <b>{shippingAddress.fullName}</b><br/>
                      {shippingAddress.address}<br/>
                      {shippingAddress.city},{' '}
                      {shippingAddress.state},{' '}
                      {shippingAddress.zipCode} 
                    </p>
                    {isDelivered ? (
                      <span className="badge bg-success">Delivered at {moment(new Date(deliveredAt)).format('MM/DD/YYYY')}</span>
                    ) : (
                      <span className="badge bg-danger">Not delivered</span>
                    )}
                  </div>
                </div>
                <div className="card payment-card">
                  <div className="card-body">
                    <h2 className="card-title">Payment</h2>
                    {isPaid ? (
                      <span className="badge bg-success">Paid on {moment(new Date(paidAt)).format('MM/DD/YYYY')}</span>
                    ) : (
                      <span className="badge bg-danger">Not paid</span>
                    )}
                  </div>
                </div>
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
                        {orderItems.map((item) => (
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
                    {!isPaid && (
                      <div>
                        {isPending ? (
                          <div>Loading...</div>
                        ) : (
                          <div className="w-100">
                            <PayPalButtons
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            ></PayPalButtons>
                          </div>
                        )}
                        {loadingPay && <div>Loading...</div>}
                      </div>
                    )}
                    {session.user.isAdmin && order.isPaid && !order.isDelivered && (
                      <div>
                        <button 
                          className="w-100 btn btn-lg btn-primary" 
                          onClick={deliverOrderHandler}
                        >
                          {loadingDeliver ? (
                            <>
                              <span className="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
                              <span className="visually-hidden">Loading...</span>
                            </>
                          ) : (
                            "Deliver Order"
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

OrderScreen.auth = true;
export default OrderScreen;