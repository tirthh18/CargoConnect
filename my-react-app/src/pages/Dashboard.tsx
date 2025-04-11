
// import { useState, useEffect } from "react";
// import { Package, PackageCheck, Clock, Users } from "lucide-react";
// import { Card } from "../components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
// import { StatCard } from "../components/StatCard";
// import { ParcelCard, ParcelData } from "../components/ParcelCard";
// import { fetchParcels, getParcelCount, updateParcelStatus } from "../api/parcels";
// import { fetchAgents, getAgentCount } from "../api/agents";
// import { toast } from "sonner";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import Map from "../components/Map";

// export default function Dashboard() {
//   const [filter, setFilter] = useState<string>("All");
//   const [sort, setSort] = useState<string>("Newest");
//   const queryClient = useQueryClient();

//   const { data: parcels = [], isLoading: loadingParcels } = useQuery({
//     queryKey: ['parcels'],
//     queryFn: fetchParcels,
//   });

//   const { data: parcelCounts, isLoading: loadingCounts } = useQuery({
//     queryKey: ['parcelCounts'],
//     queryFn: getParcelCount,
//   });

//   const { data: agentCount, isLoading: loadingAgents } = useQuery({
//     queryKey: ['agentCount'],
//     queryFn: getAgentCount,
//   });

//   const updateStatusMutation = useMutation({
//     mutationFn: ({ id, status }: { id: string, status: "Pending" | "Out for Delivery" | "Delivered" }) => 
//       updateParcelStatus(id, status),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['parcels'] });
//       queryClient.invalidateQueries({ queryKey: ['parcelCounts'] });
//       toast.success("Parcel status updated");
//     },
//     onError: (error) => {
//       toast.error("Failed to update status: " + error);
//     }
//   });

//   // Filter and sort parcels
//   const filteredParcels = parcels.filter(parcel => {
//     if (filter === "All") return true;
//     return parcel.status === filter;
//   });

//   const sortedParcels = [...filteredParcels].sort((a, b) => {
//     if (sort === "Newest") {
//       return a.id > b.id ? -1 : 1;
//     }
//     // Add more sorting options here if needed
//     return 0;
//   });

//   const handleStatusChange = (id: string, status: string) => {
//     updateStatusMutation.mutate({ 
//       id, 
//       status: status as "Pending" | "Out for Delivery" | "Delivered" 
//     });
//   };

//   // Prepare map markers from delivery addresses
//   const mapMarkers = parcels
//     .filter(parcel => parcel.status === "Pending" || parcel.status === "Out for Delivery")
//     .map((parcel, index) => ({
//       lat: 0, // In real app, these would be geocoded from addresses
//       lng: 0,
//       label: `${index + 1}`
//     }));

//   return (
//     <div className="container mx-auto py-6">
//       <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
//       <p className="text-gray-600 mb-6">Monitor and manage your parcel deliveries</p>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <StatCard 
//           title="All Parcels" 
//           value={parcelCounts?.all || 0} 
//           icon={<Package className="h-6 w-6 text-blue-600" />} 
//           className="bg-blue-50"
//           iconClassName="bg-blue-100"
//         />
//         <StatCard 
//           title="Delivered" 
//           value={parcelCounts?.delivered || 0} 
//           icon={<PackageCheck className="h-6 w-6 text-green-600" />} 
//           className="bg-green-50"
//           iconClassName="bg-green-100"
//         />
//         <StatCard 
//           title="Pending" 
//           value={parcelCounts?.pending || 0} 
//           icon={<Clock className="h-6 w-6 text-amber-600" />} 
//           className="bg-amber-50"
//           iconClassName="bg-amber-100"
//         />
//         <StatCard 
//           title="Delivery Agents" 
//           value={agentCount || 0} 
//           icon={<Users className="h-6 w-6 text-purple-600" />} 
//           className="bg-purple-50"
//           iconClassName="bg-purple-100"
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2">
//           <h2 className="text-xl font-bold mb-4">All Parcels</h2>
          
//           <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
//             <div className="flex items-center space-x-2">
//               <span className="text-sm font-medium">Filter:</span>
//               <Tabs value={filter} onValueChange={setFilter} className="w-full">
//                 <TabsList>
//                   <TabsTrigger value="All">All</TabsTrigger>
//                   <TabsTrigger value="Pending">Pending</TabsTrigger>
//                   <TabsTrigger value="Out for Delivery">Out for Delivery</TabsTrigger>
//                   <TabsTrigger value="Delivered">Delivered</TabsTrigger>
//                 </TabsList>
//               </Tabs>
//             </div>
            
//             <div className="flex items-center space-x-2">
//               <span className="text-sm font-medium">Sort by:</span>
//               <select 
//                 className="border rounded-md p-2 text-sm"
//                 value={sort}
//                 onChange={(e) => setSort(e.target.value)}
//               >
//                 <option value="Newest">Newest</option>
//                 <option value="Oldest">Oldest</option>
//               </select>
//             </div>
//           </div>

