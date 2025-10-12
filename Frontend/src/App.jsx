import "./App.css";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("./pages/homePage/Home"));

const PremiumLoginPage =lazy(()=>import( "./pages/login"));
const PremiumCartPage =lazy(()=>import( "./pages/cart"));
const PremiumProductUpload =lazy(()=>import( "./pages/productPage/prodUpload"));
const AdminDashboard = lazy(() => import("./pages/UserPages/adminDashboard"));

const ProductDetailPage = lazy(() =>
  import("./pages/productPage/prodDetail")
);
const LuxuryProductListing = lazy(() =>
  import("./pages/productPage/productListing")
);
const CheckoutPage = lazy(() =>
  import("./pages/productPage/productCheckout")
);
const UserDashboard = lazy(() => import("./pages/UserPages/userManager"));

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<PremiumCartPage />} />
        <Route path="/login" element={<PremiumLoginPage />} />
        <Route path="/prodDetails" element={<ProductDetailPage />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/prodUpload" element={<PremiumProductUpload />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/prodListing" element={<LuxuryProductListing />} />
      </Routes>
    </>
  );
}

export default App;
