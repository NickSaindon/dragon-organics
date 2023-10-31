import axios from 'axios';
import Layout from '../../components/Layout';
import SideNav from '../../components/SideNav';
import Link from 'next/link';
import { useEffect, useReducer } from 'react';
import { getError } from '../../utils/error';
import moment from 'moment';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, supplies: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

const AdminOrders = () => {
  const [{ loading, error, supplies }, dispatch] = useReducer(reducer, {
    loading: true,
    supplies: [],
    error: '',
  });
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/supplies`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  return (
    <Layout title="Admin Orders">
      <div className="admin-container bg-black text-white">
        <div className="container-fluid">
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
                <div className="card admin-card-container">
                  <div className="card-body">
                    <h1 className="card-title text-center text-primary">Admin Shipment Supplies</h1>
                    <div className="row gx-5">
                      <table className="table text-white">
                        <thead className="border-b">
                          <tr>
                            <th className="p-3 text-center text-primary">ID</th>
                            <th className="p-3 text-center text-primary">MANUFACTURER</th>
                            <th className="p-3 text-center text-primary">DATE</th>
                            <th className="p-3 text-center text-primary">NUMBER OF ITEMS</th>
                            <th className="p-3 text-center text-primary">TOTAL BOXES</th>
                            <th className="p-3 text-center text-primary">SHIPPED</th>
                            <th className="p-3 text-center text-primary">RECIEVED</th>
                            <th className="p-3 text-center text-primary">ACTION</th>
                          </tr>
                        </thead>
                        <tbody>
                          {supplies.map((supply) => (
                            <tr key={supply._id} className="border-b">
                              <td className="p-2 text-center align-middle">{supply._id.substring(20, 24)}</td>
                              <td className="p-2 text-center align-middle">
                                {supply.user ? supply.user.name : 'DELETED USER'}
                              </td>
                              <td className="p-2 text-center align-middle">
                                {moment(new Date(supply.createdAt)).format('MM/DD/YYYY')}
                              </td>
                              <td className="p-2 text-center align-middle">{supply.shipmentItems.length}</td>
                              <td className="p-2 text-center align-middle">{supply.totalNumberOfBoxes}</td>
                              <td className="p-2 text-center align-middle">
                                {supply.isShipped
                                ? `${supply.shippedAt.substring(0, 10)}`
                                : 'not shipped'}
                            </td> 
                            <td className="p-2 text-center align-middle">
                                {supply.isRecieved
                                ? `${supply.recievedAt.substring(0, 10)}`
                                : 'not revieved'}
                            </td>                            
                            <td className="p-2 text-center align-middle">
                                <Link href={`/admin/shipments/${supply._id}`} type="button" className="btn btn-primary">
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
  
AdminOrders.auth = { adminOnly: true }
export default AdminOrders;