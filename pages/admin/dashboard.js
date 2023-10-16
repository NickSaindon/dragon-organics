import axios from 'axios';
import Layout from '../../components/Layout';
import SideNav from '../../components/SideNav';
import Link from 'next/link';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useReducer } from 'react';
import { getError } from '../../utils/error';
  
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};
  
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

const AdminDashboard = () => {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: '',
  });
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/summary`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  const data = {
    labels: summary.salesData.map((x) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: 'Sales',
        backgroundColor: '#96712F',
        data: summary.salesData.map((x) => x.totalSales),
      },
    ],
  };

  return (
    <Layout>
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
                    <h1 className="card-title text-center">Admin Dashboard</h1>
                    <div className="row gx-5">
                      <div className="col-xxl-3 col-md-6 mb-5">
                        <div className="card card-raised bg-black">
                          <div className="card-body px-4">
                            <h2 className="text-center">${summary.ordersPrice}</h2>
                            <h3 className="text-center">Sales</h3>
                            <div className="card-text">
                              <div className="text-center">
                                <Link href="/admin/orders" type="button" className="btn btn-link">
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
                            <h2 className="text-center">{summary.ordersCount}</h2>
                            <h3 className="text-center">Orders</h3>
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
                            <h2 className="text-center">{summary.productsCount}</h2>
                            <h3 className="text-center">Products</h3>
                            <div className="card-text">
                              <div className="text-center">
                                <Link href="/admin/products" type="button" className="btn btn-link">
                                  View Products
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xxl-3 col-md-6 mb-5">
                        <div className="card card-raised bg-black">
                          <div className="card-body px-4">
                            <h2 className="text-center">{summary.usersCount}</h2>
                            <h3 className="text-center">Users</h3>
                            <div className="card-text">
                              <div className="text-center">
                                <Link href="/admin/users" type="button" className="btn btn-link">
                                    View Vendors
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <h2 className="text-center py-3">Sales Report</h2>
                        <Bar
                          options={{
                            legend: { display: true, position: 'right' },
                          }}
                          data={data}
                        />
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

AdminDashboard.auth = { adminOnly: true }
export default AdminDashboard;