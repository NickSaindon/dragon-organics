import axios from 'axios';
import Layout from '../../components/Layout';
import SideNav from '../../components/SideNav';
import { useRouter } from 'next/router';
import { useReducer } from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { ToastContainer, toast, Slide } from "react-toastify";
import { getError } from '../../utils/error';
import Image from "next/image";
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
    const router = useRouter();

  const { register, control, handleSubmit, formState: { errors }, reset } = useForm({});
    const { fields, append, remove } = useFieldArray({
      control,
      name: 'shipmentItems',
    });

    const submitHandler = async ({
      shipmentItems,
      totalNumberOfBoxes,
      totalShipmentWeight,
      isShipped,
      isRecieved
    }) => {
      try {
        dispatch({ type: 'UPDATE_REQUEST' });
        await axios.post(`/api/manufacturer/shipments`, {
          shipmentItems,
          totalNumberOfBoxes,
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
                        <a className="nav-link active" aria-current="true" data-bs-toggle="tab" href="#create-shipment">Shipments</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#thai-instructions">คำแนะนำ</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="tab" href="#english-instructions">Instructions</a>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body tab-content">
                    <div className="tab-pane active" id="create-shipment">
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
                                      type="number"
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
                                      className={`form-control ${errors.numberOfProductBoxes ? 'is-invalid' : ''}`}
                                      id="numberOfProductBoxes"
                                      placeholder="Total Number of Product Boxes" 
                                      autoFocus
                                      {...register(`shipmentItems.${index}.numberOfProductBoxes`, {
                                        required: 'Please enter total box weight',
                                      })}
                                    />
                                    {errors.numberOfProductBoxes && (
                                      <div className="invalid-feedback">
                                        {errors.numberOfProductBoxes.message}
                                      </div>
                                    )}
                                    <label htmlFor="numberOfProductBoxes">Total Number of Product Boxes</label>
                                  </div>

                                  <div className="form-floating">
                                    <input
                                      type="text"
                                      className={`form-control ${errors.totalBoxWeight ? 'is-invalid' : ''}`}
                                      id="totalBoxWeight"
                                      placeholder="Total Box Weight in Kilograms" 
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
                                    <label htmlFor="totalBoxWeight">Total Box Weight in Kilograms</label>
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
                            type="number"
                            className={`form-control ${errors.totalNumberOfBoxes ? 'is-invalid' : ''}`}
                            id="totalNumberOfBoxes"
                            placeholder="Total Number of Boxes to Ship" 
                            autoFocus
                            {...register('totalNumberOfBoxes', {
                              required: 'Please enter total number of Boxes',
                            })}
                          />
                          {errors.totalNumberOfBoxes && (
                            <div className="invalid-feedback">
                              {errors.totalNumberOfBoxes.message}
                            </div>
                          )}
                          <label htmlFor="totalNumberOfBoxes">Total Number of Boxes to Ship</label>
                        </div>
                        <div className="form-floating">
                          <input
                            type="text"
                            className={`form-control ${errors.totalShipmentWeight ? 'is-invalid' : ''}`}
                            id="totalShipmentWeight"
                            placeholder="Total Shipment Weight in Kilograms" 
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
                          <label htmlFor="totalShipmentWeight">Total Shipment Weight in Kilograms</label>
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
                    <div className="tab-pane" id="thai-instructions">
                    <h3 className="card-title text-center">คำแนะนำในการจัดส่ง</h3>
                      <p className=" card-text">
                        นี่คือคำแนะนำเกี่ยวกับวิธีการกรอกอินพุตแต่ละรายการเพื่อสร้างใบแจ้งหนี้เชิงพาณิชย์และรายการบรรจุภัณฑ์สำหรับการจัดส่งทุกครั้ง สิ่งสำคัญคือต้องระบุผลิตภัณฑ์แต่ละรายการที่จะจัดส่งและข้อมูลให้ถูกต้อง 
                        เมื่อเรามีข้อมูลที่จำเป็นทั้งหมดแล้ว เราจะจัดเตรียมเอกสารที่จำเป็นเหล่านี้ให้กับคุณในการจัดส่งสินค้าทั้งหมด
                      </p>
                      <h4 className=" card-text">ขั้นแรกคลิกที่ปุ่มเพิ่มผลิตภัณฑ์</h4>
                      <p>
                        คุณสามารถคลิกที่ปุ่มเพิ่มผลิตภัณฑ์ได้บ่อยเท่าที่จำเป็นเพื่อเพิ่มผลิตภัณฑ์สำหรับการจัดส่ง
                      </p>
                      <div className="mx-auto text-center">
                        <Image src="/images/shipping-product-card.jpg" className="" width={600} height={450} alt="Computer and mobile devices"/>
                      </div>
                      <div className="my-3">
                        <div className="row">
                          <div className="col-6">
                          <h4>ตัวอย่างของผลิตภัณฑ์สำหรับการจัดส่ง 1 อินพุต:</h4>
                          <ul>
                            <li><strong>ประเภทสินค้า:</strong> Raw Powder - Red</li>
                            <li><strong>รายละเอียดสินค้า:</strong>  Red raw powder in 100g bags</li>
                            <li><strong>น้ำหนักสินค้าต่อแพ็คเกจ:</strong> Ten 100g bags in 1kg bag</li>
                            <li><strong>ขนาดกล่อง:</strong> 45x55x40cm</li>
                            <li><strong>จำนวนบรรจุภัณฑ์ในกล่อง:</strong> 10</li>
                            <li><strong>จำนวนกล่องสินค้าทั้งหมด:</strong> 5</li>
                            <li><strong>น้ำหนักกล่องรวมเป็นกิโลกรัม:</strong>  10</li>
                          </ul>
                          <div className="mx-auto text-center">
                            <Image src="/images/shipping-card-filled-out.jpg" className="" width={600} height={450} alt="Computer and mobile devices"/>
                          </div>
                          </div>
                          <div className="col-6">
                          <h4>ตัวอย่างผลิตภัณฑ์สำหรับการจัดส่ง 2 อินพุต:</h4>
                          <ul>
                            <li><strong>ประเภทสินค้า:</strong> Extract Gel Caps</li>
                            <li><strong>รายละเอียดสินค้า:</strong>  Blister packs of 10 gel caps</li>
                            <li><strong>น้ำหนักสินค้าต่อแพ็คเกจ:</strong> 100 blister packs per package</li>
                            <li><strong>ขนาดกล่อง:</strong> 40x40x40cm</li>
                            <li><strong>จำนวนบรรจุภัณฑ์ในกล่อง:</strong> 200</li>
                            <li><strong>จำนวนกล่องสินค้าทั้งหมด:</strong> 1</li>
                            <li><strong>น้ำหนักกล่องรวมเป็นกิโลกรัม:</strong>  0.6</li>
                          </ul>
                          <div className="mx-auto text-center">
                            <Image src="/images/shipping-card-filled-out2.jpg" className="" width={600} height={450} alt="Computer and mobile devices"/>
                          </div>                          
                          </div>
                        </div>
                      </div>
                      <p>อินพุตสองรายการสุดท้ายใช้สำหรับบวกจำนวนกล่องทั้งหมดและน้ำหนักรวมสำหรับผลิตภัณฑ์ทั้งหมดที่จะจัดส่ง</p>
                      <h4>ตัวอย่างอินพุตสองตัวสุดท้าย:</h4>
                      <ul>
                        <li><strong>จำนวนกล่องทั้งหมดที่จะจัดส่ง:</strong> 6</li>
                        <li><strong>น้ำหนักขนส่งรวมเป็นกิโลกรัม:</strong>  50.6 <strong>(เฉพาะตัวเลขเป็นกิโลกรัมเท่านั้น)</strong></li>
                      </ul>
                      <div className="mx-auto text-center">
                        <Image src="/images/shipping-card-last-inputs.jpg" className="" width={600} height={150} alt="Computer and mobile devices"/>
                      </div>
                      <div className="my-3">
                        <h4>เมื่อสร้างการจัดส่งแล้ว</h4>
                        <p>
                          หลังจากคลิกปุ่มส่งการจัดส่ง คุณจะถูกนำไปยังหน้าการจัดส่งของผู้ผลิตเพื่อดูการจัดส่งที่สร้างขึ้น
                        </p>
                        <div className="mx-auto text-center">
                          <Image src="/images/manufacturer-shipping.jpg" className="" width={600} height={200} alt="Computer and mobile devices"/>
                        </div>
                        <p>
                          เมื่อจัดส่งแล้ว ในวันเดียวกับที่จัดส่งให้คลิกที่ปุ่มรายละเอียดและคลิกที่ปุ่มจัดส่งแล้วเพื่อระบุว่าสินค้าได้รับการจัดส่งแล้วและบันทึกวันที่จัดส่ง
                        </p>
                        <div className="mx-auto text-center">
                          <Image src="/images/shipped-product-button.jpg" className="" width={600} height={200} alt="Computer and mobile devices"/>
                        </div>
                        <p>
                          เมื่อส่งการจัดส่งแล้วเมื่อคุณไปที่หน้ารายละเอียด คุณจะเห็นว่าดำเนินการสำเร็จ                        
                        </p>
                        <div className="mx-auto text-center">
                          <Image src="/images/shipping-success.jpg" className="" width={600} height={150} alt="Computer and mobile devices"/>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="english-instructions">
                      <h3 className="card-title text-center">Shipping Instructions</h3>
                      <p className=" card-text">
                          These are instructions on how each input needs to be filled out to create commercial invoices and packing list for every 
                          shipment.  It is very important that each product to be shipped is inputed and that the information is correct.  Once 
                          we have all the neccessary information we will provide you with these neccessary documents to ship all of the products.
                      </p>
                      <h4 className=" card-text">First Click on the Add Product Button</h4>
                      <p>
                          You can click on the Add Product button as many times as needed to add products for shipments.
                      </p>
                      <div className="mx-auto text-center">
                        <Image src="/images/shipping-product-card.jpg" className="" width={600} height={450} alt="Computer and mobile devices"/>
                      </div>
                      <div className="my-3">
                        <div className="row">
                          <div className="col-6">
                          <h4>Example of product for shipment 1 inputs:</h4>
                          <ul>
                            <li><strong>Product Type:</strong> Raw Powder - Red</li>
                            <li><strong>Product Description:</strong>  Red raw powder in 100g bags</li>
                            <li><strong>Product Weight Per Package:</strong> Ten 100g bags in 1kg bag</li>
                            <li><strong>Box Size:</strong> 45x55x40cm</li>
                            <li><strong>Number of Packages in Box:</strong> 10</li>
                            <li><strong>Total Number of Product Boxes:</strong> 5</li>
                            <li><strong>Total Box Weight in Kilograms:</strong>  10kgs</li>
                          </ul>
                          <div className="mx-auto text-center">
                            <Image src="/images/shipping-card-filled-out.jpg" className="" width={600} height={450} alt="Computer and mobile devices"/>
                          </div>
                          </div>
                          <div className="col-6">
                          <h4>Example of product for shipment 2 inputs:</h4>
                          <ul>
                            <li><strong>Product Type:</strong> Extract Gel Caps</li>
                            <li><strong>Product Description:</strong>  Blister packs of 10 gel caps</li>
                            <li><strong>Product Weight Per Package:</strong> 100 blister packs per package</li>
                            <li><strong>Box Size:</strong> 40x40x40cm</li>
                            <li><strong>Number of Packages in Box:</strong> 200</li>
                            <li><strong>Total Number of Product Boxes:</strong> 1</li>
                            <li><strong>Total Box Weight in Kilograms:</strong>  0.6kgs</li>
                          </ul>
                          <div className="mx-auto text-center">
                            <Image src="/images/shipping-card-filled-out2.jpg" className="" width={600} height={450} alt="Computer and mobile devices"/>
                          </div>                          
                          </div>
                        </div>
                      </div>
                      <p>The last two inputs are for adding up the total number of boxes and total weight for all products to be shipped.</p>
                      <h4>Example of last two inputs:</h4>
                      <ul>
                        <li><strong>Total Number of Boxes to Ship:</strong> 6</li>
                        <li><strong>Total Shipment Weight in Kilograms:</strong>  50.6 <strong>(only numbers in kilograms)</strong></li>
                      </ul>
                      <div className="mx-auto text-center">
                        <Image src="/images/shipping-card-last-inputs.jpg" className="" width={600} height={150} alt="Computer and mobile devices"/>
                      </div>
                      <div className="my-3">
                        <h4>Once Product Shipment Has Been Created</h4>
                        <p>
                          After the Submit Shipment button has been clicked you will be routed to the Manufacturer Shipments page to view 
                          the shipment that was created.
                        </p>
                        <div className="mx-auto text-center">
                          <Image src="/images/manufacturer-shipping.jpg" className="" width={600} height={200} alt="Computer and mobile devices"/>
                        </div>
                        <p>
                          When the shipment has been sent, on the same day it was sent you will click on the details button
                          and click on the Shipped Product button to indicate that the products have been shipped and to record the date they were shipped.
                        </p>
                        <div className="mx-auto text-center">
                          <Image src="/images/shipped-product-button.jpg" className="" width={600} height={200} alt="Computer and mobile devices"/>
                        </div>
                        <p>
                          Once the shippment has been submitted when you go to the details page you should see that it was successful.
                        </p>
                        <div className="mx-auto text-center">
                          <Image src="/images/shipping-success.jpg" className="" width={600} height={150} alt="Computer and mobile devices"/>
                        </div>
                      </div>
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