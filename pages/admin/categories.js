import axios from 'axios';
import Layout from '../../components/Layout';
import SideNav from '../../components/SideNav';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import { getError } from '../../utils/error';
import { toast } from 'react-toastify';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, categories: action.payload, error: '' };
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

const AdminCategories = () => {
  const router = useRouter();

  const [
    { loading, error, categories, loadingCreate, successDelete, loadingDelete },
      dispatch,
  ] = useReducer(reducer, {
      loading: true,
      products: [],
      error: '',
    });

  const createHandler = async () => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(`/api/admin/categories`);
      dispatch({ type: 'CREATE_SUCCESS' });
      toast.success('Categories created successfully');
      router.push(`/admin/category/${data.categories._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/categories`);
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

  const deleteHandler = async (categoryId) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      await axios.delete(`/api/admin/categories/${categoryId}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('Category deleted successfully');
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Admin Categories">
      <div className="admin-container bg-black text-white">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2">
              <SideNav />
            </div>
            <div className="col-lg-10">
              {loading ? (
                <div className="spinner-border custom-spinner text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>      
              ) : error ? (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : (
                <div className="card admin-card-container">
                  <div className="card-body">
                    <button 
                      className="btn btn-lg btn-outline-primary float-end light product-btn" 
                      type="submit"
                      onClick={createHandler}
                    >
                      {loadingCreate ? (
                        <>
                          <span className="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
                          <span className="visually-hidden">Loading...</span>
                        </>
                      ) : (
                        "Create Category"
                      )}
                    </button>
                    <h1 className="card-title text-center text-primary">Admin Categories</h1>
                    <div className="row gx-5">
                      <table className="table text-white">
                        <thead className="border-b">
                          <tr>
                            <th className="p-3 text-center text-primary">ID</th>
                            <th className="p-3 text-center text-primary">NAME</th>
                            <th className="p-3 text-center text-primary">SLUG</th>
                            <th className="p-3 text-center text-primary">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories.map((category) => (
                            <tr key={category._id} className="border-b">
                              <td className="p-2 text-center align-middle">{category._id.substring(20, 24)}</td>
                              <td className="p-2 text-center align-middle">{category.name}</td>
                              <td className="p-2 text-center align-middle">{category.slug}</td>
                              <td className="p-2 text-center align-middle">
                                <Link
                                  href={`/admin/category/${category._id}`}
                                  type="button"
                                  className="btn btn-primary"
                                >
                                  Edit
                                </Link>
                                &nbsp;
                                <button 
                                  onClick={() => deleteHandler(category._id)}
                                  type="button" 
                                  className="btn btn-danger"
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
  
AdminCategories.auth = { adminOnly: true }
export default AdminCategories;