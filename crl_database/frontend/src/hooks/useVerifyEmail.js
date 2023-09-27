import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuthContext } from "./useAuthContext.js";

export const useVerifyEmail = () => {
    const { user, dispatch } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [hasVerified, setHasVerified] = useState(false)
    const [searchParams] = useSearchParams()

    const emailToken = searchParams.get("emailToken");

    useEffect(() => {
        (async () => {
            if (!user?.isVerified && emailToken) {
                setIsLoading(true);

                const response = await fetch(`http://localhost:5001/api/user/verify-email`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ emailToken })
                });

                if (!response.ok) {
                    setIsLoading(false);
                    setError({ error: true, message: "Failed to verify email"});
                    return;
                }

                
                    
                dispatch({ type: 'VERIFY_EMAIL' });
                setHasVerified(true)
                

                setIsLoading(false);
            }
        })();
    }, [emailToken, user, dispatch]);

    return { isLoading, error, isVerified: hasVerified };
};

export const useResendVerification = async (userEmail) => {
  
     const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState(null);

     const resendVerification = async () => {
        setIsLoading(true);
        setError(null);

        try {

         const response = await fetch('http://localhost:5001/api/user/resend-email', {
            method: 'POST',
            heaers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email: userEmail})
         })

         const data = await response.json()

        if(!response.ok) {
         setError(data.message || 'failed to resend')
         }

     } catch (err) {
         setError(err.message || 'Error occured')
        }

        setIsLoading(false)
        }   


        return { resendVerification, isLoading, error }

}



              