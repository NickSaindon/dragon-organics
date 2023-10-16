import { getToken } from 'next-auth/jwt';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user || !user.isAdmin) {
    return res.status(401).send('admin signin required');
  }
  if (req.method === 'GET') {
    return getHandler(req, res);
  } else if (req.method === 'POST') {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};
const postHandler = async (req, res) => {
  await db.connect();
  const newProduct = new Product({
    name: 'Product Name',
    slug: 'sample-name-' + Math.random(),
    price: 0,
    category: 'sample category',
    color: 'Red',
    size: '100g',
    imageOne: '/images/do-100g-raw-powder-red-front.jpg',
    imageTwo: '/images/do-100g-raw-powder-red-back.jpg',
    imageThree: '/images/kratom-powder.jpg',
    imageFour: '/images/do-raw-powder-sample.jpg',
    region: 'Thailand',
    leafName: 'Gan Dang',
    leafType: 'Traditional Leaf',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    rating: 0,
    numReviews: 0,
    countInStock: 0,
    description: 'sample description',
    featured: false
  });

  const product = await newProduct.save();
  await db.disconnect();
  res.send({ message: 'Product created successfully', product });
};
const getHandler = async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
};
export default handler;