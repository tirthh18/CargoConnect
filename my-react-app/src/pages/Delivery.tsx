
// import { useState } from "react";
// import { AgentCard, AgentData } from "../components/AgentCard";
// import { ParcelCard, ParcelData } from "../components/ParcelCard";
// import { Button } from "../components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
// import { fetchAgents } from "../api/agents";
// import {  assignParcelToAgent } from "../api/parcels";
// import { fetchParcels } from "../api/admin";

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { Package, UserPlus } from "lucide-react";

// export default function Delivery() {
//   const [selectedAgent, setSelectedAgent] = useState<AgentData | null>(null);
//   const [selectedParcels, setSelectedParcels] = useState<string[]>([]);
//   const queryClient = useQueryClient();

//   const { data: agents = [], isLoading: loadingAgents } = useQuery({
//     queryKey: ['agents'],
//     queryFn: fetchAgents,
//   });

//   const { data: parcels = [], isLoading: loadingParcels } = useQuery({
//     queryKey: ['parcels'],
//     queryFn: fetchParcels,
//   });

//   const assignParcelMutation = useMutation({
//     mutationFn: ({ parcelId, agentId }: { parcelId: string, agentId: string }) => 
//       assignParcelToAgent(parcelId, agentId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['parcels'] });
//       queryClient.invalidateQueries({ queryKey: ['agents'] });
//       toast.success("Parcel assigned successfully");
//       setSelectedParcels([]);
//     },
//     onError: (error) => {
//       toast.error("Failed to assign parcel: " + error);
//     }
//   });

//   const unassignedParcels = parcels.filter(parcel => !parcel.assignedTo);
  
//   const handleAssignParcels = () => {
//     if (!selectedAgent) {
//       toast.error("Please select a delivery agent");
//       return;
//     }
    
//     if (selectedParcels.length === 0) {
//       toast.error("Please select at least one parcel");
//       return;
//     }

//     // Assign each selected parcel
//     selectedParcels.forEach(parcelId => {
//       assignParcelMutation.mutate({ parcelId, agentId: selectedAgent.id });
//     });
//   };

//   // Toggle parcel selection
//   const toggleParcelSelection = (parcelId: string) => {
//     setSelectedParcels(prev => 
//       prev.includes(parcelId)
//         ? prev.filter(id => id !== parcelId)
//         : [...prev, parcelId]
//     );
//   };

//   // Check if a parcel is selected
//   const isParcelSelected = (parcelId: string) => {
//     return selectedParcels.includes(parcelId);
//   };
//   return (
//     <div className="container mx-auto py-6">
//       <h1 className="text-3xl font-bold mb-2">Delivery Management</h1>
//       <p className="text-gray-600 mb-6">Assign parcels to delivery personnel</p>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div>
//           <h2 className="text-xl font-bold mb-4">Delivery Personnel</h2>
//           {loadingAgents ? (
//             <div className="text-center py-4">Loading agents...</div>
//           ) : (
//             agents.map(agent => (
//               <AgentCard 
//                 key={agent.id} 
//                 agent={agent} 
//                 onSelect={setSelectedAgent}
//                 selected={selectedAgent?.id === agent.id}
//               />
//             ))
//           )}
//         </div>
        
//         <div className="lg:col-span-2">
//           <h2 className="text-xl font-bold mb-4">Assign Parcels</h2>
          
