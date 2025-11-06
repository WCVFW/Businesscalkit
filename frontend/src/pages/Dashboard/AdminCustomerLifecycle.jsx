import React, { useState } from "react";
import StatCard from "../../components/StatCard";
import DataTable from "../../components/DataTable";
import ChartCard from "../../components/ChartCard";
import { Users, TrendingUp, BarChart3, Activity } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminCustomerLifecycle = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Acme Corporation",
      email: "contact@acme.com",
      phone: "555-0101",
      status: "Active",
      revenue: 85000,
      joinDate: "2024-01-15",
      lastContact: "2 days ago",
    },
    {
      id: 2,
      name: "Tech Innovations Inc",
      email: "hello@techinno.com",
      phone: "555-0102",
      status: "Active",
      revenue: 72000,
      joinDate: "2024-02-20",
      lastContact: "5 days ago",
    },
    {
      id: 3,
      name: "Global Solutions Ltd",
      email: "info@globalsol.com",
      phone: "555-0103",
      status: "Active",
      revenue: 58000,
      joinDate: "2024-03-10",
      lastContact: "1 day ago",
    },
    {
      id: 4,
      name: "Future Systems",
      email: "contact@futuresys.com",
      phone: "555-0104",
      status: "Inactive",
      revenue: 45000,
      joinDate: "2023-12-01",
      lastContact: "30 days ago",
    },
  ]);

  const lifecycleData = [
    { month: "Jan", new: 15, active: 120, churned: 5 },
    { month: "Feb", new: 18, active: 133, churned: 4 },
    { month: "Mar", new: 22, active: 151, churned: 6 },
    { month: "Apr", new: 20, active: 165, churned: 3 },
    { month: "May", new: 25, active: 187, churned: 5 },
    { month: "Jun", new: 30, active: 212, churned: 2 },
  ];

  const stats = [
    {
      title: "Total Customers",
      value: "1,250",
      icon: <Users className="w-6 h-6" />,
      change: 8.5,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Active Customers",
      value: "1,180",
      icon: <Activity className="w-6 h-6" />,
      change: 5.2,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Total Revenue",
      value: "$2.4M",
      icon: <TrendingUp className="w-6 h-6" />,
      change: 12.3,
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Churn Rate",
      value: "2.1%",
      icon: <BarChart3 className="w-6 h-6" />,
      change: -1.5,
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Customer Lifecycle Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Track and manage customer relationships across their entire lifecycle
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Lifecycle Trend Chart */}
      <ChartCard
        title="Customer Lifecycle Trend"
        subtitle="Monthly customer acquisition and churn"
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lifecycleData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
              stroke="#9ca3af"
              style={{ fontSize: "12px" }}
            />
            <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="new"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: "#3B82F6", r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="active"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: "#10B981", r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="churned"
              stroke="#EF4444"
              strokeWidth={2}
              dot={{ fill: "#EF4444", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Customers Table */}
      <DataTable
        title="Customers"
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          {
            key: "status",
            label: "Status",
            render: (value) => (
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  value === "Active"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {value}
              </span>
            ),
          },
          {
            key: "revenue",
            label: "Revenue",
            render: (value) => `$${value.toLocaleString()}`,
          },
          { key: "lastContact", label: "Last Contact" },
        ]}
        data={customers}
        onAdd={() => console.log("Add customer")}
        onEdit={(customer) => console.log("Edit:", customer)}
        onDelete={(id) =>
          setCustomers(customers.filter((c) => c.id !== id))
        }
        searchPlaceholder="Search by name or email..."
      />
    </div>
  );
};

export default AdminCustomerLifecycle;
