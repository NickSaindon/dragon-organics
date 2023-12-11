import { createRouter } from 'next-connect';
import { getToken } from 'next-auth/jwt';
import Discount from '../../../../../models/Discounts';
import db from '../../../../../utils/db';

const router = createRouter();

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user || (user && !user.isAdmin)) {
    return res.status(401).send('signin required');
  }

  if (req.method === 'GET') {
    return getHandler(req, res, user);
  } else if (req.method === 'PUT') {
    return putHandler(req, res, user);
  } else if (req.method === 'DELETE') {
    return deleteHandler(req, res, user);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

const getHandler = async (req, res) => {
  await db.connect();
  const discount = await Discount.findById(req.query.id);
  await db.disconnect();
  res.send(discount);
};

const putHandler = async (req, res) => {
  await db.connect();
  const discount = await Discount.findById(req.query.id);
  if (discount) {
    discount.campaignName = req.body.campaignName;
    discount.discountReason = req.body.discountReason;
    discount.discountCode = req.body.discountCode;
    discount.discountAmount = req.body.discountAmount;
    discount.numOfDiscounts = req.body.numOfDiscounts;
    discount.expires = req.body.expires;
    discount.isValid = req.body.isValid;
    await discount.save();
    await db.disconnect();
    res.send({ message: 'Discount updated successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Discount not found' });
  }
};

const deleteHandler = async (req, res) => {
  await db.connect();
  const discount = await Discount.findById(req.query.id);
  if (discount) {
    await discount.deleteOne();
    await db.disconnect();
    res.send({ message: 'Discount deleted successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Discount not found' });
  }
};

export default handler;