import axios from 'axios';
import Layout from '../../../components/Layout';
import SideNav from '../../../components/SideNav';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ToastContainer, toast, Slide } from "react-toastify";
import { getError } from '../../../utils/error';
import NumberFormat from 'react-number-format';
import bcryptjs from 'bcryptjs';

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

const AdminUserEdit = ({ params }) => {
  const userId = params.id;
  const [{ loading, error, loadingUpdate }, dispatch] =
  useReducer(reducer, {
    loading: true,
    error: '',
  });
  
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm();

  let [isAdminChecked, setIsAdminChecked] = useState(false);
  let [isManufacturerChecked, setIsManufacturerChecked] = useState(false);
  let [isVendorChecked, setIsVendorChecked] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const fetchData = async () => {
    try {
      dispatch({ type: 'FETCH_REQUEST' });
      const { data } = await axios.get(`/api/admin/users/${userId}`);

      dispatch({ type: 'FETCH_SUCCESS' });
      setValue('name', data.name);
      setValue('email', data.email);
      setValue('phone', data.phone);
      setValue('birthDate', data.birthDate);
      setValue('companyName', data.companyName);
      setValue('streetName', data.streetName);
      setValue('city', data.city);
      setValue('province', data.province);
      setValue('postalCode', data.postalCode);
      setValue('country', data.country);
      setIsAdminChecked(data.isAdmin);
      setIsManufacturerChecked(data.isManufacturer);
      setIsVendorChecked(data.isVendor);
      setValue('password', data.password)
    } catch (err) {
      dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
    }
  };
    fetchData();
  }, [userId, setValue]);

  const submitHandler = async ({
    name,
    email,
    phone,
    birthDate,
    companyName,
    streetName,
    city,
    province,
    postalCode,
    country,
    isAdmin = isAdminChecked,
    isManufacturer = isManufacturerChecked,
    isVendor = isVendorChecked,
    password
  }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(`/api/admin/users/${userId}`, {
        name,
        email,
        phone,
        birthDate,
        companyName,
        streetName,
        city,
        province,
        postalCode,
        country,
        isAdmin,
        isManufacturer,
        isVendor,
        password
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('User updated successfully'), {
        theme: "colored"
      };
      router.push('/admin/users');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err), {
        theme: "colored"
      });
    }
  };

  return (
    <Layout>
      <div className="admin-container bg-black">
        <ToastContainer 
          position="top-center" 
          draggable={false} 
          transition={Slide} 
          autoClose={5000}
          hideProgressBar={true}
          className="toast-alert"
        />
        <div className="container-fluid ">
          <div className="row">
            <div className="col-lg-3">
              <SideNav />
            </div>
            <div className="col-lg-9">
              <div className="card admin-card-container">
                <div className="card-body">
                  <h1 className="card-title text-center text-primary">Admin Edit User</h1>
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
                      className="col-lg-6 col-md-12 col-sm-12 form-user-edit justify-content-center" 
                      noValidate
                    >
                      <div className="form-floating">
                        <input
                          type="text"
                          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                          placeholder="Full Name" 
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
                        <label htmlFor="name">Full Name</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="email"
                          {...register('email', {
                            required: 'Please enter email',
                            pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                            message: 'Please enter valid email',
                            },
                          })}
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          placeholder="Email"
                        />
                        {errors.email && (
                          <div className="invalid-feedback">
                            {errors.email.message}
                          </div>
                        )}
                        <label htmlFor="name">Email</label>
                      </div>
                      <div className="form-floating">
                        <Controller 
                          name="phone"
                          control={control}
                          rules={{
                            required: false,
                            pattern: /^\(?\b[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}\b$/,
                          }}
                          render={({ field: {onChange, name, value} }) => (
                            <NumberFormat
                              format="(###) ###-####"
                              name={name}
                              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                              value={value}
                              placeholder="Phone Number" 
                              onChange={onChange}
                            />
                          )}
                        />
                        <label htmlFor="floatingInput">Phone Number</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Birth Date" 
                          autoFocus
                          {...register('birthDate')}
                        />
                        <label htmlFor="birthDate">Birth Date</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control" 
                          placeholder="Company Name" 
                          autoFocus
                          {...register('companyName')}
                        />
                        <label htmlFor="companyName">Company Name</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Street Name" 
                          autoFocus
                          {...register('streetName')}
                        />
                        <label htmlFor="streetName">Street Name</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="City" 
                          autoFocus
                          {...register('city')}
                        />
                        <label htmlFor="city">City</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Province" 
                          id="province"
                          autoFocus
                          {...register('province')}
                        />
                        <label htmlFor="province">Province</label>
                      </div>

                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control zip-code"
                          placeholder="Postal Code" 
                          id="postalCode"
                          autoFocus
                          {...register('postalCode')}
                        />
                        <label htmlFor="postalCode">Postal Code</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Country" 
                          id="country"
                          autoFocus
                          {...register('country')}
                        />
                        <label htmlFor="country">Country</label>
                      </div>
                      <div className="row py-3 justify-content-between">
                        <div className="col-4">
                          <div className="form-check">
                            <input 
                              className="form-check-input vendor-checkbox" 
                              type="checkbox" 
                              onChange={(e) => {setIsManufacturerChecked(e.target.checked)}}
                              checked={isManufacturerChecked}
                              name="isManufacturer"
                              id="isManufacturer"
                              disabled={!isManufacturerChecked && (isVendorChecked || isAdminChecked)}
                            />
                            <label className="form-check-label text-white" htmlFor="gridCheck">
                              Manufacturer
                            </label>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="form-check">
                            <input 
                              className="form-check-input vendor-checkbox" 
                              type="checkbox" 
                              onChange={(e) => {setIsVendorChecked(e.target.checked)}}
                              checked={isVendorChecked}
                              name="isVendor"
                              id="isVendor"
                              disabled={!isVendorChecked && (isManufacturerChecked || isAdminChecked)}
                            />
                            <label className="form-check-label text-white" htmlFor="gridCheck">
                              Retail Vendor
                            </label>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="form-check float-end">
                            <input 
                              className="form-check-input admin-checkbox" 
                              type="checkbox" 
                              onChange={(e) => setIsAdminChecked(e.target.checked)}
                              checked={isAdminChecked}
                              name="isAdmin"
                              id="isAdmin"
                              disabled={!isAdminChecked && (isVendorChecked || isManufacturerChecked)}
                            />
                            <label className="form-check-label text-white" htmlFor="gridCheck">
                              Admin
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
                          "Edit"
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

AdminUserEdit.auth = { adminOnly: true }
export default AdminUserEdit;