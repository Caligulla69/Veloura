import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  TrendingDown,
  LogOut,
  Search,
  Edit3,
  Trash2,
  Plus,
  Eye,
  ChevronRight,
  Menu,
  Bell,
  Home,
  ShieldOff,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API_URL from "../../utils/api";
import { checkAuth } from "../../utils/checkAuth";
import { logout } from "../../utils/logout";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const redirect = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const isAuthenticated = await checkAuth();

      if (!isAuthenticated) {
        redirect("/login");
        return;
      }
      try {
        const res = await fetch(`${API_URL}/products`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [redirect]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/users`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_URL}/getOrders`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const handleToggleUserStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "disabled" ? "active" : "disabled";

      const res = await fetch(`${API_URL}/users/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to update user status");
      }

      const updatedUser = await res.json();

      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, status: newStatus } : u))
      );
    } catch (error) {
      console.error("Error toggling user status:", error);
      alert(`Failed to update user status: ${error.message}`);
    }
  };

  const analyticsData = useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const totalOrders = orders.length;
    const totalCustomers = users.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return {
      totalRevenue: totalRevenue,
      revenueChange: 12.5,
      totalOrders: totalOrders,
      ordersChange: 8.3,
      totalCustomers: totalCustomers,
      customersChange: 15.7,
      avgOrderValue: avgOrderValue,
      avgChange: 4.2,
    };
  }, [orders, users]);

  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "products", label: "Products", icon: Package },
    { id: "customers", label: "Customers", icon: Users },
  ];

  const getStatusColor = useCallback((status) => {
    const colors = {
      active: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      inactive: "text-gray-400 bg-gray-400/10 border-gray-400/20",
      delivered: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      Delivered: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      shipped: "text-blue-400 bg-blue-400/10 border-blue-400/20",
      Shipped: "text-blue-400 bg-blue-400/10 border-blue-400/20",
      pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
      Pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
      cancelled: "text-red-400 bg-red-400/10 border-red-400/20",
      Cancelled: "text-red-400 bg-red-400/10 border-red-400/20",
      "out-of-stock": "text-red-400 bg-red-400/10 border-red-400/20",
      disabled: "text-red-400 bg-red-400/10 border-red-400/20",
    };
    return colors[status] || "text-gray-400 bg-gray-400/10 border-gray-400/20";
  }, []);

  const handleTabChange = useCallback((tabId) => {
    if (tabId === "logout") {
      logout(redirect);
      return;
    }
    if (tabId === "home") {
      redirect("/prodListing");
      return;
    }
    setActiveTab(tabId);
    setSidebarOpen(false);
  }, [redirect]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setOrders(
          orders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const viewOrderDetails = useCallback((orderId) => {
    setSelectedOrderId(orderId);
  }, []);

  const Sidebar = React.memo(({ className = "" }) => (
    <div
      className={`bg-black/40 backdrop-blur-xl border-r border-white/10 ${className}`}
    >
      <div className="p-4 lg:p-8">
        <div className="mb-10 lg:mb-12">
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-2xl mx-auto">
            <span className="font-bold text-black text-lg lg:text-2xl">A</span>
          </div>
          <div className="text-center mt-4">
            <h2 className="text-white text-lg lg:text-xl font-light tracking-wide mb-1">
              Admin Panel
            </h2>
            <p className="text-white/60 text-xs lg:text-sm tracking-widest uppercase">
              Management Console
            </p>
          </div>
        </div>

        <nav className="space-y-1 lg:space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`w-full flex items-center space-x-3 lg:space-x-4 px-4 lg:px-6 py-3 lg:py-4 rounded-xl transition-all duration-200 ${
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

          <button
            className="w-full flex items-center space-x-3 lg:space-x-4 px-4 lg:px-6 py-3 lg:py-4 rounded-xl transition-all duration-200 text-white/60 hover:text-white hover:bg-white/5 border-t border-white/10 mt-4 pt-4"
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

  const StatCard = React.memo(
    ({ title, value, change, icon: Icon, format = "currency" }) => (
      <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-yellow-400/10 rounded-xl">
            <Icon className="w-6 h-6 text-yellow-400" />
          </div>
          {change !== undefined && (
            <div
              className={`flex items-center space-x-1 ${
                change >= 0 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {change >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        <div>
          <p className="text-white/60 text-sm tracking-wide uppercase mb-1">
            {title}
          </p>
          <p className="text-white text-2xl lg:text-3xl font-light">
            {format === "currency"
              ? `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              : value.toLocaleString()}
          </p>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        <Sidebar className="hidden lg:block w-80 min-h-screen" />

        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: -400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -400, opacity: 0 }}
                className="lg:hidden fixed left-0 top-0 bottom-0 w-80 z-50 bg-black/90 backdrop-blur-xl border-r border-white/10"
              >
                <Sidebar />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="flex-1 flex flex-col min-w-0">
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
              <button className="text-white/60 hover:text-white transition-colors p-1">
                <Bell className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="flex-1 p-4 lg:p-12 overflow-auto">
            {activeTab === "dashboard" && (
              <div className="space-y-6 lg:space-y-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl lg:text-4xl font-light text-white mb-2 tracking-tight">
                      Dashboard Overview
                    </h1>
                    <p className="text-white/60 tracking-wide text-sm lg:text-base">
                      Monitor your business performance
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                  <StatCard
                    title="Total Revenue"
                    value={analyticsData.totalRevenue}
                    change={analyticsData.revenueChange}
                    icon={DollarSign}
                  />
                  <StatCard
                    title="Total Orders"
                    value={analyticsData.totalOrders}
                    change={analyticsData.ordersChange}
                    icon={ShoppingCart}
                    format="number"
                  />
                  <StatCard
                    title="Total Customers"
                    value={analyticsData.totalCustomers}
                    change={analyticsData.customersChange}
                    icon={Users}
                    format="number"
                  />
                  <StatCard
                    title="Avg Order Value"
                    value={analyticsData.avgOrderValue}
                    change={analyticsData.avgChange}
                    icon={TrendingUp}
                  />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <h3 className="text-white text-lg font-light mb-4">
                      Recent Orders
                    </h3>
                    <div className="space-y-3">
                      {orders.slice(0, 5).map((order) => (
                        <div
                          key={order._id}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="text-white font-medium text-sm">
                              #{order._id.slice(-8).toUpperCase()}
                            </div>
                            <div className="text-white/60 text-xs">
                              {order.user
                                ? `${order.user.firstName} ${order.user.lastName}`
                                : "N/A"}
                            </div>
                          </div>
                          <div className="text-right mr-4">
                            <div className="text-white font-medium">
                              ${order.totalAmount?.toFixed(2) || "0.00"}
                            </div>
                            <div className="text-white/60 text-xs">
                              {order.items?.length || 0} items
                            </div>
                          </div>
                          <span
                            className={`px-2 py-1 rounded text-xs border ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </div>
                      ))}
                      {orders.length === 0 && (
                        <div className="text-center py-8 text-white/40">
                          No orders yet
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <h3 className="text-white text-lg font-light mb-4">
                      Top Products
                    </h3>
                    <div className="space-y-3">
                      {products.slice(0, 5).map((product) => (
                        <div
                          key={product._id}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="text-white font-medium text-sm">
                              {product.name}
                            </div>
                            <div className="text-white/60 text-xs">
                              {product.category}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-medium">
                              ${product.price}
                            </div>
                            <div className="text-white/60 text-xs">
                              Stock: {product.stock || 0}
                            </div>
                          </div>
                        </div>
                      ))}
                      {products.length === 0 && (
                        <div className="text-center py-8 text-white/40">
                          No products yet
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl lg:text-4xl font-light text-white mb-2 tracking-tight">
                      Orders Management
                    </h1>
                    <p className="text-white/60 tracking-wide text-sm lg:text-base">
                      Manage and track all orders
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search orders by customer or order ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                  <select
                    className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400"
                    onChange={(e) => setStatusFilter(e.target.value)}
                    value={statusFilter}
                  >
                    <option value="all">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="text-left p-4 text-white/60 text-sm font-light">
                            Order ID
                          </th>
                          <th className="text-left p-4 text-white/60 text-sm font-light">
                            Customer
                          </th>
                          <th className="text-left p-4 text-white/60 text-sm font-light">
                            Items
                          </th>
                          <th className="text-left p-4 text-white/60 text-sm font-light">
                            Total Amount
                          </th>
                          <th className="text-left p-4 text-white/60 text-sm font-light">
                            Payment Method
                          </th>
                          <th className="text-left p-4 text-white/60 text-sm font-light">
                            Status
                          </th>
                          <th className="text-left p-4 text-white/60 text-sm font-light">
                            Date
                          </th>
                          <th className="text-left p-4 text-white/60 text-sm font-light">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders
                          .filter(
                            (order) =>
                              (statusFilter === "all" ||
                                order.status === statusFilter) &&
                              (searchQuery === "" ||
                                order._id
                                  .toLowerCase()
                                  .includes(searchQuery.toLowerCase()) ||
                                (
                                  order.user?.firstName +
                                  " " +
                                  order.user?.lastName
                                )
                                  .toLowerCase()
                                  .includes(searchQuery.toLowerCase()))
                          )
                          .map((order) => (
                            <tr
                              key={order._id}
                              className="border-t border-white/10 hover:bg-white/5"
                            >
                              <td className="p-4 text-white text-sm font-mono">
                                #{order._id.slice(-8).toUpperCase()}
                              </td>
                              <td className="p-4 text-white text-sm">
                                {order.user
                                  ? `${order.username}`
                                  : "N/A"}
                              </td>
                              <td className="p-4 text-white text-sm">
                                {order.items?.length || 0} item
                                {order.items?.length !== 1 ? "s" : ""}
                              </td>
                              <td className="p-4 text-white text-sm font-medium">
                                ${order.totalAmount?.toFixed(2) || "0.00"}
                              </td>
                              <td className="p-4 text-white text-sm">
                                <span className="px-2 py-1 rounded bg-white/10 text-xs">
                                  {order.paymentMethod || "N/A"}
                                </span>
                              </td>
                              <td className="p-4">
                                <select
                                  value={order.status}
                                  onChange={(e) =>
                                    updateOrderStatus(order._id, e.target.value)
                                  }
                                  className={`px-2 py-1 rounded text-xs border bg-black ${getStatusColor(
                                    order.status
                                  )}`}
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Shipped">Shipped</option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </td>
                              <td className="p-4 text-white/60 text-sm">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </td>
                              <td className="p-4">
                                <div className="flex space-x-2">
                                  <button
                                    className="text-white/60 hover:text-white"
                                    onClick={() => viewOrderDetails(order._id)}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>

                    {orders.length === 0 && (
                      <div className="text-center py-12 text-white/40">
                        No orders found
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "products" && (
              <div className="space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl lg:text-4xl font-light text-white mb-2 tracking-tight">
                      Products Management
                    </h1>
                    <p className="text-white/60 tracking-wide text-sm lg:text-base">
                      Manage your product inventory
                    </p>
                  </div>
                  <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors text-sm font-medium flex items-center space-x-2 w-fit">
                    <Plus className="w-4 h-4" />
                    <span>Add Product</span>
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
                    >
                      <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                        {product.image || product.imageUrl ? (
                          <img
                            src={product.image || product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.parentElement.classList.add(
                                "flex",
                                "items-center",
                                "justify-center"
                              );
                              e.target.parentElement.innerHTML =
                                '<span class="text-white/40">No Image</span>';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-white/40">No Image</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-white font-light text-lg mb-1">
                              {product.name}
                            </h3>
                            <p className="text-white/60 text-sm">
                              {product.category}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded text-xs border ${getStatusColor(
                              product.status
                            )}`}
                          >
                            {product.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-yellow-400 font-bold text-xl">
                            ${product.price}
                          </span>
                          <span className="text-white/60 text-sm">
                            Stock: {product.stock || 0}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="flex-1 bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white hover:bg-white/10 transition-colors text-sm flex items-center justify-center space-x-2">
                            <Edit3 className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                          <button className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-red-400 hover:bg-red-500/20 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {products.length === 0 && (
                    <div className="col-span-full text-center py-12 text-white/40">
                      No products found
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "customers" && (
              <div className="space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl lg:text-4xl font-light text-white mb-2 tracking-tight">
                      Customer Management
                    </h1>
                    <p className="text-white/60 tracking-wide text-sm lg:text-base">
                      View and manage your customers
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search customers..."
                    className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="text-left p-4 text-white/60 text-sm font-light">
                            Customer
                          </th>
                          <th className="text-left p-4 text-white/60 text-sm font-light">
                            Email
                          </th>
                          <th className="text-left p-4 text-white/60 text-sm font-light">
                            Orders
                          </th>
                          <th className="text-left p-4 text-white/60 text-sm font-light">
                            Status
                          </th>
                          <th className="text-left p-4 text-white/60 text-sm font-light">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr
                            key={user._id}
                            className="border-t border-white/10 hover:bg-white/5"
                          >
                            <td className="p-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-black font-medium">
                                  {`${user.firstName} ${user.lastName}`
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </div>
                                <span className="text-white text-sm">
                                  {user.firstName} {user.lastName}
                                </span>
                              </div>
                            </td>
                            <td className="p-4 text-white/60 text-sm">
                              {user.email}
                            </td>
                            <td className="p-4 text-white text-sm">
                              {user.orders || 0}
                            </td>
                            <td className="p-4">
                              <span
                                className={`px-2 py-1 rounded text-xs border ${getStatusColor(
                                  user.status
                                )}`}
                              >
                                {user.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() =>
                                    handleToggleUserStatus(
                                      user._id,
                                      user.status
                                    )
                                  }
                                  className="text-white/60 hover:text-white transition"
                                  title={
                                    user.status === "disabled"
                                      ? "Enable User"
                                      : "Disable User"
                                  }
                                >
                                  {user.status === "disabled" ? (
                                    <ShieldCheck className="w-4 h-4 text-green-400" />
                                  ) : (
                                    <ShieldOff className="w-4 h-4 text-red-400" />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {users.length === 0 && (
                      <div className="text-center py-12 text-white/40">
                        No customers found
                      </div>
                    )}
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

export default AdminDashboard;