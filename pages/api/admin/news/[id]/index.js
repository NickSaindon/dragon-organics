import { createRouter } from 'next-connect';
import { getToken } from 'next-auth/jwt';
import News from '../../../../../models/News';
import db from '../../../../../utils/db';

const router = createRouter();

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user || (user && !user.isAdmin)) {
    return res.status(401).send('signin required');
  }

  if (req.method === 'GET') {
    return getHandler(req, res, user);
  } else if (req.method === 'PUT') {
    return putHandler(req, res, user);
  } else if (req.method === 'DELETE') {
    return deleteHandler(req, res, user);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

const getHandler = async (req, res) => {
  await db.connect();
  const news = await News.findById(req.query.id);
  await db.disconnect();
  res.send(news);
};

const putHandler = async (req, res) => {
  await db.connect();
  const news = await News.findById(req.query.id);
  if (news) {
    news.title = req.body.title;
    news.headerImage = req.body.headerImage;
    news.description = req.body.description;
    news.author = req.body.author;
    news.article = req.body.article;
    news.published = req.body.published;
    news.slug = req.body.slug;
    await news.save();
    await db.disconnect();
    res.send({ message: 'Article updated successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Article not found' });
  }
};

const deleteHandler = async (req, res) => {
  await db.connect();
  const news = await News.findById(req.query.id);
  if (news) {
    await news.deleteOne();
    await db.disconnect();
    res.send({ message: 'Article deleted successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Article not found' });
  }
};

export default handler;