import React, { useContext, useState } from "react";
import DataContext from "../../context/DataContext";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { Formik, Form } from "formik";
import TextField from "../../components/textField/TextField";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import "./supportdev.css";
import { FaRocketchat } from "react-icons/fa";
import useRazorpay from "react-razorpay";

const SupportDev = () => {
  const { loggedUser, isLoading } = useContext(DataContext);

  const [Razorpay] = useRazorpay();

  const validate = Yup.object({
    amount: Yup.number()
      .positive("Amount can't start with a minus")
      .integer("Amount number can't include a decimal point")
      .min(1)
      .required("Amount value is required"),
  });

  const handlesubmit = async (values) => {
    const options = {
      key: import.meta.env.VITE_RAZAR_KEY,
      key_secret: import.meta.env.VITE_RAZAR_SECRET,
      amount: values.amount * 100,
      currency: "INR",
      name: "Suriya Corp",
      description: "Test Transaction",
      image:
        "https://clipart-library.com/image_gallery2/Superman-Logo-Free-Download-PNG.png",
      handler: (res) => {
        console.log(res);
        toast.success(`Payment Success, Payment ID:${res.razorpay_payment_id}`);
      },
      prefill: {
        name: loggedUser.username,
        email: loggedUser.email,
        contact: loggedUser.phone,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzpay = new Razorpay(options);

    rzpay.open();
  };

  return (
    <section className='profile support'>
      <div className='app__logo p-3 display-5'>
        <Link
          to={"/chat"}
          className=' text-white text-decoration-none'
        >
          <FaRocketchat /> ChatBuddy
        </Link>
      </div>
      <div className='container mt-2 update__profile w-75'>
        <div className='detailCards text-center h5'>
          Hi Welcome to Chat App. <br />
          To Support Developer please donate on below.
        </div>
      </div>
      <div className='container mt-5 update__profile'>
        <Formik
          initialValues={{
            amount: "",
          }}
          validationSchema={validate}
          onSubmit={(values, { resetForm }) => {
            handlesubmit(values);
            resetForm({ values: "" });
          }}
        >
          {(formik) => (
            <Form>
              <div className='detailCards mx-auto my-0 w-75'>
                <h3 style={{ color: "var(--theme" }}>To Support Developer :</h3>
                <TextField
                  label='Amount'
                  name='amount'
                  id='amount'
                  type='number'
                  placeholder='Enter Amount to Support'
                />
                <div className='text-center mt-3'>
                  <button
                    className='text-white button rounded'
                    type='submit'
                  >
                    {isLoading ? (
                      <span className='spinner-border spinner-border-sm text-warning'></span>
                    ) : (
                      "Donate"
                    )}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <div className='text-center p-3 '>
          <Link to={"/chat"}>
            <button className='button rounded text-white'>
              Go Back To Chat
            </button>
          </Link>
        </div>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={1000}
        transition={Zoom}
        draggable={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme='dark'
      />
    </section>
  );
};

export default SupportDev;