//           {selectedAgent ? (
//             <Card className="mb-6 bg-blue-50 border border-blue-200">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-lg">Assigning parcels to {selectedAgent.name}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600">
//                       Vehicle: {selectedAgent.vehicle} • 
//                       Current load: {selectedAgent.assignedParcels} parcels
//                     </p>
//                     <p className="mt-2 text-sm font-medium">
//                       {selectedParcels.length} parcels selected
//                     </p>
//                   </div>
//                   <Button 
//                     onClick={handleAssignParcels}
//                     disabled={selectedParcels.length === 0}
//                     className="bg-coral-500 hover:bg-coral-600"
//                   >
//                     Assign to {selectedAgent.name}
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ) : (
//             <Card className="mb-6 bg-gray-50 border border-gray-200">
//               <CardContent className="flex items-center justify-center py-12">
//                 <div className="text-center">
//                   <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
//                     <Package className="h-6 w-6 text-gray-500" />
//                   </div>
//                   <h3 className="text-lg font-medium mb-1">No Agent Selected</h3>
//                   <p className="text-gray-600 mb-4">Select a delivery agent to assign parcels</p>
//                 </div>
//               </CardContent>
//             </Card>
//           )}
          
//           <h3 className="text-lg font-medium mb-3">Unassigned Parcels</h3>
          
//           {loadingParcels ? (
//             <div className="text-center py-4">Loading parcels...</div>
//           ) : unassignedParcels.length === 0 ? (
//             <Card className="bg-gray-50">
//               <CardContent className="flex items-center justify-center py-8">
//                 <p className="text-gray-500">No unassigned parcels available.</p>
//               </CardContent>
//             </Card>
//           ) : (
//             <div className="space-y-4">
//               {unassignedParcels.map(parcel => (
//                 <div 
//                   key={parcel.id} 
//                   className={`border-2 rounded-lg cursor-pointer transition-all ${
//                     isParcelSelected(parcel.id) 
//                       ? 'border-primary bg-primary/5' 
//                       : 'border-transparent'
//                   }`}
//                   onClick={() => toggleParcelSelection(parcel.id)}
//                 >
//                   <ParcelCard parcel={parcel} />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";
// import { AgentCard, AgentData } from "../components/AgentCard";
// import { ParcelCard, ParcelData } from "../components/ParcelCard";
// import { Button } from "../components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
// import { fetchAgents } from "../api/agents";
// import {  assignParcelToAgent } from "../api/parcels";
// import { fetchParcels } from "../api/admin";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { Package } from "lucide-react";

// export default function Delivery() {
//   const [selectedAgent, setSelectedAgent] = useState<AgentData | null>(null);
//   const [selectedParcels, setSelectedParcels] = useState<string[]>([]);
//   const queryClient = useQueryClient();

//   const { data: agents = [], isLoading: loadingAgents } = useQuery({
//     queryKey: ["agents"],
//     queryFn: fetchAgents,
//   });

//   const { data: parcels = [], isLoading: loadingParcels } = useQuery({
//     queryKey: ["parcels"],
//     queryFn: fetchParcels,
//   });

//   const assignParcelMutation = useMutation({
//     mutationFn: ({ parcelId, agentId }: { parcelId: string; agentId: string }) =>
//       assignParcelToAgent(parcelId, agentId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["parcels"] });
//       queryClient.invalidateQueries({ queryKey: ["agents"] });
//       toast.success("Parcel assigned successfully");
//       setSelectedParcels([]);
//     },
//     onError: (error) => {
//       toast.error("Failed to assign parcel: " + error);
//     },
//   });

//   // const unassignedParcels = parcels.filter((parcel) => !parcel.assignedTo);
  

//   const handleAssignParcels = () => {
//     if (!selectedAgent) {
//       toast.error("Please select a delivery agent");
//       return;
//     }

//     if (selectedParcels.length === 0) {
//       toast.error("Please select at least one parcel");
//       return;
//     }

//     selectedParcels.forEach((parcelId) => {
//       assignParcelMutation.mutate({ parcelId, agentId: selectedAgent.id });
//     });
//   };

//   const toggleParcelSelection = (parcelId: string) => {
//     setSelectedParcels((prev) =>
//       prev.includes(parcelId) ? prev.filter((id) => id !== parcelId) : [...prev, parcelId]
//     );
//   };

//   const isParcelSelected = (parcelId: string) => {
//     return selectedParcels.includes(parcelId);
//   };

//   return (
//     <div className="container mx-auto py-6 h-[calc(100vh-48px)] flex flex-col">
//       <h1 className="text-3xl font-bold mb-2">Delivery Management</h1>
//       <p className="text-gray-600 mb-6">Assign parcels to delivery personnel</p>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow overflow-hidden">
//         {/* Left Column: Agents */}
//         <div className="overflow-y-auto">
//           <h2 className="text-xl font-bold mb-4">Delivery Personnel</h2>
//           {loadingAgents ? (
//             <div className="text-center py-4">Loading agents...</div>
//           ) : (
//             agents.map((agent) => (
//               <AgentCard
//                 key={agent.id}
//                 agent={agent}
//                 onSelect={setSelectedAgent}
//                 selected={selectedAgent?.id === agent.id}
//               />
//             ))
//           )}
//         </div>

//         {/* Right Column: Assigning */}
//         <div className="lg:col-span-2 flex flex-col overflow-hidden">
//           <h2 className="text-xl font-bold mb-4">Assign Parcels</h2>

//           {selectedAgent ? (
//             <Card className="mb-6 bg-blue-50 border border-blue-200">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-lg">Assigning parcels to {selectedAgent.name}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600">
//                       Vehicle: {selectedAgent.vehicle} • Current load: {selectedAgent.assignedParcels} parcels
//                     </p>
//                     <p className="mt-2 text-sm font-medium">{selectedParcels.length} parcels selected</p>
//                   </div>
//                   <Button
//                     onClick={handleAssignParcels}
//                     disabled={selectedParcels.length === 0}
//                     className="bg-coral-500 hover:bg-coral-600"
//                   >
//                     Assign to {selectedAgent.name}
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ) : (
//             <Card className="mb-6 bg-gray-50 border border-gray-200">
//               <CardContent className="flex items-center justify-center py-12">
//                 <div className="text-center">
//                   <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
//                     <Package className="h-6 w-6 text-gray-500" />
//                   </div>
//                   <h3 className="text-lg font-medium mb-1">No Agent Selected</h3>
//                   <p className="text-gray-600 mb-4">Select a delivery agent to assign parcels</p>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Scrollable Parcel List */}
//           <div className="flex flex-col flex-grow overflow-hidden">
//             <h3 className="text-lg font-medium mb-3">Unassigned Parcels</h3>

//             {loadingParcels ? (
//               <div className="text-center py-4">Loading parcels...</div>
//             ) : unassignedParcels.length === 0 ? (
//               <Card className="bg-gray-50">
//                 <CardContent className="flex items-center justify-center py-8">
//                   <p className="text-gray-500">No unassigned parcels available.</p>
//                 </CardContent>
//               </Card>
//             ) : (
//               <div className="overflow-y-auto space-y-4 pr-1 flex-grow">
//                 {unassignedParcels.map((parcel) => (
//                   <div
//                     key={parcel._id}
//                     className={`border-2 rounded-lg cursor-pointer transition-all ${
//                       isParcelSelected(parcel._id)
//                         ? "border-primary bg-primary/5"
//                         : "border-transparent"
//                     }`}
//                     onClick={() => toggleParcelSelection(parcel._id)}
//                   >
//                     <ParcelCard parcel={parcel} />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { AgentCard, AgentData } from "../components/AgentCard";
import { ParcelCard, ParcelData } from "../components/ParcelCard";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { fetchAgents } from "../api/agents";
// import { assignParcelToAgent } from "../api/parcels";
import { fetchParcels,assignParcelToAgent } from "../api/admin";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Package } from "lucide-react";

