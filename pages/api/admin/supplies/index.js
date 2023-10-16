import { getToken } from 'next-auth/jwt';
import ManufacturerShipments from '../../../../models/ManufacturerShipments';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user || (user && !user.isAdmin)) {
    return res.status(401).send('admin signin required');
  }
  if (req.method === 'GET') {
    await db.connect();
    const supplies = await ManufacturerShipments.find({}).populate('user', 'name');
    await db.disconnect();
    res.send(supplies);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

export default handler;