//           {loadingParcels ? (
//             <div className="text-center py-4">Loading parcels...</div>
//           ) : sortedParcels.length === 0 ? (
//             <div className="text-center py-8 bg-gray-50 rounded-lg">
//               <p className="text-gray-500">No parcels found with the current filter.</p>
//             </div>
//           ) : (
//             sortedParcels.map(parcel => (
//               <ParcelCard 
//                 key={parcel.id} 
//                 parcel={parcel} 
//                 onStatusChange={handleStatusChange}
//               />
//             ))
//           )}
//         </div>

//         <div>
//           <h2 className="text-xl font-bold mb-4">Delivery Locations</h2>
//           <Map markers={mapMarkers} />
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { Package, PackageCheck, Clock, Users } from "lucide-react";
import { StatCard } from "../components/StatCard";
import { ParcelCard } from "../components/ParcelCard";
// import { getParcelCount } from "../api/parcels";
import { fetchParcels,updateParcelStatus } from "../api/admin";
import { getAgentCount } from "../api/agents";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
// import Map from "../components/Map"; // 👈 Still commented out

export default function Dashboard() {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest");
  const queryClient = useQueryClient();

  const {
    data = { parcels: [], totalOrders: 0, currentOrders: 0, deliveredOrders: 0 },
    isLoading: loadingParcels,
  } = useQuery({
    queryKey: ["parcels"],
    queryFn: fetchParcels,
  });
  // const { data: parcelCounts } = useQuery({
  //   queryKey: ["parcelCounts"],
  //   queryFn: getParcelCount,
  // });

  const { data: agentCount } = useQuery({
    queryKey: ["agentCount"],
    queryFn: getAgentCount,
  });

  // 

  const statusMap: Record<string, string | null> = {
    "All": null,
    "Pending": "pending",
    "Out for Delivery": "out_for_delivery",
    "Delivered": "delivered",
  };
  
  const filteredParcels = data.parcels
  .filter((parcel) => parcel.status !== "cancelled") // exclude cancelled
  .filter((parcel) => {
    if (!statusMap[filter]) return true; // "All" case
    return parcel.status === statusMap[filter];
  });


  const sortedParcels = [...filteredParcels].sort((a, b) => {
    if (sort === "Newest") return a._id > b._id ? -1 : 1;
    if (sort === "Oldest") return a._id > b._id ? 1 : -1;
    return 0;
  });

  const updateStatusMutation = useMutation({
      mutationFn: ({ id, status }: { id: string; status: "pending" | "out_for_delivery" | "delivered" }) =>
        updateParcelStatus(id, status),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["parcels"] });
        queryClient.invalidateQueries({ queryKey: ["parcelCounts"] });
        toast.success("Parcel status updated");
      },
      onError: (error) => {
        toast.error("Failed to update status: " + error);
      },
    });

  const handleStatusChange = (id: string, status: string) => {
    updateStatusMutation.mutate({
      id,
      status: status as "pending" | "out_for_delivery" | "delivered",
    });
  };
  


  return (
    <div className="h-screen flex flex-col">
      {/* Header & Stats */}
      <div className="p-6 border-b bg-white">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-6">Monitor and manage your parcel deliveries</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="All Parcels"
            value={data?.totalOrders || 0}
            icon={<Package className="h-6 w-6 text-blue-600" />}
            className="bg-blue-50"
            iconClassName="bg-blue-100"
          />
          <StatCard
            title="Delivered"
            value={data?.deliveredOrders || 0}
            icon={<PackageCheck className="h-6 w-6 text-green-600" />}
            className="bg-green-50"
            iconClassName="bg-green-100"
          />
          <StatCard
            title="Pending"
            value={data?.currentOrders || 0}
            icon={<Clock className="h-6 w-6 text-amber-600" />}
            className="bg-amber-50"
            iconClassName="bg-amber-100"
          />
          <StatCard
            title="Delivery Agents"
            value={agentCount || 0}
            icon={<Users className="h-6 w-6 text-purple-600" />}
            className="bg-purple-50"
            iconClassName="bg-purple-100"
          />
        </div>
      </div>

      {/* Body section */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <h2 className="text-xl font-bold mb-4">All Parcels</h2>

        {/* Filter + Sort */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Filter:</span>
            <Tabs value={filter} onValueChange={setFilter} className="w-full">
              <TabsList>
                <TabsTrigger value="All">All</TabsTrigger>
                <TabsTrigger value="Pending">Pending</TabsTrigger>
                <TabsTrigger value="Out for Delivery">Out for Delivery</TabsTrigger>
                <TabsTrigger value="Delivered">Delivered</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Sort by:</span>
            <select
              className="border rounded-md p-2 text-sm"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
            </select>
          </div>
        </div>

        {/* Parcel Cards in 2-column grid */}
        {loadingParcels ? (
          <div className="text-center py-4">Loading parcels...</div>
        ) : sortedParcels.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">No parcels found with the current filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedParcels.map((parcel) => (
              <ParcelCard key={parcel._id} parcel={parcel} onStatusChange={handleStatusChange} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
