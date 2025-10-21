import React, { useState } from "react";
import {
  Minus,
  Plus,
  X,
  ShoppingBag,
  ArrowRight,
  Shield,
  Truck,
  Heart,
  Gift,
} from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkAuth } from "../utils/checkAuth";
import Navbar from "../components/Navbar";

const PremiumCartPage = () => {
  const { cart, removeFromCart } = useCartStore();
  const [cartItems, setCartItems] = useState(cart);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

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

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
    removeFromCart(id);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckout = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    setCheckoutSuccess(true);

    // Reset success message after 3 seconds
    setTimeout(() => setCheckoutSuccess(false), 3000);
  };

  return (
    <div className="fixed top-0 left-0 right-0 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 ">
      <Navbar />
      {/* Grain Texture Overlay */}
      <div className="fixed inset-0 opacity-20 pointer-events-none bg-repeat bg-[length:256px_256px] bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20256%20256%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noiseFilter%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%224%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noiseFilter)%22%20opacity=%220.4%22/%3E%3C/svg%3E')]" />

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl mb-6">
            <ShoppingBag className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-light text-white mb-2">Shopping Cart</h1>
          <p className="text-white/60 font-light">
            {cartItems.length} items in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-2xl"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-medium text-lg pr-8">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-white/40 hover:text-red-400 transition-colors p-1 hover:bg-red-500/10 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-1 mb-4">
                      <p className="text-white/60 text-sm">
                        Color: {item.color}
                      </p>
                      <p className="text-white/60 text-sm">Size: {item.size}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <span className="text-white/60 text-sm font-light">
                          Qty:
                        </span>
                        <div className="flex items-center bg-white/10 rounded-xl border border-white/20">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-2 hover:bg-white/20 transition-colors rounded-l-xl"
                          >
                            <Minus className="w-4 h-4 text-white" />
                          </button>
                          <span className="px-4 py-2 text-white font-medium min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-2 hover:bg-white/20 transition-colors rounded-r-xl"
                          >
                            <Plus className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-white/50 line-through text-sm">
                            ${item.originalPrice}
                          </span>
                          <span className="text-white font-medium text-lg">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty Cart State */}
            {cartItems.length === 0 && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center">
                <ShoppingBag className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-white text-xl font-light mb-2">
                  Your cart is empty
                </h3>
                <p className="text-white/60 font-light mb-6">
                  Add some items to get started
                </p>
                <Link
                  to="/prodListing"
                  className="bg-white text-black py-3 px-6 rounded-2xl font-medium hover:bg-gray-100 transition-all duration-300"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
              <h3 className="text-white font-medium mb-6">Order Summary</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/70 font-light">Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-white/70 font-light">Discount</span>
                  <span className="text-green-400">
                    -${discount.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-white/70 font-light">Shipping</span>
                  <span className="text-white">
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-white/70 font-light">Tax</span>
                  <span className="text-white">${tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium text-lg">
                      Total
                    </span>
                    <span className="text-white font-medium text-xl">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Free Shipping Progress */}
              {subtotal < 100 && (
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-400/20 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 text-sm font-light">
                      Add ${(100 - subtotal).toFixed(2)} more for free shipping
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(subtotal / 100) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {checkoutSuccess && (
                <div className="mt-6 bg-green-500/20 border border-green-400/30 text-green-400 p-4 rounded-2xl backdrop-blur-sm text-center">
                  ✓ Order placed successfully!
                </div>
              )}

              {/* Checkout Button */}
              <Link
                to="/checkout"
                onClick={handleCheckout}
                disabled={isLoading || cartItems.length === 0}
                className="w-full mt-6 bg-white text-black py-4 px-8 rounded-2xl font-medium hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Link>
            </div>

            {/* Payment Methods */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
              <h3 className="text-white font-medium mb-4">We Accept</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Visa */}
                  <div className="w-12 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-5" viewBox="0 0 40 24" fill="none">
                      <rect width="40" height="24" fill="white" rx="4" />
                      <path
                        d="M16.7 7.2L14.8 16.8H12.6L14.5 7.2H16.7Z"
                        fill="#1A1F71"
                      />
                      <path
                        d="M23.4 7.4C22.9 7.2 22.1 7 21.1 7C18.9 7 17.4 8.1 17.4 9.7C17.4 10.9 18.5 11.6 19.3 12C20.1 12.4 20.4 12.7 20.4 13.1C20.4 13.7 19.7 14 19.1 14C18.2 14 17.7 13.8 17 13.5L16.7 13.4L16.4 15.2C16.9 15.4 17.8 15.6 18.7 15.6C21.1 15.6 22.5 14.5 22.5 12.8C22.5 11.9 21.9 11.2 20.6 10.6C19.9 10.2 19.5 9.9 19.5 9.5C19.5 9.1 20 8.7 20.9 8.7C21.7 8.7 22.3 8.9 22.7 9.1L22.9 9.2L23.4 7.4Z"
                        fill="#1A1F71"
                      />
                    </svg>
                  </div>

                  {/* Mastercard */}
                  <div className="w-12 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-5" viewBox="0 0 40 24" fill="none">
                      <rect width="40" height="24" fill="white" rx="4" />
                      <circle cx="15" cy="12" r="7" fill="#EB001B" />
                      <circle cx="25" cy="12" r="7" fill="#F79E1B" />
                      <path
                        d="M20 6.5C21.5 7.9 22.5 9.8 22.5 12C22.5 14.2 21.5 16.1 20 17.5C18.5 16.1 17.5 14.2 17.5 12C17.5 9.8 18.5 7.9 20 6.5Z"
                        fill="#FF5F00"
                      />
                    </svg>
                  </div>

                  {/* PayPal */}
                  <div className="w-12 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-4" viewBox="0 0 24 24" fill="#00457C">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.79A.859.859 0 0 1 5.791 2H14.8c3.8 0 5.7 1.6 5.7 4.8 0 4.9-3.4 7.7-8.5 7.7h-2.4l-1.1 6.837a.641.641 0 0 1-.633.74z" />
                    </svg>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-white/40 text-xs">
                  <Shield className="w-3 h-3" />
                  <span className="font-light">Secure Payment</span>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
              <h3 className="text-white font-medium mb-4">
                Shipping & Returns
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-white/40" />
                  <div>
                    <p className="text-white/80 text-sm font-light">
                      Free shipping on orders $100+
                    </p>
                    <p className="text-white/50 text-xs font-light">
                      Estimated delivery: 2-3 business days
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Gift className="w-5 h-5 text-white/40" />
                  <div>
                    <p className="text-white/80 text-sm font-light">
                      Gift wrapping available
                    </p>
                    <p className="text-white/50 text-xs font-light">
                      Add at checkout for $4.99
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <ArrowRight className="w-5 h-5 text-white/40 rotate-180" />
                  <div>
                    <p className="text-white/80 text-sm font-light">
                      30-day easy returns
                    </p>
                    <p className="text-white/50 text-xs font-light">
                      Free return shipping
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Shopping Link */}
        <div className="text-center mt-12">
          <Link
            to="/prodListing"
            className="text-white/70 hover:text-white font-light underline underline-offset-4 transition-colors flex items-center gap-2 mx-auto"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Continue Shopping
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-white/10">
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <Shield className="w-4 h-4" />
            <span className="font-light">Secure Checkout</span>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <Truck className="w-4 h-4" />
            <span className="font-light">Fast Shipping</span>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <Heart className="w-4 h-4" />
            <span className="font-light">Customer Care</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumCartPage;
