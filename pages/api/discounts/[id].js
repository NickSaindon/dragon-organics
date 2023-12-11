import Discount from '../../../models/Discounts';
import db from '../../../utils/db';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    return getHandler(req, res);
  } else if (req.method === 'PUT') {
    return putHandler(req, res);
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

export default handler;