import { useFormik } from 'formik';
import './Register.css';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import { useState } from 'react';

const Login = () => {
    const [ loading, setLoading ] = useState( false );
    const navigate=useNavigate()

    const formik = useFormik( {
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async ( values ) => {
            setLoading( true );
            try {
                const response = await axios.post( "http://localhost:4000/user/login", values );
                if ( response.status === 200 ) {
                    toast.success( response.data.message );
                    formik.resetForm();
                    navigate('/home')
                }
            } catch ( error ) {
                if ( error.response ) {
                    if ( error.response.status === 401 ) {
                        toast.error( "Incorrect password" );
                    } else if ( error.response.data.message === "INVALID EMAIL" ) {
                        toast.error( "User not registered" );
                    } else {
                        toast.error( "An unexpected error occurred" );
                    }
                } else {
                    toast.error( "Invalid email or password" );
                }
            } finally {
                setLoading( false );
            }
        },
        validationSchema: yup.object( {
            email: yup.string().required( "Please enter your email" ).email( "Please enter a valid email" ),
            password: yup.string().required( "Please enter your password" ).min( 6, "Password should be at least 6 characters" )
        } )
    } );

    return (
        <div className="login-container">
            <form className="login" onSubmit={formik.handleSubmit}>
                <h1>WELCOME BACK!</h1>
                <div className="input-form d-flex flex-column">
                    
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        {...formik.getFieldProps( "email" )}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-danger">{formik.errors.email}</div>
                    ) : null}

                    
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        {...formik.getFieldProps( "password" )}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-danger">{formik.errors.password}</div>
                    ) : null}
                </div>
                <div className="btn-box d-flex flex-column">
                    <button type="submit" className="btn btn-success" disabled={loading}>
                        {loading ? "Loading..." : "SIGN IN"}
                    </button>
                    <span style={{ marginTop: "5px" }}>
                        Don&apos;t have an account? <NavLink to={'/register'}>Sign Up</NavLink>
                    </span>
                    <span style={{ marginTop: "5px" }}>
                        Forgot Password? <NavLink to={'/pwreset'}>Change Password</NavLink>
                    </span>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;
