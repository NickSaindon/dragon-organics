import axios from 'axios';
import Layout from '../../../components/Layout';
import SideNav from '../../../components/SideNav';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
    
const AdminNewsEdit = ({ params }) => {
  const newsId = params.id;
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

  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/news/${newsId}`);
        dispatch({ type: 'FETCH_SUCCESS' });
        setValue('title', data.title);
        setValue('slug', data.slug);
        setValue('description', data.description);
        setValue('author', data.author);
        setValue('article', data.article);
        setIsPublished(data.published);
        setValue('headerImage', data.headerImage);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [newsId, setValue]);

  const router = useRouter();

  const uploadHandler = async (e, imageHeader = 'headerImage') => {
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
      setValue(imageHeader, data.secure_url);

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
    title,
    tags,
    description,
    author,
    article,
    published = isPublished,
    headerImage,
    slug
    }) => {
      try {
        dispatch({ type: 'UPDATE_REQUEST' });
        await axios.put(`/api/admin/news/${newsId}`, {
          title,
          tags,
          description,
          author,
          article,
          published,
          headerImage,
          slug
        });
        dispatch({ type: 'UPDATE_SUCCESS' });
        toast.success('Blog article updated successfully', { 
          theme: 'colored' 
        });
        router.push('/admin/news');
      } catch (err) {
        dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
        toast.error(getError(err), {
          theme: 'colored'
        });
      }
    };

  return (
    <Layout title={`Edit Article ${newsId}`}>
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
                  <h1 className="card-title text-center text-primary">{`Edit Article ${newsId}`}</h1>
                  <form 
                    onSubmit={handleSubmit(submitHandler)}
                    className="col-lg-10 col-md-12 col-sm-12 form-edit justify-content-center" 
                    noValidate
                  >
                    <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          autoFocus
                          {...register('title', {
                            required: 'Please enter title',
                          })}
                        />
                        {errors.title && (
                          <div className="invalid-feedback">
                            {errors.title.message}
                          </div>
                        )}
                        <label htmlFor="title">Title</label>
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
                          id="headerImage"
                          {...register('headerImage', {
                            required: 'Please enter image',
                          })}
                        />
                        {errors.headerImage && (
                          <div className="invalid-feedback">{errors.headerImage.message}</div>
                        )}
                        <label htmlFor="headerImage">Header Image</label>
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
                          id="description"
                          autoFocus
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
                          id="author"
                          autoFocus
                          {...register('author', {
                            required: 'Please enter author',
                          })}
                        />
                        {errors.author && (
                          <div className="invalid-feedback">
                            {errors.author.message}
                          </div>
                        )}
                        <label htmlFor="author">Author</label>
                      </div>
                      <div className="form-floating">
                      <Controller
                        name="article"
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
                    <div className="form-check my-3 text-white">
                            <input 
                              className="form-check-input border-white" 
                              type="checkbox" 
                              onChange={(e) => {setIsPublished(e.target.checked), console.log(isPublished)}}
                              checked={isPublished}
                              name="published"
                              id="published"
                            />
                            <label className="form-check-label text-white" htmlFor="published">
                              Publish {console.log(isPublished)}
                            </label>
                          </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">
                        {loadingUpdate ? (
                          <>
                            <span className="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
                            <span className="visually-hidden">Loading...</span>
                          </>
                        ) : (
                          "Edit News"
                        )}
                      </button>
                  </form>
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
  
AdminNewsEdit.auth = { adminOnly: true }
export default AdminNewsEdit;