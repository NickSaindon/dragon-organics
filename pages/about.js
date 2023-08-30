import { useEffect } from 'react';
import Layout from '../components/Layout';
import gsap from 'gsap';
import Image from "next/image";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const About = () => {

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#pinned",
        start: "top top",
        end: () => `+=500%`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
    
    tl.fromTo(".about-background-image", {
      width: "30%"
    }, {
      duration: .5,
      width: "100%",
    })
    
    
    tl.fromTo(
      ".farm",
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
      }
    );
    tl.to(".farm", {
      y: -40,
      opacity: 0,
    });
    
    
    tl.fromTo(
      ".home",
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
      }
    );
    tl.to(".home", {
      y: -40,
      opacity: 0,
    });
  }, [])

    

  return (
    <Layout 
      title="About Page"
      description="Remedy Exports is a sourcing and exporter of wholesale raw materials for Asian produce from Thailand to US and Europe vendors.  We handle logistics from farm to exportation.">
      <div className="about-container bg-black">
        <div className="about-header bg-black">
          <Image src="/images/do-logo-title-under.png" width={140} height={190} alt=""/>
          <video autoPlay loop muted style={{ width: '100%', height: '100%' }}>
            <source src="/images/plantation-video.mp4" />
          </video>
          <div className="title">
            <h1>DRAGON</h1>
            <h1>ORGANICS</h1>
          </div>
        </div>
        <section className="about-do bg-black text-white">
          <div className="container-xxl">
            <div className="row py-5">
              <div className="col-sm-12 col-md-12 col-lg-6">
                <h2 className="text-center">Our Story</h2>
                <p>
                  Dragon Organics provides high-quality botanicals from all over the world.  Tested for quality assurance and free from bacteria through gamma treatment.
                  What sets us apart from other vendors is we have partnered with the farms we source from and provide fair market value trade to get the best of the best 
                  that these farms have to offer.  Dragon Organics products are premium quality at the right price.
                  <br/><br/>  
                  Our farms we work with agree in using GAP (Good Agricultural Pratices). This is to maintain a high quality standard from Kratom 
                  plantation to consumer through mutual goals in quality.
                  <br/><br/>
                  Remedy Exports has partnered and works with over <b>30 plantations</b> in Thailand that produce a wide varity of botanicals, some of which only grow in Thailand or Southeast Asia.  Our company is dedicated to
                  quality and consistency and work with our clients to supply them with the raw materials, extracts, or finished products their company needs.  We work to make the process as easy as possible, and straightforward so our clients get what they need.   
                </p>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6 about-do-img">
                <Image src="/images/about-img3.jpg" className="w-100 h-100" width={600} height={600} alt="Computer and mobile devices"/>
              </div>
            </div>
          </div>
        </section>
        <div className="about-do-special bg-black text-white">
          <div className="container-xxl">
            <div className="row">
              <h2 className="text-center">What Is Special About Dragon Organics?</h2>
            </div>
            <div className="circle circle1">
              <div className="about-img1" />
            </div>
            <div>
              <p>
                Thailand has a long and storied history when it comes to Kratom.  In Thailand Kratom has grown in the wild for hundreds of years and is the 
                origin of many other regional species of Kratom that users know and love today.  Kratom has been regarded as a culturally significant plant in 
                Thai society since the 19th century, and began to be cultivated with the goal of providing Kratom for human consumption in the early 1900’s.  Kratom 
                is known as the evergreen tree in Thailand, Ketum (Biak) in Malaysia, and Neithum in Laos. The name Kratom itself is a Thai word that means “Hut” and 
                is used to describe the shape of the Kratom tree. Another word for a particular species of Kratom leaf is Maeng Da, which also a Thai word that 
                means “Horseshoe Crab”.  Kratom has been historically used in Thailand in local communities for the treatment of pain, cough, fever, enhancement of work 
                performance; and as a natural substitute for substances like synthetic opioids. There are various forms of Kratom consumption that exist in Southeast Asia, but 
                mainly fresh Kratom leaves are often chewed or boiled to produce a decoction. Today most marketplaces sell fresh Kratom leaves and is readily available 
                throughout most of Thailand. 
              </p>
              <p>
                Most Kratom before the 1900&apos;s was wild Kratom that grew in the jungle and remote ares in the south of Thailand. However, it wasn&apos;t until it was domesticated that 
                we have the Kratom we know and love today. This was through generations of improvement through both selective breeding and careful agricultural practices 
                that optimized the alkaloid profile of the Kratom leaf.  Perhaps you are asking the question, <em>&quot;Is wild Thai Kratom available to users and is it the same as 
                domesticated Thai Kratom?&quot;</em>. The answer to both these questions is simply <em>No</em>. The reason is because it isn&apos;t as potent as domesticated Kratom 
                and because it grows in very remote areas making it hard to come by. These two reasons are why it would be pointless to harvest wild Kratom, and why you 
                don&apos;t find wild Kratom even in Thai marketplaces.
              </p>
              <p>
                Bangkok, Thailand is considered to be one of the hottest places in the world. So one could imagine that it gets pretty hot in Thailand. Fortunately Kratom trees are a 
                tree that thrives in the heat and high humidity. Paired with these two factors, the moist and acidic soil create the perfect environment for Kratom trees 
                to grow. Actually these are the reasons why Kratom leaves grow so fast that they can be harvested again only after 15 to 30 days. Sometimes the leaves will even skip from 
                white to red because Thailands environment is simply the perfect place for them. Many of these reason are why Kratom is also very difficult to grow outsides of its natural 
                environment. There are those who try to grow it using greenhouses but that is simply not conducive to growing it for large productions.
              </p>
              <p>
                Today, Thai Kratom is more widely available than ever before, and fresh leaves can be found in any marketplace as well as many restaurants selling Kratom tea. With a powerful alkaloid 
                profile, it is no wonder that Thailand produces some of the finest Kratom in the world.&nbsp;
              </p>
              <p>
                Thailand was the point of origin for Kratom and a large part of Thailand&nbsp;s culture for over a century. Many historical records claim Kratom to be dragon food and despite the political 
                issues science has prevailed in the legalization of Kratom in Thailand. As a Thai registered company limited Remedy Export is proud to be a part of this history as we look to produce 
                new employment opportunities and increase product quality. Thailand&nbsp;s decision to legalize Kratom will open doors to new clinical studies and treatments. Remedy Exports will look to 
                the future and help standardize the production of Kratom from farm to consumer.
              </p>
            </div>
          </div>
        </div>
        <section id="pinned">
          <div className="about-content bg-black">
            <div className="container-xxl">
              <div className="about-image-container">
                <div className="image-window">
                  <div className="about-background-image"></div>
                </div>
              </div>
              <div className="farm">From Our Farms</div>
              <div className="home">To Your Home</div>
            </div>
          </div>
        </section>
        <section className="do-qaulity-gmp bg-black text-white">
          <div className="container-xxl">
            <div className="row py-5">
              <div className="col-sm-12 col-md-12 col-lg-6">
                <h2 className="text-center">Dedicated to Quality and GMP</h2>
                <p>
                  At Dragon Organics we are dedicated to providing a clean environment through GMP (Good Manufacturing Process).  Every step of the way, from the picking of the leaves to the grinding process we handle each leaf with the uttmost care.  
                  Our drying is not done directly in the sun light in order not to cause leaves to turn brown and scortch, which essentially kills the leaf.  Once picked, washed, and dried the leaves are taken to our GMP certified facility to be 
                  multched and and grinded into a fine powder.
                  <br/><br/>  
                  Our goal is to procure quality botanicals that are safe from any metals, bacteria, and that is grown naturally without the usage of any chemical pesticides 
                  or fertilizers. Remedy Exports only looks to work with farms that agree in using GAP (Good Agricultural Pratices) as well as GMP (Good Manufacturing Practices). This 
                  is to maintain a high quality standard from plantation to consumer through mutual goals in quality.
                  <br/><br/> 
                  Another goal of Remedy Exports is to help meet the needs of all the clients we work with. We do this by over-seeing the end-to-end production, 
                  from farm, factory, exportation Remedy handles every step of the process from raw materials to finished products.  By partnering with our clients we look to create a process that will standardizes
                  this industry in a way that is safe and profitable for all.    
                  <br/><br/>
                  Remedy Exports has partnered and works with over <b>30 plantations</b> in Thailand that produce a wide varity of botanicals, some of which only grow in Thailand or Southeast Asia.  Our company is dedicated to
                  quality and consistency and work with our clients to supply them with the raw materials, extracts, or finished products their company needs.  We work to make the process as easy as possible, and straightforward so our clients get what they need.   
                </p>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Image src="/images/gmp-img.jpg" className="w-100 h-100" width={600} height={600} alt="Computer and mobile devices"/>
              </div>
            </div>
          </div>
        </section>
        <section className="process-section bg-black text-white">

        <div className="container-xxl">

            <div className="row gy-5">
              <div className="col-md-12 p-2">
                <h2 className="text-center">Our Process and Research</h2>
                <p>
                  Through our panstacking research and development we ensure that our products are free from high levels of heavy metals and microbile's 
                  In Thailand there are a few lab test centers that the government accepts results from. Central Laboratory of Thailand is one of these labs and is where we 
                  have our botanicals tested. The testing methods are done with High Performance Liquid Chromatography (HPLC). This method, validation, and analysis is one of 
                  the most widely used techniques for testing in formulations and biological fluids. Also, this method is the most widely used in testing botanicals in 
                  the United States. We do not test our botanicals in house as to avoid any possible questions of unethical practices, and to align with the Thai government 
                  with accredited and accepted lab results.
                </p>
              </div>
            </div>
            <div className="row gy-3 process-images">
              <div className="col-12-sm col-md-6 col-lg-4 d-flex justify-content-center mx-auto">
                  <Image src="/images/drying-facility.jpg" width={600} height={600} alt=""/>
                </div>
                <div className="col-12-sm col-md-6 col-lg-4 d-flex justify-content-center mx-auto">
                  <Image src="/images/grinding-process.jpg" width={600} height={600} alt=""/>

                </div>
                <div className="col-12-sm col-md-6 col-lg-4 d-flex justify-content-center mx-auto">
                  <Image src="/images/gmp-facility.jpg" width={600} height={600} alt=""/>
                </div>
            </div>
            <div className="row gy-3 process-images">
              <div className="col-12-sm col-md-6 col-lg-4 d-flex justify-content-center mx-auto">
                  <Image src="/images/do-gmp.jpg" width={600} height={600} alt=""/>
                </div>
                <div className="col-12-sm col-md-6 col-lg-4 d-flex justify-content-center mx-auto">
                  <Image src="/images/extract-lab.jpg" width={600} height={600} alt=""/>

                </div>
                <div className="col-12-sm col-md-6 col-lg-4 d-flex justify-content-center mx-auto">
                  <Image src="/images/irradiation-center.jpg" width={600} height={600} alt=""/>
                </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  )
}

export default About;