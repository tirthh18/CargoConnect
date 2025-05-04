
import { ParcelData } from "../components/ParcelCard";
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const placeOrder = async (orderData: any) => {
  try {
    
    const response = await axios.post(`${API_URL}/parcels`, orderData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('cargoConnectToken')}`      
      }
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { message: 'Network error occurred' };
    } else {
      throw { message: 'An unexpected error occurred' };
    }
  }
};

export const getCustomerParcels = async (
  customerId: string
): Promise<{
  totalOrders: number;
  currentOrders: number;
  cancelledOrders: number;
  totalSpent: number;
  parcels: ParcelData[];
}> => {
  const response = await fetch(`${API_URL}/parcels/user`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('cargoConnectToken')}`      
    }
  });

  if (!response.ok) throw new Error("Failed to get customer parcels");
  return await response.json();
};

export const getParcelCount = async (): Promise<{
  all: number;
  delivered: number;
  pending: number;
  outForDelivery: number;
}> => {
  const response = await fetch(`${API_URL}/parcels/stats`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('cargoConnectToken')}`      
    }
  });

  if (!response.ok) throw new Error("Failed to get parcel stats");
  return await response.json();
};
