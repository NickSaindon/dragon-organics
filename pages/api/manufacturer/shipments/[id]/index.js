import { createRouter } from 'next-connect';
import { getToken } from 'next-auth/jwt';
import ManufacturerShipments from '../../../../../models/ManufacturerShipments';
import db from '../../../../../utils/db';

const router = createRouter();

router.get(async (req, res) => {
    const user = await getToken({ req });
    if (!user) {
      return res.status(401).send('signin required');
    }
  
    await db.connect();
  
    const shipment = await ManufacturerShipments.findById(req.query.id);
    await db.disconnect();
    res.send(shipment);
});

export default router.handler();