import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Heart, Star, Minus, Plus, ShoppingBag, Eye, ChevronLeft, ChevronRight, Truck, RotateCcw, Shield, Award, Sparkles, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// Ultra-optimized memoized components
const StarRating = memo(({ rating }) => {
  const stars = useMemo(() => 
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${
          i < Math.floor(rating) 
            ? "text-amber-400 fill-current" 
            : i < rating 
            ? "text-amber-400 fill-current opacity-50" 
            : "text-white/20"
        }`}
      />
    )), [rating]);
  
  return <div className="flex gap-0.5 sm:gap-1">{stars}</div>;
});

const ThumbnailImage = memo(({ image, index, isActive, onClick }) => (
  <button
    onClick={() => onClick(image, index)}
    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-200 hover:scale-105 ${
      isActive 
        ? 'border-white shadow-lg shadow-white/20 scale-105' 
        : 'border-white/20 hover:border-white/40'
    }`}
  >
    <img 
      src={image} 
      alt={`View ${index + 1}`}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  </button>
));

const FeatureCard = memo(({ feature, index }) => (
  <div className="flex items-start gap-3 sm:gap-4 md:gap-6 p-4 sm:p-5 md:p-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl hover:from-white/10 hover:to-white/5 transition-all duration-200 group">
    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-white/20 to-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
      {feature.icon === '✓' ? <Truck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" /> : <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />}
    </div>
    <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
      <div className="text-white font-light text-sm sm:text-base md:text-lg truncate">{feature.title}</div>
      <div className="text-white/70 font-light text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2">{feature.details}</div>
    </div>
  </div>
));

const LoadingScreen = memo(() => (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 flex items-center justify-center px-4">
    <div className="text-center">
      <div className="relative mb-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-white/20 border-t-white/80 rounded-full animate-spin mx-auto"></div>
      </div>
      <div className="text-white/80 font-light text-base sm:text-lg tracking-wide">Loading...</div>
    </div>
  </div>
));

const ProductDetailPage = () => {
  // Minimal state for maximum performance
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cached computations
  const allImages = useMemo(() => 
    product ? [product.images.main, ...product.images.thumbnails] : [], 
    [product]
  );

  const activeImage = useMemo(() => 
    allImages[activeImageIndex] || '', 
    [allImages, activeImageIndex]
  );

  const formatCurrency = useCallback((amount) => {
    return `$${amount.toFixed(2)}`;
  }, []);

  // Ultra-fast handlers
  const handleQuantityChange = useCallback((change) => {
    setQuantity(prev => Math.max(1, Math.min(product?.stockCount || 1, prev + change)));
  }, [product?.stockCount]);

  const handleThumbnailClick = useCallback((imgSrc, index) => {
    setActiveImageIndex(index);
  }, []);

  const toggleWishlist = useCallback(() => {
    setIsWishlisted(prev => !prev);
  }, []);

  const handleAddToCart = useCallback(() => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }, []);

  const navigateImage = useCallback((direction) => {
    setActiveImageIndex(prevIndex => {
      const newIndex = direction === 'next' 
        ? (prevIndex + 1) % allImages.length
        : prevIndex === 0 ? allImages.length - 1 : prevIndex - 1;
      return newIndex;
    });
  }, [allImages.length]);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  // Super fast data loading
  useEffect(() => {
    const data = dummyProductData;
    setProduct(data);
    setLoading(false);
  }, []);

  if (loading) return <LoadingScreen />;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 flex items-center justify-center p-4">
        <div className="text-center max-w-sm mx-auto p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
          <div className="text-red-400 text-lg mb-4 font-light">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 flex items-center justify-center p-4">
        <div className="text-white/60 text-lg font-light">Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900">
      {/* Simplified background texture for mobile */}
      <div className="fixed inset-0 opacity-20 pointer-events-none bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />

      <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 max-w-7xl">
        {/* Mobile-optimized breadcrumb */}
        <div className="mb-4 sm:mb-6 md:mb-8 overflow-x-auto">
          <div className="flex items-center gap-2 text-white/50 text-xs sm:text-sm font-light whitespace-nowrap">
            {product.breadcrumb.slice(-2).map((item, index, arr) => (
              <React.Fragment key={index}>
                <span className={`transition-colors duration-200 ${
                  index === arr.length - 1 
                    ? 'text-white font-medium' 
                    : 'hover:text-white/80'
                }`}>
                  {item}
                </span>
                {index < arr.length - 1 && <ChevronRight className="w-3 h-3 opacity-40" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Mobile-first responsive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20">
          {/* Product Images - Mobile optimized */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            {/* Main Image - Touch optimized */}
            <div className="relative aspect-square bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden group cursor-pointer"
                 onClick={openModal}>
              <img 
                src={activeImage} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="eager"
              />
              
              {/* Simplified mobile sparkles */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 animate-pulse">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white/40" />
              </div>
              
              {/* Mobile zoom indicator */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 p-2 sm:p-3 bg-black/40 backdrop-blur-sm border border-white/30 text-white rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Eye className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </div>

              {/* Touch-friendly expand text */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/60 backdrop-blur-sm px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full text-white font-light text-xs sm:text-sm">
                  Tap to expand
                </div>
              </div>
            </div>

            {/* Mobile-optimized thumbnails */}
            <div className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {allImages.map((image, index) => (
                <ThumbnailImage
                  key={index}
                  image={image}
                  index={index}
                  isActive={activeImageIndex === index}
                  onClick={handleThumbnailClick}
                />
              ))}
            </div>
          </div>

          {/* Product Information - Mobile optimized */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
            {/* Mobile header */}
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-xs sm:text-sm font-light tracking-wide uppercase bg-gradient-to-r from-white/10 to-white/5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm border border-white/20">
                  Premium Fashion
                </span>
                <button
                  onClick={toggleWishlist}
                  className="p-2.5 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 text-white hover:scale-105 transition-all duration-200 group"
                >
                  <Heart
                    className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-all duration-200 ${
                      isWishlisted 
                        ? "fill-red-500 text-red-500 scale-110" 
                        : "text-white group-hover:text-red-400"
                    }`}
                  />
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extralight text-white leading-tight">
                {product.name}
              </h1>
              
              <p className="text-white/70 text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed">
                {product.subtitle}
              </p>
            </div>

            {/* Mobile rating */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 bg-gradient-to-r from-white/5 to-transparent p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/10">
              <StarRating rating={product.rating} />
              <span className="text-white/70 font-light text-xs sm:text-sm md:text-base lg:text-lg">
                {product.rating} ({product.reviewCount})
              </span>
            </div>

            {/* Mobile price display */}
            <div className="space-y-2 sm:space-y-3 md:space-y-4 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl sm:rounded-3xl">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight text-white">
                {formatCurrency(product.price)}
              </div>
              <div className="text-white/60 font-light text-xs sm:text-sm md:text-base lg:text-lg">
                or <span className="text-white">{formatCurrency(product.installmentPrice)}/month</span> with {product.installmentMonths} months
              </div>
            </div>

            {/* Mobile quantity & stock */}
            <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
              <div className="flex items-center bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2.5 sm:p-3 md:p-4 text-white hover:bg-white/10 disabled:opacity-50 transition-colors duration-200 rounded-l-xl sm:rounded-l-2xl"
                >
                  <Minus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </button>
                <span className="px-4 sm:px-6 md:px-8 text-white font-light text-base sm:text-lg md:text-xl">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stockCount}
                  className="p-2.5 sm:p-3 md:p-4 text-white hover:bg-white/10 disabled:opacity-50 transition-colors duration-200 rounded-r-xl sm:rounded-r-2xl"
                >
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </button>
              </div>
              
              <div className={`font-light text-xs sm:text-sm md:text-base lg:text-lg ${product.stockCount <= 5 ? 'text-red-400' : 'text-white/60'}`}>
                {product.stockCount <= 10 ? `${product.stockCount} left` : 'In Stock'}
              </div>
            </div>

            {/* Mobile cart notification */}
            {addedToCart && (
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/40 text-green-300 p-3 sm:p-4 md:p-6 rounded-2xl sm:rounded-3xl backdrop-blur-sm animate-pulse">
                ✓ Added to cart!
              </div>
            )}

            {/* Mobile action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
              <button 
                onClick={handleAddToCart}
                className="w-sm ml-5 bg-gradient-to-r from-white to-gray-100 text-black py-3 sm:py-4 md:py-5 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-medium hover:from-gray-100 hover:to-gray-200 transition-colors duration-200 flex items-center justify-center gap-2 sm:gap-3 group"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-200" />
                <span className="text-sm sm:text-base">Add to Cart</span>
              </button>
              <Link to='/checkout' className="w-full sm:w-auto bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 text-white py-3 sm:py-4 md:py-5 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-light hover:from-white/20 hover:to-white/10 transition-colors duration-200">
                <span className="text-sm sm:text-base">Buy Now</span>
              </Link>
            </div>

            {/* Mobile features */}
            <div className="space-y-3 sm:space-y-4">
              {product.features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>

            {/* Mobile trust badges */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 pt-4 sm:pt-6 md:pt-8 border-t border-white/10">
              <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 text-white/60 font-light text-xs sm:text-sm hover:text-white/80 transition-colors duration-200">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Secure</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 text-white/60 font-light text-xs sm:text-sm hover:text-white/80 transition-colors duration-200">
                <Award className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Quality</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 text-white/60 font-light text-xs sm:text-sm hover:text-white/80 transition-colors duration-200">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Premium</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-optimized Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-3 sm:p-4 md:p-6">
            {/* Mobile close button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-20 p-2 sm:p-3 md:p-4 bg-black/60 backdrop-blur-sm border border-white/30 text-white rounded-xl sm:rounded-2xl hover:bg-black/80 transition-colors duration-200"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>

            {/* Mobile modal image */}
            <div className="relative max-w-full max-h-full">
              <img
                src={activeImage}
                alt={product.name}
                className="max-w-full max-h-full object-contain rounded-xl sm:rounded-2xl md:rounded-3xl"
                style={{ maxHeight: 'calc(100vh - 120px)' }}
              />
            </div>

            {/* Mobile navigation */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-2 sm:left-3 md:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm border border-white/30 text-white rounded-2xl sm:rounded-3xl hover:bg-black/80 transition-colors duration-200"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                </button>
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-2 sm:right-3 md:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm border border-white/30 text-white rounded-2xl sm:rounded-3xl hover:bg-black/80 transition-colors duration-200"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                </button>
              </>
            )}

            {/* Mobile image counter */}
            <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm border border-white/30 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-xl sm:rounded-2xl text-white font-light text-sm sm:text-base">
              {activeImageIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Optimized dummy data with proper image URLs
const dummyProductData = {
  id: 'premium-jacket-01',
  name: 'Premium Zip-Up Jacket',
  subtitle: 'Stylish, Comfortable, and Versatile Outerwear',
  price: 199.00,
  installmentMonths: 6,
  installmentPrice: 33.17,
  rating: 4.7,
  reviewCount: 86,
  stockCount: 15,
  
  images: {
    main: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=800&fit=crop&crop=center&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&h=800&fit=crop&crop=center&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=800&fit=crop&crop=center&q=80',
      'https://images.unsplash.com/photo-1606835285906-a6a02e6ba7d7?w=800&h=800&fit=crop&crop=center&q=80'
    ]
  },
  breadcrumb: ['Fashion', 'Men', 'Outerwear', 'Premium Jackets'],
  features: [
    {
      icon: '✓',
      title: 'Free Delivery',
      details: 'Complimentary shipping on all orders over $150'
    },
    {
      icon: '✓',
      title: '30-Day Returns',
      details: 'Easy 30-day return and exchange policy'
    },
    {
      icon: '✓',
      title: 'Premium Quality',
      details: 'Crafted with durable fabric and premium zippers'
    }
  ]
};

export default ProductDetailPage;