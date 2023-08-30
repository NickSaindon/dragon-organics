import Image from "next/image";
import Layout from '../components/Layout';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';

const Cart = () => {
  const { state, dispatch } = useContext(Store);
    const router = useRouter();
    const { cart: { cartItems }} = state;

    const updateCartHandler = async (item, quantity) => {
      dispatch({ 
        type: 'CART_ADD_ITEM', 
        payload: { 
          ...item, 
          quantity
        } 
      });
    };

    const removeItemHandler = (item) => {
      dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    };

  return (
    <Layout>
        <div className="cart-container bg-black">
          <div className="container-fluid">
            <div className="row text-center">
              <h1 className="text-white">Shopping Cart</h1>
            </div>
            {cartItems.length === 0 ? (
              <div className="empty-cart text-center">
                <h2 className="text-white">Cart is Empty</h2>
                <Link href="/products">
                  <button type="button" className="btn btn-link">Go make an order <i className="bi bi-arrow-right"></i></button>
                </Link>
              </div>
            ) : (
              <div className="row">

              <div className="col-lg-9 cart">
                {cartItems.map((item) => (
                  <div className="card" key={item._id}>
                    <div className="card-body">
                    <div className="cart-row d-flex justify-content-between align-items-center">
                  <div className="product-img">
                    <Image src={item.imageOne} className="d-block w-100" width={50} height={50} alt="..." />
                  </div>
                  <div className="product-name d-flex align-items-center">
                    <p className="text-center">
                      {item.name}
                    </p>
                  </div>
                  <div className="product-size d-flex align-items-center">
                    <p className="text-center">
                      {item.size}
                    </p>
                  </div>
                  <div className="quantity-select text-center">
                    <span>Quantity</span>
                    <select 
                      className="form-select" 
                      value={item.quantity}
                      onChange={(e) =>
                        updateCartHandler(item, e.target.value)
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="price d-flex align-items-center">
                    <p onChange={(e) =>
                        updateCartHandler(item, e.target.value)
                      }>${item.price}</p>
                  </div>
                  <div className="">
                    <button 
                      type="button" 
                      className="btn btn-outline-primary"
                      onClick={() => removeItemHandler(item)}
                    >
                      X
                    </button>
                  </div>
                </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-lg-3">
                <div className="card checkout-card">
                  <div className="card-body">
                  <div className="row">
                          <div className="col-6">
                                <h6><b>Subtotal ({parseInt(cartItems.reduce((a, c) => a + c.quantity, 0))}) :</b></h6>
                          </div>
                          <div className="col-6 text-end">
                            <div className="text-mute">${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}</div>
                          </div>

                        </div>
                    <div className="d-grid gap-2">
                        <button 
                          className="w-100 btn btn-lg btn-outline-primary light"  
                          type="button"
                          onClick={() => router.push('/shipping')}
                        >
                          Check Out
                        </button>
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

export default dynamic(() => Promise.resolve(Cart), { ssr: false });