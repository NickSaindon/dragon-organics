import axios from 'axios';
import Layout from '../../components/Layout';
import SideNav from '../../components/SideNav';
import Link from 'next/link';
import { useEffect, useReducer } from 'react';
import { getError } from '../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

const AdminOrders = () => {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/orders`);
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
            <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
              <SideNav />
            </div>
            <div className="col-lg-9 col-md-12 col-sm-12">
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
                    <h1 className="card-title text-center text-primary">Admin Orders</h1>
                    <div className="row gx-5">
                      <div className="table-responsive">
                        <table className="table text-white">
                          <thead className="border-b">
                            <tr>
                              <th className="p-3 text-center text-primary">ID</th>
                              <th className="p-3 text-center text-primary">USER</th>
                              <th className="p-3 text-center text-primary">DATE</th>
                              <th className="p-3 text-center text-primary">TOTAL</th>
                              <th className="p-3 text-center text-primary">PAID</th>
                              <th className="p-3 text-center text-primary">DELIVERED</th>
                              <th className="p-3 text-center text-primary">ACTION</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.map((order) => (
                              <tr key={order._id} className="border-b">
                                <td className="p-2 text-center align-middle">{order._id.substring(20, 24)}</td>
                                <td className="p-2 text-center align-middle">
                                  {order.user ? order.user.name : 'DELETED USER'}
                                </td>
                                <td className="p-2 text-center align-middle">
                                  {order.createdAt.substring(0, 10)}
                                </td>
                                <td className="p-2 text-center align-middle">${order.totalPrice.toFixed(2)}</td>
                                <td className="p-2 text-center align-middle">
                                  {order.isPaid
                                  ? `${order.paidAt.substring(0, 10)}`
                                  : 'not paid'}
                                </td>
                                <td className="p-2 text-center align-middle">
                                  {order.isDelivered
                                  ? `${order.deliveredAt.substring(0, 10)}`
                                  : 'not delivered'}
                                </td>
                                <td className="p-2 text-center align-middle">
                                  <Link href={`/order/${order._id}`} type="button" className="btn btn-primary">
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