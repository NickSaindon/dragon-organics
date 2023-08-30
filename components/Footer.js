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
                    <Link href="/" legacyBehavior>
                        <a aria-current="page">Home</a>
                    </Link>
                </li>
                <li>
                <Link href="/" legacyBehavior>
                        <a  aria-current="page">Products</a>
                    </Link>
                </li>
                <li>
                <Link href="/" legacyBehavior>
                        <a aria-current="page">About</a>
                    </Link>
                </li>
                <li>
                <Link href="/" legacyBehavior>
                        <a aria-current="page">News</a>
                    </Link>
                </li>
                <li>
                <Link href="/" legacyBehavior>
                        <a aria-current="page">Contact</a>
                    </Link>
                </li>
                <li>
                <Link href="/" legacyBehavior>
                        <a aria-current="page">Login</a>
                    </Link>
                </li>
                <li>
                <Link href="/" legacyBehavior>
                        <a aria-current="page">Register</a>
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
                            <p>Call Us At: </p>
                            <p className="text-primary">1-866-DRA-GON3</p>
                        </div>
                        <div className="email-contact">
                            <h5>Need Help With An Online Order?</h5>
                            <p>Contact Us At:</p>
                            <p className="text-primary">support@dragonorganics.com</p>
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