export default function Delivery() {
  const [selectedAgent, setSelectedAgent] = useState<AgentData | null>(null);
  const [selectedParcels, setSelectedParcels] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const { data: agents = [], isLoading: loadingAgents } = useQuery({
    queryKey: ["agents"],
    queryFn: fetchAgents,
  });

  const {
    data: parcelResponse,
    isLoading: loadingParcels,
  } = useQuery({
    queryKey: ["parcels"],
    queryFn: fetchParcels,
  });

  const parcels = parcelResponse?.parcels || [];

  const unassignedParcels = parcels.filter(
    (parcel) => !parcel.assignedDeliveryAgent && parcel.status === "pending"
  );
  
  const assignParcelMutation = useMutation({
  
    
    mutationFn: ({ parcelId, agentName }: { parcelId: string;  agentName: string }) =>
      assignParcelToAgent(parcelId, agentName),    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parcels"] });
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      toast.success("Parcel assigned successfully");
      setSelectedParcels([]);
    },
    onError: (error) => {
      toast.error("Failed to assign parcel: " + error);
    },
  });

  const handleAssignParcels = () => {
    if (!selectedAgent) {
      toast.error("Please select a delivery agent");
      return;
    }

    if (selectedParcels.length === 0) {
      toast.error("Please select at least one parcel");
      return;
    }

    selectedParcels.forEach((parcelId) => {
      console.log("Assigning to agent:", selectedAgent);
      assignParcelMutation.mutate({
        parcelId,
        agentName: selectedAgent.name
      });
    });
    
  };

  const toggleParcelSelection = (parcelId: string) => {
    setSelectedParcels((prev) =>
      prev.includes(parcelId) ? prev.filter((id) => id !== parcelId) : [...prev, parcelId]
    );
  };

  const isParcelSelected = (parcelId: string) => selectedParcels.includes(parcelId);

  return (
    <div className="container mx-auto py-6 h-[calc(100vh-48px)] flex flex-col">
      <h1 className="text-3xl font-bold mb-2">Delivery Management</h1>
      <p className="text-gray-600 mb-6">Assign parcels to delivery personnel</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow overflow-hidden">
        {/* Left Column: Agents */}
        <div className="overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Delivery Personnel</h2>
          {loadingAgents ? (
            <div className="text-center py-4">Loading agents...</div>
          ) : (
            agents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onSelect={setSelectedAgent}
                selected={selectedAgent?.id === agent.id}
              />
            ))
          )}
        </div>

        {/* Right Column: Assigning */}
        <div className="lg:col-span-2 flex flex-col overflow-hidden">
          <h2 className="text-xl font-bold mb-4">Assign Parcels</h2>

          {selectedAgent ? (
            <Card className="mb-6 bg-blue-50 border border-blue-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Assigning parcels to {selectedAgent.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Vehicle: {selectedAgent.vehicle}  
                    </p>
                    <p className="mt-2 text-sm font-medium">{selectedParcels.length} parcels selected</p>
                  </div>
                  <Button
                    onClick={handleAssignParcels}
                    disabled={selectedParcels.length === 0}
                    className="bg-coral-500 hover:bg-coral-600"
                  >
                    Assign to {selectedAgent.name}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="mb-6 bg-gray-50 border border-gray-200">
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <Package className="h-6 w-6 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">No Agent Selected</h3>
                  <p className="text-gray-600 mb-4">Select a delivery agent to assign parcels</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Scrollable Parcel List */}
          <div className="flex flex-col flex-grow overflow-hidden">
            <h3 className="text-lg font-medium mb-3">Unassigned Parcels</h3>

            {loadingParcels ? (
              <div className="text-center py-4">Loading parcels...</div>
            ) : unassignedParcels.length === 0 ? (
              <Card className="bg-gray-50">
                <CardContent className="flex items-center justify-center py-8">
                  <p className="text-gray-500">No unassigned parcels available.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="overflow-y-auto space-y-4 pr-1 flex-grow">
                {unassignedParcels.map((parcel) => (
                  <div
                    key={parcel._id}
                    className={`border-2 rounded-lg cursor-pointer transition-all ${
                      isParcelSelected(parcel._id)
                        ? "border-primary bg-primary/5"
                        : "border-transparent"
                    }`}
                    onClick={() => toggleParcelSelection(parcel._id)}
                  >
                    <ParcelCard parcel={parcel} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
