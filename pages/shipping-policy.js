import Layout from '../components/Layout';

const ShippingPolicy = () => {
  return (
    <Layout 
      title="Dragon Organics | Shipping Policy"
      description="Learn what to expect from shipping and delivery when buying kratom from Dragon Organics. See our shipping times, costs, and restrictions."
    >
      <div className="policy-container bg-black text-white">
        <div className="container">
          <h1 className="text-center">Shipping Policy</h1>
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="py-2">
                <h3 className="text-primary">Support</h3>
                <p>
                  If you're dissatisfied, don't hesitate to reach out to us via email! Your satisfaction is our top priority, and we are fully committed to making it right.
                  <br/><br/>
                  We firmly stand behind our products and aim for the highest level of customer contentment.
                  <br/><br/>
                  <strong>Please refrain from shipping your return before getting in touch with us.</strong>
                  <br/><br/>
                  To seek assistance, please visit our support page at https://dragon-organics/contact.com or contact us via email at dragonorganics.tm@gmail.com.
                </p>
              </div>
              <div className="py-2">
                <h3 className="text-primary">1. Shipping</h3>
                <p>
                  Orders are usually dispatched within 24-48 hours of each business day, though this timeframe may extend during significant sales, promotions, product launches, and holidays. Business 
                  days refer to Monday through Friday, excluding public holidays and weekends.
                  <br/><br/>
                  Shipping delivery times fluctuate according to the chosen method, destination, and the shipping provider employed. Here is an estimated overview of shipping delivery times 
                  based on information provided by shipping providers. Please note that we CANNOT assure that the shipping provider will deliver your order within these specified delivery windows.
                  <br/><br/>
                  To access shipping speeds for your specific location, please refer to the "Track My Order" page.
                </p>
              </div>
              <div className="py-2">
                <h3 className="text-primary">2. Order Tracking</h3>
                <p>
                  Once your order has been processed, you will receive a confirmation email or SMS message containing tracking details. Please be aware that the tracking information may not 
                  immediately update and could remain devoid of any data for the initial 24-48 hours until the shipping provider scans your package.                    
                </p>
              </div>
              <div className="py-2">
                <h3 className="text-primary">3. Incorrect Address</h3>
                <p>
                  If your package is returned to us due to an incorrect or incomplete address, marked as "unclaimed" or "return to sender," or is deemed undeliverable for any reason by the shipping 
                  provider, we will notify you via email.
                  <br/><br/>
                  Once the package is back in our possession, we will arrange a new shipment to the correct address or initiate a refund. For more details on our refund policy, please refer to the 
                  dedicated section.
                  <br/><br/>
                  It's crucial to ensure that you provide the correct address at checkout and double-check it. We cannot be held responsible if your order is delivered to an incorrect address. If 
                  you accidentally provided the wrong address and your order has not yet been shipped, please contact us immediately to make adjustments or cancel the order. If the order has already 
                  been shipped, please promptly request a package intercept from the relevant shipping provider.
                </p>
              </div>
              <div className="py-2">
                <h3 className="text-primary">4. Lost and Stolen Packages</h3>
                <p>
                  Happy Hippo cannot be held responsible for packages that become damaged, lost, or stolen after the delivery driver confirms the package's delivery. To enhance the security 
                  of your package, we strongly advise monitoring the provided tracking information on the day of delivery and being present to receive it in person.
                  <br/><br/>
                  You will receive an email or SMS notification once the package has been delivered. If you are unable to locate your package, please follow these steps:                    
                </p>
                <ol>
                  <li>Check various locations at the delivery address where the shipping provider may have concealed the package.</li>
                  <li>Inquire with your neighbors to determine if they have received the package in your absence.</li>
                </ol>
              </div>
              <div className="py-2">
                <h3 className="text-primary">5. Incorrect and Damaged Orders</h3>
                <p>
                Although we strive for perfection, we acknowledge that mistakes can happen since we are all human! Please rest assured, we are committed to resolving any issues. To assist us in 
                addressing the matter, kindly share clear, well-lit images that clearly display the incorrect or damaged product, along with a complete view of the packing slip included in your order.                    </p>
              </div>
              <div className="py-2">
                <h3 className="text-primary">Contact</h3>
                <p>
                  For more information about our shipping policy, if you have questions, or if you would like to make a complaint, you can reach us through the help center https://dragon-organics/contact, by email dragonorganics.tm@gmail.com, or by mail using the details provided below:
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ShippingPolicy;