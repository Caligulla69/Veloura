import React, { useState, useEffect } from "react";
import {
  Heart,
  X,
  ShoppingBag,
  ArrowRight,
  Star,
  Sparkles,
  Gift,
  Share2,
} from "lucide-react";
import { useWishlistStore } from "../store/useWishlistStore";
import { useCartStore } from "../store/useCartStore";
import { Link, useNavigate } from "react-router-dom";
import { checkAuth } from "../utils/checkAuth";
import Navbar from "../components/Navbar";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();
  const navigate = useNavigate();
  const [addedToCart, setAddedToCart] = useState(null);

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

  const handleRemoveItem = (productId) => {
    removeFromWishlist(productId);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedToCart(product.id || product._id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const handleAddAllToCart = () => {
    wishlist.forEach((item) => {
      addToCart(item);
    });
    setAddedToCart("all");
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const totalValue = wishlist.reduce((sum, item) => sum + item.price, 0);
  const totalSavings = wishlist.reduce(
    (sum, item) => sum + (item.originalPrice ? item.originalPrice - item.price : 0),
    0
  );

  return (
    <div className="fixed top-0 left-0 right-0 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-auto">
      <Navbar />
      
      {/* Grain Texture Overlay */}
      <div className="fixed inset-0 opacity-20 pointer-events-none bg-repeat bg-[length:256px_256px] bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20256%20256%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noiseFilter%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%224%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noiseFilter)%22%20opacity=%220.4%22/%3E%3C/svg%3E')]" />

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-500/20 to-red-500/20 backdrop-blur-sm border border-pink-400/30 rounded-2xl mb-4 sm:mb-6">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400 fill-pink-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-light text-white mb-2">My Wishlist</h1>
          <p className="text-white/60 font-light text-sm sm:text-base">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {/* Success Message */}
        {addedToCart && (
          <div className="mb-6 bg-green-500/20 border border-green-400/30 text-green-400 p-3 sm:p-4 rounded-2xl backdrop-blur-sm text-center animate-pulse">
            ✓ {addedToCart === "all" ? "All items added to cart!" : "Item added to cart!"}
          </div>
        )}

        {wishlist.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Wishlist Items */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <span className="text-white/80 text-sm sm:text-base font-light">
                    {wishlist.length} curated {wishlist.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleAddAllToCart}
                    className="flex-1 sm:flex-none bg-white/10 text-white py-2 px-4 sm:px-6 rounded-xl sm:rounded-2xl text-sm font-light hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span className="hidden sm:inline">Add All</span>
                  </button>
                  <button
                    onClick={clearWishlist}
                    className="flex-1 sm:flex-none text-white/60 hover:text-red-400 py-2 px-4 sm:px-6 rounded-xl sm:rounded-2xl text-sm font-light hover:bg-red-500/10 transition-all duration-300"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Wishlist Items */}
              {wishlist.map((item) => {
                const productId = item.id || item._id;
                return (
                  <div
                    key={productId}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      {/* Product Image */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full sm:w-32 h-48 sm:h-32 object-cover rounded-xl sm:rounded-2xl"
                        />
                        {item.originalPrice && (
                          <div className="absolute top-2 left-2 bg-red-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-medium">
                            Save ${(item.originalPrice - item.price).toFixed(2)}
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1 pr-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-white/60 text-xs sm:text-sm font-light tracking-wide uppercase">
                                {item.brand}
                              </span>
                              {item.isBestseller && (
                                <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full text-xs">
                                  Bestseller
                                </span>
                              )}
                            </div>
                            <h3 className="text-white font-medium text-base sm:text-lg mb-2">
                              {item.name}
                            </h3>
                            {item.ratings && (
                              <div className="flex items-center gap-1 mb-2">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < Math.floor(item.ratings)
                                        ? "text-amber-400 fill-current"
                                        : "text-white/20"
                                    }`}
                                  />
                                ))}
                                <span className="text-white/60 text-xs ml-1">
                                  ({item.ratings})
                                </span>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => handleRemoveItem(productId)}
                            className="text-white/40 hover:text-red-400 transition-colors p-2 hover:bg-red-500/10 rounded-lg"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Price & Actions */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-auto pt-3 border-t border-white/10">
                          <div className="flex items-center gap-2">
                            {item.originalPrice && (
                              <span className="text-white/50 line-through text-sm">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                            )}
                            <span className="text-white font-medium text-lg sm:text-xl">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>

                          <div className="flex gap-2 w-full sm:w-auto">
                            <button
                              onClick={() => handleAddToCart(item)}
                              className="flex-1 sm:flex-none bg-white text-black py-2 px-4 sm:px-6 rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 text-sm group-hover:scale-105"
                            >
                              <ShoppingBag className="w-4 h-4" />
                              Add to Cart
                            </button>
                            <Link
                              to={`/prodDetails`}
                              className="bg-white/10 text-white py-2 px-4 rounded-xl font-light hover:bg-white/20 transition-all duration-300 text-sm"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
                <h3 className="text-white font-medium mb-4 sm:mb-6">Wishlist Summary</h3>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 font-light text-sm sm:text-base">Total Items</span>
                    <span className="text-white font-medium">{wishlist.length}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/70 font-light text-sm sm:text-base">Total Value</span>
                    <span className="text-white font-medium">${totalValue.toFixed(2)}</span>
                  </div>

                  {totalSavings > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 font-light text-sm sm:text-base">Potential Savings</span>
                      <span className="text-green-400 font-medium">
                        ${totalSavings.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="border-t border-white/10 pt-3 sm:pt-4">
                    <button
                      onClick={handleAddAllToCart}
                      className="w-full bg-white text-black py-3 sm:py-4 px-4 sm:px-8 rounded-xl sm:rounded-2xl font-medium hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      Add All to Cart
                    </button>
                  </div>
                </div>
              </div>

        

              {/* Recommendations */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-white font-medium text-sm sm:text-base">Keep Shopping</h3>
                </div>
                <p className="text-white/70 text-xs sm:text-sm font-light mb-3 sm:mb-4">
                  Discover more items you'll love
                </p>
                <Link
                  to="/prodListing"
                  className="w-full bg-white/10 text-white py-2 sm:py-3 px-4 rounded-xl font-light hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                >
                  Browse Collection
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Empty Wishlist State */}
        {wishlist.length === 0 && (
          <div className="max-w-md mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-500/20 to-red-500/20 backdrop-blur-sm border border-pink-400/30 rounded-2xl mb-4 sm:mb-6">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400" />
              </div>
              <h3 className="text-white text-xl sm:text-2xl font-light mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-white/60 font-light mb-6 sm:mb-8 text-sm sm:text-base">
                Start adding items you love and save them for later
              </p>
              <Link
                to="/prodListing"
                className="inline-flex items-center gap-2 bg-white text-black py-3 px-6 sm:px-8 rounded-2xl font-medium hover:bg-gray-100 transition-all duration-300"
              >
                Explore Products
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}

        {/* Continue Shopping Link */}
        {wishlist.length > 0 && (
          <div className="text-right mt-8 sm:mt-12">
            <Link
              to="/prodListing"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white font-light underline underline-offset-4 transition-colors text-sm sm:text-base"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;