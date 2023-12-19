import axios from 'axios';
import Layout from '../../../components/Layout';
import SideNav from '../../../components/SideNav';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from "next/image";
import { ToastContainer, toast, Slide } from "react-toastify";
import { getError } from '../../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpdate: '' };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, errorUpdate: '' };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}

const AdminCategoryEdit = ({ params }) => {
  const categoryId = params.id;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [isCategoryImage, setIsCategoryImage] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/categories/${categoryId}`);
        dispatch({ type: 'FETCH_SUCCESS' });
        setValue('name', data.name);
        setValue('slug', data.slug);
        setValue('categoryImage', data.categoryImage);
        setValue('categoryText', data.categoryText);
        setIsCategoryImage(data.categoryImage);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [categoryId, setValue]);
  
  const router = useRouter();
  
  const uploadHandler = async (e, imageField = 'categoryImage') => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`;
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const {
        data: { signature, timestamp },
      } = await axios('/api/admin/cloudinary-sign');

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      const { data } = await axios.post(url, formData);
      dispatch({ type: 'UPLOAD_SUCCESS' });
      setValue(imageField, data.secure_url);

      toast.success('File uploaded successfully', {
        theme: 'colored'
      });
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      toast.error(getError(err), {
        theme: 'colored'
      });
    }
  };
  
  const submitHandler = async ({
    name,
    slug,
    categoryImage,
    categoryText
  }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(`/api/admin/categories/${categoryId}`, {
        name,
        slug,
        categoryImage,
        categoryText
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Category updated successfully', {
        theme: 'colored'
      });
      router.push('/admin/categories');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err), {
        theme: 'colored'
      });
    }
  };

  return (
    <Layout title={`Edit Product ${categoryId}`}>
      <ToastContainer 
        position="top-center" 
        draggable={false} 
        transition={Slide} 
        autoClose={5000}
        hideProgressBar={true}
        className="toast-alert"
      />
      <div className="admin-container bg-black">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-lg-3 mb-3">
              <SideNav />
            </div>
            <div className="col-lg-9 col-md-12 col-sm-12">
              <div className="card admin-card-container">
                <div className="card-body">
                  <h1 className="card-title text-center text-primary">{`Edit Category ${categoryId}`}</h1>
                    {loading ? (
                      <div className="spinner-border customer-spinner text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>   
                    ) : error ? (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>          
                    ) : (
                    <form 
                      onSubmit={handleSubmit(submitHandler)}
                      className="col-lg-10 col-md-12 col-sm-12 form-edit justify-content-center" 
                      noValidate
                    >
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Category Name" 
                          autoFocus
                          {...register('name', {
                            required: 'Please enter category name',
                          })}
                        />
                        {errors.name && (
                          <div className="invalid-feedback">
                            {errors.name.message}
                          </div>
                        )}
                        <label htmlFor="name">Category Name</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="slug"
                          placeholder="Slug" 
                          {...register('slug', {
                            required: 'Please enter slug',
                          })}
                        />
                        {errors.slug && (
                          <div className="invalid-feedback">{errors.slug.message}</div>
                        )}
                        <label htmlFor="slug">Slug</label>
                      </div>
                      {isCategoryImage && ( <Image src={isCategoryImage} className="mt-4" width={150} height={90} alt="Category header image" /> )}
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Category Image" 
                          id="categoryImage"
                          {...register('categoryImage', {
                            required: 'Please enter category image',
                          })}
                        />
                        {errors.categoryImage && (
                          <div className="invalid-feedback">{errors.categoryImage.message}</div>
                        )}
                        <label htmlFor="categoryImage">Category Image</label>
                        <div className="file btn btn-lg btn-primary">
                          {loadingUpload ? (
                            <>
                              <span className="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
                              <span className="visually-hidden">Loading...</span>
                            </>
                          ) : (
                            "Upload"
                          )}
                          <input 
                            type="file" 
                            id="imageFile"
                            onChange={uploadHandler}
                          />
                        </div>
                      </div>
                      <div className="form-floating">
                        <textarea
                          rows="5"
                          className="form-control"
                          placeholder="Category Description" 
                          id="categoryText"
                          {...register('categoryText', {
                            required: 'Please enter category description',
                          })}
                        />
                        {errors.categoryText && (
                          <div className="invalid-feedback">
                            {errors.categoryText.message}
                          </div>
                        )}
                        <label htmlFor="categoryText">Category Description</label>
                      </div>
                      <button className="w-100 btn btn-lg btn-primary" type="submit">
                        {loadingUpdate ? (
                          <>
                            <span className="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
                            <span className="visually-hidden">Loading...</span>
                          </>
                        ) : (
                          "Edit Category"
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  return {
    props: { params },
  };
}

AdminCategoryEdit.auth = { adminOnly: true }
export default AdminCategoryEdit;