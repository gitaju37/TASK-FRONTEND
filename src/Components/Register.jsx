import "./Register.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as yup from 'yup';
import { useState } from "react";

const Register = () => {
    const [ loading, setLoading ] = useState( false );

    const formik = useFormik( {
        initialValues: {
            firstName: "",
            lastName: "",
            password: "",
            email: ""
        },
        validationSchema: yup.object( {
            firstName: yup.string().required( "Please enter your first name" ),
            lastName: yup.string().required( "Please enter your last name" ),
            password: yup.string().required( "Please enter your password" ).min( 6, "Password should be at least 6 characters" ),
            email: yup.string().email( "Please enter a valid email" ).required( "Please enter your email" )
        } ),
        onSubmit: async ( values ) => {
            setLoading( true );
            try {
                const response = await axios.post( "http://localhost:4000/user/register", values );
                if ( response.status === 201 ) {
                    toast.success( response.data.message );
                    formik.resetForm();
                }
            } catch ( error ) {
                if ( error.response ) {
                    toast.error( error.response.data.message );
                } else {
                    toast.error( "Internal Server Error" );
                }
                console.error( error );
            } finally {
                setLoading( false );
            }
        }
    } );

    return (
        <div className="register-container">
            <form className="register" onSubmit={formik.handleSubmit}>
                <h1>Create an Account</h1>
                <div className="input-form d-flex flex-column">
                
                    <input
                        id="firstName"
                        type="text"
                        placeholder="First Name"
                        {...formik.getFieldProps( "firstName" )}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                        <div className="text-danger">{formik.errors.firstName}</div>
                    )}

                   
                    <input
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        {...formik.getFieldProps( "lastName" )}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                        <div className="text-danger">{formik.errors.lastName}</div>
                    )}

                 
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        {...formik.getFieldProps( "email" )}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="text-danger">{formik.errors.email}</div>
                    )}

               
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        {...formik.getFieldProps( "password" )}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div className="text-danger">{formik.errors.password}</div>
                    )}
                </div>
                <div className="btn-box d-flex flex-column">
                    <button type="submit" className="btn btn-success" disabled={loading}>
                        {loading ? "Loading..." : "SIGN UP"}
                    </button>
                    <span style={{ marginTop: "5px" }}>
                        Already have an account? <NavLink to={'/'}>Sign In</NavLink>
                    </span>
                </div>
            </form>
            <ToastContainer aria-live="polite" />
        </div>
    );
}

export default Register;
