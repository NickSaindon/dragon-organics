import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link'
import Image from "next/image";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Store } from '../utils/Store';
import data from '../utils/data';

function Navbar() {
    const router = useRouter();
    const { state } = useContext(Store);
    const { cart } = state;
    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {
      setCartItemsCount(parseInt(cart.cartItems.reduce((a, c) => a + c.quantity, 0)))
    }, [cart.cartItems])
 
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link href="/">
          <div className="navbar-brand">
            <Image src="/images/do-logo-title.png" width={150} height={45} alt="Computer and mobile devices"/>
          </div>
        </Link>        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor03">
          <ul className="navbar-nav navbar-left me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className={router.asPath == "/" ? "nav-link active" : "nav-link"} aria-current="page">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Products
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              {data.categories.map((category) => (
                <li key={category.slug}>
                  <Link href={`/category/${category.slug}`} className="dropdown-item">{category.name}</Link>
                </li>
              ))}
              </ul>
            </li>
            <li className="nav-item">
              <Link href="/about" className={router.asPath == "/about" ? "nav-link active" : "nav-link"}>
                About  
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/news" className={router.asPath == "/news" ? "nav-link active" : "nav-link"}>
                News  
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className={router.asPath == "/contact" ? "nav-link active" : "nav-link"}>
                Contact  
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            <ul className="navbar-nav navbar-left me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/cart" className={router.asPath == "/cart" ? "nav-link active" : "nav-link"}>
                  <i className="bi bi-cart3"></i> 
                  {cartItemsCount > 0 && (
                    <span className="badge rounded-pill bg-primary">
                      {cartItemsCount}
                    </span>
                  )}
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/login" className={router.asPath == "/login" ? "nav-link active" : "nav-link"}>
                Login  
              </Link>
            </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });