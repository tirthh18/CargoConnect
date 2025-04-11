
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getCustomerParcels } from "../../api/parcels";
import { useQuery } from "@tanstack/react-query";
import { ParcelCard } from "../../components/ParcelCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { Search, Filter } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";

export default function CustomerOrders() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const { data: customerData, isLoading } = useQuery({
    queryKey: ['customerParcels', user?.id],
    queryFn: () => getCustomerParcels(user?.id || ""),
    enabled: !!user,
  });

  console.log(customerData);
  // Filter parcels based on search and status
  const filteredParcels = customerData?.parcels?.filter(parcel => {
    const matchesSearch = 
      searchQuery === "" || 
      parcel.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parcel.receiverDetails.receiverName.toLowerCase().includes(searchQuery.toLowerCase());
    
      const matchesStatus = 
      statusFilter === "all" || 
      (statusFilter === "pending" && parcel.status === "pending") ||
      (statusFilter === "outForDelivery" && parcel.status === "out_for_delivery") ||
      (statusFilter === "delivered" && parcel.status === "delivered") ||
      (statusFilter === "cancelled" && parcel.status === "cancelled");
    
    return matchesSearch && matchesStatus;
  }) || [];

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Deliveries</h1>
        
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by tracking number or receiver..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 max-w-sm"
          />
        </div>
      </div>

      <Tabs defaultValue="all" value={statusFilter} onValueChange={setStatusFilter} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="outForDelivery">Out for Delivery</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="text-center py-12">Loading your orders...</div>
      ) : filteredParcels.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-500">No orders found matching your criteria.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredParcels.map(parcel => (
            <ParcelCard key={parcel._id} parcel={parcel} />
          ))}
        </div>
      )}
    </div>
  );
}
