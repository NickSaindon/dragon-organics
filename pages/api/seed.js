import { createRouter } from 'next-connect';
import User from '../../models/User';
import Product from '../../models/Product';
import Category from '../../models/Categories';
import db from '../../utils/db';
import data from '../../utils/data';

const router = createRouter();

router.get(async (req, res) => {
    await db.connect();
    await User.deleteMany();
    await User.insertMany(data.users);
    await db.disconnect();
    res.send({ message: 'seeded successfully' });
});

export default router.handler();