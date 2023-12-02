// Navbar.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Hooks/AuthContext';
import { useAuth } from '../Hooks/useAuth';

const Navbar = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const goHome = () => {
        navigate('/');
    };

    const toggleMenu = () => {
        // No need to update showMenu in this component
    };

    const handleHome = () => {
        goHome();
        // Add logic for Home button click
    };

    const handleAbout = () => {
        // Add logic for About button click
    };

    const handleServices = () => {
        // Add logic for Services button click
    };

    const handleContact = () => {
        // Add logic for Contact button click
    };

    const handleLogin = () => {
        if (auth.isLoggedIn) {
            auth.logout(); // Call your logout function from useAuth
        } else {
            navigate('/login');
        }
    };

    return (
        <nav className="bg-[#5F6F52] p-3">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <button onClick={goHome}>
                        <div
                            className="text-[#F8FFD2] font-bold text-xl font-poppins transition duration-300 transform hover:scale-105 hover:text-[#FEFAE0]"
                        >
                            Rate My University
                        </div>
                    </button>
                </div>

                <div className="md:hidden">
                    <button
                        className={`text-gray-900 hover:text-white focus:outline-none transition duration-300 ${
                            auth.isLoggedIn ? 'bg-orange-600' : 'bg-white'
                        }`}
                        onClick={toggleMenu}
                    >
                        <svg
                            className="h-6 w-6 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>

                <div className={`md:flex items-center ${auth.isLoggedIn ? 'block' : 'hidden'}`}>
                    <div className="md:flex-grow mb-2">
                        <button
                            className={`block mt-4 md:inline-block md:mt-0 text-[#F8FFD2]  mr-4 hover:text-[#FEFAE0] transition duration-300`}
                            onClick={handleHome}
                        >
                            Home
                        </button>
                        <button
                            className={`block mt-4 md:inline-block md:mt-0 text-[#F8FFD2]  mr-4 hover:text-[#FEFAE0] transition duration-300`}
                            onClick={handleAbout}
                        >
                            About
                        </button>
                        <button
                            className={`block mt-4 md:inline-block md:mt-0 text-[#F8FFD2] mr-4 hover:text-[#FEFAE0] transition duration-300`}
                            onClick={handleServices}
                        >
                            Services
                        </button>
                        <button
                            className={`block mt-4 md:inline-block md:mt-0 text-[#F8FFD2]  mr-4 hover:text-[#FEFAE0] transition duration-300`}
                            onClick={handleContact}
                        >
                            Contact
                        </button>
                    </div>

                    <button
                        className={` bg-slate-400 text-${auth.isLoggedIn ? '[#F8FFD2] ' : 'white'} px-4 py-2 rounded-full mb-2 hover:bg-opacity-70 transition duration-300`}
                        onClick={handleLogin}
                    >
                        {auth.isLoggedIn ? 'Logout' : 'Login'}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
