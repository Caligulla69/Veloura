import React, { useState, useMemo, useCallback, memo, useEffect } from "react";
import {
  Minus,
  Plus,
  X,
  Edit3,
  Truck,
  CreditCard,
  Smartphone,
  DollarSign,
  Shield,
  Lock,
  Award,
  Check,
  Save,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../../utils/checkAuth";
import { useCartStore } from "../../store/useCartStore";
import API_URL from "../../utils/api";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});



const CartItem = memo(({ item, onUpdateQuantity, onRemove }) => {
  const handleDecrease = useCallback(
    () => onUpdateQuantity(item.id, item.quantity - 1),
    [item.id, item.quantity, onUpdateQuantity]
  );
  const handleIncrease = useCallback(
    () => onUpdateQuantity(item.id, item.quantity + 1),
    [item.id, item.quantity, onUpdateQuantity]
  );
  const handleRemove = useCallback(
    () => onRemove(item.id),
    [item.id, onRemove]
  );

  const formattedPrice = useMemo(
    () => currencyFormatter.format(item.price),
    [item.price]
  );
  const formattedTotal = useMemo(
    () =>
      item.quantity > 1
        ? currencyFormatter.format(item.price * item.quantity)
        : null,
    [item.price, item.quantity]
  );

  return (
    <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <div className="flex sm:block">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden flex-shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="ml-4 sm:hidden flex items-center bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl border border-white/30 rounded-xl h-10">
            <button
              className="p-2 text-white hover:text-white/70 hover:bg-white/10 transition-colors rounded-l-xl"
              onClick={handleDecrease}
              type="button"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-3 text-white font-light text-sm">
              {item.quantity}
            </span>
            <button
              className="p-2 text-white hover:text-white/70 hover:bg-white/10 transition-colors rounded-r-xl"
              onClick={handleIncrease}
              type="button"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <h3 className="text-white font-light text-base sm:text-lg">
            {item.name}
          </h3>
          <p className="text-white/60 font-light text-sm">
            Color: {item.color}
          </p>

          <div className="flex justify-between items-center sm:hidden">
            <div>
              <div className="text-lg font-light text-white">
                {formattedPrice}
              </div>
              {formattedTotal && (
                <div className="text-white/60 font-light text-sm">
                  Total: {formattedTotal}
                </div>
              )}
            </div>
            <button
              className="text-red-400 hover:text-red-300 font-light text-sm transition-colors flex items-center gap-2"
              onClick={handleRemove}
              type="button"
            >
              <X className="w-4 h-4" />
              Remove
            </button>
          </div>
        </div>

        <div className="hidden sm:block relative">
          <div className="flex items-center bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl border border-white/30 rounded-xl mb-4">
            <button
              className="p-2 text-white hover:text-white/70 hover:bg-white/10 transition-colors rounded-l-xl"
              onClick={handleDecrease}
              type="button"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-3 text-white font-light text-sm">
              {item.quantity}
            </span>
            <button
              className="p-2 text-white hover:text-white/70 hover:bg-white/10 transition-colors rounded-r-xl"
              onClick={handleIncrease}
              type="button"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <div className="text-right">
            <div className="text-xl sm:text-2xl font-light text-white">
              {formattedPrice}
            </div>
            {formattedTotal && (
              <div className="text-white/60 font-light text-sm mt-1">
                Total: {formattedTotal}
              </div>
            )}
          </div>

          <button
            className="text-red-400 hover:text-red-300 font-light text-sm transition-colors flex items-center gap-2 mt-2"
            onClick={handleRemove}
            type="button"
          >
            <X className="w-4 h-4" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
});

const PaymentOption = memo(({ option, isSelected, onSelect }) => {
  const handleClick = useCallback(
    () => onSelect(option.key),
    [option.key, onSelect]
  );
  const Icon = option.icon;

  return (
    <div
      className={`relative p-4 sm:p-6 bg-gradient-to-r backdrop-blur-xl border rounded-2xl cursor-pointer transition-all ${
        isSelected
          ? "from-white/20 to-white/10 border-white shadow-xl shadow-white/20"
          : "from-white/5 to-white/10 border-white/20 hover:from-white/10 hover:to-white/5"
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        <span className="text-white font-light text-sm sm:text-base">
          {option.label}
        </span>
      </div>

      {isSelected && (
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
        </div>
      )}
    </div>
  );
});

const DeliveryInfo = memo(
  ({
    formData,
    tempFormData,
    isEditing,
    onStartEdit,
    onSave,
    onCancel,
    onTempChange,
  }) => (
    <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <h3 className="text-xl sm:text-2xl font-light text-white">
          Delivery Information
        </h3>
        {!isEditing ? (
          <button
            onClick={onStartEdit}
            className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 text-white rounded-2xl hover:from-white/20 hover:to-white/10 transition-colors shadow-lg w-fit"
            type="button"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={onSave}
              className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-green-500/20 to-green-500/10 backdrop-blur-xl border border-green-400/30 text-green-300 rounded-2xl hover:from-green-500/30 hover:to-green-500/20 transition-colors shadow-lg"
              type="button"
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Save</span>
            </button>
            <button
              onClick={onCancel}
              className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-red-500/20 to-red-500/10 backdrop-blur-xl border border-red-400/30 text-red-300 rounded-2xl hover:from-red-500/30 hover:to-red-500/20 transition-colors shadow-lg"
              type="button"
            >
              <XCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Cancel</span>
            </button>
          </div>
        )}
      </div>

      {!isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 sm:py-3 border-b border-white/10">
              <span className="text-white/60 font-light text-sm sm:text-base">
                Name
              </span>
              <span className="text-white font-light text-sm sm:text-base">
                {formData.firstName} {formData.lastName}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 sm:py-3 border-b border-white/10">
              <span className="text-white/60 font-light text-sm sm:text-base">
                Email
              </span>
              <span className="text-white font-light text-sm sm:text-base break-all">
                {formData.email}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 sm:py-3 border-b border-white/10">
              <span className="text-white/60 font-light text-sm sm:text-base">
                Phone
              </span>
              <span className="text-white font-light text-sm sm:text-base">
                {formData.phone}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 sm:py-3 border-b border-white/10">
              <span className="text-white/60 font-light text-sm sm:text-base">
                Address
              </span>
              <span className="text-white font-light text-sm sm:text-base sm:text-right">
                {formData.address}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 sm:py-3 border-b border-white/10">
              <span className="text-white/60 font-light text-sm sm:text-base">
                Zip Code
              </span>
              <span className="text-white font-light text-sm sm:text-base">
                {formData.zipCode}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="text-white/80 font-light flex items-center gap-2 mb-2">
              First Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={tempFormData.firstName}
              onChange={onTempChange}
              className="w-full bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors text-sm sm:text-base"
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label className="text-white/80 font-light flex items-center gap-2 mb-2">
              Last Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={tempFormData.lastName}
              onChange={onTempChange}
              className="w-full bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors text-sm sm:text-base"
              placeholder="Enter your last name"
            />
          </div>
          <div>
            <label className="text-white/80 font-light flex items-center gap-2 mb-2">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={tempFormData.email}
              onChange={onTempChange}
              className="w-full bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors text-sm sm:text-base"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="text-white/80 font-light flex items-center gap-2 mb-2">
              Phone <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={tempFormData.phone}
              onChange={onTempChange}
              className="w-full bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors text-sm sm:text-base"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label className="text-white/80 font-light flex items-center gap-2 mb-2">
              Address <span className="text-red-400">*</span>
            </label>
            <textarea
              name="address"
              value={tempFormData.address}
              onChange={onTempChange}
              rows={3}
              className="w-full bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors resize-none text-sm sm:text-base"
              placeholder="Enter your full address"
            />
          </div>
          <div>
            <label className="text-white/80 font-light flex items-center gap-2 mb-2">
              Zip Code <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="zipCode"
              value={tempFormData.zipCode}
              onChange={onTempChange}
              className="w-full bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors text-sm sm:text-base"
              placeholder="Enter zip code"
            />
          </div>
        </div>
      )}

      <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-400/20 rounded-2xl">
        <div className="p-2 sm:p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl">
          <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-green-300" />
        </div>
        <div>
          <div className="text-white font-light text-sm sm:text-base">
            Estimated Delivery
          </div>
          <div className="text-green-300 font-light text-xs sm:text-sm">
            3-5 business days
          </div>
        </div>
      </div>
    </div>
  )
);

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCartStore();
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isEditingDelivery, setIsEditingDelivery] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    zipCode: "",
    cardHolderName: "",
  });
  const [tempFormData, setTempFormData] = useState(formData);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const isAuthenticated = await checkAuth();
        if (!isAuthenticated) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        navigate("/login");
      }
    };
    checkAuthentication();
  }, [navigate]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await fetch(`${API_URL}/userData`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          setFormData({
            firstName: data.user.firstName || "",
            lastName: data.user.lastName || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
            address: data.user.address || "",
            zipCode: data.user.zipCode || "",
            cardHolderName: "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    if (cart && Array.isArray(cart)) {
      setCartItems(cart);
    }
  }, [cart]);

  const updateQuantity = useCallback((id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);

  const removeItem = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    removeFromCart(id);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleTempInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setTempFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const startEditingDelivery = useCallback(() => {
    setTempFormData(formData);
    setIsEditingDelivery(true);
  }, [formData]);

  const saveDeliveryInfo = useCallback(() => {
    if (
      !tempFormData.firstName ||
      !tempFormData.lastName ||
      !tempFormData.email ||
      !tempFormData.address ||
      !tempFormData.zipCode ||
      !tempFormData.phone
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(tempFormData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    setFormData(tempFormData);
    setIsEditingDelivery(false);
  }, [tempFormData]);

  const cancelEditingDelivery = useCallback(() => {
    setTempFormData(formData);
    setIsEditingDelivery(false);
  }, [formData]);

  const paymentOptions = useMemo(
    () => [
      { key: "cod", icon: DollarSign, label: "Cash on Delivery" },
      { key: "credit", icon: CreditCard, label: "Credit Card" },
      { key: "paypal", icon: CreditCard, label: "PayPal" },
      { key: "apple", icon: Smartphone, label: "Apple Pay" },
    ],
    []
  );

  const showCardHolderField =
    paymentMethod === "credit" || paymentMethod === "paypal";
  const isOrderDisabled = cartItems.length === 0;

 const handlePlaceOrder = async () => {
  if (isOrderDisabled) return;

  if (showCardHolderField && !formData.cardHolderName) {
    alert("Please enter card holder name");
    return;
  }

  if (
    !formData.firstName ||
    !formData.lastName ||
    !formData.email ||
    !formData.address ||
    !formData.zipCode ||
    !formData.phone
  ) {
    alert(
      "Please complete your delivery information before placing the order"
    );
    return;
  }

  try {
    const shippingAddress = `${formData.firstName} ${formData.lastName}, ${formData.address}, ${formData.zipCode}, Phone: ${formData.phone}, Email: ${formData.email}`;
    const username = `${formData.firstName} ${formData.lastName}`
    const paymentMethodMap = {
      cod: "COD",
      credit: "Card",
      paypal: "PayPal",
      apple: "Card",
    };

    // Don't send cart - let backend fetch it from session/database
    const orderData = {
      username,
      cart,
      shippingAddress,
      paymentMethod: paymentMethodMap[paymentMethod] || "COD",
    };

    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(orderData),
    });

    const data = await res.json();

    if (res.ok) {
      cartItems.forEach((item) => removeFromCart(item.id));
      setCartItems([]);
      alert("Order placed successfully! You will receive a confirmation email shortly.");
      navigate("/prodListing");
    } else {
      alert(data.message || "Failed to place order. Please try again.");
    }
  } catch (error) {
    console.error("Order placement failed:", error);
    alert("An error occurred while placing your order. Please try again.");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 relative">
      <Navbar />
      <div
        className="fixed inset-0 opacity-10 pointer-events-none bg-repeat mix-blend-multiply"
        style={{
          backgroundSize: "150px 150px",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-6 sm:px-6 sm:py-12 max-w-7xl">
        <div className="mb-8 sm:mb-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
            <span className="text-white/60 text-xs sm:text-sm font-light tracking-widest uppercase bg-gradient-to-r from-white/10 to-white/5 px-4 py-2 sm:px-6 sm:py-3 rounded-full backdrop-blur-sm border border-white/20">
              Secure Checkout
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/80 leading-tight">
            Complete Your Order
          </h1>
          <p className="text-white/70 text-lg sm:text-xl font-light mt-2 sm:mt-4">
            Review your items and proceed to payment
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 lg:gap-16">
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-light text-white">
                  Cart Items
                </h2>
                <div className="bg-gradient-to-r from-white/20 to-white/10 px-3 py-1 sm:px-4 sm:py-2 rounded-2xl backdrop-blur-sm border border-white/30">
                  <span className="text-white/80 font-light text-sm">
                    {cartItems.length} items
                  </span>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}

                {cartItems.length === 0 && (
                  <div className="text-center py-12 text-white/60 font-light">
                    Your cart is empty. Please add some products to proceed.
                  </div>
                )}
              </div>
            </div>

            <DeliveryInfo
              formData={formData}
              tempFormData={tempFormData}
              isEditing={isEditingDelivery}
              onStartEdit={startEditingDelivery}
              onSave={saveDeliveryInfo}
              onCancel={cancelEditingDelivery}
              onTempChange={handleTempInputChange}
            />
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl">
              <h2 className="text-2xl sm:text-3xl font-light text-white mb-6 sm:mb-8">
                Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {paymentOptions.map((option) => (
                  <PaymentOption
                    key={option.key}
                    option={option}
                    isSelected={paymentMethod === option.key}
                    onSelect={setPaymentMethod}
                  />
                ))}
              </div>

              {showCardHolderField && (
                <div className="mt-6 sm:mt-8">
                  <label className="text-white/80 font-light flex items-center gap-2 mb-2">
                    Card Holder Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="cardHolderName"
                    value={formData.cardHolderName}
                    onChange={handleInputChange}
                    className="w-full bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors text-sm sm:text-base"
                    placeholder="Enter card holder name"
                  />
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                  </div>
                  <div>
                    <div className="text-white font-light text-xs sm:text-sm">
                      SSL Secured
                    </div>
                    <div className="text-white/60 font-light text-xs">
                      256-bit encryption
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl">
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />
                  </div>
                  <div>
                    <div className="text-white font-light text-xs sm:text-sm">
                      Data Protected
                    </div>
                    <div className="text-white/60 font-light text-xs">
                      PCI compliant
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300" />
                  </div>
                  <div>
                    <div className="text-white font-light text-xs sm:text-sm">
                      Money Back
                    </div>
                    <div className="text-white/60 font-light text-xs">
                      30-day guarantee
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              className={`w-full py-4 sm:py-6 px-6 sm:px-8 text-lg sm:text-xl font-light rounded-2xl sm:rounded-3xl transition-all shadow-2xl ${
                isOrderDisabled
                  ? "bg-gradient-to-r from-gray-600/20 to-gray-500/20 text-gray-400 cursor-not-allowed border border-gray-500/20"
                  : "bg-gradient-to-r from-white via-white to-white/90 text-black hover:from-white/90 hover:via-white/90 hover:to-white/80 hover:shadow-white/20 border-0"
              } flex items-center justify-center gap-3`}
              disabled={isOrderDisabled}
              type="button"
              onClick={handlePlaceOrder}
            >
              <Check className="w-5 h-5 sm:w-6 sm:h-6" />
              Place Order
            </button>

            <div className="text-center text-white/60 font-light text-xs sm:text-sm">
              By placing this order, you agree to our{" "}
              <span className="text-white/80 hover:text-white cursor-pointer transition-colors">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-white/80 hover:text-white cursor-pointer transition-colors">
                Privacy Policy
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
