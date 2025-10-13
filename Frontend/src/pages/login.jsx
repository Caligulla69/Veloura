import { useAuthStore } from "../store/useAuthStore"; // adjust path if needed
import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Shield,
  Sparkles,
} from "lucide-react";
import { redirect, useNavigate } from "react-router-dom";

const PremiumLoginPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(false);
  const {user}=useAuthStore;
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  const setUser = useAuthStore.getState().setUser; // access store function

  try {
    const endpoint = isLoginMode
      ? `${API_URL}/loginUser`
      : `${API_URL}/registerUser`;

    const payload = isLoginMode
      ? {
          email: formData.email,
          password: formData.password,
        }
      : {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        };

    if (!isLoginMode && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    const response = await fetch(endpoint, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Something went wrong");

    // ✅ Set user in Zustand (so entire app knows user is logged in)
    setUser(data.user);
    console.log(data.user);
    
    if(data.user.role==="admin"){
      console.log("heklllo");
      
      setTimeout(() => navigate("/adminDashboard"), 1500);
      
    }
    else{

      setTimeout(() => navigate("/dashboard"), 1500);
    }
    
    setActionSuccess(true);
    setTimeout(() => setActionSuccess(false), 3000);

    // Redirect
  } catch (error) {
    console.error("Error:", error);
    alert(error.message);
  } finally {
    setIsLoading(false);
  }
};


  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      rememberMe: false,
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-6">
      {/* Grain Texture Overlay */}
      <div className="fixed inset-0 opacity-20 pointer-events-none bg-repeat bg-[length:256px_256px] bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20256%20256%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noiseFilter%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%224%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noiseFilter)%22%20opacity=%220.4%22/%3E%3C/svg%3E')]" />

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-light text-white mb-2">
            {isLoginMode ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-white/60 font-light">
            {isLoginMode
              ? "Sign in to your premium account"
              : "Join our premium community"}
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="space-y-6">
            {/* Name Fields - Only for Registration */}
            {!isLoginMode && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="text-white/80 font-light text-sm"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    placeholder="John"
                    className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/40 font-light focus:outline-none focus:border-white/60 focus:bg-white/15 transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="text-white/80 font-light text-sm"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    placeholder="Doe"
                    className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/40 font-light focus:outline-none focus:border-white/60 focus:bg-white/15 transition-all duration-300"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-white/80 font-light text-sm"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/40 font-light focus:outline-none focus:border-white/60 focus:bg-white/15 transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-white/80 font-light text-sm"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/40 font-light focus:outline-none focus:border-white/60 focus:bg-white/15 transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field - Only for Registration */}
            {!isLoginMode && (
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-white/80 font-light text-sm"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    placeholder="Confirm your password"
                    className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/40 font-light focus:outline-none focus:border-white/60 focus:bg-white/15 transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Remember Me & Forgot Password - Only for Login */}
            {isLoginMode && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) =>
                      handleInputChange("rememberMe", e.target.checked)
                    }
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded transition-all duration-300 ${
                      formData.rememberMe
                        ? "bg-white border-white"
                        : "border-white/30 hover:border-white/60"
                    }`}
                  >
                    {formData.rememberMe && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-black rounded-sm"></div>
                      </div>
                    )}
                  </div>
                  <span className="text-white/70 font-light text-sm">
                    Remember me
                  </span>
                </label>

                <button
                  type="button"
                  className="text-white/70 hover:text-white font-light text-sm transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Terms Agreement - Only for Registration */}
            {!isLoginMode && (
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) =>
                      handleInputChange("rememberMe", e.target.checked)
                    }
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded transition-all duration-300 mt-0.5 ${
                      formData.rememberMe
                        ? "bg-white border-white"
                        : "border-white/30 hover:border-white/60"
                    }`}
                  >
                    {formData.rememberMe && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-black rounded-sm"></div>
                      </div>
                    )}
                  </div>
                  <span className="text-white/70 font-light text-sm leading-relaxed">
                    I agree to the{" "}
                    <button className="text-white hover:text-white/80 underline underline-offset-2 transition-colors">
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button className="text-white hover:text-white/80 underline underline-offset-2 transition-colors">
                      Privacy Policy
                    </button>
                  </span>
                </label>
              </div>
            )}

            {/* Success Message */}
            {actionSuccess && (
              <div className="bg-green-500/20 border border-green-400/30 text-green-400 p-4 rounded-2xl backdrop-blur-sm text-center">
                ✓{" "}
                {isLoginMode
                  ? "Welcome back! Redirecting..."
                  : "Account created successfully!"}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-white text-black py-4 px-8 rounded-2xl font-medium hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                  {isLoginMode ? "Signing in..." : "Creating account..."}
                </>
              ) : (
                <>
                  {isLoginMode ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl px-4">
                <span className="text-white/40 font-light text-sm">
                  or continue with
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="py-3 px-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white font-light hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>

              <button
                type="button"
                className="py-3 px-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white font-light hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>
          </div>
        </div>

        {/* Mode Toggle Link */}
        <div className="text-center mt-8">
          <span className="text-white/60 font-light">
            {isLoginMode
              ? "Don't have an account? "
              : "Already have an account? "}
          </span>
          <button
            onClick={toggleMode}
            className="text-white hover:text-white/80 font-light underline underline-offset-4 transition-colors"
          >
            {isLoginMode ? "Create one here" : "Sign in here"}
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-white/10">
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <Shield className="w-4 h-4" />
            <span className="font-light">256-bit SSL</span>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <Lock className="w-4 h-4" />
            <span className="font-light">Secure Login</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumLoginPage;
