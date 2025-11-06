import React, { useState } from "react";
import StatCard from "../../components/StatCard";
import DataTable from "../../components/DataTable";
import ChartCard from "../../components/ChartCard";
import { Users, Briefcase, Calendar, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminEmployees = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Anderson",
      email: "john.anderson@company.com",
      department: "Engineering",
      position: "Senior Developer",
      status: "Active",
      joinDate: "2023-01-15",
      salary: 125000,
    },
    {
      id: 2,
      name: "Sarah Chen",
      email: "sarah.chen@company.com",
      department: "Product",
      position: "Product Manager",
      status: "Active",
      joinDate: "2023-03-20",
      salary: 105000,
    },
    {
      id: 3,
      name: "Michael Roberts",
      email: "michael.roberts@company.com",
      department: "Sales",
      position: "Sales Lead",
      status: "Active",
      joinDate: "2023-02-10",
      salary: 95000,
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma.davis@company.com",
      department: "Marketing",
      position: "Marketing Manager",
      status: "On Leave",
      joinDate: "2023-04-05",
      salary: 85000,
    },
  ]);

  const departmentData = [
    { department: "Engineering", employees: 45, avgSalary: 120000 },
    { department: "Sales", employees: 32, avgSalary: 95000 },
    { department: "Marketing", employees: 18, avgSalary: 80000 },
    { department: "Product", employees: 12, avgSalary: 100000 },
    { department: "Operations", employees: 15, avgSalary: 70000 },
  ];

  const stats = [
    {
      title: "Total Employees",
      value: "122",
      icon: <Users className="w-6 h-6" />,
      change: 3.2,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Active Employees",
      value: "118",
      icon: <Briefcase className="w-6 h-6" />,
      change: 2.1,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "On Leave",
      value: "4",
      icon: <Calendar className="w-6 h-6" />,
      change: 0,
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Avg Salary",
      value: "$92.5K",
      icon: <TrendingUp className="w-6 h-6" />,
      change: 2.5,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Employee Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage and monitor your workforce
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Department Chart */}
      <ChartCard
        title="Employees by Department"
        subtitle="Headcount and average salary"
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={departmentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="department"
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
            <Bar dataKey="employees" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            <Bar dataKey="avgSalary" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Employees Table */}
      <DataTable
        title="Employees"
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "department", label: "Department" },
          { key: "position", label: "Position" },
          {
            key: "status",
            label: "Status",
            render: (value) => (
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  value === "Active"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                }`}
              >
                {value}
              </span>
            ),
          },
          {
            key: "salary",
            label: "Salary",
            render: (value) => `$${value.toLocaleString()}`,
          },
        ]}
        data={employees}
        onAdd={() => console.log("Add employee")}
        onEdit={(employee) => console.log("Edit:", employee)}
        onDelete={(id) => setEmployees(employees.filter((e) => e.id !== id))}
        searchPlaceholder="Search by name or email..."
      />
    </div>
  );
};

export default AdminEmployees;
