import React, { useState, useEffect } from 'react';
import useFetch from '../Hooks/useFetch';

const SearchBar = () => {
    const { sendRequest, isLoading } = useFetch();

    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [universities, setUniversities] = useState([]);

    const handleSearch = () => {
        // Add logic for handling search
        console.log('Searching for:', searchTerm);
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleItemClick = (university) => {
        // Add logic for handling item click
        console.log('University clicked:', university.name);
        // You can perform additional actions here
    };

    const fetchUniversity = async () => {
        try {
            const responseData = await sendRequest(
                'http://localhost:5000/api/universities/findByName',
                'POST',
                JSON.stringify({
                    keyword: searchTerm,
                }),
                {
                    'Content-Type': 'application/json',
                }
            );

            setUniversities(responseData.universities);
            setShowDropdown(true); // Show the dropdown after fetching universities
        } catch (error) {
            console.log(error.message || 'An error occurred during fetching universities');
        }
    };

    useEffect(() => {
        if(searchTerm.length==0){
            setShowDropdown(false);
            setUniversities([]);
        }
        const timerId = setTimeout(() => {
            // Perform backend API call to retrieve universities
            fetchUniversity();
        }, 2000);

        // Cleanup the timer on component unmount or when the user types again
        return () => clearTimeout(timerId);
    }, [searchTerm]);

    return (
        <div className="flex items-center justify-center h-screen bg-[#EBE3D5] bg-opacity-90">
            <div className="bg-[#FAEED1] p-8 rounded-lg mb-40 shadow-lg w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeholder="Search..."
                        className="w-full py-3 px-6 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 bg-[#FDF7E4] bg-opacity-80"
                    />
                    <button
                        onClick={handleSearch}
                        className="absolute right-0 top-0 mt-3 mr-3 text-blue-500 hover:text-blue-700 focus:outline-none"
                    >
                        <svg
                            className="h-6 w-6 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            {/* Your search icon */}
                        </svg>
                    </button>
                </div>

                {showDropdown && (
                    <div className="mt-2">
                        {/* Render your clickable dropdown list here */}
                        {universities.map((university) => (
                            <div
                                key={university._id}
                                onClick={() => handleItemClick(university)}
                                className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                            >
                                {university.name}
                            </div>
                        ))}
                    </div>
                )}

                <button
                    className="mt-4 bg-[#4F4A45] text-white py-2 px-4 rounded-md hover:bg-[#B0926A] focus:outline-none"
                    onClick={() => console.log('Add University clicked')}
                >
                    Add University
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
