import Layout from '../components/Layout';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const News = () => {

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
      description="Remedy Exports is a Thai based manufacture and export company that works with clients to procure the best Thai Kratom.  We handle the end-to-end process to supply quality Kratom that is safe from any 
      metals, bacteria, and that is grown naturally without the usage of any non-organic pesticides or fertilizers.">
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
        <div class="row mb-2">
          <div class="col-md-6">
            <div class="row g-0 rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative news-card">
              <div class="col p-4 d-flex flex-column position-static text-white">
                <h3 class="mb-0 text-primary"><b>Featured post</b></h3>
                <div class="mb-1">Nov 12</div>
                <p class="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                <a href="#" class="stretched-link">Continue reading</a>
              </div>
              <div class="col-auto d-none d-lg-block">
                <div className="news-thumbnail"></div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row g-0 rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative news-card">
              <div class="col p-4 d-flex flex-column position-static text-white">
                <h3 class="mb-0 text-primary text-bold"><b>Post title</b></h3>
                <div class="mb-1">Nov 11</div>
                <p class="mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                <a href="#" class="stretched-link">Continue reading</a>
              </div>
              <div class="col-auto d-none d-lg-block">
                <div className="news-thumbnail"></div>
              </div>
            </div>
          </div>
        </div>

        </div>
      </div>
    </Layout>
  )
}

export default News;