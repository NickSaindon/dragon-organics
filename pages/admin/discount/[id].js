import axios from 'axios';
import Layout from '../../../components/Layout';
import SideNav from '../../../components/SideNav';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
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

    default:
      return state;
  }
}

const AdminDiscountEdit = ({ params }) => {
  const discountId = params.id;
  const [{ loading, error, loadingUpdate }, dispatch] =
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
  
  let [isValidChecked, setIsValidChecked] = useState(false);
  let [expiresDate, setExpiresDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/discounts/${discountId}`);
        dispatch({ type: 'FETCH_SUCCESS' });
        setValue('campaignName', data.campaignName);
        setValue('discountReason', data.discountReason);
        setValue('discountCode', data.discountCode);
        setValue('discountAmount', data.discountAmount.toFixed(2));
        setValue('numOfDiscounts', data.numOfDiscounts);
        setExpiresDate(moment(new Date(data.expires)).format('MM/DD/YYYY'));
        setIsValidChecked(data.isValid);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [discountId, setValue]);
  
  const router = useRouter();
  
  const submitHandler = async ({
    campaignName,
    discountReason,
    discountCode,
    discountAmount,
    numOfDiscounts,
    expires = expiresDate,
    isValid = isValidChecked,
  }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(`/api/admin/discounts/${discountId}`, {
        campaignName,
        discountReason,
        discountCode,
        discountAmount,
        numOfDiscounts,
        expires,
        isValid
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Discount updated successfully', {
        theme: 'colored'
      });
      router.push('/admin/discount-codes');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err), {
        theme: 'colored'
      });
    }
  };

  return (
    <Layout title={`Edit Discount ${discountId}`}>
      <ToastContainer 
        position="top-center" 
        draggable={false} 
        transition={Slide} 
        autoClose={3000}
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
                  <h1 className="card-title text-center text-primary">{`Edit Discount ${discountId}`}</h1>
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
                          id="campaignName"
                          placeholder="Campaign Name"
                          autoFocus
                          {...register('campaignName', {
                            required: 'Please enter campaignName',
                          })}
                        />
                        {errors.campaignName && (
                          <div className="invalid-feedback">
                            {errors.campaignName.message}
                          </div>
                        )}
                        <label htmlFor="campaignName">Campaign Name</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="discountReason"
                          placeholder="Discount Reason"
                          autoFocus
                          {...register('discountReason', {
                            required: 'Please enter discount reason',
                          })}
                        />
                        {errors.discountReason && (
                          <div className="invalid-feedback">{errors.discountReason.message}</div>
                        )}
                        <label htmlFor="discountReason">Discount Reason</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="discountCode"
                          placeholder="Discount Code"
                          autoFocus
                          {...register('discountCode', {
                            required: 'Please enter discountCode',
                          })}
                        />
                        {errors.discountCode && (
                          <div className="invalid-feedback">{errors.discountCode.message}</div>
                        )}
                        <label htmlFor="discountCode">Discount Code</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="discountAmount"
                          placeholder="Discount Amount"
                          autoFocus
                          {...register('discountAmount', {
                            required: 'Please enter discount amount',
                          })}
                        />
                        {errors.discountAmount && (
                          <div className="invalid-feedback">{errors.discountAmount.message}</div>
                        )}
                        <label htmlFor="discountAmount">Discount Amount</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="numOfDiscounts"
                          placeholder="Number of Discounts"
                          autoFocus
                          {...register('numOfDiscounts', {
                            required: 'Please enter number of discounts',
                          })}
                        />
                        {errors.numOfDiscounts && (
                          <div className="invalid-feedback">{errors.numOfDiscounts.message}</div>
                        )}
                        <label htmlFor="numOfDiscounts">Number of Discounts</label>
                      </div>
                      <div className="row py-3">
                        <div className="col">
                            <Datetime id="numOfDiscounts" onChange={(date) => setExpiresDate(date)} value={expiresDate} timeFormat={false} />
                        </div>
                      </div>
                      <div className="row py-3">
                        <div className="col-12">
                          <div className="form-check">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              onChange={(e) => {setIsValidChecked(e.target.checked)}}
                              checked={isValidChecked}
                              name="isValid"
                              id="isValid"
                            />
                            <label className="form-check-label text-white" htmlFor="gridCheck">
                              Valid
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
                          "Edit Discount"
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

AdminDiscountEdit.auth = { adminOnly: true }
export default AdminDiscountEdit;