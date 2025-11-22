import React from 'react';
import { Binary, LogIn, UserPlus, Github, Twitter, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {

     const navigate=useNavigate();

     const GoLogin =()=>
     {
        alert("Login First")
        navigate("/lg")
     }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between backdrop-blur-sm bg-white/10 border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-2.5 rounded-xl shadow-lg">
            <Binary className="md:w-8  md:h-8 sm:w-6 sm:h-6 text-white" />
          </div>
          <h1 className="md:text-2xl sm:text-xl font-bold text-white tracking-tight">
            NumConvert
          </h1>
        </div>
        
        <div className="flex gap-2">
          <button onClick={()=>navigate("/lg")} className="px-2 sm:px-3 md:px-5 py-2 md:py-2.5 text-white hover:bg-white/10 rounded-lg transition-all duration-300 flex items-center gap-1 md:gap-2 font-medium border border-white/20 hover:border-white/40 text-xs sm:text-sm md:text-base">
            <LogIn className="w-3 h-3 sm:w-4 sm:h-4" />
            Login
          </button>
          <button onClick={()=>navigate("/signup")} className="px-2 sm:px-3 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-1 md:gap-2 font-medium text-xs sm:text-sm md:text-base">
            <UserPlus className="w-3 h-3 sm:w-4 sm:h-4" />
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-6">
            <h2 className="text-6xl font-bold text-white leading-tight">
              Convert Numbers
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
                Across All Systems
              </span>
            </h2>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto leading-relaxed">
              Instantly convert between Binary, Decimal, Octal, and Hexadecimal number systems with precision and ease
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Binary', color: 'from-green-400 to-emerald-600' },
              { label: 'Decimal', color: 'from-blue-400 to-indigo-600' },
              { label: 'Octal', color: 'from-purple-400 to-pink-600' },
              { label: 'Hexadecimal', color: 'from-orange-400 to-red-600' }
            ].map((system, idx) => (
              <div 
                key={idx}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${system.color} rounded-xl mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg group-hover:rotate-25 transition-transform duration-300`}>
                  {system.label.substring(0, 2)}
                </div>
                <h3 className="text-white font-semibold text-lg">{system.label}</h3>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button onClick={GoLogin} className="mt-8 px-10 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl">
            Start Converting Now
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="backdrop-blur-sm bg-white/5 border-t border-white/10 px-6 py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-purple-200 text-sm">
            © 2025 NumConvert. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-purple-200 hover:text-white transition-colors duration-300">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-purple-200 hover:text-white transition-colors duration-300">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-purple-200 hover:text-white transition-colors duration-300">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}