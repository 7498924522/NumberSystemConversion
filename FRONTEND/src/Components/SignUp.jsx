import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, User, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/api"; // import axios instance

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);
   try {
  const response = await api.post("/users/signup", {
    username: formData.username,
    email: formData.email,
    password: formData.password,
  });

  alert(response.data); 
  if (response.status === 200) {
    navigate("/"); // redirect to login
  }

} catch (error) {
  if (error.response) {
    // Backend returned an error
    alert(error.response.data); // Show "Email already exists!" or "Username already exists!"
  } else {
    alert("Error creating account. Please try again.");
  }

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="md:w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/20">
        <h2 className="text-3xl font-bold text-black mb-2 text-center">
          Create Account
        </h2>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-black mb-1">Username</label>
          <div className="relative">
            <User className="absolute left-3 top-3 text-black" />
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-white/20 text-black placeholder-gray-400"
              placeholder="777Charlie"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-black mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-black" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-white/20 text-black placeholder-gray-400"
              placeholder="you@example.com"
              required
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
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
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

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-black mb-1">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-black" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) =>
                handleChange("confirmPassword", e.target.value)
              }
              className="w-full pl-10 pr-10 py-2 rounded-xl bg-white/20 text-black placeholder-gray-400"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {formData.confirmPassword &&
            formData.password !== formData.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
            )}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white mt-3 py-2 rounded-xl font-bold cursor-pointer"
        >
          {isLoading ? "Creating..." : "Sign Up"}
        </button>

        <p className="mt-4 text-center text-black">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-purple-300 hover:text-purple-200 font-semibold cursor-pointer"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
