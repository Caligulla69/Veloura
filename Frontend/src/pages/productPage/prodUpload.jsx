import React, { useState, useRef } from 'react';
import { Upload, X, CheckCircle, AlertCircle, Camera } from 'lucide-react';
import { useEffect } from 'react';
import { checkAuth } from '../../utils/checkAuth';
import { useNavigate } from 'react-router-dom';

const PremiumProductUpload = () => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    stock: '',
    image: null,
    imagePreview: null,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [message, setMessage] = useState('');
  const navigate= useNavigate()
  
   useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const isAuthenticated = await checkAuth();
        
        if (!isAuthenticated) {
          navigate("/login");
          return;
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        navigate("/login");
      }
    };
  
    checkAuthentication();
  }, [navigate]);

  const categories = ['Electronics', 'Clothing', 'Home', 'Sports', 'Books', 'Toys', 'Beauty', 'Food'];
  const brands = ['Brand A', 'Brand B', 'Brand C', 'Brand D', 'Premium Co', 'Luxury Inc', 'Standard Co'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !formData.name ||
    !formData.price ||
    !formData.image ||
    !formData.category ||
    !formData.brand
  ) {
    setUploadStatus("error");
    setMessage("Please fill in all required fields and upload an image");
    setTimeout(() => setUploadStatus(null), 4000);
    return;
  }

  setIsLoading(true);
  setUploadStatus(null);

  try {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("brand", formData.brand);
    formDataToSend.append("stock", formData.stock);
    formDataToSend.append("image", formData.image); // 👈 actual file

    const response = await fetch(`${API_URL}/addProduct`, {
      method: "POST",
      body: formDataToSend,
      credentials: "include",
    });

    if (!response.ok) throw new Error("Product upload failed");

    setUploadStatus("success");
    setMessage("Product uploaded successfully!");
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      brand: "",
      stock: "",
      image: null,
      imagePreview: null,
    });

    setTimeout(() => {
      setUploadStatus(null);
      setMessage("");
    }, 4000);
  } catch (error) {
    setUploadStatus("error");
    setMessage(error.message || "Failed to upload product. Please try again.");
    setTimeout(() => setUploadStatus(null), 4000);
  } finally {
    setIsLoading(false);
  }
};


  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: null
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      {/* Grain Texture Overlay */}
      <div className="fixed inset-0 opacity-20 pointer-events-none bg-repeat bg-[length:256px_256px] bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20256%20256%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noiseFilter%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%224%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noiseFilter)%22%20opacity=%220.4%22/%3E%3C/svg%3E')]" />

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl mb-6">
            <Upload className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-light text-white mb-2">Add New Product</h1>
          <p className="text-white/60 font-light">Upload and list your product to the marketplace</p>
        </div>

        {/* Status Messages */}
        {uploadStatus === 'success' && (
          <div className="mb-8 bg-green-500/20 border border-green-400/30 text-green-400 p-4 rounded-2xl backdrop-blur-sm flex items-center gap-3">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="mb-8 bg-red-500/20 border border-red-400/30 text-red-400 p-4 rounded-2xl backdrop-blur-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Form */}
        <div className="space-y-6" onSubmit={handleSubmit}>
          {/* Image Upload Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            <h2 className="text-white font-medium mb-6 flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Product Image
            </h2>

            {formData.imagePreview ? (
              <div className="relative">
                <img 
                  src={formData.imagePreview} 
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-2xl border border-white/10"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-4 right-4 bg-red-500/80 hover:bg-red-600 p-2 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-sm transition-colors"
                >
                  Change Image
                </button>
              </div>
            ) : (
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center cursor-pointer hover:border-white/40 transition-colors bg-white/5"
              >
                <Upload className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/80 font-light mb-2">Drag and drop your image here</p>
                <p className="text-white/50 text-sm font-light">or click to browse from your device</p>
                <p className="text-white/40 text-xs mt-4">Supported formats: JPG, PNG, WebP (Max 5MB)</p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Product Details Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            <h2 className="text-white font-medium mb-6">Product Details</h2>

            <div className="space-y-5">
              {/* Product Name */}
              <div>
                <label className="block text-white/80 text-sm font-light mb-2">
                  Product Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-white/80 text-sm font-light mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  rows="4"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors resize-none"
                />
              </div>

              {/* Price and Stock Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-light mb-2">
                    Price ($) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-light mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>
              </div>

              {/* Category and Brand Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-light mb-2">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='white' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1rem',
                      paddingRight: '2.5rem'
                    }}
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-light mb-2">
                    Brand <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='white' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1rem',
                      paddingRight: '2.5rem'
                    }}
                  >
                    <option value="">Select a brand</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-white text-black py-4 px-8 rounded-2xl font-medium hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                Uploading Product...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Upload Product
              </>
            )}
          </button>

          {/* Helper Text */}
          <div className="text-center text-white/50 text-xs font-light">
            <span className="text-red-400">*</span> Required fields
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumProductUpload;