import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Card, CardContent } from "../../components/ui/card";
import { getCustomerParcels } from "../../api/parcels";
import { useQuery } from "@tanstack/react-query";
import { Package, Truck, XCircle, CheckCircle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CustomerDashboard() {
  const { user } = useAuth();
  const { data: customerData, isLoading } = useQuery({
    queryKey: ["customerParcels", user?.id],
    queryFn: () => getCustomerParcels(user?.id || ""),
    enabled: !!user,
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">Total Orders</h3>
              <div className="p-2 bg-blue-100 rounded-md">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-4xl font-bold">
              {customerData?.totalOrders || 0}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">Pending Orders</h3>
              <div className="p-2 bg-purple-100 rounded-md">
                <Truck className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-4xl font-bold">
              {customerData?.currentOrders || 0}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">Delivered Orders</h3>
              <div className="p-2 bg-green-100 rounded-md">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-4xl font-bold">
              {customerData?.deliveredOrders || 0}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">Cancelled Orders</h3>
              <div className="p-2 bg-red-100 rounded-md">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <p className="text-4xl font-bold">
              {customerData?.cancelledOrders || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-white">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Monthly Orders</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={customerData?.monthlyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#8884d8"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-100">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Total Spent</h3>
            <p className="text-4xl font-bold mb-2">
              ₹{customerData?.totalSpent?.toFixed(2) || "0.00"}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: "70%" }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
