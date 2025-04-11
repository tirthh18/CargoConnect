
import { AgentData } from "../components/AgentCard";
const mockAgents: AgentData[] = [
  {
    id: "1",
    name: "Veer Shah",
    vehicle: "Truck",
    status: "on-delivery",
    assignedParcels: 2
  },
  {
    id: "2",
    name: "Mitul Bhagat",
    vehicle: "Car",
    status: "available",
    assignedParcels: 2
  },
  {
    id: "3",
    name: "Ankit Desai",
    vehicle: "Bike",
    status: "available",
    assignedParcels: 0
  },
  {
    id: "4",
    name: "Prit Kapdiya",
    vehicle: "Truck",
    status: "available",
    assignedParcels: 0
  }
];

export const fetchAgents = async (): Promise<AgentData[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockAgents];
};

export const getAgentCount = async (): Promise<number> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockAgents.length;
};

export const getAgentRoutes = async (agentId: string): Promise<{
  pickupLocations: { address: string; pincode: string; trackingNumber: string; weight: string }[]
}> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock pickup locations based on agent
  if (agentId === "1") {
    return {
      pickupLocations: [
        { 
          address: "n.d.desai medical college, nadiad", 
          pincode: "387001", 
          trackingNumber: "TRK882359", 
          weight: "15 kg" 
        },
        { 
          address: "pdpu collage gandhinagar", 
          pincode: "343534", 
          trackingNumber: "TRK869733", 
          weight: "1 kg" 
        },
        { 
          address: "blueberry restuaratnt, nadiad", 
          pincode: "387001", 
          trackingNumber: "TRK205885", 
          weight: "5 kg" 
        }
      ]
    };
  }
  
  // Default response for other agents
  return {
    pickupLocations: []
  };
};
