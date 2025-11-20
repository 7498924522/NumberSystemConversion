import React, { useState,useRef } from 'react'
import bgImage from "/public/home4.jpg";
import { FaHome } from 'react-icons/fa';
import { IoMdContacts } from 'react-icons/io';
import { FaPeopleGroup } from "react-icons/fa6";
import { LiaAngleDoubleDownSolid } from 'react-icons/lia';
import { FaInfoCircle } from 'react-icons/fa';
import { FaTurnDown } from "react-icons/fa6";
import { PiBrainDuotone } from "react-icons/pi";
import { MdStart } from "react-icons/md";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { FaCalculator } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FcMultipleInputs } from "react-icons/fc";
import { GiCrownedSkull } from "react-icons/gi";
import { Calculator, Github, Phone, Binary, Sigma, Mail, BookOpen, Linkedin } from 'lucide-react';
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import api from '../api/api';
function Home() {
    const navigate = useNavigate();
    const bottomRef = useRef(null);
    const [openMenu, setOpenMenu] = useState(false);
   const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

    const [feed, setfeed] = useState("");


    const handleSubmit = async () => {
        try {
            // Trim whitespace from input
            const trimmedFeed = feed.trim();

            // Validation
            if (!trimmedFeed) {
                alert("Feedback cannot be empty!");
                return;
            }

            if (trimmedFeed.length > 255) {
                alert("Feedback is too long! Max 255 characters allowed.");
                return;
            }

            // Send data to backend
            await api.post("http://localhost:8080/feedback", {
                feed: trimmedFeed
            });

            alert("Feedback saved!");

            // Reset input field
            setfeed("");
        } catch (error) {
            console.error("Error saving feedback", error);
            alert("Failed to save feedback. Please try again.");
        }
    };

    const Back=()=>
    {
        alert("Log Out..");
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${bgImage})`, }}>
            {/* Top Navbar here the home about us contact us and profile as well as logout at right side*/}
           <nav className="w-full shadow-lg bg-white/30  top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo + Feedback */}
        <div className="flex items-center gap-3">
          <span
            onClick={scrollToBottom}
            className="hover:text-orange-500 flex items-center gap-2 text-black font-extrabold text-xl md:text-2xl cursor-pointer"
          >
            FeedBack <FaPeopleGroup className="size-5 md:size-7" />
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex font-semibold gap-14 text-black">
          <li>
            <span className="hover:text-red-400 flex cursor-pointer">
              Home <FaHome className="ml-2 size-5" />
            </span>
          </li>

          <li>
            <span className="hover:text-red-400 flex cursor-pointer">
              About Us <FaInfoCircle className="ml-2 size-5" />
            </span>
          </li>

          <li>
            <span className="hover:text-red-400 flex cursor-pointer">
              Contact Us <IoMdContacts className="ml-2 size-5" />
            </span>
          </li>
        </ul>

        {/* Profile + Logout (Desktop only) */}
        <div className="hidden md:flex flex-col items-center space-y-2">
          <span className="text-black cursor-pointer">
            <FaPeopleGroup className="size-6" />
          </span>
          <button onClick={Back} className="font-semibold text-white bg-gray-700 px-3 py-1 cursor-pointer rounded-lg hover:bg-gray-800">
            Log-out
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          {openMenu ? (
            <RxCross2
              onClick={() => setOpenMenu(false)}
              className="text-black size-7 cursor-pointer"
            />
          ) : (
            <GiHamburgerMenu
              onClick={() => setOpenMenu(true)}
              className="text-black size-7 cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {openMenu && (
        <div className="md:hidden bg-white/20 shadow-md px-6 py-4 space-y-6">

          <div className="flex flex-col space-y-5 text-black font-semibold">
            <span className="flex items-center gap-2 hover:text-red-400 cursor-pointer">
              Home <FaHome className="size-5" />
            </span>

            <span className="flex items-center gap-2 hover:text-red-400 cursor-pointer">
              About Us <FaInfoCircle className="size-5" />
            </span>

            <span className="flex items-center gap-2 hover:text-red-400 cursor-pointer">
              Contact Us <IoMdContacts className="size-5" />
            </span>
          </div>

          <div className="flex items-center justify-between mt-8">
            <FaPeopleGroup className="size-6 text-black" />

            <button onClick={Back} className="font-semibold text-white bg-gray-700 px-3 cursor-pointer py-1 rounded-lg hover:bg-gray-800">
              Log-out
            </button>
          </div>
        </div>
      )}
    </nav>
            {/*nav finish ==================================================================================== */}

            <h1 className="text-5xl md:text-5xl font-extrabold text-black text-center drop-shadow-lg tracking-tight my-4">
                Number System Conversion
            </h1>

            <div className='grid md:grid-cols-2 grid-cols-1 gap-4 md:p-8 p-2  '>
                <div className='h-full backdrop-blur-lg  shadow-2xl w-full    p-4   rounded-2xl    duration-200 hover:scale-[1.05]'>
                    <div className='flex md:text-2xl  font-bold text-black'>BINARY NUMBER <FaTurnDown className='mt-2 ml-1' /> </div>

                    <p className='text-black py-3'>The binary number system is the way <u className='font-semibold'>computers understand</u>  and  <u className='font-semibold'>process information .</u></p>
                    <h2 className='text-xl font-semibold flex '><PiBrainDuotone className='mt-1 mr-1 ' />  Simple Word :- </h2>
                    <p className='flex '><MdStart className='pr-2 size-6 ' /> Binary is the language of computers. (Digits 0 and 1's)</p>
                    <p className='flex'><MdStart className=' pr-2 size-6' />Each digit in a binary number is called a bit, which stands for binary digit.</p>
                    <p className='flex'><MdStart className=' pr-2 size-6' />These bits represent ON and OFF states inside a computer's electrical circuits.</p>
                </div>
                <div className='h-full backdrop-blur-lg  shadow-2xl w-full    p-3   rounded-2xl duration-200 hover:scale-[1.05]'>
                    <div className='flex md:text-2xl  font-bold '>DECIMAL NUMBER <FaTurnDown className='mt-2 ml-1' /></div>

                    <p className='text-black py-3'>The decimal number system is the number system <u className='font-semibold'> we use in daily life.</u> It is also called the base-10 system because it has 10 different digits</p>
                    <h2 className='text-xl font-semibold flex '><PiBrainDuotone className='mt-1 mr-1 ' />  Simple Word :- </h2>
                    <p className='flex '><MdStart className=' pr-2 size-6' /> digits:- <u className='md:ml-3 ml-0 font-semibold'>0, 1, 2, 3, 4, 5, 6, 7, 8, 9.</u> </p>
                    <p className='flex py-2'><MdStart className=' pr-2 size-7' />Each place increases by 10 times as you move left and decreases by 10 times as you move right.</p>

                </div>
                <div className='h-full backdrop-blur-lg  shadow-2xl w-full    p-3   rounded-2xl duration-200 hover:scale-[1.05]'>
                    <div className='flex  md:text-2xl font-bold'>OCTAL NUMBER <FaTurnDown className='mt-2 ml-1' /> </div>
                    <p className='text-black py-3'>Octal number system (Base-8) <u className='font-semibold'>uses digits 0 to 7</u> to represent values, with each position representing a power of 8.</p>
                    <h2 className='text-xl font-semibold flex '><PiBrainDuotone className='mt-1 mr-1 ' />  Simple Word :- </h2>
                    <p className='flex '><MdStart className=' pr-2 size-6' /> No digit can be 8 or 9 – only 0,1,2,3,4,5,6,7.</p>
                    <p className='flex'><MdStart className=' pr-2 size-6' />Multiply each digit by corresponding power of 8 and sum.</p>
                    <p className='flex'><MdStart className=' pr-2 size-6' />Each digit represents powers of 8:</p>

                </div>
                <div className='h-full backdrop-blur-lg  shadow-2xl w-full    p-3   rounded-2xl duration-200 hover:scale-[1.05]'>
                    <div className='flex md:text-2xl font-bold'>HEXADECIMAL NUMBER <FaTurnDown className='mt-2 ml-1' /> </div>
                    <p className='text-black py-3'>The binary number system is the way <u className='font-semibold'>computers understand</u>  and  <u className='font-semibold'>process information .</u></p>
                    <h2 className='text-xl font-semibold flex '><PiBrainDuotone className='mt-1 mr-1 ' />  Simple Word :- </h2>
                    <p className='flex '><MdStart className=' pr-2 size-6' /> Binary is the language of computers. (Digits 0 and 1's)</p>
                    <p className='flex'><MdStart className=' pr-2 size-6' />Each digit in a binary number is called a bit, which stands for binary digit.</p>
                    <p className='flex'><MdStart className=' pr-2 size-6' />These bits represent ON and OFF states inside a computer's electrical circuits.</p>

                </div>
            </div>

            {/* Conversion Sections */}
            <div className='md:p-8 p-2 space-y-6'>




                {/* Decimal Conversion Section */}
                <div className='backdrop-blur-lg bg-white/30 shadow-2xl rounded-3xl overflow-hidden hover:shadow-pink-500/50 transition-all duration-300 hover:scale-[1.02]'>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-6 p-6 items-center'>

                        {/* Left Side - Image */}
                        <div className='flex justify-center items-center w-full'>
                            <div className='relative group'>
                                <div className='absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300'></div>
                                <div className='relative bg-gradient-to-br from-pink-100 to-purple-100 p-8 rounded-2xl shadow-xl'>
                                    <div className='text-center'>
                                        <FaCalculator className='text-8xl text-pink-600 mx-auto mb-4 ' />
                                        <div className='text-6xl font-bold text-black'>(10)<u className='text-xl'>10</u></div>
                                        <div className='text-2xl font-semibold text-gray-700 mt-2'>Decimal</div>
                                        <div className='flex justify-center items-center gap-3 mt-4'>
                                            <div className='text-3xl font-bold text-blue-600'>→</div>
                                            <div className='text-4xl font-bold text-green-600'>(1010)<u className='text-xl'>2</u></div>
                                        </div>
                                        <div className='text-lg text-gray-600 mt-1'>Binary</div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Button and Description */}
                        <div className='flex flex-col justify-center space-y-6 '>

                            <div className='group'>
                                <h2 className='text-4xl font-extrabold text-black mb-3 flex items-center gap-2'>
                                    <span className='text-pink-600'>Decimal <FcMultipleInputs /></span> Conversion
                                </h2>
                                <p className='text-lg text-gray-800 leading-relaxed'>
                                    Convert decimal numbers to binary, octal, and hexadecimal formats instantly.
                                    Perfect for programmers, students, and anyone working with different number systems!
                                </p>
                            </div>

                            <button
                                onClick={() => navigate("/decimal")}
                                className='group relative cursor-pointer px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 rounded-full  w-full md:w-auto'
                            >
                                <span className='relative z-10 flex items-center justify-center gap-3'>
                                    Start Decimal Conversion
                                    <BsArrowRightCircleFill className='text-2xl transition-transform group-hover:translate-x-2 group-hover:rotate-90 duration-300' />
                                </span>

                            </button>
                        </div>

                    </div>
                </div>

                {/* Binary Conversion Section */}
                <div className='backdrop-blur-lg bg-white/30 shadow-2xl rounded-3xl overflow-hidden hover:shadow-blue-500/50 transition-all duration-300 hover:scale-[1.02]'>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-6 p-6 items-center'>

                        {/* Left Side - Image */}
                        <div className='flex justify-center items-center'>
                            <div className='relative group'>
                                <div className='absolute inset-0 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-2xl blur-xl '></div>
                                <div className='relative bg-gradient-to-br from-blue-100 to-cyan-100 p-8 rounded-2xl shadow-xl'>
                                    <div className='text-center'>
                                        <FaCalculator className='text-8xl text-blue-600 mx-auto mb-4 ' />
                                        <div className='text-5xl font-bold text-black font-mono'>(1010)<u className='text-xl'>2</u></div>
                                        <div className='text-2xl font-semibold text-gray-700 mt-2'>Binary</div>
                                        <div className='flex justify-center items-center gap-3 mt-4'>
                                            <div className='text-3xl font-bold text-purple-600'>→</div>
                                            <div className='text-4xl font-bold text-green-600'>(10)<u className='text-xl'>2</u></div>
                                        </div>
                                        <div className='text-lg text-gray-600 mt-1'>Decimal</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Button and Description */}
                        <div className='flex flex-col justify-center space-y-6'>
                            <div>
                                <h2 className='text-4xl font-extrabold text-black mb-3 flex items-center gap-2'>
                                    <span className='text-blue-600'>Binary<FcMultipleInputs /></span> Conversion
                                </h2>
                                <p className='text-lg text-gray-800 leading-relaxed'>
                                    Convert binary numbers to decimal, octal, and hexadecimal formats with ease.
                                    Understand how computers process data and master the language of digital systems!
                                </p>
                            </div>

                            <button
                                onClick={() => navigate("/binary")}
                                className='group relative cursor-pointer px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-full  w-full md:w-auto'
                            >
                                <span className='relative z-10 flex items-center justify-center gap-3'>
                                    Start Binary Conversion
                                    <BsArrowRightCircleFill className='text-2xl transition-transform group-hover:translate-x-2 group-hover:rotate-90 duration-300' />
                                </span>

                            </button>
                        </div>

                    </div>
                </div>
                {/* Octal Conversion */}
                <div className='backdrop-blur-lg bg-white/30 shadow-2xl rounded-3xl overflow-hidden hover:shadow-pink-500/50 transition-all duration-300 hover:scale-[1.02]'>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-6 p-6 items-center'>

                        {/* Left Side - Image */}
                        <div className='flex justify-center items-center w-full'>
                            <div className='relative group'>
                                <div className='absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300'></div>
                                <div className='relative bg-gradient-to-br from-pink-100 to-purple-100 p-8 rounded-2xl shadow-xl'>
                                    <div className='text-center'>
                                        <FaCalculator className='text-8xl text-purple-800 mx-auto mb-4 ' />
                                        <div className='text-6xl font-bold text-black'>(237)<u className='text-xl'>8</u></div>
                                        <div className='text-2xl font-semibold text-gray-700 mt-2'>Octal</div>
                                        <div className='flex justify-center items-center gap-3 mt-4'>
                                            <div className='text-3xl font-bold text-blue-600'>→</div>
                                            <div className='text-4xl font-bold text-green-600'>(159)<u className='text-xl'>10</u></div>
                                        </div>
                                        <div className='text-lg text-gray-600 mt-1'>Decimal</div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Button and Description */}
                        <div className='flex flex-col justify-center space-y-6 '>

                            <div className='group'>
                                <h2 className='text-4xl font-extrabold text-black mb-3 flex items-center gap-2'>
                                    <span className='text-purple-800'>Octal <FcMultipleInputs /></span> Conversion
                                </h2>
                                <p className='text-lg text-gray-800 leading-relaxed'>
                                    Convert octal numbers to decimal, binary, and hexadecimal formats instantly.
                                    Perfect for programmers, students, and anyone working with different number systems!
                                </p>
                            </div>

                            <button
                                onClick={() => navigate("/octal")}
                                className='group relative cursor-pointer px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-purple-700 via-rose-400 to-red-500 rounded-full  w-full md:w-auto'
                            >
                                <span className='relative z-10 flex items-center justify-center gap-3'>
                                    Start Octal Conversion
                                    <BsArrowRightCircleFill className='text-2xl transition-transform group-hover:translate-x-2 group-hover:rotate-90 duration-300' />
                                </span>

                            </button>
                        </div>

                    </div>
                </div>

                {/* Hexadecimal Conversion */}
                <div className='backdrop-blur-lg bg-white/30 shadow-2xl rounded-3xl overflow-hidden hover:shadow-pink-500/50 transition-all duration-300 hover:scale-[1.02]'>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-6 p-6 items-center'>

                        {/* Left Side - Image */}
                        <div className='flex justify-center items-center w-full'>
                            <div className='relative group'>
                                <div className='absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300'></div>
                                <div className='relative bg-gradient-to-br from-pink-100 to-purple-100 p-8 rounded-2xl shadow-xl'>
                                    <div className='text-center'>
                                        <FaCalculator className='text-8xl text-cyan-600 mx-auto mb-4 ' />
                                        <div className='text-6xl font-bold text-black'>(2F)<u className='text-xl'>16</u></div>
                                        <div className='text-2xl font-semibold text-gray-700 mt-2'>HexaDecimal</div>
                                        <div className='flex justify-center items-center gap-3 mt-4'>
                                            <div className='text-3xl font-bold text-blue-600'>→</div>
                                            <div className='text-4xl font-bold text-green-600'>(47)<u className='text-xl'>10</u></div>
                                        </div>
                                        <div className='text-lg text-gray-600 mt-1'>Decimal</div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Button and Description */}
                        <div className='flex flex-col justify-center space-y-6 '>

                            <div className='group'>
                                <h2 className='text-4xl font-extrabold text-black mb-3 flex items-center gap-2'>
                                    <span className='text-cyan-600'>HexaDecimal <FcMultipleInputs /></span> Conversion
                                </h2>
                                <p className='text-lg text-gray-800 leading-relaxed'>
                                    Convert hexadecimal numbers to decimal, binary, and octal formats instantly.
                                    Perfect for programmers, students, and anyone working with different number systems!
                                </p>
                            </div>

                            <button
                                onClick={() => navigate("/hex")}
                                className='group relative cursor-pointer px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-cyan-600 via-blue-300 to-pink-500 rounded-full  w-full md:w-auto'
                            >
                                <span className='relative z-10 flex items-center justify-center gap-3'>
                                    Start Hexadecimal Conversion
                                    <BsArrowRightCircleFill className='text-2xl transition-transform group-hover:translate-x-2 group-hover:rotate-90 duration-300' />
                                </span>

                            </button>
                        </div>

                    </div>
                </div>

                <div   className="h-auto w-full shadow border-2 bg-indigo-300/50 border-white flex justify-center items-center rounded-lg">
                    <div className="flex flex-col items-center">
                        <h1 className="text-black flex  text-2xl font-extrabold py-3 px-3 gap-3"><FaPeopleGroup className=' size-9' />YOUR FEEDBACK</h1>
                        <div className="relative w-full">
                            <textarea ref={bottomRef}
                                type="text"
                                placeholder="Typing,,"
                                value={feed}
                                onChange={(e) => setfeed(e.target.value)}
                                className="p-2 pr-10  rounded-lg text-black mt-2 w-full md:w-80 border-2 border-white"
                            />
                            <GiCrownedSkull className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-black" />
                        </div>


                        <button className='px-10 mb-2 shadow-lg rounded-lg md:mr-44 bg-gray-300 hover:bg-gray-500 h-8' onClick={handleSubmit}>SUBMIT</button>


                    </div>
                </div>

                <div className='mt-8'></div>

            </div>
            <footer className="backdrop-blur-lg bg-gray-900/70 text-white py-10 border-t border-white/10">
               <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Branding */}
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Binary className="w-6 h-6 text-blue-400" />
                            Number System Converter
                        </h2>
                        <p className="mt-3 text-sm text-white">
                            A fast and accurate tool for converting between Binary, Octal,
                            Decimal, and Hexadecimal — including step-by-step explanations.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-green-400" />
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li className="hover:text-white transition cursor-pointer flex items-center gap-2">
                                <Binary className="w-4 h-4 text-blue-400" /> Binary Converter
                            </li>
                            <li className="hover:text-white transition cursor-pointer flex items-center gap-2">
                                <Sigma className="w-4 h-4 text-purple-400" /> Octal Converter
                            </li>
                            <li className="hover:text-white transition cursor-pointer flex items-center gap-2">
                                <Calculator className="w-4 h-4 text-orange-400" /> Hex Converter
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <Mail className="w-5 h-5 text-red-400" />
                            Contact
                        </h3>

                        <p className="text-sm flex items-center gap-2 mb-2">
                            <Mail className="w-4 h-4 text-blue-400" /> support@numbersystem.com
                        </p>

                        <p className="text-sm flex items-center gap-2 mb-2">
                            <Linkedin className="w-4 h-4 text-green-400" /> LinkedIn/ Project Source
                        </p>

                        <p className="text-sm flex items-center gap-2 cursor-pointer hover:text-white transition">
                            <Github className="w-4 h-4 text-white" /> GitHub / Project Source
                        </p>
                    </div>
                </div>

                {/* Bottom */}
                <div className="text-center text-white text-sm mt-5 border-t border-gray-900 pt-5">
                    © {new Date().getFullYear()} Number System Converter — All Rights Reserved.
                </div>
            </footer>



        </div>
    );
}

export default Home