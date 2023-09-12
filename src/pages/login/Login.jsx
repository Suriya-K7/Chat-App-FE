import React, { useContext } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import { Formik, Form } from "formik";
import TextField from "../../components/textField/TextField";
import * as Yup from "yup";
import DataContext from "../../context/DataContext";
import "./login.css";
import { Link } from "react-router-dom";
import { FaRocketchat } from "react-icons/fa";

const Login = () => {
  const { handleSignIn, isLoading } = useContext(DataContext);

  const validate = Yup.object({
    email: Yup.string().email("Email is Invalid").required("Required"),
    password: Yup.string()
      .max(15, "Must be less than 15 Characters")
      .min(6, "Must be at least 6 Characters")
      .required("Required"),
  });
  return (
    <section className='login'>
      <div className=''>
        <div className='container d-flex justify-content-center'>
          <div className='register__form'>
            <h1
              style={{ color: "var(--theme)" }}
              className='text-center'
            >
              <FaRocketchat /> Chat Buddy
            </h1>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validate}
              onSubmit={(values, { resetForm }) => {
                handleSignIn(values);
                resetForm({ values: "" });
              }}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <div className='detailCards'>
                    <h1
                      style={{ color: "var(--theme" }}
                      className='text-center'
                    >
                      Login
                    </h1>
                    <TextField
                      label='Email'
                      name='email'
                      id='email'
                      type='email'
                      placeholder='Enter Your Email'
                    />
                    <TextField
                      label='Password'
                      name='password'
                      id='password'
                      type='password'
                      placeholder='Enter Password'
                    />
                    <div className='text-center mt-3'>
                      <button
                        className='text-white button rounded'
                        type='submit'
                      >
                        {isLoading ? (
                          <span className='spinner-border spinner-border-sm text-warning'></span>
                        ) : (
                          <span>Login</span>
                        )}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            <div className='d-flex login__btn justify-content-between'>
              <Link
                to={"/register"}
                className='text-white btn btn-success button rounded mt-3'
              >
                Not Registerd?
              </Link>
              <Link
                to={"/forgot"}
                className='text-white btn btn-success button rounded mt-3'
              >
                Forgot Password?
              </Link>
            </div>
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
      </div>
    </section>
  );
};

export default Login;
