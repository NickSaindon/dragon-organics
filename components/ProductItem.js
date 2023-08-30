import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Store } from '../utils/Store';

const ProductItem = ({ product }) => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
        alert('This product is out of stock');
        return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity }});
    router.push('/cart');
  }

  return (
    <div className="col col-md-6 col-lg-4 d-flex justify-content-center mx-auto">
      <div className="card shadow-sm">
        <Link 
          href={`/product/${product.slug}`}
          legacyBehavior
        >
          <div className="card-img-container">
            <div className="product-card-img" style={{backgroundImage: `url(${product.imageOne})` }}></div>
          </div>
        </Link>                  
          <div className="card-body text-white text-center">
            <h5 className="card-text">${product.price}</h5>
            <h4 className="card-text">{product.name} {product.color}</h4>
            <h5 className="card-text">{product.type}</h5>
            <h6 className="card-text">Size: {product.size}</h6>
            <div className="row">
              <div className="col-lg-6 gy-2">
                <Link 
                  href={`/product/${product.slug}`} 
                  legacyBehavior
                >
                  <button 
                    type="button" 
                    className="w-100 btn btn-lg btn-outline-primary light"
                  >
                    Read More
                  </button>
                </Link>
              </div>
              <div className="col-lg-6 gy-2">
                <button 
                  type="button" 
                  className="w-100 btn btn-lg btn-outline-primary light"
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ProductItem;