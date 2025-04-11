import { ParcelData } from "../components/ParcelCard";
import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
export interface AdminResponse {
  parcels: ParcelData[];
  totalOrders: number;
  currentOrders: number;
  deliveredOrders: number;
}

export const fetchParcels = async (): Promise<AdminResponse> => {
  const response = await fetch(`${API_URL}/parcels`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('cargoConnectToken')}`      
    }
  });
  if (!response.ok) throw new Error("Failed to fetch parcels");
  return await response.json();
};

export const updateParcelStatus = async (id: string, status: string) => {
  const token = localStorage.getItem("cargoConnectToken");

  const res = await fetch(`${API_URL}/parcels/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error("Failed to update parcel status");
  }

  return res.json();
};



export const assignParcelToAgent = async (parcelId: string, agentName: string) => {
  const token = localStorage.getItem("cargoConnectToken"); // same as placeOrder

  const response = await axios.post(
    "http://localhost:3000/api/parcels/assign",
    { parcelId, agentName },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }
  );

  return response.data;
};
