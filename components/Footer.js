import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row g-4 py-5">
          <div className="col-lg-4 col-md-12">
            <div className="text-center g-4 py-3">
              <Image
                src="/images/do-logo-title-under.png"
                width={125}
                height={174}
                alt="Computer and mobile devices"
              />
            </div>
            <p>
              Must be of legal age of 21 to purchase these products. The
              manufacturer and distributors of these products assume no
              liability for the misuse or misrepresentation of these products.
              These statements have not been evaluted by the U.S. Food and Drug
              Administration. This product is not intended to diagnose, treat,
              cure or prevent any disease. The U.S. Food and Drug Administration
              has not yet approved this product for human consumption. Keep out
              of reach of children and pets. Avoid contact with eyes. We do not
              ship to the following US states, counties, and cities where kratom
              is banned: Alabama, Arkansas, Indiana, Rhode Island, Vermont,
              Wisconsin, Sarasota County (FL), Union County (NC), Denver (CO),
              and San Diego (CA).
            </p>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="footer-nav text-center">
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/news">News</Link>
                </li>
                <li>
                  <Link href="/register">Register</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/refund-policy">Refund Policy</Link>
                </li>
                <li>
                  <Link href="/shipping-policy">Shipping Policy</Link>
                </li>
                <li>
                  <Link href="/terms-of-service">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/labs">Lab Test</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="footer-contact">
              <div className="social-media">
                <ul>
                  <li>
                    <Link
                      href="https://www.facebook.com/Dragon-Organics-61552383274313"
                      legacyBehavior
                    >
                      <a target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-facebook" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.instagram.com/dragonorganics?igshid=NzZlODBkYWE4Ng"
                      legacyBehavior
                    >
                      <a target="_black" rel="noopener noreferrer">
                        <i className="bi bi-instagram" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.reddit.com/user/Dragon_Organics/"
                      legacyBehavior
                    >
                      <a target="_black" rel="noopener noreferrer">
                        <i className="bi bi-reddit" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.youtube.com/@DragonOrganics"
                      legacyBehavior
                    >
                      <a target="_black" rel="noopener noreferrer">
                        <i className="bi bi-youtube" />
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
                <div className="d-flex justify-content-between py-3">
                  <Image
                    src="/images/icons/visa_icon.png"
                    width={45}
                    height={45}
                    alt="..."
                  />
                  <Image
                    src="/images/icons/mastercard_icon.png"
                    width={45}
                    height={45}
                    alt="..."
                  />
                  <Image
                    src="/images/icons/discover_icon.png"
                    width={45}
                    height={45}
                    alt="..."
                  />
                  <Image
                    src="/images/icons/amex_card_icon.png"
                    className="mt-2"
                    width={48}
                    height={30}
                    alt="..."
                  />
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
};

export default Footer;
