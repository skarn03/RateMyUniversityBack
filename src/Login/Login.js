import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../Hooks/AuthContext';
import { useAuth } from '../Hooks/useAuth';
import { jwtDecode } from 'jwt-decode';
import useFetch from '../Hooks/useFetch';
import { useNavigate } from 'react-router';

export default function Login() {
    const [user, setUser] = useState({});
    const [error, setErrors] = useState("Only University Email");
    const auth = useContext(AuthContext);
    const { sendRequest, isLoading } = useFetch();
    const navigate = useNavigate();

    const isUniversityEmail = (email) => {
        // Define an array of university domains
        const universityDomains = ['edu', 'ac', 'univ'];

        // Extract the domain from the email
        const domain = email.split('@')[1];

        // Check if the domain matches any university domain
        return universityDomains.some((univDomain) => domain.includes(univDomain));
    };

    const handleLogin = async (response) => {
        console.log("Encoded JWT ID token: " + response.credential);
        var userObject = jwtDecode(response.credential);
        console.log(userObject);
        setUser(userObject);

        // Check if the email is from a university domain
        if (isUniversityEmail(userObject.email)) {
            // Perform actions for university domain email
            console.log('User has a university domain email');
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/users/signup',

                    'POST',
                    JSON.stringify({
                        email: userObject.email,
                    }),
                    {
                        'Content-Type': 'application/json',
                    }

                );
                console.log(responseData);
                auth.login(responseData.user.email, responseData.token);
                navigate('/');
            } catch (error) {
                setErrors(error.message || 'An error occurred during Signup');
            }
        } else {
            setErrors('Only University Domain Email Allowed');
            console.log('Non University Email')
        }
    };

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "984574198248-lsbpaoi4234clkrul6re90o1ukquv1aj.apps.googleusercontent.com",
            callback: handleLogin
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        );
    }, []);

    return (
        <div className=" items-center flex top-0 left-0 w-screen h-screen pb-40   justify-center   justify-top bg-opacity-50 bg-[#EBE3D5]">
            <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
                <div id='signInDiv'>Login</div>
                {error && (
                    <div className="text-red-500 mt-4 text-sm">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}
