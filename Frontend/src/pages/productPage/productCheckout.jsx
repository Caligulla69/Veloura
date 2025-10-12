import React, { useState, useMemo, useCallback, memo } from "react";
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

// Pre-memoized currency formatter
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// Optimized cart item with better mobile layout
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

          {/* Mobile quantity controls next to image */}
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
          <div className="text-white/50 font-light text-xs">
            SKU: {item.sku}
          </div>

          {/* Mobile price and remove button */}
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

        {/* Desktop quantity controls and pricing */}
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

// Mobile-optimized payment option
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

// Mobile-optimized delivery info
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
                {formData.name}
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
              Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={tempFormData.name}
              onChange={onTempChange}
              className="w-full bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors text-sm sm:text-base"
              placeholder="Enter your full name"
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
            March 12 - March 14, 2025
          </div>
        </div>
      </div>
    </div>
  )
);

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState(() => [
    {
      id: 1,
      name: "Premium Zip-Up Jacket",
      color: "Silver",
      sku: "JKT-PRM-SLV-2025",
      price: 199.0,
      quantity: 1,
      image: "/products/jacket1.png",
    },
    {
      id: 2,
      name: "Premium Zip-Up Jacket",
      color: "White",
      sku: "JKT-PRM-WHT-2025",
      price: 199.0,
      quantity: 1,
      image: "/products/jacket2.png",
    },
  ]);

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isEditingDelivery, setIsEditingDelivery] = useState(false);

  const [formData, setFormData] = useState(() => ({
    name: "John Doe",
    email: "john.doe@gmail.com",
    address: "2119 Park Dr, Richmond, Virginia 23224",
    zipCode: "23224",
    phone: "+1 804-359-1787",
    cardHolderName: "",
    couponCode: "",
  }));

  const [tempFormData, setTempFormData] = useState(formData);

  // Memoized calculations
  const summary = useMemo(() => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const shipping = subtotal > 100 ? 0 : 25;
    const tax = subtotal * 0.08;
    const discount = formData.couponCode === "PREMIUM10" ? subtotal * 0.1 : 0;
    const total = subtotal + shipping + tax - discount;

    return {
      subtotal,
      shipping,
      tax,
      total,
      discount,
      itemCount: cartItems.reduce((total, item) => total + item.quantity, 0),
    };
  }, [cartItems, formData.couponCode]);

  // Handlers
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
      !tempFormData.name ||
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

  const applyCoupon = useCallback(() => {
    console.log("Applying coupon:", formData.couponCode);
  }, [formData.couponCode]);

  // Payment options
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

  // Pre-calculate formatted values
  const formattedSummary = useMemo(
    () => ({
      subtotal: currencyFormatter.format(summary.subtotal),
      shipping:
        summary.shipping === 0
          ? "Free"
          : currencyFormatter.format(summary.shipping),
      tax: currencyFormatter.format(summary.tax),
      total: currencyFormatter.format(summary.total),
      discount:
        summary.discount > 0
          ? currencyFormatter.format(summary.discount)
          : null,
    }),
    [summary]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 relative">
      {/* Simplified background effects */}
      <div
        className="fixed inset-0 opacity-10 pointer-events-none bg-repeat mix-blend-multiply"
        style={{
          backgroundSize: "150px 150px",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-6 sm:px-6 sm:py-12 max-w-7xl">
        {/* Header */}
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
          {/* Left Column */}
          <div className="space-y-6 sm:space-y-8">
            {/* Cart Items */}
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

            {/* Delivery Information */}
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

          {/* Right Column */}
          <div className="space-y-6 sm:space-y-8">
            {/* Order Summary */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl">
              <h2 className="text-2xl sm:text-3xl font-light text-white mb-6 sm:mb-8">
                Order Summary
              </h2>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex justify-between py-2 sm:py-3 border-b border-white/10">
                  <span className="text-white/70 font-light text-sm sm:text-base">
                    Subtotal ({summary.itemCount} items)
                  </span>
                  <span className="text-white font-light text-sm sm:text-base">
                    {formattedSummary.subtotal}
                  </span>
                </div>

                <div className="flex justify-between py-2 sm:py-3 border-b border-white/10">
                  <span className="text-white/70 font-light text-sm sm:text-base">
                    Shipping
                  </span>
                  <span
                    className={`font-light text-sm sm:text-base ${
                      summary.shipping === 0 ? "text-green-400" : "text-white"
                    }`}
                  >
                    {formattedSummary.shipping}
                  </span>
                </div>

                <div className="flex justify-between py-2 sm:py-3 border-b border-white/10">
                  <span className="text-white/70 font-light text-sm sm:text-base">
                    Tax (8%)
                  </span>
                  <span className="text-white font-light text-sm sm:text-base">
                    {formattedSummary.tax}
                  </span>
                </div>

                {formattedSummary.discount && (
                  <div className="flex justify-between py-2 sm:py-3 border-b border-white/10">
                    <span className="text-green-400 font-light text-sm sm:text-base">
                      Discount
                    </span>
                    <span className="text-green-400 font-light text-sm sm:text-base">
                      -{formattedSummary.discount}
                    </span>
                  </div>
                )}

                <div className="flex justify-between py-4 sm:py-6 border-t border-white/20 mt-4 sm:mt-6">
                  <span className="text-xl sm:text-2xl font-light text-white">
                    Total
                  </span>
                  <span className="text-xl sm:text-2xl font-light text-white">
                    {formattedSummary.total}
                  </span>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <input
                  type="text"
                  name="couponCode"
                  placeholder="Enter coupon code"
                  value={formData.couponCode}
                  onChange={handleInputChange}
                  className="flex-1 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors text-sm sm:text-base"
                />
                <button
                  onClick={applyCoupon}
                  className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl border border-white/30 text-white rounded-xl sm:rounded-2xl hover:from-white/30 hover:to-white/20 transition-colors shadow-lg text-sm sm:text-base"
                  type="button"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Payment Method */}
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

            {/* Security Features */}
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

            {/* Place Order Button */}
            <button
              className={`w-full py-4 sm:py-6 px-6 sm:px-8 text-lg sm:text-xl font-light rounded-2xl sm:rounded-3xl transition-all shadow-2xl ${
                isOrderDisabled
                  ? "bg-gradient-to-r from-gray-600/20 to-gray-500/20 text-gray-400 cursor-not-allowed border border-gray-500/20"
                  : "bg-gradient-to-r from-white via-white to-white/90 text-black hover:from-white/90 hover:via-white/90 hover:to-white/80 hover:shadow-white/20 border-0"
              } flex items-center justify-center gap-3`}
              disabled={isOrderDisabled}
              type="button"
              onClick={() => {
                if (!isOrderDisabled) {
                  alert(
                    "Order placed successfully! You will receive a confirmation email shortly."
                  );
                }
              }}
            >
              <Check className="w-5 h-5 sm:w-6 sm:h-6" />
              Place Order {!isOrderDisabled && `• ${formattedSummary.total}`}
            </button>

            {/* Additional Info */}
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
