import axios from 'axios';
import Layout from '../../components/Layout';
import SideNav from '../../components/SideNav';
import Link from 'next/link';
import { useEffect, useReducer } from 'react';
import { ToastContainer, toast, Slide } from "react-toastify";
import { getError } from '../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, users: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
}

const AdminUsers = () => {
  const [{ loading, error, users, successDelete, loadingDelete }, dispatch] =
  useReducer(reducer, {
    loading: true,
    users: [],
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/users`);
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

  const deleteHandler = async (userId) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      await axios.delete(`/api/admin/users/${userId}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('User deleted successfully');
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
      toast.error(getError(err));
    }
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
                    <h1 className="card-title text-center text-primary">Admin Users</h1>
                    <div className="row">
                      <table className="table text-white">
                        <thead className="border-b">
                          <tr>
                            <th className="p-3 text-center text-primary">ID</th>
                            <th className="p-3 text-center text-primary">NAME</th>
                            <th className="p-3 text-center text-primary">EMAIL</th>
                            <th className="p-3 text-center text-primary">ADMIN</th>
                            <th className="p-3 text-center text-primary">MANUFACTURER</th>
                            <th className="p-3 text-center text-primary">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user._id} className="border-b">
                              <td className="p-2 text-center align-middle">{user._id.substring(20, 24)}</td>
                              <td className="p-2 text-center align-middle">{user.name}</td>
                              <td className="p-2 text-center align-middle">{user.email}</td>
                              <td className="p-2 text-center align-middle">{user.isAdmin ? 'YES' : 'NO'}</td>
                              <td className="p-2 text-center align-middle">{user.isManufacturer ? 'YES' : 'NO'}</td>
                              <td className="p-2 text-center align-middle">
                                <Link
                                  href={`/admin/user/${user._id}`}
                                  type="button"
                                  className="btn btn-primary"
                                >
                                  Edit
                                </Link>
                                &nbsp;
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => deleteHandler(user._id)}
                                >
                                  Delete
                                </button>
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

AdminUsers.auth = { adminOnly: true }
export default AdminUsers;