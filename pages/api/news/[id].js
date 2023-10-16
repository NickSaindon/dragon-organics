import { createRouter } from 'next-connect';
import News from '../../../models/News';
import db from '../../../utils/db';

const router = createRouter();

router.get(async (req, res) => {
    await db.connect();
    const news = await News.findById(req.query.id);
    await db.disconnect();
    res.send(news);
});

export default router.handler();