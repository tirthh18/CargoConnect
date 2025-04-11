
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

// export const updateParcelStatus = async (
//   id: string,
//   status: "Pending" | "Out for Delivery" | "Delivered"
// ): Promise<ParcelData> => {
//   const response = await fetch(`${API_URL}/parcels/${id}/status`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     credentials: 'include',
//     body: JSON.stringify({ status })
//   });
//   if (!response.ok) throw new Error("Failed to update parcel status");
//   return await response.json();
// };

// export const assignParcelToAgent = async (
//   parcelId: string,
//   agentId: string
// ): Promise<ParcelData> => {
//   const response = await fetch(`${API_URL}/parcels/${parcelId}/assign`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     credentials: 'include',
//     body: JSON.stringify({ agentId })
//   });

//   if (!response.ok) throw new Error("Failed to assign parcel");
//   return await response.json();
// };



// // Function to get all orders for the current user
// export const getUserOrders = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/parcels/user`, {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: 'Network error occurred' };
//   }
// };

// // Function to get a specific order by tracking number
// export const getOrderByTracking = async (trackingNumber) => {
//   try {
//     const response = await axios.get(`${API_URL}/parcels/track/${trackingNumber}`);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: 'Network error occurred' };
//   }
// };

// // Function to cancel an order
// export const cancelOrder = async (orderId) => {
//   try {
//     const response = await axios.put(`${API_URL}/parcels/${orderId}/cancel`, {}, {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: 'Network error occurred' };
//   }
// };