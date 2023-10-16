import { getToken } from 'next-auth/jwt';
import News from '../../../../models/News';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user || !user.isAdmin) {
    return res.status(401).send('admin signin required');
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
  await db.connect();
  const newNews = new News({
    title: 'New Article Post',
    headerImage: '/images/kratom.jpg',
    description: 'Article description goes here',
    author: 'Author goes here',
    article: 'Start creating a new article post here',
    published: false,
    slug: 'sample-slug-' + Math.random()
  });

  const news = await newNews.save();
  await db.disconnect();
  res.send({ message: 'Article created successfully', news });
};

const getHandler = async (req, res) => {
  await db.connect();
  const news = await News.find({});
  await db.disconnect();
  res.send(news);
};

export default handler;