import Layout from '../../components/Layout';
import axios from 'axios';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import ProductItem from '../../components/ProductItem';
import Image from "next/image";
import db from '../../utils/db';
import Category from '../../models/Categories';
import Product from '../../models/Product';
import { Store } from '../../utils/Store';
import { ToastContainer, toast, Slide } from "react-toastify";

const Categories = (props) => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { slug } = router.query;
  const { category, products } = props;
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry, this product is out of stock', {
        theme: "colored"
      });
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

    return (
        <Layout 
          title={`Dragon Organics | ${category?.name}`}
          description={`Indulge in Dragon Organics ${category?.name} collection from Thailand. Elevate your experience with pure, potent botanicals. Explore now!`}
        >
            <ToastContainer 
              position="top-center" 
              draggable={false} 
              transition={Slide} 
              autoClose={5000}
              hideProgressBar={true}
              className="toast-alert"
            />
          <div className="category-container py-5 bg-black">

          <div className="category-header">
            <div className="py-5 container">
              <div className="row py-lg-5">
                <div className="col-md-12 col-lg-6 mx-auto ">
                  <h1 className={`fw-light ${category?.name === 'Blue Lotus' ? "text-blue" : "text-primary"}`}>{category?.name}</h1>
                  <p className="lead text-white">
                    {category?.categoryText}
                  </p>
                </div>
                <div className="col-lg-6 mx-auto category-header-img text-center">
                  <Image src={category?.categoryImage} width={600} height={340} alt="..." />
                </div>
              </div>
            </div>
          </div>
            <div className="container-xl">
              <div className="row product-category-row gy-3">
                {products.filter((p) => p.category === slug).sort((a, b) => a._id.localeCompare(b._id)).map((product) => (
                  <ProductItem 
                    product={product} 
                    key={product.slug}
                    addToCartHandler={addToCartHandler}
                  >
                  </ProductItem>
                ))}
              </div>
            </div>
          </div>
      </Layout>
    )
}

export default Categories;

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const category = await Category.findOne({slug}).lean();
  const products = await Product.find().lean();
  await db.disconnect();
  return {
    props: {
      category: db.convertDocToObj(category),
      products: products.map(db.convertDocToObj)
    }
  }
}