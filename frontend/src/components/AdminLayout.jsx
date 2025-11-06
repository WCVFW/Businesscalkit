import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, Settings, User } from "lucide-react";
import { getUser } from "../lib/auth";

const AdminLayout = ({ children, logout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser();

  const navItems = [
    { path: "/dashboard/admin", label: "Dashboard", icon: "📊", end: true },
    { path: "/dashboard/admin/customers", label: "Customers", icon: "👥" },
    { path: "/dashboard/admin/employees", label: "Employees", icon: "👔" },
    { path: "/dashboard/admin/attendance", label: "Attendance", icon: "📅" },
    { path: "/dashboard/admin/performance", label: "Performance", icon: "⭐" },
    { path: "/dashboard/admin/sales-reports", label: "Sales Reports", icon: "📈" },
    { path: "/dashboard/admin/orders", label: "Orders", icon: "🛒" },
    { path: "/dashboard/admin/reports", label: "Reports", icon: "📄" },
    { path: "/dashboard/admin/settings", label: "Settings", icon: "⚙️" },
  ];

  const isActive = (itemPath, end = false) => {
    if (end) return location.pathname === itemPath;
    return location.pathname.startsWith(itemPath);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-800">
          <Link
            to="/dashboard/admin"
            className="flex items-center gap-2 font-bold text-lg text-gray-900 dark:text-white"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              A
            </div>
            <span className="hidden sm:inline">Admin</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive(item.path, item.end)
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-200 dark:border-gray-800 p-4 space-y-2">
          <Link
            to="/dashboard/admin/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </Link>
          <button
            onClick={() => {
              logout();
              setSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="sticky top-0 z-40 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>

          <h2 className="flex-1 text-lg font-semibold text-gray-900 dark:text-white ml-4 lg:ml-0">
            {navItems.find((item) => isActive(item.path, item.end))?.label ||
              "Dashboard"}
          </h2>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {user?.email}
              </span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 lg:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
