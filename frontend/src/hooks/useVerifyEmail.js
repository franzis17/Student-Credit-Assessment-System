import { useState, useEffect, useRef } from 'react';
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

export const useResendVerification = (userEmail) => {
  
     const [isLoading, setIsLoading] = useState(false)
     const [error, setError] = useState(null)
     const clockInterval = useRef(null)

     const [timeLeft, setTimeLeft] = useState(() => {
    
        //Save state of time in local storage so upon refresh user can't exploit resend button
         const lastSentTime = localStorage.getItem('lastSentTime');
         if(lastSentTime) {
           const elapsedMilli = Date.now() - Number(lastSentTime)
           const elaspedSec = Math.floor(elapsedMilli / 1000)
           return Math.max(100 - elaspedSec, 0)
         }

        return 0
    
    })

    const countdown = () => {
        if (clockInterval.current) {
            clearInterval(clockInterval.current);
        }

        clockInterval.current = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(clockInterval.current);
                    return 0;
                }

                return prevTime - 1;
            });
        }, 1000);
        


    }


     const resendVerification = async () => {
        setIsLoading(true);
        setError(null);

        try {

         const response = await fetch('http://localhost:5001/api/user/resend-email', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email: userEmail})
         })

         
         const data = await response.json();

         if (!response.ok) {
             setError(data.message || 'failed to resend');
             setIsLoading(false);
             return;
         }

         // Update lastSentTime and setTimeLeft only after a successful request.
         localStorage.setItem('lastSentTime', Date.now().toString())
         setTimeLeft(100) // Start the 60-second timer.
         countdown()

    
     } catch (err) {
         setError(err.message || 'Error occured');
     }

     setIsLoading(false);
     };

     useEffect(() => {
        if (timeLeft > 0) {
            countdown();
        }
         return () => {
         // Clear lingering intervals for clock on cleanup.
         if (clockInterval.current) {
             clearInterval(clockInterval.current);
         }
     };
     }, []);

 return { resendVerification, timeLeft, isLoading, error};
}



              
