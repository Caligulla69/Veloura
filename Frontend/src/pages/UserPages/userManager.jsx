import React, { useState, useMemo, useRef, useCallback } from "react";
import {
  User,
  Settings,
  Package,
  Heart,
  Bell,
  CreditCard,
  Download,
  LogOut,
  Eye,
  ShoppingCart,
  Calendar,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Edit3,
  Plus,
  Trash2,
  Mail,
  Phone,
  Camera,
  Key,
  RefreshCw,
  ChevronRight,
  Search,
  Gift,
  Tag,
  Menu,
  Check,
  Lock,
  HelpCircle,
  MessageCircle,
  Home,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [searchQuery, setSearchQuery] = useState("");
  const [orderFilter, setOrderFilter] = useState("all");
  const [editingProfile, setEditingProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const { user } = useAuthStore();
  const navigate= useNavigate()



  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Cashmere Blend Overcoat",
      price: 1899.99,
      image: "/api/placeholder/200/200",
      inStock: true,
      onSale: false,
    },
    {
      id: 2,
      name: "Italian Leather Handbag",
      price: 1299.99,
      salePrice: 999.99,
      image: "/api/placeholder/200/200",
      inStock: true,
      onSale: true,
    },
    {
      id: 3,
      name: "Silk Evening Dress",
      price: 2499.99,
      image: "/api/placeholder/200/200",
      inStock: false,
      onSale: false,
    },
  ]);

  const [profileData, setProfileData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    darkMode: true,
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      name: "Alexandra Sterling",
      address: "123 Park Avenue, Apt 15B",
      city: "New York, NY 10021",
      isDefault: true,
    },
    {
      id: 2,
      type: "Office",
      name: "Alexandra Sterling",
      address: "456 Madison Avenue, Suite 2000",
      city: "New York, NY 10022",
      isDefault: false,
    },
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "Visa",
      lastFour: "4242",
      expiryDate: "12/26",
      isDefault: true,
    },
    {
      id: 2,
      type: "Mastercard",
      lastFour: "8888",
      expiryDate: "09/25",
      isDefault: false,
    },
  ]);

  const [newAddress, setNewAddress] = useState({
    type: "",
    name: "",
    address: "",
    city: "",
  });

  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);

  // Memoized user data
  const userData = useMemo(() => ({
    name: `${profileData.firstName} ${profileData.lastName}`,
    email: profileData.email,

  
  }), [profileData.firstName, profileData.lastName, profileData.email]);

  // Sample orders data
  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-08-20",
      status: "Delivered",
      total: 1299.99,
      items: 3,
      trackingNumber: "TRK123456789",
    },
    {
      id: "ORD-2024-002",
      date: "2024-08-22",
      status: "Shipped",
      total: 899.99,
      items: 2,
      trackingNumber: "TRK123456790",
    },
    {
      id: "ORD-2024-003",
      date: "2024-08-24",
      status: "Pending",
      total: 2199.99,
      items: 4,
      trackingNumber: null,
    },
  ];

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = order.id
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter =
        orderFilter === "all" || order.status.toLowerCase() === orderFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, orderFilter]);

  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "orders", label: "Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Optimized helper functions
  const getStatusColor = useCallback((status) => {
    const statusColors = {
      delivered: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      shipped: "text-blue-400 bg-blue-400/10 border-blue-400/20",
      pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
      cancelled: "text-red-400 bg-red-400/10 border-red-400/20",
    };
    return statusColors[status.toLowerCase()] || "text-gray-400 bg-gray-400/10 border-gray-400/20";
  }, []);

  const getStatusIcon = useCallback((status) => {
    const statusIcons = {
      delivered: CheckCircle,
      shipped: Truck,
      pending: Clock,
      cancelled: XCircle,
    };
    return statusIcons[status.toLowerCase()] || Package;
  }, []);

  const getNotificationIcon = useCallback((type) => {
    const notificationIcons = {
      order: Package,
      sale: Tag,
      recommendation: Gift,
    };
    return notificationIcons[type] || Bell;
  }, []);

  // Optimized event handlers
  const handleImageUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleProfileUpdate = useCallback(() => {
    if (editingProfile) {
      setEditingProfile(false);
      alert("Profile updated successfully!");
    } else {
      setEditingProfile(true);
    }
  }, [editingProfile]);

  const handleRemoveFromWishlist = useCallback((itemId) => {
    setWishlistItems(prev => prev.filter((item) => item.id !== itemId));
  }, []);

  const handleAddToCart = useCallback((itemId) => {
    const item = wishlistItems.find((item) => item.id === itemId);
    if (item && item.inStock) {
      alert(`${item.name} added to cart!`);
    }
  }, [wishlistItems]);





  const togglePreference = useCallback((key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleTabChange = useCallback((tabId) => {
    if (tabId === "logout") {
      // Handle logout logic here
      navigate("/")
      
    }
    if(tabId==="home"){
      navigate("/prodListing")
    }
    setActiveTab(tabId);
    setSidebarOpen(false);
  }, []);

  const handleAddAddress = useCallback(() => {
    if (
      newAddress.type &&
      newAddress.name &&
      newAddress.address &&
      newAddress.city
    ) {
      const newAddr = {
        id: addresses.length + 1,
        ...newAddress,
        isDefault: addresses.length === 0,
      };
      setAddresses(prev => [...prev, newAddr]);
      setNewAddress({ type: "", name: "", address: "", city: "" });
      setShowAddAddress(false);
    }
  }, [newAddress, addresses.length]);

  const handleRemoveAddress = useCallback((addressId) => {
    setAddresses(prev => prev.filter((addr) => addr.id !== addressId));
  }, []);

  const handleSetDefaultAddress = useCallback((addressId) => {
    setAddresses(prev =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      }))
    );
  }, []);

  const handleAddPaymentMethod = useCallback(() => {
    if (
      newPaymentMethod.type &&
      newPaymentMethod.cardNumber &&
      newPaymentMethod.expiryDate &&
      newPaymentMethod.cvv
    ) {
      const newPayment = {
        id: paymentMethods.length + 1,
        type: newPaymentMethod.type,
        lastFour: newPaymentMethod.cardNumber.slice(-4),
        expiryDate: newPaymentMethod.expiryDate,
        isDefault: paymentMethods.length === 0,
      };
      setPaymentMethods(prev => [...prev, newPayment]);
      setNewPaymentMethod({
        type: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      });
      setShowAddPayment(false);
    }
  }, [newPaymentMethod, paymentMethods.length]);

  const handleRemovePaymentMethod = useCallback((paymentId) => {
    setPaymentMethods(prev =>
      prev.filter((payment) => payment.id !== paymentId)
    );
  }, []);

  const handleSetDefaultPayment = useCallback((paymentId) => {
    setPaymentMethods(prev =>
      prev.map((payment) => ({
        ...payment,
        isDefault: payment.id === paymentId,
      }))
    );
  }, []);



  // Memoized Sidebar component
  const Sidebar = React.memo(({ className = "" }) => (
    <div className={`bg-black/40 backdrop-blur-xl border-r border-white/10 ${className}`}>
      <div className="p-4 lg:p-8">
        {/* User Profile Summary */}
        <div className="mb-10 lg:mb-12">
          <div className="relative mb-4 lg:mb-6">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-white to-gray-200 rounded-2xl flex items-center justify-center shadow-2xl mx-auto overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-bold text-black text-lg lg:text-2xl">
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-300 transition-colors"
            >
              <Camera className="w-4 h-4 text-black" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div className="text-center">
            <h2 className="text-white text-lg lg:text-xl font-light tracking-wide mb-2">
              {userData.name}
            </h2>
            <p className="text-white/60 text-xs lg:text-sm tracking-widest uppercase">
              Member Since {userData.memberSince}
            </p>
          </div>

      
        </div>

        {/* Navigation Tabs */}
        <nav className="space-y-1 lg:space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                className={`w-full flex items-center space-x-3 lg:space-x-4 px-4 lg:px-6 py-3 lg:py-4 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-white/10 text-white border border-white/20"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => handleTabChange(tab.id)}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-light tracking-wide text-sm lg:text-base">
                  {tab.label}
                </span>
                
                {isActive && (
                  <ChevronRight className="w-4 h-4 ml-auto flex-shrink-0" />
                )}
              </button>
            );
          })}
          
          {/* Logout Button */}
          <button
            className="w-full flex items-center space-x-3 lg:space-x-4 px-4 lg:px-6 py-3 lg:py-4 rounded-xl transition-all duration-200 group text-white/60 hover:text-white hover:bg-white/5 border-t border-white/10 mt-4 pt-4"
            onClick={() => handleTabChange("logout")}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="font-light tracking-wide text-sm lg:text-base">
              Logout
            </span>
          </button>
        </nav>
      </div>
    </div>
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Background Elements */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden lg:block w-80 min-h-screen" />

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                onClick={() => setSidebarOpen(false)}
              />

              {/* Sidebar */}
              <motion.div
                initial={{ x: -400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -400, opacity: 0 }}
                transition={{
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="lg:hidden fixed left-0 top-0 bottom-0 w-80 z-50 bg-black/90 backdrop-blur-xl border-r border-white/10"
              >
                <Sidebar />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Sticky Mobile Header */}
          <div className="lg:hidden sticky top-0 z-30 bg-black/90 backdrop-blur-xl border-b border-white/10 p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-white/60 hover:text-white transition-colors p-1"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-white font-light text-lg capitalize">
                {activeTab}
              </h1>
           
            </div>
          </div>

          <div className="flex-1 p-4 lg:p-12 overflow-auto">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6 lg:space-y-8">
                <div>
                  <h1 className="text-2xl lg:text-4xl font-light text-white mb-2 tracking-tight">
                    Profile Management
                  </h1>
                  <p className="text-white/60 tracking-wide text-sm lg:text-base">
                    Manage your personal information and preferences
                  </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
                  {/* Personal Information */}
                  <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-white text-lg lg:text-xl font-light tracking-wide">
                        Personal Information
                      </h3>
                      <button
                        onClick={handleProfileUpdate}
                        className="text-yellow-400 hover:text-yellow-300 transition-colors"
                      >
                        <Edit3 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-4 lg:space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-white/60 text-sm tracking-wide uppercase mb-2 block">
                            First Name
                          </label>
                          <input
                            type="text"
                            value={profileData.firstName}
                            onChange={(e) =>
                              setProfileData((prev) => ({
                                ...prev,
                                firstName: e.target.value,
                              }))
                            }
                            disabled={!editingProfile}
                            className={`w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors ${
                              !editingProfile ? "opacity-60" : ""
                            }`}
                          />
                        </div>
                        <div>
                          <label className="text-white/60 text-sm tracking-wide uppercase mb-2 block">
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={profileData.lastName}
                            onChange={(e) =>
                              setProfileData((prev) => ({
                                ...prev,
                                lastName: e.target.value,
                              }))
                            }
                            disabled={!editingProfile}
                            className={`w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors ${
                              !editingProfile ? "opacity-60" : ""
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-white/60 text-sm tracking-wide uppercase mb-2 block flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>Email</span>
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          disabled={!editingProfile}
                          className={`w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors ${
                            !editingProfile ? "opacity-60" : ""
                          }`}
                        />
                      </div>

                      <div>
                        <label className="text-white/60 text-sm tracking-wide uppercase mb-2 block flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>Phone</span>
                        </label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          disabled={!editingProfile}
                          className={`w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors ${
                            !editingProfile ? "opacity-60" : ""
                          }`}
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleProfileUpdate}
                      className={`mt-6 px-6 py-3 rounded-lg font-medium transition-colors ${
                        editingProfile
                          ? "bg-green-500 text-white hover:bg-green-400"
                          : "bg-yellow-400 text-black hover:bg-yellow-300"
                      }`}
                    >
                      {editingProfile ? "Save Changes" : "Edit Profile"}
                    </button>
                  </div>

                  {/* Security Settings */}
                  <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-white text-lg lg:text-xl font-light tracking-wide">
                        Security
                      </h3>
                      <Key className="w-5 h-5 text-yellow-400" />
                    </div>

                    <div className="space-y-4">
                      <button className="w-full text-left p-4 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-colors group">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Lock className="w-5 h-5 text-white/60" />
                            <div>
                              <div className="text-white font-light">
                                Change Password
                              </div>
                              <div className="text-white/60 text-sm">
                                Last updated 3 months ago
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                        </div>
                      </button>

                      <button className="w-full text-left p-4 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-colors group">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Settings className="w-5 h-5 text-white/60" />
                            <div>
                              <div className="text-white font-light">
                                Connected Accounts
                              </div>
                              <div className="text-white/60 text-sm">
                                Google, Facebook
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Addresses */}
                  <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-white text-lg lg:text-xl font-light tracking-wide">
                        Addresses
                      </h3>
                      <button
                        onClick={() => setShowAddAddress(!showAddAddress)}
                        className="bg-yellow-400 text-black p-2 rounded-lg hover:bg-yellow-300 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Add Address Form */}
                    {showAddAddress && (
                      <div className="mb-6 p-4 bg-white/5 border border-white/20 rounded-lg">
                        <h4 className="text-white font-light mb-4">
                          Add New Address
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Address type (Home, Office, etc.)"
                            value={newAddress.type}
                            onChange={(e) =>
                              setNewAddress((prev) => ({
                                ...prev,
                                type: e.target.value,
                              }))
                            }
                            className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 transition-colors"
                          />
                          <input
                            type="text"
                            placeholder="Full name"
                            value={newAddress.name}
                            onChange={(e) =>
                              setNewAddress((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 transition-colors"
                          />
                          <input
                            type="text"
                            placeholder="Street address"
                            value={newAddress.address}
                            onChange={(e) =>
                              setNewAddress((prev) => ({
                                ...prev,
                                address: e.target.value,
                              }))
                            }
                            className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 transition-colors"
                          />
                          <input
                            type="text"
                            placeholder="City, State, ZIP"
                            value={newAddress.city}
                            onChange={(e) =>
                              setNewAddress((prev) => ({
                                ...prev,
                                city: e.target.value,
                              }))
                            }
                            className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 transition-colors"
                          />
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <button
                            onClick={handleAddAddress}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 transition-colors flex items-center space-x-2"
                          >
                            <Check className="w-4 h-4" />
                            <span>Save</span>
                          </button>
                          <button
                            onClick={() => setShowAddAddress(false)}
                            className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      {addresses.map((address) => (
                        <div
                          key={address.id}
                          className="p-4 bg-white/5 border border-white/20 rounded-lg"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="px-2 py-1 bg-yellow-400/20 text-yellow-400 text-xs font-medium rounded">
                                  {address.type}
                                </span>
                                {address.isDefault && (
                                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded">
                                    Default
                                  </span>
                                )}
                              </div>

                              <div className="text-white font-light">
                                {address.name}
                              </div>
                              <div className="text-white/60 text-sm">
                                {address.address}
                              </div>
                              <div className="text-white/60 text-sm">
                                {address.city}
                              </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                              {!address.isDefault && (
                                <button
                                  onClick={() =>
                                    handleSetDefaultAddress(address.id)
                                  }
                                  className="text-yellow-400 hover:text-yellow-300 text-sm transition-colors"
                                >
                                  Set Default
                                </button>
                              )}
                              <button
                                onClick={() => handleRemoveAddress(address.id)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-white text-lg lg:text-xl font-light tracking-wide">
                        Payment Methods
                      </h3>
                      <button
                        onClick={() => setShowAddPayment(!showAddPayment)}
                        className="bg-yellow-400 text-black p-2 rounded-lg hover:bg-yellow-300 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Add Payment Form */}
                    {showAddPayment && (
                      <div className="mb-6 p-4 bg-white/5 border border-white/20 rounded-lg">
                        <h4 className="text-white font-light mb-4">
                          Add New Payment Method
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <select
                            value={newPaymentMethod.type}
                            onChange={(e) =>
                              setNewPaymentMethod((prev) => ({
                                ...prev,
                                type: e.target.value,
                              }))
                            }
                            className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-400 transition-colors"
                          >
                            <option value="">Card Type</option>
                            <option value="Visa">Visa</option>
                            <option value="Mastercard">Mastercard</option>
                            <option value="American Express">
                              American Express
                            </option>
                          </select>
                          <input
                            type="text"
                            placeholder="Card Number"
                            value={newPaymentMethod.cardNumber}
                            onChange={(e) =>
                              setNewPaymentMethod((prev) => ({
                                ...prev,
                                cardNumber: e.target.value,
                              }))
                            }
                            className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 transition-colors"
                          />
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={newPaymentMethod.expiryDate}
                            onChange={(e) =>
                              setNewPaymentMethod((prev) => ({
                                ...prev,
                                expiryDate: e.target.value,
                              }))
                            }
                            className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 transition-colors"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            value={newPaymentMethod.cvv}
                            onChange={(e) =>
                              setNewPaymentMethod((prev) => ({
                                ...prev,
                                cvv: e.target.value,
                              }))
                            }
                            className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 transition-colors"
                          />
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <button
                            onClick={handleAddPaymentMethod}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 transition-colors flex items-center space-x-2"
                          >
                            <Check className="w-4 h-4" />
                            <span>Save</span>
                          </button>
                          <button
                            onClick={() => setShowAddPayment(false)}
                            className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      {paymentMethods.map((payment) => (
                        <div
                          key={payment.id}
                          className="p-4 bg-white/5 border border-white/20 rounded-lg"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <CreditCard className="w-6 h-6 text-white/60" />
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-white font-light">
                                    {payment.type} •••• {payment.lastFour}
                                  </span>
                                  {payment.isDefault && (
                                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded">
                                      Default
                                    </span>
                                  )}
                                </div>
                                <div className="text-white/60 text-sm">
                                  Expires {payment.expiryDate}
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              {!payment.isDefault && (
                                <button
                                  onClick={() =>
                                    handleSetDefaultPayment(payment.id)
                                  }
                                  className="text-yellow-400 hover:text-yellow-300 text-sm transition-colors"
                                >
                                  Set Default
                                </button>
                              )}
                              <button
                                onClick={() =>
                                  handleRemovePaymentMethod(payment.id)
                                }
                                className="text-red-400 hover:text-red-300 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="space-y-6 lg:space-y-8">
                <div>
                  <h1 className="text-2xl lg:text-4xl font-light text-white mb-2 tracking-tight">
                    Order History
                  </h1>
                  <p className="text-white/60 tracking-wide text-sm lg:text-base">
                    Track and manage your orders
                  </p>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search orders..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 transition-colors"
                    />
                  </div>
                  <select
                    value={orderFilter}
                    onChange={(e) => setOrderFilter(e.target.value)}
                    className="bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors"
                  >
                    <option value="all">All Orders</option>
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                  {filteredOrders.map((order) => {
                    const StatusIcon = getStatusIcon(order.status);
                    return (
                      <div
                        key={order.id}
                        className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-2">
                              <h3 className="text-white font-medium text-lg">
                                {order.id}
                              </h3>
                              <span
                                className={`flex items-center space-x-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(
                                  order.status
                                )}`}
                              >
                                <StatusIcon className="w-4 h-4" />
                                <span>{order.status}</span>
                              </span>
                            </div>
                            <div className="text-white/60 space-y-1">
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  Ordered on{" "}
                                  {new Date(order.date).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Package className="w-4 h-4" />
                                <span>
                                  {order.items} items • ${order.total}
                                </span>
                              </div>
                              {order.trackingNumber && (
                                <div className="flex items-center space-x-2">
                                  <Truck className="w-4 h-4" />
                                  <span>Tracking: {order.trackingNumber}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors">
                              <Eye className="w-4 h-4" />
                              <span>View Details</span>
                            </button>
                            {order.status.toLowerCase() === "delivered" && (
                              <button className="flex items-center space-x-2 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors">
                                <RefreshCw className="w-4 h-4" />
                                <span>Reorder</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {filteredOrders.length === 0 && (
                    <div className="text-center py-12">
                      <Package className="w-12 h-12 text-white/20 mx-auto mb-4" />
                      <p className="text-white/60">
                        No orders found matching your criteria
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div className="space-y-6 lg:space-y-8">
                <div>
                  <h1 className="text-2xl lg:text-4xl font-light text-white mb-2 tracking-tight">
                    My Wishlist
                  </h1>
                  <p className="text-white/60 tracking-wide text-sm lg:text-base">
                    Items you've saved for later
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {wishlistItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-black/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 group"
                    >
                      <div className="aspect-square bg-gray-800 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                        <div className="absolute top-4 right-4 z-10">
                          <button
                            onClick={() => handleRemoveFromWishlist(item.id)}
                            className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:text-red-400 transition-colors"
                          >
                            <Heart className="w-5 h-5 fill-current" />
                          </button>
                        </div>
                        {item.onSale && (
                          <div className="absolute top-4 left-4 z-10">
                            <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
                              Sale
                            </span>
                          </div>
                        )}
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
                            <span className="text-white font-medium">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <h3 className="text-white font-light text-lg mb-2 line-clamp-2">
                          {item.name}
                        </h3>

                        <div className="flex items-center space-x-2 mb-4">
                          {item.onSale ? (
                            <>
                              <span className="text-yellow-400 font-bold text-xl">
                                ${item.salePrice}
                              </span>
                              <span className="text-white/40 line-through">
                                ${item.price}
                              </span>
                            </>
                          ) : (
                            <span className="text-yellow-400 font-bold text-xl">
                              ${item.price}
                            </span>
                          )}
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleAddToCart(item.id)}
                            disabled={!item.inStock}
                            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-colors ${
                              item.inStock
                                ? "bg-yellow-400 text-black hover:bg-yellow-300"
                                : "bg-gray-600 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            <ShoppingCart className="w-4 h-4" />
                            <span>
                              {item.inStock ? "Add to Cart" : "Out of Stock"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {wishlistItems.length === 0 && (
                  <div className="text-center py-12">
                    <Heart className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <p className="text-white/60">Your wishlist is empty</p>
                    <button className="mt-4 px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors font-medium">
                      Continue Shopping
                    </button>
                  </div>
                )}
              </div>
            )}

           

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-6 lg:space-y-8">
                <div>
                  <h1 className="text-2xl lg:text-4xl font-light text-white mb-2 tracking-tight">
                    Account Settings
                  </h1>
                  <p className="text-white/60 tracking-wide text-sm lg:text-base">
                    Customize your account preferences
                  </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
                  {/* Notification Preferences */}
                  <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10">
                    <h3 className="text-white text-lg lg:text-xl font-light tracking-wide mb-6">
                      Notification Preferences
                    </h3>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-light">
                            Email Notifications
                          </div>
                          <div className="text-white/60 text-sm">
                            Receive order updates via email
                          </div>
                        </div>
                        <button
                          onClick={() => togglePreference("emailNotifications")}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            preferences.emailNotifications
                              ? "bg-yellow-400"
                              : "bg-white/20"
                          }`}
                        >
                          <div
                            className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                              preferences.emailNotifications
                                ? "translate-x-6"
                                : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-light">
                            SMS Notifications
                          </div>
                          <div className="text-white/60 text-sm">
                            Receive delivery updates via SMS
                          </div>
                        </div>
                        <button
                          onClick={() => togglePreference("smsNotifications")}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            preferences.smsNotifications
                              ? "bg-yellow-400"
                              : "bg-white/20"
                          }`}
                        >
                          <div
                            className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                              preferences.smsNotifications
                                ? "translate-x-6"
                                : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-light">
                            Marketing Emails
                          </div>
                          <div className="text-white/60 text-sm">
                            Receive promotional offers and updates
                          </div>
                        </div>
                        <button
                          onClick={() => togglePreference("marketingEmails")}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            preferences.marketingEmails
                              ? "bg-yellow-400"
                              : "bg-white/20"
                          }`}
                        >
                          <div
                            className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                              preferences.marketingEmails
                                ? "translate-x-6"
                                : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-light">Dark Mode</div>
                          <div className="text-white/60 text-sm">
                            Use dark theme for better viewing
                          </div>
                        </div>
                        <button
                          onClick={() => togglePreference("darkMode")}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            preferences.darkMode
                              ? "bg-yellow-400"
                              : "bg-white/20"
                          }`}
                        >
                          <div
                            className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                              preferences.darkMode
                                ? "translate-x-6"
                                : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Account Actions */}
                  <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10">
                    <h3 className="text-white text-lg lg:text-xl font-light tracking-wide mb-6">
                      Account Actions
                    </h3>

                    <div className="space-y-4">
                      <button className="w-full text-left p-4 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-colors group">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Download className="w-5 h-5 text-white/60" />
                            <div>
                              <div className="text-white font-light">
                                Download My Data
                              </div>
                              <div className="text-white/60 text-sm">
                                Export your account information
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                        </div>
                      </button>

                      <button className="w-full text-left p-4 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-colors group">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <HelpCircle className="w-5 h-5 text-white/60" />
                            <div>
                              <div className="text-white font-light">
                                Help & Support
                              </div>
                              <div className="text-white/60 text-sm">
                                Get help with your account
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                        </div>
                      </button>

                      <button className="w-full text-left p-4 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-colors group">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <MessageCircle className="w-5 h-5 text-white/60" />
                            <div>
                              <div className="text-white font-light">
                                Contact Support
                              </div>
                              <div className="text-white/60 text-sm">
                                Chat with our support team
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                        </div>
                      </button>

                      <button className="w-full text-left p-4 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors group">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Trash2 className="w-5 h-5 text-red-400" />
                            <div>
                              <div className="text-red-400 font-light">
                                Delete Account
                              </div>
                              <div className="text-red-400/60 text-sm">
                                Permanently delete your account
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-red-400/60 group-hover:text-red-400 transition-colors" />
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Privacy Settings */}
                  <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10">
                    <h3 className="text-white text-lg lg:text-xl font-light tracking-wide mb-6">
                      Privacy Settings
                    </h3>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-light">
                            Profile Visibility
                          </div>
                          <div className="text-white/60 text-sm">
                            Control who can see your profile
                          </div>
                        </div>
                        <select className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors">
                          <option value="public">Public</option>
                          <option value="friends">Friends Only</option>
                          <option value="private">Private</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-light">
                            Activity Status
                          </div>
                          <div className="text-white/60 text-sm">
                            Show when you're online
                          </div>
                        </div>
                        <button className="relative w-12 h-6 rounded-full bg-yellow-400">
                          <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 translate-x-6" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-light">
                            Data Collection
                          </div>
                          <div className="text-white/60 text-sm">
                            Allow analytics for better experience
                          </div>
                        </div>
                        <button className="relative w-12 h-6 rounded-full bg-white/20">
                          <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 translate-x-0.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Language & Region */}
                  <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10">
                    <h3 className="text-white text-lg lg:text-xl font-light tracking-wide mb-6">
                      Language & Region
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="text-white/60 text-sm tracking-wide uppercase mb-2 block">
                          Language
                        </label>
                        <select className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors">
                          <option value="en">English</option>
                          <option value="es">Español</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                          <option value="it">Italiano</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-white/60 text-sm tracking-wide uppercase mb-2 block">
                          Currency
                        </label>
                        <select className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors">
                          <option value="usd">USD ($)</option>
                          <option value="eur">EUR (€)</option>
                          <option value="gbp">GBP (£)</option>
                          <option value="cad">CAD ($)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-white/60 text-sm tracking-wide uppercase mb-2 block">
                          Time Zone
                        </label>
                        <select className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors">
                          <option value="est">Eastern Time (EST)</option>
                          <option value="pst">Pacific Time (PST)</option>
                          <option value="cst">Central Time (CST)</option>
                          <option value="mst">Mountain Time (MST)</option>
                          <option value="utc">UTC</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;