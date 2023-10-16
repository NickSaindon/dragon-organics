import { getToken } from 'next-auth/jwt';
import ManufacturerShipments from '../../../../models/ManufacturerShipments';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user || !user.isManufacturer) {
    return res.status(401).send('manufacturer signin required');
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
  const newManufacturerShipment = new ManufacturerShipments({
    ...req.body,
    user: user._id,
  });

  const manufacturerShipment = await newManufacturerShipment.save();
  res.status(201).send(manufacturerShipment);
};

const getHandler = async (req, res) => {
  const user = await getToken({ req });
  if (!user) {
    return res.status(401).send({ message: 'manufacturer signin required' });
  }
  await db.connect();
  const manufacturerShipment = await ManufacturerShipments.find({ user: user._id });
  await db.disconnect();
  res.send(manufacturerShipment);
};

export default handler;