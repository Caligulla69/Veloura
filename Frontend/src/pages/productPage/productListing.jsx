import React, { useState, useMemo, useCallback, memo, useEffect } from "react";
import {
  Search,
  Heart,
  Star,
  SlidersHorizontal,
  X,
  ShoppingBag,
} from "lucide-react";
import { useWishlistStore } from "../../store/useWishlistStore";
import { useCartStore } from "../../store/useCartStore";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../../utils/api";
import { useAuthStore } from "../../store/useAuthStore";
import { checkAuth } from "../../utils/checkAuth";

// Memoized ProductCard component
const ProductCard = memo(({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();
  const {prod} =useAuthStore()
  const isWishlisted = isInWishlist(product.id);
  const navigate=useNavigate()

  
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

  const handleWishlistClick = useCallback(() => {
    toggleWishlist(product);
  }, [product, toggleWishlist]);

  const handleAddToCart = useCallback((e) => {
    e.preventDefault();
    addToCart(product);
  }, [product, addToCart]);

  const handleProductClick=(id)=>{
    console.log(id);
    
      const setProd = useAuthStore.getState().setProd; // access store function
    
      setProd(id);
      navigate("/prodDetails")
  }

  return (
    <div className="group relative bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 rounded-3xl overflow-hidden hover:border-zinc-700 transition-all duration-300 hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1.5">
      
      {/* Luxury gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Product Badges */}
      {(product.isNew || product.isBestseller) && (
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex flex-col gap-2 sm:gap-3">
          {product.isNew && (
            <span className="bg-white text-black px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase backdrop-blur-sm shadow-lg">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 text-black px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase shadow-lg">
              Bestseller
            </span>
          )}
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistClick}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2 sm:p-3 rounded-full bg-black/30 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 group-hover:scale-110"
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          className={`w-5 h-5 transition-all ${
            isWishlisted
              ? "fill-red-500 text-red-500 scale-110"
              : "text-white hover:text-red-400"
          }`}
        />
      </button>

      {/* Product Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Quick Actions */}
        <div className="absolute text-center inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-500 delay-75">
          <button 
            onClick={() =>handleProductClick(product._id)}
            className="flex-1 bg-white text-black py-2 px-4 rounded-full text-sm font-medium tracking-wide hover:bg-zinc-100 transition-all duration-300 shadow-lg"
          >
            View
          </button>
          <button 
            onClick={handleAddToCart}
            className="bg-black/60 text-white p-2 sm:p-3 rounded-full hover:bg-black/80 transition-all duration-300 shadow-lg"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 sm:p-6 lg:p-8">
        {/* Brand + Sale tag */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-zinc-400 text-xs sm:text-sm font-light tracking-widest uppercase">
            {product.brand}
          </span>
          {product.originalPrice && (
            <span className="bg-red-500/20 text-red-400 px-3 py-0.5 rounded-full text-xs font-medium tracking-wide">
              Sale
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="text-white font-light text-lg lg:text-xl mb-3 leading-snug group-hover:text-white/90 transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-white text-lg sm:text-xl lg:text-2xl font-light tracking-wide">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-zinc-500 text-sm sm:text-base line-through font-light">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

// Memoized FilterSidebar component
const FilterSidebar = memo(({ 
  brands, 
  selectedFilters, 
  onUpdateFilter, 
  onClearFilters 
}) => {
  return (
    <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 rounded-3xl p-5 sm:p-6 lg:p-8 h-fit shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-white font-light text-xl lg:text-2xl tracking-wide">
          Filters
        </h3>
        <button
          onClick={onClearFilters}
          className="text-zinc-400 hover:text-white text-sm font-light tracking-wide transition-colors duration-300"
        >
          Clear All
        </button>
      </div>

      {/* Brand Filter */}
      <div className="mb-8">
        <h4 className="text-white font-light mb-4 text-lg tracking-wide">
          Brand
        </h4>
        <div className="space-y-3">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-4 cursor-pointer group hover:bg-zinc-800/30 rounded-xl px-2 py-1 transition-colors duration-200"
            >
              <input
                type="checkbox"
                checked={selectedFilters.brands.has(brand)}
                onChange={() => onUpdateFilter("brands", brand)}
                className="rounded border-zinc-600 bg-transparent text-white focus:ring-white/30 w-5 h-5"
              />
              <span className="text-zinc-400 group-hover:text-white transition-colors duration-300 font-light tracking-wide text-base">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-2">
        <h4 className="text-white font-light mb-4 text-lg tracking-wide">
          Price Range
        </h4>
        <div className="flex overflow-hidden rounded-xl border border-zinc-700/60">
          <input
            type="number"
            placeholder="Min"
            value={selectedFilters.priceRange[0] || ''}
            onChange={(e) =>
              onUpdateFilter("priceRange", [
                parseInt(e.target.value) || 0,
                selectedFilters.priceRange[1],
              ])
            }
            className="flex-1 bg-zinc-800/40 px-4 py-3 text-white text-sm font-light focus:outline-none focus:border-zinc-500 border-r border-zinc-700/60"
          />
          <input
            type="number"
            placeholder="Max"
            value={selectedFilters.priceRange[1] || ''}
            onChange={(e) =>
              onUpdateFilter("priceRange", [
                selectedFilters.priceRange[0],
                parseInt(e.target.value) || 5000,
              ])
            }
            className="flex-1 bg-zinc-800/40 px-4 py-3 text-white text-sm font-light focus:outline-none focus:border-zinc-500"
          />
        </div>
      </div>
    </div>
  );
});

FilterSidebar.displayName = 'FilterSidebar';

const LuxuryProductListing = () => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const cartCount = useCartStore((state) => state.cart.length);
  const wishlistCount = useWishlistStore((state) => state.wishlist.length);
   
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_URL}/products`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProductData(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    brands: new Set(),
    priceRange: [0, 5000],
    colors: new Set(),
    sizes: new Set(),
  });

  // Memoized derived values
  const categories = useMemo(() => {
    return ["All", ...new Set(productData.map((p) => p.category))];
  }, [productData]);

  const brands = useMemo(() => {
    return [...new Set(productData.map((p) => p.brand))];
  }, [productData]);

  // Optimized filter and sort function
  const filteredProducts = useMemo(() => {
    let filtered = productData.filter((product) => {
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          product.name.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower) ||
          (product.tags && product.tags.some((tag) => tag.toLowerCase().includes(searchLower)));
        if (!matchesSearch) return false;
      }

      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false;
      }

      if (selectedFilters.brands.size > 0 && !selectedFilters.brands.has(product.brand)) {
        return false;
      }

      if (product.price < selectedFilters.priceRange[0] || 
          product.price > selectedFilters.priceRange[1]) {
        return false;
      }

      if (selectedFilters.colors.size > 0 && product.colors &&
          !product.colors.some((color) => selectedFilters.colors.has(color))) {
        return false;
      }

      return true;
    });

    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price);
      case "name":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered.sort((a, b) => {
          if (a.isBestseller !== b.isBestseller) {
            return b.isBestseller - a.isBestseller;
          }
          if (a.isNew !== b.isNew) {
            return b.isNew - a.isNew;
          }
          return 0;
        });
    }
  }, [productData, searchTerm, selectedCategory, selectedFilters, sortBy]);

  // Optimized event handlers
  const updateFilter = useCallback((filterType, value) => {
    setSelectedFilters((prev) => {
      if (filterType === "priceRange") {
        return { ...prev, priceRange: value };
      }
      
      const newFilters = { ...prev };
      const filterSet = new Set(newFilters[filterType]);
      if (filterSet.has(value)) {
        filterSet.delete(value);
      } else {
        filterSet.add(value);
      }
      newFilters[filterType] = filterSet;
      return newFilters;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedFilters({
      brands: new Set(),
      priceRange: [0, 5000],
      colors: new Set(),
      sizes: new Set(),
    });
    setSelectedCategory("All");
    setSearchTerm("");
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, []);

  const toggleFilters = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950 flex items-center justify-center">
        <div className="text-white text-xl font-light">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950 flex items-center justify-center">
        <div className="text-red-400 text-xl font-light">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950">
      {/* Luxury grain texture overlay */}
      <div className="fixed inset-0 opacity-30 pointer-events-none bg-repeat bg-[length:256px_256px]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`
      }} />

      <div className="relative z-10">
        {/* Hero Header with Cart/Wishlist Indicators */}
        <div className="text-center py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
          <div className="absolute top-6 right-6 flex gap-4">
            <button className="relative p-3 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 rounded-full hover:bg-zinc-800/60 transition-all" aria-label="Wishlist">
              <Heart className="w-5 h-5 text-white" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {wishlistCount}
                </span>
              )}
            </button>
            <Link to='/cart' className="relative p-3 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 rounded-full hover:bg-zinc-800/60 transition-all" aria-label="Cart">
              <ShoppingBag className="w-5 h-5 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extralight text-white mb-4 sm:mb-6 tracking-wider">
            Collection
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base lg:text-lg font-light tracking-wide max-w-2xl mx-auto px-4">
            Discover our carefully curated selection of premium pieces, each
            crafted with uncompromising attention to detail and timeless
            elegance.
          </p>
        </div>

        <div className="container mx-auto px-4 sm:px-6 pb-8 sm:pb-12 lg:pb-16">
          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search our collection..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 rounded-full py-3 sm:py-4 pl-10 sm:pl-14 pr-4 sm:pr-8 text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-700/80 focus:bg-zinc-900/60 transition-all duration-300 text-sm sm:text-base lg:text-lg"
              />
            </div>

            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-light whitespace-nowrap tracking-wide transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-white text-black shadow-lg"
                      : "bg-zinc-900/40 border border-zinc-800/60 text-zinc-300 hover:bg-zinc-800/60 hover:border-zinc-700/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
              <button
                onClick={toggleFilters}
                className="flex items-center gap-2 sm:gap-3 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-zinc-800/60 hover:border-zinc-700/80 transition-all duration-300"
              >
                <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-light tracking-wide text-sm sm:text-base">
                  Filters
                </span>
              </button>

              <div className="text-zinc-400 text-sm sm:text-base lg:text-lg font-light">
                {filteredProducts.length} piece{filteredProducts.length !== 1 ? "s" : ""}
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 text-white rounded-full px-4 sm:px-6 py-2 sm:py-3 font-light tracking-wide focus:outline-none focus:border-zinc-700/80 cursor-pointer text-sm sm:text-base flex-1 sm:flex-none"
              >
                <option value="featured">Featured</option>
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Mobile Filter Drawer */}
          {showFilters && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden">
              <div className="absolute inset-x-0 bottom-0 bg-zinc-950 rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-light text-xl tracking-wide">
                    Filters
                  </h3>
                  <button
                    onClick={toggleFilters}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <FilterSidebar 
                  brands={brands}
                  selectedFilters={selectedFilters}
                  onUpdateFilter={updateFilter}
                  onClearFilters={clearFilters}
                />
              </div>
            </div>
          )}

          <div className="flex gap-6 lg:gap-12">
            {/* Desktop Filters Sidebar */}
            <div
              className={`hidden lg:block transition-all duration-100 ease-out ${
                showFilters
                  ? "w-80 xl:w-96 opacity-100"
                  : "w-0 opacity-0 overflow-hidden"
              }`}
            >
              <div className="sticky top-8">
                <FilterSidebar 
                  brands={brands}
                  selectedFilters={selectedFilters}
                  onUpdateFilter={updateFilter}
                  onClearFilters={clearFilters}
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1 min-w-0">
              {filteredProducts.length > 0 ? (
                <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 sm:py-24">
                  <div className="text-zinc-400 text-lg sm:text-xl mb-6 sm:mb-8 font-light">
                    No pieces match your criteria
                  </div>
                  <button
                    onClick={clearFilters}
                    className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium tracking-wide hover:bg-zinc-100 transition-colors duration-300 shadow-lg text-sm sm:text-base"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuxuryProductListing;