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

const CreateManufacturerShipment = () => {
  const [{ loadingUpdate }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const { register, control, handleSubmit, formState: { errors } } = useForm({});
    const { fields, append, remove } = useFieldArray({
      control,
      name: 'shipmentItems',
    });

    const submitHandler = async ({
      shipmentItems,
      numberOfBoxes,
      totalShipmentWeight,
      isShipped,
      isRecieved
    }) => {
      try {
        dispatch({ type: 'UPDATE_REQUEST' });
        await axios.post(`/api/manufacturer/shipments`, {
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
      <div className="vendor-container bg-black text-white">
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
                <div className="card vendor-card-container">
                  <div className="card-header">
                    <h1 className="card-title text-center">Manufacturer Shipments</h1>
                    <ul className="nav nav-tabs card-header-tabs" data-bs-tabs="tabs">
                      <li className="nav-item">
                        <a className="nav-link active" aria-current="true" data-bs-toggle="tab" href="#dhcp">Shipments</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#static">Instructions</a>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body tab-content">
                    <div className="tab-pane active" id="dhcp">
                      <h3 className="card-title text-center">Submit Shipments</h3>
                      <form onSubmit={handleSubmit(submitHandler)} className="col-lg-6 col-md-12 col-sm-12 form-shipment justify-content-center">
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
                                  <h4>Product for Shipment {index + 1}</h4>
                                  <div className="form-floating">
                                    <input
                                      type="text"
                                      name="productType"
                                      className={`form-control ${errors.productType ? 'is-invalid' : ''}`}
                                      id="productType"
                                      placeholder="Product Type" 
                                      autoFocus
                                      {...register(`shipmentItems.${index}.productType`, {
                                        required: 'Please enter product type',
                                      })}
                                    />
                                    {errors.productType && (
                                      <div className="invalid-feedback">
                                        {errors.productType.message}
                                      </div>
                                    )}
                                    <label htmlFor="productType">Product Type</label>
                                  </div>
                                  <div className="form-floating">
                                    <input
                                      type="text"
                                      className={`form-control ${errors.productDescription ? 'is-invalid' : ''}`}
                                      id="productDescription"
                                      placeholder="Product Description" 
                                      autoFocus
                                      {...register(`shipmentItems.${index}.productDescription`, {
                                        required: 'Please enter product description',
                                      })}
                                    />
                                    {errors.productDescription && (
                                      <div className="invalid-feedback">
                                        {errors.productDescription.message}
                                      </div>
                                    )}
                                    <label htmlFor="productDescription">Product Description</label>
                                  </div>
                                  <div className="form-floating">
                                    <input
                                      type="text"
                                      className={`form-control ${errors.productWeight ? 'is-invalid' : ''}`}
                                      id="productWeight"
                                      placeholder="Product Weight Per Package" 
                                      autoFocus
                                      {...register(`shipmentItems.${index}.productWeight`, {
                                        required: 'Please enter product weight',
                                      })}
                                    />
                                    {errors.productWeight && (
                                      <div className="invalid-feedback">
                                        {errors.productWeight.message}
                                      </div>
                                    )}
                                    <label htmlFor="productWeight">Product Weight Per Package</label>
                                  </div>
                                  <div className="form-floating">
                                    <Controller 
                                      name={`shipmentItems.${index}.boxSize`}
                                      control={control}
                                      rules={{
                                        required: true,
                                        pattern: /(\d+\.?\d*)(\s?x\s?)(\d+\.?\d*)(\s?x\s?)(\d+\.?\d*)/
                                      }}
                                      render={({ field: {onChange, boxSize, value} }) => (
                                        <NumberFormat
                                          format="##x##x##cm"
                                          name={boxSize}
                                          className={`form-control ${errors.boxSize ? 'is-invalid' : ''}`}
                                          value={value}
                                          id="boxSize" 
                                          placeholder="Box Size 45x40x25cm" 
                                          onChange={onChange}
                                        />
                                      )}
                                    />
                                    <div className="invalid-feedback">
                                      {errors.boxSize
                                        ? errors.boxSize.type === 'pattern'
                                        ? 'Box size is not completed'
                                            : 'Box size is required'
                                        : ''
                                      }
                                    </div>
                                    <label htmlFor="floatingInput">Box Size 45x40x25cm</label>
                                  </div>
                                  <div className="form-floating">
                                    <input
                                      type="text"
                                      className={`form-control ${errors.packagesPerBox ? 'is-invalid' : ''}`}
                                      id="packagesPerBox"
                                      placeholder="Number of Packages in Box" 
                                      autoFocus
                                      {...register(`shipmentItems.${index}.packagesPerBox`, {
                                        required: 'Please enter total shipment weight',
                                      })}
                                    />
                                    {errors.packagesPerBox && (
                                      <div className="invalid-feedback">
                                        {errors.packagesPerBox.message}
                                      </div>
                                    )}
                                    <label htmlFor="packagesPerBox">Number of Packages in Box</label>
                                  </div>

                                  <div className="form-floating">
                                    <input
                                      type="text"
                                      className={`form-control ${errors.totalBoxWeight ? 'is-invalid' : ''}`}
                                      id="totalBoxWeight"
                                      placeholder="Total Box Weight" 
                                      autoFocus
                                      {...register(`shipmentItems.${index}.totalBoxWeight`, {
                                        required: 'Please enter total box weight',
                                      })}
                                    />
                                    {errors.totalBoxWeight && (
                                      <div className="invalid-feedback">
                                        {errors.totalBoxWeight.message}
                                      </div>
                                    )}
                                    <label htmlFor="totalBoxWeight">Total Box Weight</label>
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
                        <button className="w-100 btn btn-lg btn-outline-primary light" type="submit">
                          {loadingUpdate ? (
                            <>
                              <span className="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
                              <span className="visually-hidden">Loading...</span>
                            </>
                          ) : (
                            "Submit Shipment"
                          )}
                        </button>
                      </form>
                    </div>
                    <div className="tab-pane" id="static">
                      <h3 className="card-title text-center">Shipment Instructions</h3>
                      <p className=" card-text">
                          Molestie a iaculis at erat pellentesque adipiscing commodo elit. Odio eu feugiat pretium nibh ipsum consequat nisl. Vitae tempus quam pellentesque 
                          nec nam aliquam sem. Faucibus a pellentesque sit amet porttitor eget. Posuere urna nec tincidunt praesent semper feugiat. Aliquam malesuada bibendum 
                          arcu vitae elementum. Metus vulputate eu scelerisque felis imperdiet proin fermentum. Ut diam quam nulla porttitor massa id neque. Malesuada bibendum 
                          arcu vitae elementum curabitur vitae nunc sed velit. Aliquam id diam maecenas ultricies mi eget mauris pharetra. Nunc non blandit massa enim nec dui 
                          nunc mattis. Non blandit massa enim nec dui nunc mattis. Est sit amet facilisis magna etiam tempor. Sed adipiscing diam donec adipiscing. Eget magna 
                          fermentum iaculis eu non diam phasellus vestibulum lorem. Sed nisi lacus sed viverra tellus in. Platea dictumst vestibulum rhoncus est pellentesque 
                          elit ullamcorper. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Nisl nisi scelerisque eu ultrices vitae auctor eu 
                          augue. Neque convallis a cras semper auctor neque vitae tempus.
                          <br /><br />
                          Lobortis elementum nibh tellus molestie nunc non blandit massa. Eu volutpat odio facilisis mauris sit amet massa vitae tortor. Ullamcorper morbi 
                          tincidunt ornare massa. Velit sed ullamcorper morbi tincidunt ornare massa. Risus quis varius quam quisque id diam. Neque convallis a cras semper 
                          auctor neque vitae tempus quam. Nulla at volutpat diam ut venenatis tellus in metus vulputate. Augue neque gravida in fermentum et sollicitudin ac 
                          orci phasellus. Nibh cras pulvinar mattis nunc sed blandit. Aenean euismod elementum nisi quis eleifend. Blandit volutpat maecenas volutpat blandit 
                          aliquam etiam erat velit scelerisque. Congue nisi vitae suscipit tellus mauris a. Sed vulputate odio ut enim. Mus mauris vitae ultricies leo 
                          integer. Elementum nibh tellus molestie nunc non. Sagittis vitae et leo duis. Placerat vestibulum lectus mauris ultrices eros in cursus turpis 
                          massa. Elementum nibh tellus molestie nunc non blandit massa.
                          <br /><br />
                          Non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Pellentesque eu tincidunt tortor aliquam nulla. Odio facilisis mauris sit amet massa vitae tortor. In hac habitasse platea dictumst vestibulum rhoncus est. Velit aliquet sagittis id consectetur purus. Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Volutpat maecenas volutpat blandit aliquam etiam. Lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis. Commodo odio aenean sed adipiscing diam. Feugiat nibh sed pulvinar proin gravida hendrerit lectus. Enim ut sem viverra aliquet eget sit amet tellus cras. Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi tristique. Rhoncus dolor purus non enim praesent. Malesuada nunc vel risus commodo viverra. Mi quis hendrerit dolor magna eget est lorem. Eget est lorem ipsum dolor. Risus in hendrerit gravida rutrum quisque. Justo laoreet sit amet cursus sit amet dictum sit. Elementum sagittis vitae et leo duis ut diam quam.
                      </p>
                    </div>
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

CreateManufacturerShipment.auth = { manufacturerOnly: true }
export default CreateManufacturerShipment;