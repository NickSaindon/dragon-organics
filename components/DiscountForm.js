// import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import moment from "moment";
import { toast } from "react-toastify";
import { set } from "mongoose";

const DiscountForm = ({ onDiscountApplied }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitHandler = async (data, setDiscountCode) => {
    try {
      const { data: discounts } = await axios.get("api/discounts");

      const discountObj = discounts.find(
        (o) => o.discountCode === data.discountCode
      );

      if (!discountObj) {
        toast.error("Invalid discount code", { theme: "colored" });
        return;
      }

      const expiredDate = moment(new Date(discountObj.expires)).format(
        "MM/DD/YYYY"
      );
      const todaysDate = moment(new Date()).format("MM/DD/YYYY");

      if (
        discountObj.isValid &&
        discountObj.numOfDiscounts > 0 &&
        expiredDate > todaysDate
      ) {
        await axios.put(`/api/discounts/${discountObj._id}`, {
          ...discountObj,
          numOfDiscounts: discountObj.numOfDiscounts - 1,
        });
        Cookies.set("discount", JSON.stringify(discountObj));
        reset();
        toast.success(
          "Discount code has been applied. Please place your order now.",
          {
            theme: "colored",
          }
        );
        onDiscountApplied(discountObj);
      } else {
        toast.error("Invalid discount code or campign is over", {
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("Error applying discount code", { theme: "colored" });
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
      <button
        className="w-100 btn btn-lg btn-primary"
        type="submit"
        disabled={!!discount}
      >
        Submit Discount
      </button>
    </form>
  );
};

export default DiscountForm;
