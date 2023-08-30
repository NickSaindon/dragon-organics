import { useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link'
import Image from "next/image";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    gsap.timeline()
    .from(".home-header h1", { y:-100, opacity:0, ease: 1, duration: 0.3 })
    .from(".home-header p", { opacity:0, ease: 1, duration: 0.5 })
    .from(".home-header button", { y: 100, opacity: 0, ease: 1, duration: 0.3 })
    .from(".home-header img", { x: 100, opacity: 0, ease: 1, duration: 0.3 })
    .delay(1.2);

    gsap.timeline({scrollTrigger:{
      trigger:".about-section-container",
      start:"top 80%",
      toggleActions:"restart none none reset",
    }})
    .fromTo(".feature", {
      opacity: 0,
    }, {
      opacity: 1,
      stagger: {
        each: 1,
        repeatRefresh: true,
        amount: 0.5, 
      },
    })

    gsap.timeline({scrollTrigger:{
      trigger:".home-raw-powder-category",
      start:"top 50%",
      toggleActions:"restart none none reset",
    }})
    .from(".home-raw-powder-category h2", {y:-100, opacity:0, ease: 1, duration: 0.3})
    .from(".home-raw-powder-category p", {opacity:0, ease: 1, duration: 0.5})
    .from(".home-raw-powder-category button", {y:100, opacity:0, ease: 1, duration: 0.3})
    .from(".home-raw-powder-category img", {opacity:0, ease: 1, duration: 0.5})

    gsap.timeline({scrollTrigger:{
      trigger:".home-extract-category",
      start:"top 50%",
      toggleActions:"restart none none reset",
    }})
    .from(".home-extract-category img", {opacity:0, ease: 1, duration: 0.5})
    .from(".home-extract-category h2", {y: -100, opacity:0, ease: 1, duration: 0.3})
    .from(".home-extract-category p", {opacity: 0, ease: 1, duration: 0.5})
    .from(".home-extract-category button", {y: 100, opacity:0, ease: 1, duration: 0.3})

    gsap.timeline({scrollTrigger:{
      trigger:".parallax-container",
      start:"top 65%",
      toggleActions:"restart none none reset",
    }})
    .from(".parallax-container h1", {opacity: 0, ease: 1, duration: 0.5})

    gsap.to(".parallax", {
      yPercent: -30,
      scrollTrigger: {
        trigger: ".parallax-container",
        scrub: true
      }, 
    });

    
  }, []);

  return (
    <Layout 
      title="Home Page" 
      description="Remedy Exports is a Thai based manufacture and export company that works with clients to procure the best Thai Kratom.  We handle the end-to-end process to supply quality Kratom that is safe from any 
      metals, bacteria, and that is grown naturally without the usage of any non-organic pesticides or fertilizers.">
      <div id="page" className="home-container bg-black">
        <div className="home-header">
          <div className="py-5 container">
            <div className="row py-xs-1 py-sm-1 py-md-2 py-lg-5">
              <div className="col-lg-6 mx-auto text-white">
                <h1 className="fw-light">Dragon Mythology</h1>
                <p className="lead">
                  In Thai mythology Kratom is said to be the prefered food of dragons, and has been a culturally significant plant for over a century.  At Dragon Organics we pride ourselves in the rich history that has been around since the 19th century.  Order your dragon food today and take part in this history! 
                </p>
                <Link href="/about">
                  <button className="btn btn-primary btn-lg my-2">Read More</button>
                </Link>
              </div>
              <div className="col-lg-6 mx-auto text-center home-header-img">
                <Image src="/images/do-product-bag.png" width={400} height={500} alt="..." />
              </div>
            </div>
          </div>
        </div>
        <div className="about-section-container bg-black">
          <div className="container px-4 py-5" id="featured-3">
            <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
              <div className="feature col text-center text-white">
                <div className="feature-icon d-inline-flex align-items-center justify-content-center">
                  <Image src="/images/test-tube-icon.png" width={42} height={50} alt="Computer and mobile devices"/>
                </div>
                <h3 className="fs-2">Lab Tested</h3>
                <p>All Dragon Organics products undergo thorough testing at an accredited, third-party lab. We take every step to always meet industry standards for our customers.</p>
              </div>
              <div className="feature col text-center text-white">
                <div className="feature-icon d-inline-flex align-items-center justify-content-center">
                  <Image src="/images/shipping-icon.png" width={78} height={50} alt="Computer and mobile devices"/>
                </div>
                <h3 className="fs-2">Free Shipping Over $60</h3>
                <p>Save more on the best quality kratom on the market, spend $60 to receive free shipping right to you! Our prices are already at a great price and now you can save more.</p>
              </div>
              <div className="feature col text-center text-white">
                <div className="feature-icon d-inline-flex align-items-center justify-content-center">
                  <Image src="/images/star-icon.png" width={50} height={50} alt="Computer and mobile devices"/>
                </div>
                <h3 className="fs-2">Our Guarantee</h3>
                <p>We know our company wouldn’t work without you. If you aren’t 100% satisfied with your MIT45 product, contact us within 30 days for a full refund. No questions asked!</p>
              </div>
            </div>
          </div>
        </div>
        <div className="home-raw-powder-category py-5 bg-black">
          <div className="container-xl">
            <div className="row g-4 py-5">
              <div className="col-sm-12 col-md-12 col-lg-6 home-raw-powder-text text-white">
                <h2 className="fs-2 text-center">Raw Powder</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                  ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  <div className="w-100 py-4 text-center">
                    <Link href="/category/raw-leaf-powder">
                      <button type="button" className="btn btn-3 btn-outline-primary btn-lg light">Shop Now</button>
                    </Link>
                  </div>              
                </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Image src="/images/home-img-raw-powder.jpg" className="w-100 h-100" width={600} height={600} alt="Computer and mobile devices"/>
              </div>
            </div>
          </div>
        </div>
        <div className="home-extract-category py-5 bg-black">
          <div className="container-xl">
            <div className="row g-4 py-5">
            <div className="col-sm-12 col-md-12 col-lg-6">
                <Image src="/images/home-img-raw-powder.jpg" className="w-100 h-100" width={600} height={600} alt="Computer and mobile devices"/>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6 home-extract-text text-white">
                <h2 className="fs-2 text-center">Extract</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                  ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  <div className="w-100 py-4 text-center">
                    <Link href="/category/extracts">
                      <button type="button" className="btn btn-3 btn-outline-primary btn-lg light">Shop Now</button>
                    </Link>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className="parallax-container">
          <div className="parallax-wrapper">
            <h1>Best Quality Kratom<br></br>You Can Find</h1>
          </div>
            <div className='parallax' data-depth='0.10'></div>
        </div>
        <section className="bg-black">
          <div className="container">
            <div className="row g-4 py-5">
            <h1 className="display-5 fw-bold text-center text-white">Dragon Organics and Kratom FAQ</h1>
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <b>What is Kratom?</b>
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <strong>This is the first items accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. Its also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    <b>Is Kratom legal in my State?</b>
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <strong>This is the second items accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. Its also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    <b>Do you test your products?</b>
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <strong>This is the third items accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. Its also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    <b>Where does your Kratom come from?</b>
                  </button>
                </h2>
                <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <strong>This is the third items accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. Its also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFive">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                    <b>What is your exchange or return policy?</b>
                  </button>
                </h2>
                <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <strong>This is the third items accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. Its also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </section>
        </div>
    </Layout>
  )
}
