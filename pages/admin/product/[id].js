import axios from 'axios';
import Layout from '../../../components/Layout';
import SideNav from '../../../components/SideNav';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Image from "next/image";
import { ToastContainer, toast, Slide } from "react-toastify";
import { getError } from '../../../utils/error';
import dynamic from 'next/dynamic';

const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    // eslint-disable-next-line react/display-name
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  { ssr: false }
);

// Quill Modules
const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
  
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: true,
  }
};
  
// Quill format
const formats = [
  'bold', 
  'italic', 
  'underline', 
  'strike',
  'blockquote',
  'background',
  'code-block',
  'header',
  'list',
  'bullet',
  'script',
  'indent',
  'direction',
  'size',
  'color',
  'font',
  'align',
  'link',
  'image',
  'video',
];

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

  const [isFeatured, setIsFeatured] = useState(false);
  const [isPosted, setIsPosted] = useState(false);
  const [isImageOne, setIsImageOne] = useState('');
  const [isImageTwo, setIsImageTwo] = useState('');
  const [isImageThree, setIsImageThree] = useState('');
  const [isImageFour, setIsImageFour] = useState('');
  
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
        setValue('usage', data.usage);
        setValue('ingredients', data.ingredients);
        setValue('countInStock', data.countInStock);
        setValue('region', data.region);
        setValue('leafName', data.leafName);
        setValue('leafType', data.leafType);
        setValue('description', data.description);
        setIsFeatured(data.featured);
        setIsPosted(data.posted);
        setIsImageOne(data.imageOne);
        setIsImageTwo(data.imageTwo);
        setIsImageThree(data.imageThree);
        setIsImageFour(data.imageFour);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [productId, setValue]);
  
  const router = useRouter();
  
  const uploadHandler = async (e, imageFieldOne = 'imageOne') => {
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
      setValue(imageFieldOne, data.secure_url);

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

  const uploadImageTwoHandler = async (e, imageFieldTwo = 'imageTwo') => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}/upload`;
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
    usage,
    ingredients,
    countInStock,
    region,
    leafName,
    leafType,
    description,
    featured = isFeatured,
    posted = isPosted
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
        usage,
        ingredients,
        countInStock,
        region,
        leafName,
        leafType,
        description,
        featured,
        posted
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
                          placeholder="Name"
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
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="category"
                          placeholder="Category"
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
                          {...register('color')}
                        />
                        <label htmlFor="color">Color</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="size"
                          placeholder="Size"
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
                          id="ingredients"
                          placeholder="Ingredients"
                          {...register('ingredients', {
                            required: 'Please enter ingredients',
                          })}
                        />
                        {errors.ingredients && (
                          <div className="invalid-feedback">{errors.ingredients.message}</div>
                        )}
                        <label htmlFor="ingredients">Ingredients</label>
                      </div>

                      <div className="form-floating">
                        <Controller
                          name="usage"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => (
                          <QuillNoSSRWrapper
                            modules={modules}
                            formats={formats}
                            theme="snow"
                            {...field}
                          />
                        )}
                      />
                      <div className="invalid-feedback">
                        { errors.article ? 'Article is required' : '' }
                      </div>
                    </div>


                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="price"
                          placeholder="Price"
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
                          placeholder="Count In Stock"
                          {...register('countInStock', {
                            required: 'Please enter count in stock',
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
                          placeholder="Description"
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
                      {isImageOne && ( <Image src={isImageOne} className="mt-4" width={125} height={90} alt="Product Image One" /> )}
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="imageOne"
                          placeholder="Image One"
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
                      {isImageTwo && ( <Image src={isImageTwo} width={125} height={90} alt="Product Image Two" /> )}
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="imageTwo"
                          placeholder="Image Two"
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
                      {isImageThree && ( <Image src={isImageThree} width={125} height={90} alt="Product Image Three" /> )}
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="imageThree"
                          placeholder="Image Three"
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
                      {isImageFour && ( <Image src={isImageFour} width={125} height={90} alt="Product Image Four" /> )}
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="imageFour"
                          placeholder="Image Four"
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
                          placeholder="Region"
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
                          placeholder="Leaf Name"
                          {...register('leafName')}
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
                          placeholder="Leaf Type"
                          {...register('leafType')}
                        />
                        {errors.leafType && (
                          <div className="invalid-feedback">
                            {errors.leafType.message}
                          </div>
                        )}
                        <label htmlFor="leafType">Leaf Type</label>
                      </div>
                      <div className="row py-3 justify-content-between">
                        <div className="col-4">
                          <div className="form-check my-3">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              onChange={(e) => {setIsFeatured(e.target.checked)}}
                              checked={isFeatured}
                              name="featured"
                              id="featured"
                            />
                            <label className="form-check-label" htmlFor="featured">
                              Featured
                            </label>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="form-check my-3 float-end">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              onChange={(e) => {setIsPosted(e.target.checked)}}
                              checked={isPosted}
                              name="posted"
                              id="posted"
                            />
                            <label className="form-check-label" htmlFor="posted">
                              Posted
                            </label>
                          </div>
                        </div>
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