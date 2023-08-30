import { createRouter } from 'next-connect';
import Product from '../../models/Product';
import Category from '../../models/Categories';
import db from '../../utils/db';
import data from '../../utils/data';

const router = createRouter();

router.get(async (req, res) => {
    await db.connect();
    await Product.deleteMany();
    await Product.insertMany(data.products);
    await db.disconnect();
    res.send({ message: 'seeded successfully' });
});

export default router.handler();