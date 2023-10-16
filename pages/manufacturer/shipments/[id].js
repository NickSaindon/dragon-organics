import axios from 'axios';
import Layout from '../../../components/Layout';
import SideNav from '../../../components/SideNav';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { ToastContainer, toast, Slide } from "react-toastify";
import { getError } from '../../../utils/error';

function reducer(state, action) {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true, error: '' };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, manufacturerShipment: action.payload, error: '' };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        state;
    }
  }


const ShipmentDetails = ({ params }) => {
    const manufacturerShipmentId = params.id;

    const [{ loading, error, manufacturerShipment }, dispatch] = useReducer(reducer, {
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
            console.log(data)
            } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        fetchData();
        }, [manufacturerShipmentId]);
    
        const {
            shipmentItems,
            totalShipmentWeight,
            isShipped,
            isRecieved,
          } = manufacturerShipment;

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
              <div className="card vendor-card-container">
                <div className="card-body">
                  <h1 className="card-title text-center text-primary">Manufacturer Shipping Details {manufacturerShipmentId}</h1>
                  <div className="row gx-5">
                    <table className="table text-white">
                      <thead className="border-b">
                        <tr>
                          <th className="p-3 text-center text-primary">PRODUCT TYPE</th>
                          <th className="p-3 text-center text-primary">PRODUCT DESCRIPTION</th>
                          <th className="p-3 text-center text-primary">PRODUCT WEIGHT</th>
                          <th className="p-3 text-center text-primary">BOX SIZE</th>
                          <th className="p-3 text-center text-primary">PACKAGE PER BOX</th>
                          <th className="p-3 text-center text-primary">TOTAL BOX WEIGHT</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shipmentItems.map((item) => (
                        <tr>
                            <td className="p-2 text-center align-middle">{item.productType}</td>
                            <td className="p-2 text-center align-middle">{item.productDescription}</td>
                            <td className="p-2 text-center align-middle">{item.productWeight}</td>
                            <td className="p-2 text-center align-middle">{item.boxSize}</td>
                            <td className="p-2 text-center align-middle">{item.packagesPerBox}</td>
                            <td className="p-2 text-center align-middle">{item.totalBoxWeight}</td>
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

export async function getServerSideProps({ params }) {
    return {
      props: { params },
    };
  }

ShipmentDetails.auth = { manufacturerOnly: true }
export default ShipmentDetails;