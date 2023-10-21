import axios from 'axios';
import Layout from '../../components/Layout';
import SideNav from '../../components/SideNav';
import { useRouter } from 'next/router';
import { useReducer } from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { ToastContainer, toast, Slide } from "react-toastify";
import { getError } from '../../utils/error';
import NumberFormat from "react-number-format";

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

const CreateWholesaleOrder = () => {
  const [{ loadingUpdate }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });
    const router = useRouter();

  const { register, control, handleSubmit, formState: { errors }, reset } = useForm({});
    const { fields, append, remove } = useFieldArray({
      control,
      name: 'wholesaleProducts',
    });

    const submitHandler = async ({
      wholesaleProducts,
      numberOfBoxes,
      totalShipmentWeight,
      isShipped,
      isRecieved
    }) => {
      try {
        dispatch({ type: 'UPDATE_REQUEST' });
        await axios.post(`/api/manufacturer/shipments`, {
          wholesaleProducts,
          numberOfBoxes,
          totalShipmentWeight,
          isShipped,
          isRecieved
        });
        dispatch({ type: 'UPDATE_SUCCESS' });
        reset();
        toast.success("Shipment created successfully", {
          theme: "colored"
        });
        router.push('/manufacturer/manufacturer-shipments');
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
      <ToastContainer 
          position="top-center" 
          draggable={false} 
          transition={Slide} 
          autoClose={3000}
          hideProgressBar={true}
          className="toast-alert"
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2">
              <SideNav />
            </div>
            <div className="col-lg-10">
              <div className="container-fluid">
                <div className="card admin-card-container">
                  <h1 className="card-title text-center text-primary pt-5">Create Wholesale Orders</h1>
                  <div className="card-body">
                      <form onSubmit={handleSubmit(submitHandler)} className="col-lg-6 col-md-12 col-sm-12 form-edit justify-content-center">
                        <button 
                          type="button" 
                          className="btn btn-primary" 
                          onClick={() => append({ 
                            productType: '', 
                            productDescription: '', 
                            productWeight: '', 
                            boxSize: '', 
                            packagesPerBox: '', 
                            totalBoxWeight: '' 
                          })}
                        >
                          Add Product
                        </button>
                            {fields.map((field, index) => {
                              return (
                              <div key={field.id} className="card add-product-card">
                                <div className="card-body">
                                  <h4>Wholesale Product {index + 1}</h4>
                                  <div className="form-floating">
                                    <input
                                      type="text"
                                      name="productName"
                                      className={`form-control ${errors.productType ? 'is-invalid' : ''}`}
                                      id="productName"
                                      placeholder="Product Name" 
                                      autoFocus
                                      {...register(`wholesaleProducts.${index}.productName`, {
                                        required: 'Please enter product type',
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
                                      className={`form-control ${errors.size ? 'is-invalid' : ''}`}
                                      id="size"
                                      placeholder="Product Size" 
                                      autoFocus
                                      {...register(`wholesaleProducts.${index}.size`, {
                                        required: 'Please enter size description',
                                      })}
                                    />
                                    {errors.size && (
                                      <div className="invalid-feedback">
                                        {errors.size.message}
                                      </div>
                                    )}
                                    <label htmlFor="size">Product Size</label>
                                  </div>
                                  <div className="form-floating">
                                    <input
                                      type="text"
                                      className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                                      id="quantity"
                                      placeholder="Quantity" 
                                      autoFocus
                                      {...register(`wholesaleProducts.${index}.quantity`, {
                                        required: 'Please enter quantity',
                                      })}
                                    />
                                    {errors.quantity && (
                                      <div className="invalid-feedback">
                                        {errors.quantity.message}
                                      </div>
                                    )}
                                    <label htmlFor="quantity">Qantity</label>
                                  </div>
                                  <div className="form-floating">
                                    <input
                                      type="text"
                                      className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                      id="price"
                                      placeholder="Total Price" 
                                      autoFocus
                                      {...register(`price.${index}.price`, {
                                        required: 'Please enter total price',
                                      })}
                                    />
                                    {errors.price && (
                                      <div className="invalid-feedback">
                                        {errors.price.message}
                                      </div>
                                    )}
                                    <label htmlFor="price">Total Price</label>
                                  </div>

                                  <div className="form-floating">
                                    <input
                                      type="text"
                                      className={`form-control ${errors.productTotalQuantity ? 'is-invalid' : ''}`}
                                      id="productTotalQuantity"
                                      placeholder="Total Quantity of Product" 
                                      autoFocus
                                      {...register(`wholesaleProducts.${index}.productTotalQuantity`, {
                                        required: 'Please enter total quantity of product',
                                      })}
                                    />
                                    {errors.productTotalQuantity && (
                                      <div className="invalid-feedback">
                                        {errors.productTotalQuantity.message}
                                      </div>
                                    )}
                                    <label htmlFor="productTotalQuantity">Total Quantity of Product</label>
                                  </div>
                                  <button 
                                    type="button" 
                                    className="btn btn-danger"
                                    onClick={() => remove(index)}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                              )
                            })}

                        <div className="form-floating">
                          <input
                            type="text"
                            className={`form-control ${errors.numberOfBoxes ? 'is-invalid' : ''}`}
                            id="numberOfBoxes"
                            placeholder="Total Number of Boxes" 
                            autoFocus
                            {...register('numberOfBoxes', {
                              required: 'Please enter total number of Boxes',
                            })}
                          />
                          {errors.numberOfBoxes && (
                            <div className="invalid-feedback">
                              {errors.numberOfBoxes.message}
                            </div>
                          )}
                          <label htmlFor="numberOfBoxes">Total Number of Boxes</label>
                        </div>
                        <div className="form-floating">
                          <input
                            type="text"
                            className={`form-control ${errors.totalShipmentWeight ? 'is-invalid' : ''}`}
                            id="totalShipmentWeight"
                            placeholder="Total Shipment Weight" 
                            autoFocus
                            {...register('totalShipmentWeight', {
                              required: 'Please enter total shipment weight',
                            })}
                          />
                          {errors.totalShipmentWeight && (
                            <div className="invalid-feedback">
                                {errors.totalShipmentWeight.message}
                            </div>
                          )}
                          <label htmlFor="totalShipmentWeight">Total Shipment Weight</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-outline-primary my-5 light" type="submit">
                          {loadingUpdate ? (
                            <>
                              <span className="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
                              <span className="visually-hidden">Loading...</span>
                            </>
                          ) : (
                            "Submit Wholesale Order"
                          )}
                        </button>
                      </form>
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

CreateWholesaleOrder.auth = { adminOnly: true }
export default CreateWholesaleOrder;