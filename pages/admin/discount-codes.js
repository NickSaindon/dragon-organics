import axios from 'axios';
import Layout from '../../components/Layout';
import SideNav from '../../components/SideNav';
import { useRouter } from 'next/router';
import Link from 'next/link';
import moment from 'moment';
import { useEffect, useReducer } from 'react';
import { getError } from '../../utils/error';
import { ToastContainer, toast, Slide } from "react-toastify";

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, discounts: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
    state;
  }
}

const AdminDiscoutCodes = () => {
  const router = useRouter();

  const [
    {loading, error, discounts, loadingCreate, successDelete, loadingDelete},
      dispatch,
  ] = useReducer(reducer, {
      loading: true,
      discounts: [],
      error: '',
    });
  
  const createHandler = async () => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(`/api/admin/discounts`);
      dispatch({ type: 'CREATE_SUCCESS' });
      toast.success('Discount created successfully', {
          theme: 'colored'
      });
      router.push(`/admin/discount/${data.discount._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err), {
          theme: 'colored'
      });
    }
  };
      
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/discounts`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
  
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [successDelete]);
  
  const deleteHandler = async (discountId) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      await axios.delete(`/api/admin/discounts/${discountId}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('Discount deleted successfully', {
          theme: 'colored'
      });
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
      toast.error(getError(err), {
          theme: 'colored'
      });
    }
  };

  return (
    <Layout title="Admin Discount Codes">
      <ToastContainer 
        position="top-center" 
        draggable={false} 
        transition={Slide} 
        autoClose={3000}
        hideProgressBar={true}
        className="toast-alert"
      />
      <div className="admin-container bg-black text-white">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-12 col-sm-12 my-3">
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
                <div className="card admin-card-container my-3">
                    <div className="py-3">
                    <button 
                      className="btn btn-lg btn-outline-primary float-end light" 
                      type="submit"
                      onClick={createHandler}
                    >
                      {loadingCreate ? (
                        <>
                          <span className="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
                          <span className="visually-hidden">Loading...</span>
                        </>
                      ) : (
                        "Generate Discount Code"
                      )}
                    </button>
                    </div>
                  <div className="card-body">
                    <h1 className="card-title text-center text-primary">Discount Codes</h1>
                    {loadingDelete && <div class="spinner-border text-secondary" role="status">
                      <span class="visually-hidden">Deleting Discount Code...</span>
                    </div>}
                    <div className="row gx-5">
                      <div className="table-responsive">
                        <table className="table text-white">
                          <thead className="border-b">
                            <tr>
                              <th className="p-3 text-center text-primary">ID</th>
                              <th className="p-3 text-center text-primary">NAME</th>
                              <th className="p-3 text-center text-primary">REASON</th>
                              <th className="p-3 text-center text-primary">CODE</th>
                              <th className="p-3 text-center text-primary">AMOUNT</th>
                              <th className="p-3 text-center text-primary"># OF DISCOUNTS</th>
                              <th className="p-3 text-center text-primary">EXPIRES</th>
                              <th className="p-3 text-center text-primary">VALID</th>
                              <th className="p-3 text-center text-primary">ACTIONS</th>
                            </tr>
                          </thead>
                          <tbody>
                            {discounts.map((discount) => (
                              <tr key={discount._id} className="border-b">
                                <td className="p-2 text-center align-middle">{discount._id.substring(20, 24)}</td>
                                <td className="p-2 text-center align-middle">{discount.campaignName}</td>
                                <td className="p-2 text-center align-middle">{discount.discountReason}</td>
                                <td className="p-2 text-center align-middle">{discount.discountCode}</td>
                                <td className="p-2 text-center align-middle">{discount.discountAmount.toFixed(2)}</td>
                                <td className="p-2 text-center align-middle">{discount.numOfDiscounts}</td>
                                <td className="p-2 text-center align-middle">{moment(new Date(discount.expires)).format('MM/DD/YYYY')}</td>
                                <td className="p-2 text-center align-middle">{discount.isValid ? 'YES' : 'NO'}</td>
                                <td className="p-2 text-center align-middle">
                                  <Link
                                    href={`/admin/discount/${discount._id}`}
                                    type="button"
                                    className="btn btn-primary my-1"
                                  >
                                    Edit
                                  </Link>
                                  &nbsp;
                                  <button
                                    type="button"
                                    className="btn btn-danger my-1"
                                    onClick={() => deleteHandler(discount._id)}
                                  >
                                    {loadingDelete ? (
                                      <>
                                        <span className="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
                                        <span className="visually-hidden">Loading...</span>
                                      </>
                                    ) : (
                                      "Delete"
                                    )}
                                  </button>
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
  
AdminDiscoutCodes.auth = { adminOnly: true }
export default AdminDiscoutCodes;