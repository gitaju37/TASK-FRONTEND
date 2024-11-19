import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactLoading from 'react-loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Activation = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState( true );

    useEffect( () => {
        const activateUser = async () => {
            try {
                const res = await axios.post( "http://localhost:4000/user/activation", { token } );
                if ( res.data.message === "Activated" ) {
                    toast.success( "Account Activated Successfully!" );
                    setLoading( false );
                    setTimeout( () => navigate( '/' ), 5000 ); 
                } else if ( res.data.message === "Already Activated" ) {
                    toast.info( "Account is already activated." );
                    setLoading( false );
                    setTimeout( () => navigate( '/' ), 5000 ); 
                } else {
                    console.error( "Unexpected response:", res.data );
                    toast.error( "Unexpected error occurred." );
                    setLoading( false );
                }
            } catch ( error ) {
                console.error( "Error activating user:", error );
                toast.error( "Error activating account. Please try again." );
                setLoading( false );
            }
        };

        activateUser();
    }, [ navigate, token ] );

    return (
        <div className="loading-container">
            {loading ? (
                <ReactLoading type="spinningBubbles" color="#ed7632" />
            ) : (
                <h2 style={{textAlign:"center"}}>Activation Process Completed</h2>
            )}
            <ToastContainer />
        </div>
    );
};

export default Activation;
