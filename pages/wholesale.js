import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Image from "next/image";
import { Controller, useForm } from 'react-hook-form';
import gsap from 'gsap';
import NumberFormat from "react-number-format";
import axios from 'axios';
import { ToastContainer, toast, Slide } from "react-toastify";

const Wholesale = () => {
  const { handleSubmit, control, formState: { errors }, reset } = useForm();
  const [phone, setPhone] = useState("");

  useEffect(() => {
    gsap.timeline()
    .from(".contact-text .header-one", { y:-100, opacity:0, ease: 1, duration: 0.3 })
    .from(".contact-text .header-two", { opacity:0, ease: 1, duration: 0.5 })
    .from(".contact-text p", { y: 100, opacity: 0, ease: 1, duration: 0.3 })
    .delay(1.2);
  }, []);

  async function onSubmitForm(values) {
    let config = {
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/wholesale`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: values,
    };
    const response = await axios(config);

    try {
      if (response.status == 200) {
        reset();
        toast.success("Your email has been sent and we will get back to you soon", {
          theme: "colored"
        });
      }
    } catch(err) {
      if (response.status == 500) {
        toast.error("Opps, something went wrong and your email was not sent.  Please try again!", {
          theme: "colored"
        });
      }
    }
  }

  return (
    <Layout 
      title="Dragon Organics | Wholesale"
      description="Join the Dragon Organics family as a wholesale partner and enjoy exclusive pricing on our top-selling.  Don't wait and start selling our quality products in your store today!">
      <div className="contact-container bg-black">
        <ToastContainer 
          position="top-center" 
          draggable={false} 
          transition={Slide} 
          autoClose={8000}
          hideProgressBar={true}
          className="toast-alert"
        />
          <div className="page-header">
            <div className="py-lg-5 container header-container">
              <div className="row ">
                <div className="contact-text col-lg-12 mx-auto text-center text-white">
                  <h1 className="header-one">Wholesale</h1>
                  <h1 className="header-two">Let&apos;s Do Business</h1>
                  <p>If you are interested in our wholesale Kratom then contact use today.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12 py-5 text-white">
                <h1 className="text-center">Dragon Organics Wholesale!</h1>
                <p>
                  We appreciate your interest in wholesale kratom with Dragon Organics! As a vendor, you have the opportunity to purchase our exceptional 
                  Dragon Organics products at a significantly reduced cost. In this rapidly evolving and diverse market, it's crucial to partner with a 
                  vendor who can address your business needs. Your business is important to us, and we're here to meet your requirements.
                  <br/><br/>
                  <strong>By choosing us, you'll receive fresh products that will delight your customers.</strong>
                  <br/><br/>
                  Join the Dragon Organics family as a wholesale partner and gain access to exclusive pricing for our top-selling, GMP-compliant kratom 
                  products. Our product range includes a diverse selection of high-quality Kratom shots, capsules, and powders that undergo stringent quality 
                  control testing. We're enthusiastic about growing alongside your business, and we offer dedicated account support along with special incentives 
                  tailored just for you.                
                </p>
              </div>
            </div>
          </div>
        <div className="contact-form bg-black text-white">
          <div className="form-contact">
          <div className="row justify-content-md-center ">
            <form onSubmit={handleSubmit(onSubmitForm, phone, setPhone)} 
              className="col-lg-4 col-md-12 col-sm-12 text-center needs-validation" noValidate>
              <Image src="/images/do-logo-title-under.png" width={150} height={200} alt=""/>
                  <div className="form-floating">
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 2,
                  }}
                  render={({ field }) => (
                    <input 
                      type="text" 
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      id="name" 
                      placeholder="Full Name" 
                      {...field}
                    />
                  )}
                />
                <div className="invalid-feedback">
                  {
                    errors.name
                      ? errors.name.type === 'minLength'
                        ? 'Name length is more than 1'
                        : 'Name is required'
                      : ''
                  }
                </div>
                <label htmlFor="name">Full Name</label>
              </div>
              <div className="form-floating">
                <Controller 
                  name="phone"
                  control={control}
                  rules={{
                    required: true,
                    pattern: /^\(?\b[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}\b$/,
                  }}
                  render={({ field: {name, onChange = (e) => setPhone(e.target.value), value = phone}}) => (
                    <NumberFormat
                      format="(###) ###-####"
                      name={name}
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      value={value}
                      id="phone" 
                      placeholder="Phone Number" 
                      onChange={onChange}
                    />
                  )}
                />
                <div className="invalid-feedback">
                    {errors.phone
                          ? errors.phone.type === 'pattern'
                            ? 'Phone number is not completed'
                            : 'Phone number is required'
                          : ''
                    }
                </div>
                <label htmlFor="floatingInput">Phone Number</label>
              </div>
              <div className="form-floating">
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  }}
                  render={({ field }) => (
                    <input 
                      type="email" 
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email" 
                      placeholder="name@example.com" 
                      {...field}
                    />
                  )}
                />
                <div className="invalid-feedback">
                  {errors.email
                      ? errors.email.type === 'pattern'
                          ? 'Email is not valid'
                          : 'Email is required'
                      : ''
                  }
                </div>
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-floating">
                <Controller 
                  name="message"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 2,
                  }}
                  render={({ field }) => (
                    <textarea 
                      className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                      id="message" 
                      placeholder="Message goes here" 
                      rows="10"
                      {...field}
                    />
                  )}
                />
                <div className="invalid-feedback">
                  {
                    errors.message
                      ? errors.message.type === 'minLength'
                        ? 'Message length is more than 1'
                        : 'Message is required'
                      : ''
                  }
                </div>
                <label htmlFor="message">Message</label>
              </div>
              <button className="w-100 btn btn-3 btn-outline-primary btn-lg px-4 py-3 me-sm-3 light" type="submit">
                Submit Message
              </button>
            </form>
          </div>
        </div>
        </div>
      </div>
    </Layout>
  )
}

export default Wholesale;