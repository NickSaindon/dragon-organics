import { createRouter } from 'next-connect';
import Discount from '../../../models/Discounts';
import db from '../../../utils/db';

const router = createRouter();

router.get(async (req, res) => {
    await db.connect();
    const discounts = await Discount.find({});
    await db.disconnect();
    res.send(discounts);
});

export default router.handler();