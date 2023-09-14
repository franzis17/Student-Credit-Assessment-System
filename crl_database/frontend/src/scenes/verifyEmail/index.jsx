import { useNavigate } from 'react-router-dom';
import { Alert, CircularProgress } from "@mui/material";
import { useVerifyEmail } from "../../hooks/useVerifyEmail.js";
import { useEffect } from 'react';

const VerifyEmailPage = () => {
    const { isLoading, error, isVerified } = useVerifyEmail();
    const navigate = useNavigate();


    useEffect(() => { 

        if (isVerified) {
            setTimeout(() => {
                navigate("/dashboard");
            }, 3000);
        }
    }, [isVerified, navigate])

    return (
        <div> 
            {isLoading ? ( 
            <div>
                <CircularProgress />
            </div>
            ) : ( 
            <div>
                {isVerified ? (
                    <div>
                        <Alert severity="success">
                            Email successfully verified, redirecting...
                        </Alert>
                        <p>Your email has been verified!</p>
                    </div>
                ) : ( 
                    <div>
                        {error?.error ? ( 
                            <Alert severity="error">{error.message}</Alert>  
                        ) : null}
                        <p>Your email is not yet verified. Please follow the instructions in the email you received.</p>
                    </div>
                 )}
                </div>
                )}
           </div>
        );
};

export default VerifyEmailPage;