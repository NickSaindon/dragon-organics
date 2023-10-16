import { useContext, useState } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getError } from '../utils/error';
import Cookies from 'js-cookie';
import { ToastContainer, toast, Slide } from "react-toastify";
import CheckoutWizard from '../components/CheckoutWizard';

const PlaceOrder = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  ); // 123.4567 => 123.46

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: 'CART_CLEAR_ITEMS' });
      Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

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
        <CheckoutWizard activeStep={2} />
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
                      <Link href="/shipping">
                        <button type="button" className="btn btn-primary">Edit</button>
                      </Link>

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
  );
};

PlaceOrder.auth = true;
export default PlaceOrder;

