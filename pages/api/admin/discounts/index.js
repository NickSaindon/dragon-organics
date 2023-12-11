import { getToken } from 'next-auth/jwt';
import Discount from '../../../../models/Discounts';
import db from '../../../../utils/db';
import moment from 'moment';

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
  const newDiscount = new Discount({
    campaignName: 'Affiliate Campaign',
    discountReason: 'Drive traffic to website through affiliates',
    discountCode: (Math.random() + 1).toString(36).substring(6),
    discountAmount: 0.10,
    numOfDiscounts: 1,
    expires: moment(new Date).add(5, 'days'),
    isValid: false,
  });

  const discount = await newDiscount.save();
  await db.disconnect();
  res.send({ message: 'Discount created successfully', discount });
};

const getHandler = async (req, res) => {
  await db.connect();
  const discounts = await Discount.find({});
  await db.disconnect();
  res.send(discounts);
};

export default handler;