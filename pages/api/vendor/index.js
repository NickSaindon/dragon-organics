import { getToken } from 'next-auth/jwt';
import VendorAccount from '../../../models/VendorAccount';
import db from '../../../utils/db';

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user || !user.isVendor) {
    return res.status(401).send('retail vendor signin required');
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
  const user = await getToken({ req });
  await db.connect();
  const newVendorAccount = new VendorAccount({
    ...req.body,
    user: user._id,
  });

  const vendorAccount = await newVendorAccount.save();
  res.status(201).send(vendorAccount);
};

const getHandler = async (req, res) => {
  const user = await getToken({ req });
  if (!user) {
    return res.status(401).send({ message: 'retail vendor signin required' });
  }
  await db.connect();
  const vendorAccount = await VendorAccount.find({ user: user._id });
  await db.disconnect();
  res.send(vendorAccount);
};

export default handler;