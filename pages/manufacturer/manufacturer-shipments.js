import axios from 'axios';
import Layout from '../../components/Layout';
import SideNav from '../../components/SideNav';
import Link from 'next/link';
import { useEffect, useReducer } from 'react';
import { getError } from '../../utils/error';
import moment from 'moment-timezone';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, manufacturerShipments: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

const ManufacturerShipments = () => {
  const [{ loading, error, manufacturerShipments }, dispatch] = useReducer(reducer, {
    loading: true,
    manufacturerShipments: [],
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/manufacturer/shipments`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
  };
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="vendor-container bg-black text-white">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-lg-2">
              <SideNav />
            </div>
            <div className="col-lg-10">
              {loading ? (
                <div className="spinner-border customer-spinner text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>      
              ) : error ? (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : (
                <div className="card vendor-card-container">
                  <div className="card-body">
                    <h1 className="card-title text-center text-primary">Manufacturer Shipping Details</h1>
                    <div className="row gx-5">
                      <table className="table text-white">
                        <thead className="border-b">
                          <tr>
                            <th className="p-3 text-center text-primary">ID</th>
                            <th className="p-3 text-center text-primary">NUMBER OF ITEMS</th>
                            <th className="p-3 text-center text-primary">TOTAL BOXES</th>
                            <th className="p-3 text-center text-primary">SHIPPED</th>
                            <th className="p-3 text-center text-primary">RECIEVED</th>
                            <th className="p-3 text-center text-primary">ACTION</th>
                          </tr>
                        </thead>
                        <tbody>
                          {manufacturerShipments.map((manufacturerShipment) => (
                            <tr key={manufacturerShipment._id}>
                              <td className="p-2 text-center align-middle">{manufacturerShipment._id.substring(20, 24)}</td>
                              <td className="p-2 text-center align-middle">{manufacturerShipment.shipmentItems.length}</td>
                              <td className="p-2 text-center align-middle">{manufacturerShipment.totalNumberOfBoxes}</td>
                              <td className="p-2 text-center align-middle">
                                  {manufacturerShipment.isShipped
                                  ? `${moment.tz(new Date(manufacturerShipment.shippedAt), "Asia/Bangkok").format('LL')}`
                                  : 'not shipped'}
                              </td> 
                              <td className="p-2 text-center align-middle">
                                  {manufacturerShipment.isRecieved
                                  ? `${moment.tz(new Date(manufacturerShipment.recievedAt), "America/New_York").format('LL')}`
                                  : 'not revieved'}
                              </td>                            
                              <td className="p-2 text-center align-middle">
                                  <Link href={`/manufacturer/shipments/${manufacturerShipment._id}`} type="button" className="btn btn-primary">
                                    Details
                                  </Link>
                              </td>                            
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

ManufacturerShipments.auth = { manufacturerOnly: true }
export default ManufacturerShipments;