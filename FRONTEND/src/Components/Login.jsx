import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail ,User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await api.post("/users/login", {username, email, password });
      alert(response.data);
      if (response.data === "Login Successful 👍") {
        navigate("/home"); //redirect to dashboard
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    } finally {


      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className=" md:w-full   max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
        <h2 className="text-3xl font-bold text-black mb-6 text-center">
          Sign In
        </h2>

        {/* Email */}
        <div className="mb-2">
          <label className="block text-black mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-black" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-white/20 text-black placeholder-gray-400"
              placeholder="you@example.com"
              
            />
           </div>
        </div>

             <p className="text-center">or</p>

        {/* Username */}
         <div className="mb-4">
          <label className="block text-black mb-1">Username</label>
          <div className="relative">
             <User className="absolute left-3 top-3 text-black" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
             className="w-full pl-10 pr-3 py-2 rounded-xl bg-white/20 text-black placeholder-gray-400"
              placeholder="xyz"
              
            />
           </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-black mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-black" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 rounded-xl bg-white/20 text-black placeholder-gray-400"
              placeholder="••••••••"
              required
            />

           
           
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white  py-2 my-4 rounded-xl font-bold cursor-pointer"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>

        <p className="mt-4 text-center text-black">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-purple-300 hover:text-purple-200 font-semibold cursor-pointer"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
