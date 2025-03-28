import { useContext, useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { getError } from '../utils/error';
import Cookies from 'js-cookie';
import { ToastContainer, toast, Slide } from "react-toastify";
import CheckoutWizard from '../components/CheckoutWizard';
import moment from 'moment';
import NumberFormat from "react-number-format";

const PlaceOrder = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress } = cart;
  const [isAddress, setIsAddress] = useState(true)


  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  ); // 123.4567 => 123.46

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  const [discounts, setDiscounts] = useState(null)
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    fetch('/api/discounts')
    .then((res) => res.json())
    .then((discounts) => {
      setDiscounts(discounts);
      setLoading(false);
    })
}, [])
  
  const submitHandler = async (data) => {
    let discountObj = discounts.find(o => o.discountCode === data.discountCode);
    let expiredDate = moment(new Date(discountObj.expires)).format('MM/DD/YYYY');
    let todaysDate = moment(new Date()).format('MM/DD/YYYY');
    if (discountObj.isValid === true && discountObj.numOfDiscounts > 0 && expiredDate > todaysDate) {
      const { data } = await axios.put(`/api/discounts/${discountObj._id}`, {
        campaignName: discountObj.campaignName,
        discountReason: discountObj.discountReason,
        discountCode: discountObj.discountCode,
        discountAmount: discountObj.discountAmount,
        numOfDiscounts: discountObj.numOfDiscounts - 1,
        expires: discountObj.expires,
        isValid: discountObj.isValid
      });
      Cookies.set('discount',         
      JSON.stringify(discountObj));
      reset();
      toast.success('Discount code has been applied. Please place your order now.', {
        theme: 'colored'
      });
    } else {
      toast.error('Invalid discount code or campign is over', {
        theme: 'colored'
      });
    }

  }

  const discount = Cookies.get('discount') ?  JSON.parse(Cookies.get('discount')) : false;
  const discountedItems = itemsPrice * discount.discountAmount;
  const itemsDiscountTotal = itemsPrice - discountedItems;
  const totalPriceWithDiscount = round2(itemsDiscountTotal + shippingPrice + taxPrice)

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        itemsPrice: discount ? itemsDiscountTotal : itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice: discount ? totalPriceWithDiscount : totalPrice,
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
      Cookies.remove('discount');
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err), {
        theme: 'colored'
      });
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
                        <b>{shippingAddress.firstName} {shippingAddress.lastName}</b><br/>
                        <b>{shippingAddress.email}</b><br/>
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
              <div className="row">
                <div className="col">
                  <div className="card summary-card">
                    <div className="card-body">
                      <h2 className="card-title">Order Summary</h2>
                      <div className="summary d-flex justify-content-between">
                        <h6>Items:</h6>
                        <span className="text-white">${discount ? itemsDiscountTotal.toFixed(2) : itemsPrice.toFixed(2)}</span>
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
                        <span>${discount ? totalPriceWithDiscount.toFixed(2) : totalPrice.toFixed(2)}</span>
                      </div>
                      <form 
                        onSubmit={handleSubmit(submitHandler)}
                        className="col-lg-6 col-md-12 col-sm-12 discount-form w-100 justify-content-center" 
                        noValidate
                      >
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control my-3"
                            id="discountCode"
                            placeholder='Discount Code'
                            autoFocus
                            {...register('discountCode', {
                              required: 'Please enter discount code',
                            })}
                          />
                          {errors.discountCode && (
                            <div className="invalid-feedback">
                              {errors.discountCode.message}
                            </div>
                          )}
                          <label htmlFor="discountCode">Discount Code</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">
                          Submit Discount
                        </button>
                    </form>
                  </div>
                </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                <div className="card summary-card">
                  <div className="card-body">
                    <h2 className="card-title">Credit Card</h2>
                    <div className="d-flex justify-content-between">
                      <Image src="/images/icons/visa_icon.png" width={45} height={45} alt="..." />
                      <Image src="/images/icons/mastercard_icon.png" width={45} height={45} alt="..." />
                      <Image src="/images/icons/discover_icon.png" width={45} height={45} alt="..." />
                      <Image src="/images/icons/amex_card_icon.png" className="mt-2" width={48} height={30} alt="..." />
                    </div>
                    <form onSubmit={handleSubmit(submitHandler)} className="col-lg-12 col-md-12 col-sm-12 form-credit-card justify-content-center">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="ccnumber"
                        placeholder="Card Number" 
                        {...register('ccnumber', {
                          required: 'Please enter card number',
                        })}
                      />
                      {errors.ccnumber && (
                        <div className="invalid-feedback">
                          {errors.ccnumber.message}
                        </div>
                      )}
                      <label htmlFor="ccnumber">Card Number</label>
                    </div>
                    <div className="form-floating">
                                <Controller 
                                  name="ccexp"
                                  control={control}
                                  rules={{
                                    required: true,
                                    pattern: /\d{2}\/\d{2}/
                                  }}
                                  render={({ field: {onChange, ccexp, value} }) => (
                                    <NumberFormat
                                      format="##/##"
                                      name={ccexp}
                                      className={`form-control ${errors.ccexp ? 'is-invalid' : ''}`}
                                      value={value}
                                      id="ccexp" 
                                      placeholder="Expn Date MMYY" 
                                      onChange={onChange}
                                    />
                                  )}
                                />
                                <div className="invalid-feedback">
                                    {errors.ccexp
                                          ? errors.ccexp.type === 'pattern'
                                            ? 'Expiration date is not completed'
                                            : 'Expiration date is required'
                                          : ''
                                    }
                                </div>
                                <label htmlFor="floatingInput">Expn Date MMYY</label>
                              </div>
                              <div className="form-floating">
                                <Controller 
                                  name="cvv"
                                  control={control}
                                  rules={{
                                    required: true,
                                    pattern: /\d{3}/
                                    ,
                                  }}
                                  render={({ field: {onChange, cvv, value} }) => (
                                    <NumberFormat
                                      format="###"
                                      name={cvv}
                                      className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                                      value={value}
                                      id="cvv" 
                                      placeholder="CVV" 
                                      onChange={onChange}
                                    />
                                  )}
                                />
                                <div className="invalid-feedback">
                                    {errors.cvv
                                          ? errors.cvv.type === 'pattern'
                                            ? 'cvv is not completed'
                                            : 'cvv is required'
                                          : ''
                                    }
                                </div>
                                <label htmlFor="cvv">CVV</label>
                              </div>
                              <div className="form-floating">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="first_name"
                                  placeholder="First Name" 
                                  {...register('first_name', {
                                    required: 'Please enter cardholder first name',
                                  })}
                                />
                                {errors.first_name && (
                                  <div className="invalid-feedback">
                                    {errors.first_name.message}
                                  </div>
                                )}
                                <label htmlFor="first_name">First Name</label>
                              </div>
                              <div className="form-floating">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="last_name"
                                  placeholder="Last Name" 
                                  {...register('last_name', {
                                    required: 'Please enter cardholder last name',
                                  })}
                                />
                                {errors.last_name && (
                                  <div className="invalid-feedback">
                                    {errors.last_name.message}
                                  </div>
                                )}
                                <label htmlFor="last_name">Last Name</label>
                              </div>


                              <div className="row pt-3">
                                <div className="col">
                                <div className="form-check">
                                  <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    name="isBillingAddress"
                                    onChange={(e) => setIsAddress(e.target.checked)}
                                    checked={isAddress}
                                    id="isBillingAddress"
                                  />
                                  <label className="form-check-label" htmlFor="gridCheck">
                                    Use shipping address as billing address
                                  </label>
                                </div> 
                                </div>
                                {!isAddress && (
                                  <div className="mt-4">
                                    <h5>Billing Address</h5>
                                    <div className="row">
                                      <div className="col">
                                      <div className="form-floating">
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="address1"
                                      placeholder="Address" 
                                      {...register('address1', {
                                        required: 'Please enter cardholder last name',
                                      })}
                                    />
                                    {errors.address1 && (
                                      <div className="invalid-feedback">
                                        {errors.address1.message}
                                      </div>
                                    )}
                                    <label htmlFor="address1">Address</label>
                                  </div>

                                  <div className="form-floating">
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="city"
                                      placeholder="City" 
                                      {...register('city', {
                                        required: 'Please enter city',
                                      })}
                                    />
                                    {errors.city && (
                                      <div className="invalid-feedback">
                                        {errors.city.message}
                                      </div>
                                    )}
                                    <label htmlFor="city">City</label>
                                  </div>


                                  <div className="form-floating">
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="state"
                                      placeholder="State" 
                                      {...register('state', {
                                        required: 'Please enter a state',
                                      })}
                                    />
                                    {errors.state && (
                                      <div className="invalid-feedback">
                                        {errors.state.message}
                                      </div>
                                    )}
                                    <label htmlFor="state">State</label>
                                  </div>

                                  <div className="form-floating">
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="zip"
                                      placeholder="Zip" 
                                      {...register('zip', {
                                        required: 'Please enter cvv number',
                                      })}
                                    />
                                    {errors.zip && (
                                      <div className="invalid-feedback">
                                        {errors.zip.message}
                                      </div>
                                    )}
                                    <label htmlFor="zip">Zip</label>
                                  </div>


                                      </div>

                                    </div>
                                  </div>
                                )}
                              </div>

                    </form>
                  </div>
                </div>
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

export default PlaceOrder;
