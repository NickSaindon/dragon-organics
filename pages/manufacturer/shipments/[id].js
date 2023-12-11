import axios from 'axios';
import Layout from '../../../components/Layout';
import SideNav from '../../../components/SideNav';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { ToastContainer, toast, Slide } from "react-toastify";
import { getError } from '../../../utils/error';
import moment from 'moment';


function reducer(state, action) {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true, error: '' };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, manufacturerShipment: action.payload, error: '' };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };

      case 'SHIPPING_REQUEST':
        return { ...state, loadingShipped: true };
      case 'SHIPPING_SUCCESS':
        return { ...state, loadingShipped: false, successShipped: true };
      case 'SHIPPING_FAIL':
        return { ...state, loadingShipped: false };
      case 'SHIPPING_RESET':
        return {
          ...state,
          loadingShipped: false,
          successShipped: false,
        };

      default:
        state;
    }
  }


const ShipmentDetails = ({ params }) => {
    const manufacturerShipmentId = params.id;

    const [
      { 
        loading, 
        error, 
        manufacturerShipment,
        loadingShipped,
        successShipped, 
      }, dispatch
    ] = useReducer(reducer, {
        loading: true,
        manufacturerShipment: [],
        error: '',
      });

      useEffect(() => {
        const fetchData = async () => {
          try {
            dispatch({ type: 'FETCH_REQUEST' });
            const { data } = await axios.get(`/api/manufacturer/shipments/${manufacturerShipmentId}`);
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
          } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
          }
        };

        if (
          !manufacturerShipment._id ||
          successShipped ||
          (manufacturerShipment._id && manufacturerShipment._id !== manufacturerShipmentId)
        ) {
          fetchData();
          if (successShipped) {
            dispatch({ type: 'SHIPPING_RESET' });
          }
        }

        }, [manufacturerShipment, manufacturerShipmentId, successShipped]);
    
        const {
            shipmentItems,
            totalShipmentWeight,
            isShipped,
            isRecieved,
            shippedAt,
            recievedAt,
          } = manufacturerShipment;

          async function shippedProductHandler() {
            try {
              dispatch({ type: 'SHIPPING_REQUEST' });
              const { data } = await axios.put(
                `/api/manufacturer/shipments/${manufacturerShipment._id}/shipped`,
                {}
              );
              dispatch({ type: 'SHIPPING_SUCCESS', payload: data });
              toast.success('Product is shipped', {
                theme: "colored"
              });
            } catch (err) {
              dispatch({ type: 'SHIPPING_FAIL', payload: getError(err) });
              toast.error(getError(err), {
                theme: "colored"
              });
            }
          }

  return (
    <Layout>
      <div className="vendor-container bg-black text-white">
        <div className="container-fluid ">
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
              <>
              <h1 className="card-title text-center text-primary">Manufacturer Shipping Details {manufacturerShipmentId}</h1>
              <div className="row my-4">
                <div className="col-6">
                  <div className="card vendor-card-container">
                    <h1 className="card-title text-center text-primary">Shipping</h1>
                    <div className="card-body">
                      {isShipped ? (
                        <span className="badge bg-success w-100 py-3 my-3">Shipped on {moment.tz(new Date(shippedAt), "Asia/Bangkok").format('lll')} from Thailand</span>
                      ) : (
                        <span className="badge bg-danger w-100 py-3 my-3">Not Shipped</span>
                      )}
                      {!manufacturerShipment.isShipped && (
                      <div>
                        <button 
                          className="w-100 btn btn-lg btn-primary" 
                          onClick={shippedProductHandler}
                        >
                          {loadingShipped ? (
                            <>
                              <span className="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
                              <span className="visually-hidden">Loading...</span>
                            </>
                          ) : (
                            "Shipped Product"
                          )}
                        </button>
                      </div>
                      )}

                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card vendor-card-container">
                    <h1 className="card-title text-center text-primary">Recieved</h1>
                    <div className="card-body">
                      {isRecieved ? (
                        <span className="badge bg-success w-100 py-3 my-3">Recieved at {moment.tz(new Date(recievedAt), "America/New_York").format('lll')} in Atlanta GA</span>
                      ) : (
                        <span className="badge bg-danger w-100 py-3 my-3">Not Recieved</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card vendor-card-container">
                <div className="card-body">
                  <div className="row gx-5">
                    <table className="table text-white">
                      <thead className="border-b">
                        <tr>
                          <th className="p-3 text-center text-primary">PRODUCT TYPE</th>
                          <th className="p-3 text-center text-primary">PRODUCT DESCRIPTION</th>
                          <th className="p-3 text-center text-primary">PRODUCT WEIGHT</th>
                          <th className="p-3 text-center text-primary">BOX SIZE</th>
                          <th className="p-3 text-center text-primary">PACKAGE PER BOX</th>
                          <th className="p-3 text-center text-primary">TOTAL # OF BOXES</th>
                          <th className="p-3 text-center text-primary">TOTAL BOX WEIGHT</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shipmentItems.map((item) => (
                        <tr key={item._id}>
                            <td className="p-2 text-center align-middle">{item.productType}</td>
                            <td className="p-2 text-center align-middle">{item.productDescription}</td>
                            <td className="p-2 text-center align-middle">{item.productWeight}</td>
                            <td className="p-2 text-center align-middle">{item.boxSize}</td>
                            <td className="p-2 text-center align-middle">{item.packagesPerBox}</td>
                            <td className="p-2 text-center align-middle">{item.numberOfProductBoxes}</td>
                            <td className="p-2 text-center align-middle">{item.totalBoxWeight}kgs</td>
                        </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              </>
              )}
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

ShipmentDetails.auth = { manufacturerOnly: true }
export default ShipmentDetails;