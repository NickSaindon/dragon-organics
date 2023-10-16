import Layout from '../components/Layout';
import Link from 'next/link';
import { useEffect } from 'react';
import db from '../utils/db';
import gsap from 'gsap';
import NewsArticle from '../models/News';
import moment from 'moment';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const News = (props) => {
  const { news } = props;

  useEffect(() => {
    gsap.timeline()
    .from(".news-text .header-one", { y:-100, opacity:0, ease: 1, duration: 0.3 })
    .from(".news-text .header-two", { opacity:0, ease: 1, duration: 0.5 })
    .from(".news-text p", { y: 100, opacity: 0, ease: 1, duration: 0.3 })
    .delay(1.2);
  }, []);

  return (
    <Layout 
      title="News Page"
      description="Dragon Organics | Findout about the latest with Dragon Organics and Thai Kratom">
      <div className="news-container bg-black">
        <div className="page-header">
          <div className="py-lg-5 container header-container">
              <div className="row">
              <div className="news-text col-lg-12 mx-auto text-center text-white">
                <h1 className="header-one">Whats New?</h1>
                <h1 className="header-two">Let&apos;s Find Out</h1>
                <p>Check out the news on Dragon Organics and read our articles about some of the botanicals we sell.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container news-card-container">
        <div className="row mb-2">
        {news.filter(news => news.published === true).map((news) => (
          <div className="col-md-6" key={news._id}>
            <div className="row g-0 rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative news-card">
              <div className="col p-4 d-flex flex-column position-static text-white">
                <h3 className="mb-0 text-primary"><b>Featured post</b></h3>
                <div className="mb-1">{moment(new Date(news.createdAt)).format('MM/DD/YYYY')}</div>
                <p className="card-text mb-auto">{news.description}</p>
                <Link href={`/news/${news.slug}`} legacyBehavior>
                  <a className="stretched-link">Continue reading</a>
                </Link>
              </div>
              <div className="col-auto d-none d-lg-block">
                <div className="news-thumbnail" style={{backgroundImage: `url(${news.headerImage})`}}></div>
              </div>
            </div>
          </div>
          ))}
        </div>
        </div>
      </div>
    </Layout>
  )
}

export default News;

export async function getServerSideProps() {
  await db.connect();
  const news = await NewsArticle.find({}).lean();
  await db.disconnect();
  return {
    props: {
      news: news.map(db.convertDocToObj)
    }
  }
}