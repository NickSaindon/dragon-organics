import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link'
import Image from "next/image";
import gsap from 'gsap';
import AgeVerification  from '../components/AgeVerification';
import Cookies from 'js-cookie';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);


export default function Home() {
  const [openModal, setOpenModal] = useState(false);

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

    Cookies.get('isVerified') ? JSON.parse(Cookies.get('isVerified')) : setOpenModal(true);
  }, []);

  const handleIsVerified = () => {
    setOpenModal(false);
    Cookies.set('isVerified', true)
  }

  return (
    <Layout 
      title="Dragon Organics | Home" 
      description="Discover authentic Thai Kratom and Blue Lotus at Dragon Organics. We are your trusted partner for premium botanicals, available online and wholesale.">
      <AgeVerification 
        open={openModal}
        onClose={handleIsVerified}
      >
      </AgeVerification>
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
                <p>Our company prides ourselves on working and listening to our customers. If you are have issues with any of our products we will work tirelessly to get you what you need.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="home-raw-powder-category py-5 bg-black">
          <div className="container-xl">
            <div className="row g-4 py-5">
              <div className="col-sm-12 col-md-12 col-lg-6 home-raw-powder-text text-white">
                <h2 className="fs-2 text-center">Raw Powder</h2>
                <p>
                  Thai Kratom stands as an illustrious symbol of exceptional quality, and here at Dragon Organics, we embrace the honor of sourcing the most outstanding, alkaloid-rich 
                  strains of this extraordinary herb directly from Thai farmers who have cultivated a reputation for excellence in the world of Kratom. These seasoned farmers have dedicated 
                  themselves to nurturing and harvesting top-tier Kratom, adhering to a time-honored tradition that ensures the utmost quality.
                  <br /><br />
                  This carefully tended Kratom undergoes a meticulous transformation as it is traditionally brewed into a soothing tea, resulting in 100% pure powder that embodies a spectrum of 
                  beneficial effects. The remarkable properties of our Thai Kratom include mood enhancement, relaxation, and an overall sense of well-being, all derived from the natural magic of 
                  this exceptional herb.
                  <br /><br />
                  In our relentless pursuit of excellence, we go a step further by partnering exclusively with GAP/GMP Qualified farms and manufacturers who adhere to the most stringent quality 
                  standards. This dedication to quality assurance ensures that our Kratom remains a beacon of purity and potency, setting us apart in the industry.  We invite you to be among the first to experience the genuine 
                  and unparalleled quality of Thai Kratom from Dragon Organics, where we make it our mission to deliver only the very best to our valued customers.
                </p>
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
                <Image src="/images/extract-lab-img.jpg" className="w-100 h-100" width={600} height={600} alt="Computer and mobile devices"/>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6 home-extract-text text-white">
                <h2 className="fs-2 text-center">Extract</h2>
                <p>
                  Dragon Organics takes immense pride in the meticulous crafting of our premium kratom extract. We ensure that every step of the production process adheres rigorously to the 
                  stringent standards of a GMP-compliant laboratory. This commitment guarantees that our kratom extract maintains a level of mitragynine concentration that is both precise and 
                  unwavering, batch after batch, delivering an unparalleled level of quality and consistency.
                  <br /><br />
                  At the heart of our premium kratom extract is the careful selection of only the highest quality plant material. This botanical treasure is sourced exclusively from the most 
                  exceptional kratom farms nestled within the verdant landscapes of Thailand. These farms have been chosen for their dedication to cultivating the most potent and vibrant kratom leaves.
                  <br /><br />
                  But our dedication to quality doesn't stop at sourcing alone. We employ a range of proprietary processes that are designed to gently isolate and meticulously extract the natural 
                  alkaloids found within the kratom leaf. These carefully guarded techniques have been honed to perfection, ensuring that the resulting kratom extract is not only powerful but also 
                  free from any impurities that might compromise its purity. 
                </p>
                <div className="w-100 py-4 text-center">
                  <Link href="/category/extracts">
                    <button type="button" className="btn btn-3 btn-outline-primary btn-lg light">Shop Now</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home-blue-lotus-category py-5 bg-black">
          <div className="container-xl">
            <div className="row g-4 py-5">
              <div className="col-sm-12 col-md-12 col-lg-6 home-blue-lotus-text text-white">
                <h2 className="fs-2 text-center">Blue Lotus</h2>
                <p>
                  Embark on a journey of sensory delight with Dragon Organics Blue Lotus, a revered botanical treasure sourced from the lush landscapes of Thailand. Cultivated 
                  amidst the fertile soils and serene waters of this Southeast Asian kingdom, Dragon Organics brings you a product that transcends mere botanical allure—it 
                  encapsulates a rich tapestry of cultural heritage and spiritual significance.
                  <br /><br />
                  Harvested with meticulous care from the heart of Thailand, Dragon Organics Blue Lotus embodies a tradition deeply rooted in the country's history. This exquisite flower, known 
                  for its association with tranquility and spiritual awakening, has been carefully nurtured to preserve its pristine qualities. Dragon Organics is committed to delivering a 
                  product that reflects the authenticity of its Thai origins, ensuring that each petal carries the essence of the region's cultural and botanical wealth.
                  <br /><br />
                  As you indulge in Dragon Organics Blue Lotus, you are not merely savoring a botanical infusion; you are partaking in an age-old tradition that spans civilizations. The 
                  delicate, aromatic notes of the Blue Lotus unfold in each sip, offering a moment of respite and connection to the serene landscapes from which it originates. Immerse 
                  yourself in the legacy of Dragon Organics Blue Lotus, and let this exquisite elixir transport you to the tranquil realms of Thailand, where nature, culture, and 
                  spirituality harmoniously converge.
                </p>
                  <div className="w-100 py-4 text-center">
                    <Link href="/category/blue-lotus">
                      <button type="button" className="btn btn-3 btn-outline-primary btn-lg light">Shop Now</button>
                    </Link>
                  </div>              
                </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Image src="/images/blue-lotus-home.jpg" className="w-100 h-100" width={600} height={600} alt="Computer and mobile devices"/>
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
                    Kratom, a tropical tree native to the lush landscapes of Southeast Asian nations like Thailand, Malaysia, the Philippines, Indonesia, Papua New Guinea, and 
                    Borneo, serves as a botanical treasure trove. From these verdant locales, the leaves of the Kratom tree are carefully harvested, undergo meticulous washing, drying, and 
                    grinding processes, and are then dispatched to destinations worldwide, sharing the unique qualities of this remarkable plant.
                    <br/><br/>
                    Within the regions where Kratom thrives, the utilization of these leaves has a storied history that spans centuries, forming an integral part of traditional botanical 
                    practices. These leaves have been cherished for their myriad applications, playing a vital role in diverse ceremonies. From crafting invigorating teas using freshly 
                    plucked leaves to incorporating them into various rituals, the cultural significance of Kratom remains deeply intertwined with the communities that have embraced its 
                    legacy for generations.
                    <br/><br/>
                    In contemporary times, Kratom has proliferated across Thailand, becoming a readily accessible commodity sold by local vendors, marketplaces, and even featured on the
                    menus of restaurants. It has firmly embedded itself as an integral element of Thai culture, and the very term "Kratom" itself resonates with this cultural significance, as 
                    it is derived from the Thai word for "hut," reflecting the characteristic shape of the Kratom tree. Notably, over the past decade or two, Kratom has transcended 
                    geographical boundaries, finding its way into international markets. Its appeal and popularity have experienced an extraordinary surge, capturing the fascination and 
                    interest of individuals worldwide.
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
                    Selling and/or shipping kratom to the following states, cities, and counties in the US is prohibited: Alabama, Arkansas, Indiana, Rhode Island, Tennessee, Vermont, Wisconsin. Sarasota County, Union County, San Diego.
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
                    Indeed, our commitment to quality and safety is unwavering. We subject our Kratom to comprehensive testing procedures that span across borders and continents. To provide our 
                    customers with the utmost confidence in the purity and potency of our products, we conduct rigorous testing in government-accredited third-party laboratories in Thailand, the 
                    very heart of Kratom production. Not stopping there, we also extend our scrutiny to laboratories in the United States.
                    <br /><br />
                    Our testing regimen is thorough and leaves no stone unturned. We meticulously analyze the alkaloid content and diligently screen for the presence of heavy metals in every batch of 
                    Kratom. Going the extra mile, we employ a stringent microbial testing protocol, ensuring that each farm we source from meets our exacting standards for cleanliness and safety.
                    <br /><br />
                    To further guarantee the integrity of our products, we employ gamma treatment, a process that eradicates 99% of all microbial contaminants. This additional layer of safety is so 
                    effective that we are bestowed with a certificate attesting to the microbial elimination of every batch of Kratom we process.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    <b>Where does Dragon Organics Kratom come from?</b>
                  </button>
                </h2>
                <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    The origin of our Kratom is a diverse tapestry, with numerous farms scattered across various regions of Thailand, including the renowned Kratom haven of Chumphon, celebrated for 
                    its exceptional quality. If you seek visual confirmation of this, simply peruse the multitude of captivating images available on the Dragon Organics website. These photographs 
                    offer a direct glimpse into the very landscapes and farms that give rise to the Kratom you cherish, connecting you to the very roots of our exceptional products.
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
                    Many of our terms of service and policies can be found in the footer links below.  At Dragon Organics we try to be as helpful and accomidating with all of our customers, so if you are unable to find your answers
                    there then send us a message and we will do what we can to help.
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
