import axios from 'axios';
import Layout from '../../components/Layout';
import SideNav from '../../components/SideNav';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ToastContainer, toast, Slide } from "react-toastify";
import { getError } from '../../utils/error';
import QRCode from 'qrcode';

function reducer(state, action) {
  switch (action.type) {
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

const GenerateQrCode = () => {
  const [{ loadingUpdate }, dispatch] =
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

  const [manufacturer, setManufacturer] = useState('');
  const [productName, setProductName] = useState('');
  const [bagSize, setBagSize] = useState('');
  const [imageUrl, setImageUrl] = useState('');


  const onSubmit = async (data) => {
    console.log(data)
    try {
      const segs = JSON.stringify({
        manufacturer,
        productName,
        bagSize
      });
      QRCode.toDataURL(segs, function (err, url) {
        setImageUrl(url);

      })

    } catch (err) {
      console.error(err)
    }
  };

  const submitHandler = async ({
    shipmentItems,
    numberOfBoxes,
    totalShipmentWeight,
    isShipped,
    isRecieved
  }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.post(`/api/vendor/shipments`, {
        shipmentItems,
        numberOfBoxes,
        totalShipmentWeight,
        isShipped,
        isRecieved
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Shipment created successfully'), {
        theme: "colored"
      };
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err), {
        theme: "colored"
      });
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
              <div className="card admin-card-container">
                <div className="card-body">
                  <h1 className="card-title text-center text-primary">Generate Package QR Code</h1>
              <form 
                onSubmit={handleSubmit(onSubmit)}
                className="col-lg-6 col-md-12 col-sm-12 form-edit justify-content-center" 
                noValidate
              >
                      <div className="form-floating">
                        <input
                          type="text"
                          className={`form-control ${errors.manufacturer ? 'is-invalid' : ''}`}
                          id="manufacturer"
                          placeholder="Manufacturer Name" 
                          autoFocus
                          {...register('manufacturer', {
                            required: 'Please enter total box weight',
                            onChange: (e) => {setManufacturer(e.target.value)}
                          })}
                        />
                        {errors.manufacturer && (
                          <div className="invalid-feedback">
                            {errors.manufacturer.message}
                          </div>
                        )}
                        <label htmlFor="manufacturer">Manufacturer Name</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className={`form-control ${errors.productName ? 'is-invalid' : ''}`}
                          id="productName"
                          placeholder="Product Name" 
                          autoFocus
                          {...register('productName', {
                            required: 'Please enter total box weight',
                            onChange: (e) => {setProductName(e.target.value)}
                          })}
                        />
                        {errors.productName && (
                          <div className="invalid-feedback">
                            {errors.productName.message}
                          </div>
                        )}
                        <label htmlFor="productName">Product Name</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          className={`form-control ${errors.bagSize ? 'is-invalid' : ''}`}
                          id="bagSize"
                          placeholder="Bag Size" 
                          autoFocus
                          {...register('bagSize', {
                            required: 'Please enter total box weight',
                            onChange: (e) => {setBagSize(e.target.value)}
                          })}
                        />
                        {errors.bagSize && (
                          <div className="invalid-feedback">
                            {errors.bagSize.message}
                          </div>
                        )}
                        <label htmlFor="bagSize">Bag Size</label>
                      </div>
                      <button 
                        className="w-100 btn btn-lg btn-primary mt-3" 
                        type="submit"
                      >
                        Generate QR Code
                      </button>
              </form>
              <div className="col-lg-6 col-md-12 col-sm-12 mx-auto justify-content-center">
              {imageUrl ? (
                  <>
                  <div className="text-center p-5">
                    <img src={imageUrl} alt="image" />

                  </div>
                    <a href={imageUrl} download className="w-100 btn btn-lg btn-primary">
                      Download QR Code
                    </a>
                  </>
                ): null}
              </div>

              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

GenerateQrCode.auth = { adminOnly: true }
export default GenerateQrCode;