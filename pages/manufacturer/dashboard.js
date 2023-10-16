import axios from 'axios';
import Layout from '../../components/Layout';
import SideNav from '../../components/SideNav';
import Link from 'next/link';

const VendorDashboard = () => {
  return (
    <Layout>
      <div className="vendor-container bg-black text-white">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2">
              <SideNav />
            </div>
            <div className="col-lg-10">
              <div className="card vendor-card-container">
                <div className="card-body">
                  <h1 className="card-title text-center">Manufacturer Dashboard</h1>
                  <div className="row gx-5">
                  <div className="col-xxl-3 col-md-6 mb-5">
                      <div className="card card-raised bg-black">
                        <div className="card-body px-4">
                          <h2 className="text-center">2</h2>
                          <h3 className="text-center">Shipments</h3>
                          <div className="card-text">
                            <div className="text-center">
                              <Link href="/admin/orders" type="button" className="btn btn-link">
                                View Orders
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-md-6 mb-5">
                      <div className="card card-raised bg-black">
                        <div className="card-body px-4">
                          <h2 className="text-center">$2000.00</h2>
                          <h3 className="text-center">Total Sales</h3>
                          <div className="card-text">
                            <div className="text-center">
                              <Link href="/vendor/orders" type="button" className="btn btn-link">
                                View Sales
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-md-6 mb-5">
                      <div className="card card-raised bg-black">
                        <div className="card-body px-4">
                          <h2 className="text-center">$1000.00</h2>
                          <h3 className="text-center">Total Profit</h3>
                          <div className="card-text">
                            <div className="text-center">
                              <Link href="/admin/orders" type="button" className="btn btn-link">
                                View Orders
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-md-6 mb-5">
                      <div className="card card-raised bg-black">
                        <div className="card-body px-4">
                          <h2 className="text-center">100kg</h2>
                          <h3 className="text-center">Supply Chain</h3>
                          <div className="card-text">
                            <div className="text-center">
                              <Link href="/admin/orders" type="button" className="btn btn-link">
                                View Orders
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

VendorDashboard.auth = { manufacturerOnly: true }
export default VendorDashboard;