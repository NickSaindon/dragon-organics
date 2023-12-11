import axios from 'axios';
import Layout from '../../../components/Layout';
import SideNav from '../../../components/SideNav';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';
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

const AdminProductEdit = ({ params }) => {
  const productId = params.id;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });
  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/products/${productId}`);
        dispatch({ type: 'FETCH_SUCCESS' });
        setValue('name', data.name);
        setValue('slug', data.slug);
        setValue('price', data.price);
        setValue('category', data.category);
        setValue('color', data.color);
        setValue('imageOne', data.imageOne);
        setValue('imageTwo', data.imageTwo);
        setValue('imageThree', data.imageThree);
        setValue('imageFour', data.imageFour);
        setValue('size', data.size);
        setValue('countInStock', data.countInStock);
        setValue('region', data.region);
        setValue('leafName', data.leafName);
        setValue('leafType', data.leafType);
        setValue('description', data.description);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [productId, setValue]);
  
  const router = useRouter();
  
  const uploadHandler = async (e, imageFieldOne = 'imageOne') => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
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
      setValue(imageFieldOne, data.secure_url);

      toast.success('File uploaded successfully');
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      toast.error(getError(err), {
        theme: 'colored'
      });
    }
  };

  const uploadImageTwoHandler = async (e, imageFieldTwo = 'imageTwo') => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
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
      setValue(imageFieldTwo, data.secure_url);

      toast.success('File uploaded successfully');
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      toast.error(getError(err), {
        theme: 'colored'
      });
    }
  };

  const uploadImageThreeHandler = async (e, imageFieldThree = 'imageThree') => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
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
      setValue(imageFieldThree, data.secure_url);

      toast.success('File uploaded successfully');
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      toast.error(getError(err), {
        theme: 'colored'
      });
    }
  };

  const uploadImageFourHandler = async (e, imageFieldFour = 'imageFour') => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
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
      setValue(imageFieldFour, data.secure_url);

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
    price,
    category,
    color,
    size,
    imageOne,
    imageTwo,
    imageThree,
    imageFour,
    countInStock,
    region,
    leafName,
    leafType,
    description
  }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(`/api/admin/products/${productId}`, {
        name,
        slug,
        price,
        category,
        color,
        size,
        imageOne,
        imageTwo,
        imageThree,
        imageFour,
        countInStock,
        region,
        leafName,
        leafType,
        description
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Product updated successfully', {
        theme: 'colored'
      });
      router.push('/admin/products');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err), {
        theme: 'colored'
      });
    }
  };

  return (
    <Layout title={`Edit Product ${productId}`}>
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
            <div className="col-lg-3">
              <SideNav />
            </div>
            <div className="col-lg-9">
              <div className="card admin-card-container">
                <div className="card-body">
                  <h1 className="card-title text-center text-primary">{`Edit Product ${productId}`}</h1>
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
                          autoFocus
                          {...register('name', {
                            required: 'Please enter name',
                          })}
                        />
                        {errors.name && (
                          <div className="invalid-feedback">
                            {errors.name.message}
                          </div>
                        )}
                        <label htmlFor="name">Name</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="slug"
                          {...register('slug', {
                            required: 'Please enter slug',
                          })}
                        />
                        {errors.slug && (
                          <div className="invalid-feedback">{errors.slug.message}</div>
                        )}
                        <label htmlFor="slug">Slug</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="category"
                          {...register('category', {
                            required: 'Please enter category',
                          })}
                        />
                        {errors.category && (
                          <div className="invalid-feedback">{errors.category.message}</div>
                        )}
                        <label htmlFor="slug">Category</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="color"
                          {...register('color', {
                            required: 'Please enter color',
                          })}
                        />
                        <label htmlFor="color">Color</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="size"
                          {...register('size', {
                            required: 'Please enter size',
                          })}
                        />
                        {errors.size && (
                          <div className="invalid-feedback">{errors.size.message}</div>
                        )}
                        <label htmlFor="size">Size</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="price"
                          {...register('price', {
                            required: 'Please enter price',
                          })}
                        />
                        {errors.price && (
                          <div className="invalid-feedback">{errors.price.message}</div>
                        )}
                        <label htmlFor="price">Price</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="countInStock"
                          {...register('countInStock', {
                            required: 'Please enter countInStock',
                          })}
                        />
                        {errors.countInStock && (
                          <div className="invalid-feedback">
                            {errors.countInStock.message}
                          </div>
                        )}
                        <label htmlFor="countInTons">Count in Stock</label>
                      </div>
                      <div className="form-floating">
                        <textarea
                          row="5"
                          className="form-control"
                          id="description"
                          {...register('description', {
                            required: 'Please enter description',
                          })}
                        />
                        {errors.description && (
                          <div className="invalid-feedback">
                            {errors.description.message}
                          </div>
                        )}
                        <label htmlFor="description">Description</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="imageOne"
                          {...register('imageOne', {
                            required: 'Please enter image',
                          })}
                        />
                        {errors.imageOne && (
                          <div className="invalid-feedback">{errors.imageOne.message}</div>
                        )}
                        <label htmlFor="imageOne">Image One</label>
                        <div className="file btn btn-lg btn-primary">
                          Upload
                          <input 
                            type="file" 
                            id="imageFile"
                            onChange={uploadHandler}
                          />
                        </div>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="imageTwo"
                          {...register('imageTwo', {
                            required: 'Please enter image',
                          })}
                        />
                        {errors.imageTwo && (
                          <div className="invalid-feedback">{errors.imageTwo.message}</div>
                        )}
                        <label htmlFor="imageTwo">Image Two</label>
                        <div className="file btn btn-lg btn-primary">
                          Upload
                          <input 
                            type="file" 
                            id="imageFileTwo"
                            onChange={uploadImageTwoHandler}
                          />
                        </div>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="imageThree"
                          {...register('imageThree', {
                            required: 'Please enter image',
                          })}
                        />
                        {errors.imageThree && (
                          <div className="invalid-feedback">{errors.imageThree.message}</div>
                        )}
                        <label htmlFor="imageThree">Image Three</label>
                        <div className="file btn btn-lg btn-primary">
                          Upload
                          <input 
                            type="file" 
                            id="imageFileThree"
                            onChange={uploadImageThreeHandler}
                          />
                        </div>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="imageFour"
                          {...register('imageFour', {
                            required: 'Please enter image',
                          })}
                        />
                        {errors.imageFour && (
                          <div className="invalid-feedback">{errors.imageFour.message}</div>
                        )}
                        <label htmlFor="imageFour">Image Four</label>
                        <div className="file btn btn-lg btn-primary">
                          Upload
                          <input 
                            type="file" 
                            id="imageFileFour"
                            onChange={uploadImageFourHandler}
                          />
                        </div>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="region"
                          {...register('region', {
                            required: 'Please enter region',
                          })}
                        />
                        {errors.region && (
                          <div className="invalid-feedback">
                            {errors.region.message}
                          </div>
                        )}
                        <label htmlFor="region">Region</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="leafName"
                          {...register('leafName', {
                            required: 'Please enter leaf name',
                          })}
                        />
                        {errors.leafName && (
                          <div className="invalid-feedback">
                            {errors.leafName.message}
                          </div>
                        )}
                        <label htmlFor="leafName">Leaf Name</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="leafType"
                          {...register('leafType', {
                            required: 'Please enter leaf type',
                          })}
                        />
                        {errors.leafType && (
                          <div className="invalid-feedback">
                            {errors.leafType.message}
                          </div>
                        )}
                        <label htmlFor="leafType">Leaf Type</label>
                      </div>
                      <button className="w-100 btn btn-lg btn-primary" type="submit">
                        {loadingUpdate ? (
                          <>
                            <span className="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
                            <span className="visually-hidden">Loading...</span>
                          </>
                        ) : (
                          "Edit Product"
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

AdminProductEdit.auth = { adminOnly: true }
export default AdminProductEdit;