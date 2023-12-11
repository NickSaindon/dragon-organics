import { getToken } from 'next-auth/jwt';
import ManufacturerShipments from '../../../../../models/ManufacturerShipments';
import db from '../../../../../utils/db';

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user || (user && !user.isAdmin)) {
    return res.status(401).send('Error: signin required');
  }
  await db.connect();
  const shipment = await ManufacturerShipments.findById(req.query.id);
  if (shipment) {
    shipment.isRecieved = true;
    shipment.recievedAt = Date.now();
    const shippedOrder = await shipment.save();
    await db.disconnect();
    res.send({
      message: 'shipment delivered successfully',
      shipment: shippedOrder,
    });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Error: shipment not found' });
  }
};

export default handler;