import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Image from "next/image";
import db from '../../utils/db';
import Product from '../../models/Product';
import { Store } from '../../utils/Store';
import Rating from '../../components/Rating';
import axios from 'axios';
import { ToastContainer, toast, Slide } from "react-toastify";

const ProductDetails = (props) => {
  const { state, dispatch } = useContext(Store);
  const { product } = props;
  const router = useRouter();
  const [selectedImg, setSelectedImg] = useState("");
  
  if (!product) {
    return <div>Product Not Found</div>
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry, this product is out of stock', {
        theme: "colored"
      });
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Layout 
      title={`Dragon Organics | ${product?.name} ${product?.color} ${product?.size}`}
      description={`Discover the essence of Thailand in Dragon Organics ${product?.name} ${product?.color}. Elevate your well-being with this pure and potent botanical delight.`}
    >
      <ToastContainer 
        position="top-center" 
        draggable={false} 
        transition={Slide} 
        autoClose={5000}
        hideProgressBar={true}
        className="toast-alert"
      />
      <div className="details-container bg-black">
        <section>
          <div className="container-xxl">
            <div className="row gy-5">
              <div className="col p-3">
                <button onClick={() => router.back()} type="button" className="btn btn-link"><i className="bi bi-arrow-left"></i> back to products</button>
              </div>
            </div>
            <div className="row">
            <div className="col-lg-6 col-md-12 main-img">
              <div className="row">
                <div className="col-12">
                  <Image 
                      src={ selectedImg === "" ? product.imageOne : selectedImg } 
                      className="d-block w-100" 
                      width={640} 
                      height={640} 
                      alt={product.name} 
                    />
                </div>
                <div className="col-12 thumbnail-images">
                <div className="thumbnails">
                  <Image 
                    className="small" 
                    src={product.imageOne} 
                    alt="thumbnail"
                    onClick={() => setSelectedImg(product.imageOne)}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="thumbnails">
                  <Image 
                    className="small" 
                    src={product.imageTwo} 
                    alt="thumbnail"
                    onClick={() => setSelectedImg(product.imageTwo)}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="thumbnails">
                  <Image 
                    className="small" 
                    src={product.imageThree} 
                    alt="thumbnail"
                    onClick={() => setSelectedImg(product.imageThree)}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="thumbnails">
                  <Image 
                    className="small" 
                    src={product.imageFour} 
                    alt="thumbnail"
                    onClick={() => setSelectedImg(product.imageFour)}
                    width={200}
                    height={200}
                  />
                </div>
                </div>
              </div>


              </div>
              

              <div className="col-lg-5 col-md-12 col-sm-12">
                <div className="row">
                  <div className="col-lg-12 col-md-6 col-sm-12 text-white">
                    <h2>{product.name} {product.color}</h2>
                    <h5>Type</h5>
                    <p>{product.leafType}</p>
                    <h5>Description</h5>
                    <p>{product.description}</p>
                    <h5>Size</h5>
                    <p>{product.size}</p>
                    <h5>Disclaimer</h5>
                    <p>
                      Our products are the highest quality (GAP/GMP). The information given is for 
                      academic purpose only and not intended to diagnose, treat, cure or prevent disease.
                    </p>
                    <div className="row">
                          <div className="col-6">
                            <h5><b>Price:</b></h5>
                            <h6><b>Status:</b></h6>
                          </div>
                          <div className="col-6 text-end">
                            <h5>${product.price}</h5>
                            <div className="text-mute">{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</div>
                          </div>
                        </div>
                        <div className="d-grid gap-2">
                          <button 
                            className="w-100 btn btn-lg btn-outline-primary light" 
                            type="button"
                            onClick={addToCartHandler}
                          >
                            Add To Cart
                          </button>
                        </div>  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default ProductDetails;

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({slug}).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product)
    }
  };
}