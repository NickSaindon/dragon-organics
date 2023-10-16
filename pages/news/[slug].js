import News from '../../models/News';
import Layout from '../../components/Layout';
import Link from 'next/link';
import db from '../../utils/db';
import moment from 'moment';
import parse from 'html-react-parser';

const NewsPost = (props) => {
  const { news } = props;

  return (
    <Layout 
    >
      <div className="blog-post-container bg-black">
        <div className="container">
          <div className="row">
            <Link href='/news'>
              <div className="my-3 text-white">
                <i className="bi bi-arrow-left"></i>
                <span>Back to News Articles</span>
              </div>
            </Link>
            <div className="blog-post-header text-white">
              <h1>{news.title}</h1>
              <div className="fst-italic mb-2">Posted on  {moment(new Date(news.createdAt)).format('LL')} by {news.author}</div>
              <div className="blog-header-img" style={{backgroundImage: `url(${news.headerImage})`}}></div>
            </div>
          </div>
          <div className="row">
            <div className="blog-post py-5">
              <div className="ql-snow ql-editor">{parse(news.article)}</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default NewsPost; 

export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;
  
    await db.connect();
    const news = await News.findOne({slug}).lean();
    await db.disconnect();
    return {
      props: {
        news: db.convertDocToObj(news)
      }
    };
  }