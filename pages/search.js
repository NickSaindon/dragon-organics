import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import { Store } from "../utils/Store";
import { ToastContainer, toast, Slide } from "react-toastify";

const SearchPage = () => {
  const { state, dispatch } = useContext(Store);

  const router = useRouter();
  const { q } = router.query;
  const { cart } = state;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q) return;
    setLoading(true);

    const fetchResults = async () => {
      try {
        const { data } = await axios.get(`/api/search?q=${q}`);
        setProducts(data);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [q]);

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry, this product is out of stock", {
        theme: "colored",
      });
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };

  return (
    <Layout title={`Search: ${q}`}>
      <ToastContainer
        position="top-center"
        draggable={false}
        transition={Slide}
        autoClose={5000}
        hideProgressBar={true}
        className="toast-alert"
      />
      <div className="search-container py-5 bg-black">
        <div className="container py-5">
          <h1 className="mb-4 text-white">
            Search results for: <em>{q}</em>
          </h1>
          <div className="empty-search text-center text-white">
            {!loading && products.length === 0 && (
              <h2>
                No results found.
                <br />
                Try a New Search.
              </h2>
            )}
          </div>
          <div className="container-xl">
            <div className="row product-category-row gy-3">
              {products.map((product) => (
                <ProductItem
                  product={product}
                  key={product._id}
                  addToCartHandler={addToCartHandler}
                ></ProductItem>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
