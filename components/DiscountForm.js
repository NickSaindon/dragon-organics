import { useContext, useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { getError } from "../utils/error";
import Cookies from "js-cookie";
import { ToastContainer, toast, Slide } from "react-toastify";

const DiscountForm = () => {
  const [discounts, setDiscounts] = useState(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    fetch("/api/discounts")
      .then((res) => res.json())
      .then((discounts) => {
        setDiscounts(discounts);
        setLoading(false);
      });
  }, []);

  const submitHandler = async (data) => {
    let discountObj = discounts.find(
      (o) => o.discountCode === data.discountCode
    );
    let expiredDate = moment(new Date(discountObj.expires)).format(
      "MM/DD/YYYY"
    );
    let todaysDate = moment(new Date()).format("MM/DD/YYYY");
    if (
      discountObj.isValid === true &&
      discountObj.numOfDiscounts > 0 &&
      expiredDate > todaysDate
    ) {
      const { data } = await axios.put(`/api/discounts/${discountObj._id}`, {
        campaignName: discountObj.campaignName,
        discountReason: discountObj.discountReason,
        discountCode: discountObj.discountCode,
        discountAmount: discountObj.discountAmount,
        numOfDiscounts: discountObj.numOfDiscounts - 1,
        expires: discountObj.expires,
        isValid: discountObj.isValid,
      });
      Cookies.set("discount", JSON.stringify(discountObj));
      reset();
      toast.success(
        "Discount code has been applied. Please place your order now.",
        {
          theme: "colored",
        }
      );
    } else {
      toast.error("Invalid discount code or campign is over", {
        theme: "colored",
      });
    }
  };

  const discount = Cookies.get("discount")
    ? JSON.parse(Cookies.get("discount"))
    : false;

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="col-lg-6 col-md-12 col-sm-12 discount-form w-100 justify-content-center"
      noValidate
    >
      <div className="form-floating">
        <input
          type="text"
          className="form-control my-3"
          id="discountCode"
          placeholder="Discount Code"
          autoFocus
          {...register("discountCode", {
            required: "Please enter discount code",
          })}
        />
        {errors.discountCode && (
          <div className="invalid-feedback">{errors.discountCode.message}</div>
        )}
        <label htmlFor="discountCode">Discount Code</label>
      </div>
      <button className="w-100 btn btn-lg btn-primary" type="submit">
        Submit Discount
      </button>
    </form>
  );
};

export default DiscountForm;
