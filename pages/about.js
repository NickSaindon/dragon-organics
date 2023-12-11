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
      title="Dragon Organics | About"
      description="Dragon Organics unveils Thailand's botanical wonders with our Kratom and Blue Lotus. Sourced from partner farms for pure, premium essence!">
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
                  At Dragon Organics, we take immense pride in delivering exceptional botanicals sourced from many farms throughout Thailand. Our unwavering commitment to quality assurance is 
                  demonstrated through rigorous testing processes, which include gamma treatment to ensure that our products remain free from harmful bacteria. What truly distinguishes us 
                  from other vendors is our unique partnership with the farms we source our botanicals from, fostering fair market value trade relationships that enable us to access the 
                  cream of the crop from these farms. The result is a collection of Dragon Organics products that exemplify premium quality, all offered at a competitive and just price point.
                  <br/><br/>
                  A core principle guiding our partnerships with these farms is the adherence to Good Agricultural Practices (GAP). This shared commitment to maintaining the highest quality 
                  standards stretches from the very birth of Kratom on the plantation to its journey into the hands of consumers. We share mutual goals with our farm partners in our relentless 
                  pursuit of superior quality.
                  <br/><br/>
                  Dragon Organics came into existence in 2021, coinciding with the landmark moment when Kratom was legalized in Thailand. Since our inception, we've embarked on a comprehensive 
                  quest, exploring the length and breadth of Thailand, and establishing partnerships with over 30 different Kratom plantations throughout the country. Our mission was clear: to 
                  unearth the finest Kratom that Thailand has to offer. This expedition led us to discover exceptional varieties, including Kan Daeng, red and green vein; Haeng Kang, red and 
                  green vein; and Tang Qua, white vein. Kratom has a profound historical and cultural significance in Thailand, with ancient mythology even proclaiming it as the preferred sustenance 
                  of dragons. Thus, it was only fitting that our company be christened Dragon Organics, in tribute to this rich cultural heritage.
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
                Dragon Organics, headquartered in Atlanta, Georgia, is dedicated to providing the highest quality kratom products available today, underpinned by a passionate and conscientious 
                team genuinely concerned about our customers' health and well-being. Our mission revolves around offering the world's finest Kratom from Thailand, all while contributing to a 
                greener and more vibrant world. What truly distinguishes us is our unwavering commitment to fair trade partnerships with the farms we source from, ensuring we access the 
                pinnacle of Kratom quality. Dragon Organics stands for premium-quality products at the right price for our valued US customers, founded on an unwavering commitment to 
                industry-leading levels of quality and transparency. Our dedication to botanicals shines through in the caliber of our offerings, our customer service, and our relentless 
                pursuit of positive change. We acknowledge that our success is intrinsically linked to the experiences of our customers, and we wholeheartedly pledge to go to great lengths 
                to make sure it's a positive one. Ultimately, we firmly believe that our top-tier Kratom and exceptional customer service position us as the premier destination for purchasing Kratom.
                <br/><br/>
                Thailand boasts a rich and intricate history intertwined with the story of Kratom. This botanical treasure has thrived in the wilds of Thailand for countless centuries, even giving 
                rise to many of the regional Kratom variants beloved by users today. Its cultural significance within Thai society dates back to the 19th century, and it transitioned from growing 
                wild to being cultivated with the specific purpose of providing Kratom for human consumption in the early 1900s. Known as the evergreen tree in Thailand, Ketum (Biak) in Malaysia, and 
                Neithum in Laos, the very name "Kratom" is derived from the Thai word for "Hut," a reference to the tree's characteristic shape. Another term often associated with a particular species 
                of Kratom leaf is "Maeng Da," which also finds its roots in the Thai language, translating to "Horseshoe Crab."
                <br/><br/>
                Historically, Kratom has been a staple in Thai communities, serving a multitude of purposes, including pain relief, alleviating coughs and fevers, enhancing work performance, and even 
                offering a natural alternative to synthetic opioids. A range of Kratom consumption methods has flourished in Southeast Asia, with the chewing and boiling of fresh Kratom leaves to create 
                a decoction being among the most prevalent. In the present day, fresh Kratom leaves are readily available in most of Thailand, accessible through a multitude of marketplaces, ensuring 
                its continued presence in this vibrant cultural landscape.
              </p>
              <p>
                Bangkok, Thailand, is renowned for its scorching climate, and it's no surprise given that it's one of the hottest places on Earth. This intense heat, along with high 
                humidity, creates an ideal habitat for Kratom trees, as they thrive under these conditions, aided by the moisture and acidic soil. These environmental factors contribute to 
                the rapid growth of Kratom leaves, which can often be harvested within just 15 to 30 days, sometimes transitioning from white to red due to the perfect Thai setting. However, these 
                specific conditions also make Kratom cultivation challenging outside its natural habitat. While some attempt greenhouse cultivation, it is generally unsuitable for large-scale 
                production, and the lush Thai environment remains unmatched in supporting Kratom growth.
              </p>
              <p>
                <strong>* Disclaimer:</strong> The above statement is for research purposes only. Dragon Organics does not claim any medical benefits of kratom and has not been approved by the US FDA for human consumption.
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
                  Dragon Organics is driven by an unwavering commitment to fostering a clean and hygienic environment, and we achieve this through stringent adherence to Good Manufacturing 
                  Practices (GMP). Every facet of our Kratom production process is approached with meticulous care, beginning with the handpicking of the leaves. Throughout this journey, we 
                  prioritize the utmost precision and delicacy in handling each leaf, ensuring their preservation and quality.
                  <br/><br/>
                  Our drying process is a critical step in the journey of our Kratom leaves. To avoid discoloration and scorching, which can ultimately compromise the integrity of the leaf, we meticulously 
                  ensure that our drying does not occur directly under the harsh glare of sunlight. Once the leaves are carefully harvested, washed, and dried, they are transported to our 
                  GMP-certified facility, where they are expertly mulched and ground into a finely textured powder.
                  <br/><br/>
                  Our overarching mission is to source botanicals of the highest quality, free from any contaminants, including metals and harmful bacteria. We are staunch advocates of all-natural 
                  cultivation practices, abstaining from the use of chemical pesticides or fertilizers. To ensure these standards are upheld, we exclusively collaborate with farms that are committed 
                  to both Good Agricultural Practices (GAP) and Good Manufacturing Practices (GMP), thereby establishing a mutual commitment to maintaining a superlative level of quality, extending 
                  from the plantation to the hands of our cherished consumers.
                  <br/><br/>
                  Furthermore, our ambition at Dragon Organics is not only limited to upholding exceptional quality standards but also extends to seamlessly meeting the unique needs of our clients. To 
                  achieve this, we oversee and meticulously manage every stage of production, right from the farm to the factory and, ultimately, the exportation process. This holistic approach allows 
                  us to offer an end-to-end solution, simplifying the intricacies of the industry and making it a safe and profitable venture for all parties involved.   
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