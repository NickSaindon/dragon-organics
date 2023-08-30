import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import ProductItem from '../../components/ProductItem';
// import data from '../../utils/data';
import Image from "next/image";
import db from '../../utils/db';
import Category from '../../models/Categories';
import Product from '../../models/Product';

const Categories = (props) => {
    const router = useRouter();
    const { slug } = router.query;
    const { category, products } = props;

    return (
        <Layout 
        title={category?.name}
        description="Remedy Exports is a Thai based manufacture and export company that works with clients to procure the best Thai Kratom.  We handle the end-to-end process to supply quality Kratom that is safe from any 
        metals, bacteria, and that is grown naturally without the usage of any non-organic pesticides or fertilizers.">
          <div className="category-container py-5 bg-black">
          <div className="category-header">
            <div className="py-5 container">
              <div className="row py-lg-5">
                <div className="col-md-12 col-lg-6 mx-auto ">
                  <h1 className="fw-light text-primary">{category?.name}</h1>
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
                {products.filter((p) => p.category === slug).map((product) => (
                  <ProductItem product={product} key={product.slug}></ProductItem>
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
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      category: db.convertDocToObj(category),
      products: products.map(db.convertDocToObj)
    }
  }
}