import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Package,
  User,
  MapPin,
  Users,
  Weight,
  Truck,
  Calendar,
  Clock,
  Tag,
  Check,
  X,
  Loader,
} from "lucide-react";
import { Button } from "../components/ui/button"; // Make sure this path is correct

export interface ParcelData {
  _id: string;
  trackingNumber: string;
  status: string;
  senderDetails: {
    senderName: string;
    senderEmail: string;
    senderMobile: string;
    pickupAddress: string;
    pickupCity: string;
    pickupPincode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  receiverDetails: {
    receiverName: string;
    receiverMobile: string;
    dropAddress: string;
    dropCity: string;
    dropPincode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  parcelDetails: {
    priority: string;
    deliveryType: string;
    weight: string;
    scheduleDate: string;
    scheduleTime: string;
    paymentMethod: string;
    totalCost: number;
    paymentStatus: string;
  };
  currentLocation?: {
    coordinates: {
      lat: number;
      lng: number;
    };
    updatedAt: string;
  };
  assignedDeliveryAgent?: string; 
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}


interface ParcelCardProps {
  parcel: ParcelData;
  onStatusChange?: (id: string, status: string) => void;
}

export function ParcelCard({ parcel, onStatusChange }: ParcelCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "out_for_delivery":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "delivered":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Tag className="h-4 w-4" />;
      case "out_for_delivery":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <Check className="h-4 w-4" />;
      default:
        return <Loader className="h-4 w-4" />;
    }
  };

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const handleCancel = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/parcels/${id}/cancel`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("cargoConnectToken")}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to cancel order");
    }

    onStatusChange?.(id, "cancelled");
  } catch (error) {
    console.error(error);
    alert("Could not cancel order");
  }
};


  return (
    <Card className="mb-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-gray-900">
              Tracking # {parcel.trackingNumber}
            </h3>
          </div>
          <Badge
            className={`flex items-center gap-1 ${getStatusColor(
              parcel.status
            )}`}
          >
            {getStatusIcon(parcel.status)}
            {parcel.status.replace(/_/g, " ")}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-start mb-3">
              <User className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
              <div>
                <div className="text-sm font-medium text-gray-900">Sender</div>
                <div className="text-sm text-gray-600">
                  {parcel.senderDetails.senderName}
                </div>
                <div className="text-sm text-gray-600">
                  {parcel.senderDetails.senderMobile}
                </div>
              </div>
            </div>

            <div className="flex items-start mb-3">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  Sender Address
                </div>
                <div className="text-sm text-gray-600">
                  {parcel.senderDetails.pickupAddress}
                </div>
                <div className="text-sm text-gray-600">
                  Pincode: {parcel.senderDetails.pickupPincode}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-start mb-3">
              <Users className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  Receiver
                </div>
                <div className="text-sm text-gray-600">
                  {parcel.receiverDetails.receiverName}
                </div>
                <div className="text-sm text-gray-600">
                  {parcel.receiverDetails.receiverMobile}
                </div>
              </div>
            </div>

            <div className="flex items-start mb-3">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  Receiver Address
                </div>
                <div className="text-sm text-gray-600">
                  {parcel.receiverDetails.dropAddress}
                </div>
                <div className="text-sm text-gray-600">
                  Pincode: {parcel.receiverDetails.dropPincode}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center mt-2">
          <Weight className="h-5 w-5 text-gray-500 mr-2" />
          <div className="text-sm text-gray-600">
            Weight: {parcel.parcelDetails.weight}
          </div>
        </div>
      </CardContent>

      {/* <CardFooter className="bg-gray-50 px-5 py-3 border-t flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Assigned to: {parcel.assignedDeliveryAgent || "Not assigned"}
        </div>
        {onStatusChange && (
          <Select
            defaultValue={parcel.status}
            onValueChange={(value) => onStatusChange(parcel._id, value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardFooter> */}

      <CardFooter className="bg-gray-50 px-5 py-3 border-t flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Assigned to: {parcel.assignedDeliveryAgent || "Not assigned"}
        </div>
        <div className="flex gap-2 items-center">
          {onStatusChange && (
           <Select
           defaultValue={parcel.status}
           onValueChange={(value) => onStatusChange(parcel._id, value)}
         >         
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          )}
          {parcel.status !== "delivered" && parcel.status !== "cancelled" && (
            <Button
              variant="destructive"
              onClick={() => handleCancel(parcel._id)}
            >
              Cancel
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
