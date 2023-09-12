import React from "react";
import "./register.css";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { Formik, Form, ErrorMessage } from "formik";
import TextField from "../../components/textField/TextField";
import * as Yup from "yup";

const Register = () => {
  const validate = Yup.object({
    name: Yup.string()
      .max(25, "Must be less than 15 Characters")
      .min(3, "Must be at least 6 Characters")
      .required("Required"),
    lName: Yup.string()
      .max(25, "Must be less than 15 Characters")
      .min(3, "Must be at least 6 Characters")
      .required("Required"),
    contactNo: Yup.number()
      .max(9999999999, "please add valid contact no.")
      .min(6000000000, "please add valid contact no.")
      .required("Required"),
    email: Yup.string().email("Email is Invalid").required("Required"),
    password: Yup.string()
      .max(15, "Must be less than 15 Characters")
      .min(6, "Must be at least 6 Characters")
      .required("Required"),
    cPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password Must Match")
      .required("Required"),
    file: Yup.mixed().nullable().required(),
  });

  const saveProduct = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("lName", values.lName);
    formData.append("contactNo", values.contactNo);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("image", values.file);
    console.log(...formData);
  };

  return (
    <section>
      <div className=' register p-5'>
        <div className='container d-flex justify-content-center'>
          <div className='register__form'>
            <Formik
              initialValues={{
                name: "",
                lName: "",
                phone: "",
                email: "",
                password: "",
                cPassword: "",
                file: null,
              }}
              validationSchema={validate}
              onSubmit={(values, { resetForm }) => {
                saveProduct(values);
                // resetForm({ values: "" });
              }}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <div className='detailCards'>
                    <h1
                      style={{ color: "var(--theme" }}
                      className='text-center'
                    >
                      Register
                    </h1>
                    <TextField
                      label='First Name'
                      name='name'
                      id='name'
                      type='text'
                      placeholder='Enter First Name'
                    />
                    <TextField
                      label='Last Name'
                      name='lName'
                      id='lName'
                      type='text'
                      placeholder='Enter Last Name'
                    />
                    <div className='form-group mb-3 '>
                      <label
                        htmlFor='file'
                        className='label__style mb-0'
                      >
                        Profile Picture
                      </label>
                      <div>
                        <input
                          className='form-control shadow-none'
                          type='file'
                          name='file'
                          accept='image/png, image/gif, image/jpeg'
                          onChange={(e) => {
                            setFieldValue("file", e.target.files[0]);
                          }}
                          required
                        />
                        <ErrorMessage
                          name='file'
                          component='p'
                          className='errorMessage'
                        />
                      </div>
                    </div>
                    {values.file != null && (
                      <div className='image__preview rounded d-flex justify-content-center'>
                        <img
                          src={URL.createObjectURL(values.file)}
                          alt='product'
                          className='rounded'
                          width={300}
                          height={300}
                        />
                      </div>
                    )}
                    <TextField
                      label='Email'
                      name='email'
                      id='email'
                      type='email'
                      placeholder='Enter Your Email'
                    />
                    <TextField
                      label='Contact No'
                      name='phone'
                      id='phone'
                      type='number'
                      placeholder='Enter Contact No'
                    />
                    <TextField
                      label='Password'
                      name='password'
                      id='password'
                      type='password'
                      placeholder='Enter Password'
                    />
                    <TextField
                      label='Confirm Password'
                      name='cPassword'
                      id='cPassword'
                      type='password'
                      placeholder='Confirm Password'
                    />
                    <div className='text-center mt-3'>
                      <button
                        className='text-white button rounded'
                        type='submit'
                      >
                        {/* {isLoading ? (
                      <span className='spinner-border spinner-border-sm text-warning'></span>
                    ) : ( */}
                        Register
                        {/* )} */}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
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

export default Register;
