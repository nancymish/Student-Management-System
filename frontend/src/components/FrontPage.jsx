    import React from "react";
    import student from "../assets/images/student.jpg";
    import { Link } from "react-router-dom";


    const FrontPage = () => {
    return (
        <section className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-6xl w-full bg-white rounded-lg shadow-md p-6 md:p-10 flex flex-col md:flex-row items-center gap-6">
            
            {/* Image */}
            <img
            src={student}
            alt="Student"
            className="w-full  md:w-1/2 md:h-80 object-cover rounded-md"
            />

            {/* Content */}
            <div className="p-2 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 mb-4">
                <span className="block text-lg sm:text-xl font-semibold text-green-400">
                Welcome to
                </span>
                Student Management System
            </h1>

            <p className="text-sm sm:text-md text-gray-700 mb-6 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
                quia est vero, optio quas temporibus itaque obcaecati. Iure magnam,
                ducimus neque.
            </p>

            {/* Links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                    to="/signup"
                className="text-green-600 font-medium hover:underline"
                >
                New User? Register
                </Link>

                <Link
                    to="/login"
                
                className="text-green-600 font-medium hover:underline"
                >
                Existing User? Login
                </Link>

                 
            </div>
            </div>

        </div>
        </section>
    );
    };

    export default FrontPage;
