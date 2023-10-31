import { createRouter } from 'next-connect';
import { getToken } from 'next-auth/jwt';
import VendorAccount from '../../../../models/VendorAccount';
import db from '../../../../utils/db';

const router = createRouter();

router.get(async (req, res) => {
    const user = await getToken({ req });
    if (!user) {
      return res.status(401).send('signin required');
    }
  
    await db.connect();
  
    const vendorAccount = await VendorAccount.findById(req.query.id);
    await db.disconnect();
    res.send(vendorAccount);
});

export default router.handler();