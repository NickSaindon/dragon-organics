import Layout from '../components/Layout';


const RefundPolicy = () => {

  return (
    <Layout 
      title="Dragon Organics | Refund Policy"
      description="Refund and return policies of Dragon Organics products"
    >
      <div className="policy-container bg-black text-white">
        <div className="container">
          <h1 className="text-center">Refund Policy</h1>
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="py-2">
                <h3 className="text-primary">Guaranteed Happiness</h3>
                <p>
                  We wholeheartedly stand behind our products, and we are truly dedicated to helping you experience the full benefits of kratom.
                  <br/><br/>
                  Kratom can be a transformative discovery for many, but it may require some experimentation to determine what suits you best.
                  <br/><br/>
                  Rest assured, your satisfaction is our priority. If, for any reason, you are dissatisfied with a product, please inform us, and we will ensure your complete satisfaction.
                </p>
              </div>
              <div className="py-2">
                <h3 className="text-primary">No Hassel Returns</h3>
                <h5 className="text-primary">Unopened / Products</h5>
                <p>
                  To qualify for a complete refund, the product must remain unused and in the same condition as when it was delivered to you.
                  <br/><br/>
                  Our policy allows for full refunds up to 60 days from the date of confirmed delivery. Further details can be found in the REFUNDS section below.
                </p>
              </div>
              <div className="py-2">
                <h3 className="text-primary">Products Damaged In Transit</h3>
                <p>
                  If your products arrive damaged during transit, please notify us immediately.
                  We will replace damaged items at no extra charge (subject to conditions).
                  <br/><br/>
                  Send an email to dragonorganics.tm@gmail.com, providing a description of the incident.
                  <br/><br/>
                  Ensure that you include at least one clear photo of the damaged product(s).
                </p>
              </div>
              <div className="py-2">
                <h3 className="text-primary">Contact Us Before You Return</h3>
                <p>
                  To ensure we provide you with the best service, we appreciate receiving your inquiries in advance.

                  To contact us, please visit our contant page at https://dragon-organics/contact or send us an email at dragonorganics.tm@gmail.com.
                </p>
              </div>
              <div className="py-2">
                <h3 className="text-primary">Products Damaged In Transit</h3>
                <p>
                  In the event that any of your products arrive damaged during transit, please notify us immediately. Damaged items during transit may qualify for a replacement at no extra charge (subject to conditions).
                  <br/><br/>
                  Kindly send an email to dragonorganics.tm@gmail.com, detailing the circumstances.
                  <br/><br/>
                  We kindly request that you include at least one clear photograph displaying the damaged product(s).
                </p>
              </div>
              <div className="py-2">
                <h3 className="text-primary">Refunds</h3>
                <p>
                  Once we receive your return, you will receive an email confirmation.
                  <br/><br/>
                  Following that, you can choose between receiving a full refund to your original payment method or store credit.
                </p>
              </div>
              <div className="py-2">
                <h3 className="text-primary">Original Payment Method</h3>
                <p>
                  Should you select this refund option, please anticipate a brief processing period. The majority of refunds are typically processed within 5-7 business days.
                  <br/><br/>
                  If you have not received your refund within this timeframe, we recommend reaching out to your bank for assistance.
                  <br/><br/>
                  If the matter persists, kindly visit our support page at https://dragon-organics/contact or send an email to dragonorganics.tm@gmail.com.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default RefundPolicy;