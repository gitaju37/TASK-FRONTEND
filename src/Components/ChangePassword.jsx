import { useState } from "react";
import axios from 'axios';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [ newPassword, setNewPassword ] = useState( "" );
  const [ confirmPassword, setConfirmPassword ] = useState( "" );
  const [ pwdVerifyString, setPwdVerifyString ] = useState( "" );
  const navigate=useNavigate()


  const handleSubmit = async ( e ) => {
    e.preventDefault();
    await resetPassword();
  };

  const resetPassword = async () => {
    if ( newPassword !== confirmPassword ) {
      toast.error( "Passwords do not match." );
      return;
    }

    try {
      const payloads = { pwdVerifyString, newPassword };
      const response = await axios.post( "http://localhost:4000/user/pwreset", payloads );
      if ( response.status === 200 ) {
        toast.success( "Password reset successfully!" );
        setPwdVerifyString( "" );
        setNewPassword( "" );
        setConfirmPassword( "" );
        setTimeout( () => navigate( '/' ), 3000 ); 
      }
    } catch ( error ) {
      if ( error.response ) {
        if ( error.response.status === 404 ) {
          toast.error( "Link Expired" )
        } else if ( error.response.status === 401 ) {
          toast.error( "Invalid Verification Code" )
        } else {
          toast.error( "An unexpected error occurred" )
        }
      } else {
        toast.error( "Internal Server Error" )
      }
    }
  };

  return (
    <div className="pwd-container">
      <form className="change-pwd" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <h4>Enter Your New Password</h4>
        <div className="input-form d-flex flex-column">
          <input
            type="text"
            placeholder="Verification Code"
            value={pwdVerifyString}
            onChange={( e ) => setPwdVerifyString( e.target.value )}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={( e ) => setNewPassword( e.target.value )}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={( e ) => setConfirmPassword( e.target.value )}
            required
          />
          <button type="submit" className="btn btn-success">Reset Password</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ChangePassword;
