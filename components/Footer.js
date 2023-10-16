import Link from 'next/link'
import Image from "next/image";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row g-4 py-5">
            <div className="col-lg-4 col-md-12">
                <div className="text-center g-4 py-3">
                <Image src="/images/do-logo-title-under.png" width={125} height={174} alt="Computer and mobile devices"/>

                </div>
                <p>
                    Must be of legal age to purchase these products. The manufacturer and distributors of these products assume 
                    no liability for the misuse or misrepresentation of these products. Keep out of reach of children and pets. Avoid 
                    contact with eyes. We do not ship to the following US states, counties, and cities where kratom is banned: Alabama, 
                    Arkansas, Indiana, Rhode Island, Vermont, Wisconsin, Sarasota County (FL), Union County (NC), Denver (CO), and San Diego (CA).
                </p>
            </div>
            <div className="col-lg-4 col-md-12">
                <div className="footer-nav text-center">
                <ul>
                <li>
                  <Link href="/">
                    Home
                  </Link>
                </li>

                <li>
                  <Link href="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/news">
                    News
                  </Link>
                </li>
                <li>
                  <Link href="/register">
                    Register
                  </Link>
                </li>


              </ul> 
                <ul>
                <li>
                  <Link href="/privacy-policy">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/refund-policy">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link href="/shipping-policy">
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service">
                    Terms of Service
                  </Link>
                </li>
                </ul> 
                </div>

            </div>
            <div className="col-lg-4 col-md-12">
                <div className="footer-contact">
                    <div className="social-media">
                        <ul>
                        <li>
                            <Link href="https://www.facebook.com/Remedy-Exports-105808932212368" legacyBehavior>
                                <a target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-facebook" />
                                </a>
                            </Link>
                            </li>
                            <li>
                            <Link href="https://www.instagram.com/remedy_co.ltd/" legacyBehavior>
                                <a target="_black" rel="noopener noreferrer">
                                <i className="bi bi-instagram" />
                                </a>
                            </Link>
                            </li>
                            <li>
                            <Link href="https://twitter.com/RemedyExports" legacyBehavior>
                                <a target="_black" rel="noopener noreferrer">
                                <i className="bi bi-twitter" />
                                </a> 
                            </Link>
                            </li>
                            <li>
                            <Link href="https://www.linkedin.com/company/remedy-exports/" legacyBehavior>
                                <a target="_black" rel="noopener noreferrer">
                                <i className="bi bi-linkedin" />
                                </a>
                            </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="contact-info">
                        <div className="call-contact">
                            <h5>MON - FRI 9 AM - 5PM EST</h5>
                            <p>Contact Us:</p>
                            <Link href="/contact">
                              <button className="btn btn-primary">Contact</button>
                            </Link>
                        </div>
                        <div className="email-contact">
                            <h5>Need Help With An Online Order?</h5>
                            <p>Email Us At:</p>
                            <p className="text-primary">dragonorganics.tm@gmail.com</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>
      <div className="copy-right bg-primary text-center g-4 py-4">
            <p>© 2023 Dragon Organics | Kratom Products</p>
      </div>
    </div>
  );
}
  
export default Footer; 