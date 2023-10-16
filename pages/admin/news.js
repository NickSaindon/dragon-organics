import axios from 'axios';
import Layout from '../../components/Layout';
import SideNav from '../../components/SideNav';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useReducer } from 'react';
import { getError } from '../../utils/error';
import { ToastContainer, toast, Slide } from "react-toastify";
import moment from 'moment';

function reducer(state, action) {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true, error: '' };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, news: action.payload, error: '' };
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

const AdminNews = () => {
    const router = useRouter();

    const [
      { loading, error, news, loadingCreate, successDelete, loadingDelete },
        dispatch,
    ] = useReducer(reducer, {
        loading: true,
        news: [],
        error: '',
      });
    
    const createHandler = async () => {
      if (!window.confirm('Are you sure?')) {
        return;
      }
      try {
        dispatch({ type: 'CREATE_REQUEST' });
        const { data } = await axios.post(`/api/admin/news`);
        dispatch({ type: 'CREATE_SUCCESS' });
        toast.success('Article created successfully');
        router.push(`/admin/news/${data.news._id}`);
      } catch (err) {
        dispatch({ type: 'CREATE_FAIL' });
        toast.error(getError(err));
      }
    };
      
    useEffect(() => {
      const fetchData = async () => {
        try {
          dispatch({ type: 'FETCH_REQUEST' });
          const { data } = await axios.get(`/api/admin/news`);
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
    
    const deleteHandler = async (newsId) => {
      if (!window.confirm('Are you sure?')) {
        return;
      }
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete(`/api/admin/news/${newsId}`);
        dispatch({ type: 'DELETE_SUCCESS' });
        toast.success('Product deleted successfully');
      } catch (err) {
        dispatch({ type: 'DELETE_FAIL' });
        toast.error(getError(err));
      }
    };

  return (
    <Layout>
      <div className="admin-container bg-black">
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
                    "Create Article"
                    )}
                </button>
                  <h1 className="card-title text-center text-primary">News Articles</h1>
                  <div className="row gx-5">
                    <table className="table text-white">
                      <thead className="border-b">
                        <tr>
                          <th className="p-3 text-center text-primary">ID</th>
                          <th className="p-3 text-center text-primary">TITLE</th>
                          <th className="p-3 text-center text-primary">DATE</th>
                          <th className="p-3 text-center text-primary">AUTHOR</th>
                          <th className="p-3 text-center text-primary">PUBLISHED</th>
                          <th className="p-3 text-center text-primary">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {news.map((article) => (
                        <tr key={article._id} className="border-b">
                        <td className="p-2 text-center align-middle">{article._id.substring(20, 24)}</td>
                        <td className="p-2 text-center align-middle">{article.title}</td>
                        <td className="p-2 text-center align-middle">{moment(article.createdAt).format('MM/DD/YYYY')}</td>
                        <td className="p-2 text-center align-middle">{article.author}</td>
                        <td className="p-2 text-center align-middle">{article.published ? 'Yes' : 'No'}</td>
                        <td className="p-2 text-center align-middle">
                                <Link
                                  href={`/admin/news/${article._id}`}
                                  type="button"
                                  className="btn btn-primary"
                                >
                                  Edit
                                </Link>
                                &nbsp;
                                <button 
                                  onClick={() => deleteHandler(article._id)}
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

AdminNews.auth = { adminOnly: true }
export default AdminNews;
