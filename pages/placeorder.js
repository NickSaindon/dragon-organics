import { useContext, useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import Cookies from "js-cookie";
import { ToastContainer, toast, Slide } from "react-toastify";
import CheckoutWizard from "../components/CheckoutWizard";
import NumberFormat from "react-number-format";
import OrderCard from "@/components/OrderCard";
import ShippingCard from "@/components/ShippingCard";
import DiscountForm from "@/components/DiscountForm";

const PlaceOrder = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress } = cart;
  const [isAddress, setIsAddress] = useState(true);
  const [shippingPrice, setShippingPrice] = useState(null);

  const parseWeight = (sizeStr) => {
    if (!sizeStr) return 0;
    const num = parseFloat(sizeStr.replace(/[^\d.]/g, ""));
    return isNaN(num) ? 0 : num;
  };

  // Calculate total weight (assumes all weights are in grams — adjust if mixing units)
  const totalWeight = cartItems.reduce((total, item) => {
    const itemWeight = parseWeight(item.size) * item.quantity;
    return total + itemWeight;
  }, 0);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  const getSalesTaxRate = (state, zip) => {
    if (state === "GA") {
      return 0.07;
    }
    return 0;
  };

  const calculateTax = (state, zip, subtotal) => {
    const rate = getSalesTaxRate(state, zip);
    return subtotal * rate;
  };

  const taxPrice = calculateTax(
    shippingAddress.state,
    shippingAddress.zipCode,
    itemsPrice
  );
  const totalPrice = round2(itemsPrice + (shippingPrice ?? 0) + taxPrice);
  const [discount, setDiscount] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onDiscountApplied = (discountObj) => {
    setDiscount(discountObj);
  };

  const discountedItems = discount
    ? cartItems.reduce((a, c) => a + c.quantity * c.price, 0) *
      discount.discountAmount
    : 0;
  const itemsDiscountTotal = itemsPrice - discountedItems;
  const totalPriceWithDiscount = round2(
    itemsDiscountTotal + (shippingPrice ?? 0) + taxPrice
  );

  const applyFallbackShipping = () => {
    if (itemsPrice > 60) {
      setShippingPrice(0);
    } else {
      setShippingPrice(5.95);
    }
  };

  useEffect(() => {
    const fetchUSPSRate = async () => {
      try {
        const weightOz = (totalWeight / 28.3495).toFixed(1);

        // Free shipping if subtotal > $60
        if (itemsPrice > 60) {
          setShippingPrice(0);
          return;
        }

        const response = await axios.post("/api/shippo-rate", {
          street1: shippingAddress.address,
          city: shippingAddress.city,
          state: shippingAddress.state,
          zip: shippingAddress.zipCode,
          weightOz,
        });

        const data = response.data;
        console.log("📬 USPS BESTVALUE response:", data);

        if (data.rate != null) {
          setShippingPrice(parseFloat(data.rate));
        } else {
          applyFallbackShipping();
        }
      } catch (err) {
        applyFallbackShipping();
      }
    };

    if (shippingAddress?.zipCode && totalWeight > 0) {
      fetchUSPSRate();
    }
  }, [totalWeight, shippingAddress?.zipCode, itemsPrice]);

  const placeOrderHandler = async (data) => {
    try {
      setLoading(true);

      const chargeResponse = await axios.post("/api/charge", {
        cardNumber: data.ccnumber,
        expirationDate: data.ccexp,
        cardCode: data.cvv,
        amount: discount ? totalPriceWithDiscount : totalPrice,
        billingAddress: isAddress
          ? shippingAddress
          : {
              firstName: data.first_name,
              lastName: data.last_name,
              address: data.address1,
              city: data.city,
              state: data.state,
              zip: data.zip,
              country: "USA",
            },
      });

      if (chargeResponse.status !== 200) {
        toast.error(`Transaction failed: ${chargeResponse.data.error}`, {
          theme: "colored",
        });
        return;
      }

      toast.success(`Transaction successful: ${chargeResponse.data.message}`, {
        theme: "colored",
      });

      for (const item of cartItems) {
        const stockResponse = await axios.put(`/api/products/${item._id}`, {
          quantity: item.quantity,
        });

        if (stockResponse.status !== 200) {
          toast.error(
            `Failed to update stock for ${item.name}. Please contact support.`,
            { theme: "colored" }
          );
          return;
        }
      }

      const orderData = {
        orderItems: cartItems,
        shippingAddress,
        itemsPrice: discount ? itemsDiscountTotal : itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice: discount ? totalPriceWithDiscount : totalPrice,
        isPaid: true,
        paidAt: new Date(),
        transactionId: chargeResponse.data.transactionId,
      };

      const orderResponse = await axios.post("/api/orders", orderData);

      if (orderResponse.status !== 200 && orderResponse.status !== 201) {
        toast.error(
          "Order save failed — payment was successful, but order wasn't stored.",
          { theme: "colored" }
        );
        return;
      }

      const savedOrder = orderResponse.data;

      await axios.post("/api/receipt", {
        orderData: savedOrder,
        orderId: savedOrder._id,
      });

      dispatch({ type: "CART_CLEAR_ITEMS" });
      Cookies.remove("cart");
      Cookies.remove("discount", { path: "/" });

      router.push(`/order-success?orderId=${savedOrder._id}`);
    } catch (err) {
      setLoading(false);
      const errorMessage =
        err?.response?.data?.error ||
        err?.message ||
        "An unexpected error occurred";
      console.error("Order placement error:", err);
      toast.error(`The transaction failed: ${errorMessage}`, {
        theme: "colored",
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
          {cartItems.length === 0 ? (
            <div className="text-center text-white">
              <h3>
                Cart is Empty. <Link href="/">Go Shopping</Link>
              </h3>
            </div>
          ) : (
            <div className="row">
              <div className="col-lg-8">
                <ShippingCard shippingAddress={shippingAddress} />
                <OrderCard cartItems={cartItems} />
              </div>

              <div className="col-lg-4">
                <div className="row">
                  <div className="col">
                    <div className="card summary-card">
                      <div className="card-body">
                        <h2 className="card-title">Order Summary</h2>
                        <div className="summary d-flex justify-content-between">
                          <h6>Items:</h6>
                          <span className="text-white">
                            $
                            {discount
                              ? itemsDiscountTotal.toFixed(2)
                              : itemsPrice.toFixed(2)}
                          </span>
                        </div>
                        <div className=" summary d-flex justify-content-between">
                          <h6>Tax:</h6>
                          <span className="text-white">
                            ${taxPrice.toFixed(2)}
                          </span>
                        </div>
                        <div className=" summary d-flex justify-content-between">
                          <h6>Shipping:</h6>
                          <span className="text-white">
                            {shippingPrice === null
                              ? "Calculating shipping..."
                              : `$${shippingPrice.toFixed(2)}`}
                          </span>
                        </div>
                        <div className="summary-total d-flex justify-content-between">
                          <h5>Total:</h5>
                          <span>
                            $
                            {discount
                              ? totalPriceWithDiscount.toFixed(2)
                              : totalPrice.toFixed(2)}
                          </span>
                        </div>
                        <DiscountForm onDiscountApplied={onDiscountApplied} />
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
                          <Image
                            src="/images/icons/visa_icon.png"
                            width={45}
                            height={45}
                            alt="..."
                          />
                          <Image
                            src="/images/icons/mastercard_icon.png"
                            width={45}
                            height={45}
                            alt="..."
                          />
                          <Image
                            src="/images/icons/discover_icon.png"
                            width={45}
                            height={45}
                            alt="..."
                          />
                          <Image
                            src="/images/icons/amex_card_icon.png"
                            className="mt-2"
                            width={48}
                            height={30}
                            alt="..."
                          />
                        </div>
                        <form
                          onSubmit={handleSubmit(placeOrderHandler)}
                          className="col-lg-12 col-md-12 col-sm-12 form-credit-card justify-content-center"
                        >
                          <div className="form-floating">
                            <input
                              type="text"
                              className={`form-control ${
                                errors.ccnumber ? "is-invalid" : ""
                              }`}
                              id="ccnumber"
                              placeholder="Card Number"
                              {...register("ccnumber", {
                                required: "Please enter card number",
                                pattern: {
                                  value: /^\d{13,19}$/,
                                  message:
                                    "Card number must be 13 to 19 digits with no spaces or dashes",
                                },
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
                                pattern: /^\d{4}$/,
                              }}
                              render={({
                                field: { onChange, ccexp, value },
                              }) => (
                                <NumberFormat
                                  format="####"
                                  name={ccexp}
                                  className={`form-control ${
                                    errors.ccexp ? "is-invalid" : ""
                                  }`}
                                  value={value}
                                  id="ccexp"
                                  placeholder="Expn Date MMYY"
                                  onChange={onChange}
                                />
                              )}
                            />
                            <div className="invalid-feedback">
                              {errors.ccexp
                                ? errors.ccexp.type === "pattern"
                                  ? "Expiration date is not completed"
                                  : "Expiration date is required"
                                : ""}
                            </div>
                            <label htmlFor="floatingInput">
                              Expn Date MMYY
                            </label>
                          </div>
                          <div className="form-floating">
                            <Controller
                              name="cvv"
                              control={control}
                              rules={{
                                required: true,
                                pattern: /\d{3}/,
                              }}
                              render={({ field: { onChange, cvv, value } }) => (
                                <NumberFormat
                                  format="###"
                                  name={cvv}
                                  className={`form-control ${
                                    errors.cvv ? "is-invalid" : ""
                                  }`}
                                  value={value}
                                  id="cvv"
                                  placeholder="CVV"
                                  onChange={onChange}
                                />
                              )}
                            />
                            <div className="invalid-feedback">
                              {errors.cvv
                                ? errors.cvv.type === "pattern"
                                  ? "cvv is not completed"
                                  : "cvv is required"
                                : ""}
                            </div>
                            <label htmlFor="cvv">CVV</label>
                          </div>
                          <div className="form-floating">
                            <input
                              type="text"
                              className={`form-control ${
                                errors.first_name ? "is-invalid" : ""
                              }`}
                              id="first_name"
                              placeholder="First Name"
                              {...register("first_name", {
                                required: "Please enter cardholder first name",
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
                              className={`form-control ${
                                errors.last_name ? "is-invalid" : ""
                              }`}
                              id="last_name"
                              placeholder="Last Name"
                              {...register("last_name", {
                                required: "Please enter cardholder last name",
                                pattern: {
                                  value: /^[A-Za-z]+$/,
                                  message:
                                    "Last name must contain letters only (no numbers or symbols)",
                                },
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
                                  onChange={(e) =>
                                    setIsAddress(e.target.checked)
                                  }
                                  checked={isAddress}
                                  id="isBillingAddress"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="gridCheck"
                                >
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
                                        className={`form-control ${
                                          errors.address1 ? "is-invalid" : ""
                                        }`}
                                        id="address1"
                                        placeholder="Address"
                                        {...register("address1", {
                                          required:
                                            "Please enter a billing address",
                                          pattern: {
                                            value: /^[a-zA-Z0-9 #'-]+$/,
                                            message:
                                              "Address must contain only numbers, letters, apostrophes, or hyphens",
                                          },
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
                                        className={`form-control ${
                                          errors.city ? "is-invalid" : ""
                                        }`}
                                        id="city"
                                        placeholder="City"
                                        {...register("city", {
                                          required: "Please enter city",
                                          pattern: {
                                            value: /^[A-Za-z\s'-]+$/,
                                            message:
                                              "City name must contain only letters, spaces, apostrophes, or hyphens",
                                          },
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
                                        className={`form-control ${
                                          errors.state ? "is-invalid" : ""
                                        }`}
                                        id="state"
                                        placeholder="State"
                                        {...register("state", {
                                          required: "Please enter a state",
                                          pattern: {
                                            value: /^[A-Za-z]{2}$/,
                                            message:
                                              "State must be exactly 2 letter abbreviation",
                                          },
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
                                        className={`form-control ${
                                          errors.zip ? "is-invalid" : ""
                                        }`}
                                        id="zip"
                                        placeholder="Zip"
                                        {...register("zip", {
                                          required: "Please enter zip code",
                                          pattern: {
                                            value: /^\d{5}(-\d{4})?$/,
                                            message:
                                              "Enter a valid 5-digit ZIP",
                                          },
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
                            <div className="mt-4">
                              <button
                                className="w-100 btn btn-lg btn-primary"
                                type="submit"
                              >
                                Place Order
                              </button>
                            </div>
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
