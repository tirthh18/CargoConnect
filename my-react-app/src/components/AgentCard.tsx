
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Truck, Bike, Car } from "lucide-react";

export interface AgentData {
  id: string;
  name: string;
  avatar?: string;
  vehicle: "Car" | "Bike" | "Truck";
  status: "on-delivery" | "available" | "off-duty";
  assignedParcels?: number;
}

interface AgentCardProps {
  agent: AgentData;
  onSelect?: (agent: AgentData) => void;
  selected?: boolean;
}

export function AgentCard({ agent, onSelect, selected }: AgentCardProps) {
  const getVehicleIcon = (vehicle: string) => {
    switch (vehicle) {
      case "Car":
        return <Car className="h-4 w-4" />;
      case "Bike":
        return <Bike className="h-4 w-4" />;
      case "Truck":
        return <Truck className="h-4 w-4" />;
      default:
        return <Car className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-delivery":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "available":
        return "bg-green-100 text-green-700 border-green-200";
      case "off-duty":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "on-delivery":
        return "On Delivery";
      case "available":
        return "Available";
      case "off-duty":
        return "Off Duty";
      default:
        return status;
    }
  };

  const getAvatarColor = (name: string) => {
    const colors = ["bg-red-200", "bg-green-200", "bg-blue-200", "bg-purple-200", "bg-yellow-200", "bg-pink-200"];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card 
      className={`mb-4 cursor-pointer transition-all hover:shadow-md ${selected ? 'ring-2 ring-primary' : ''}`}
      onClick={() => onSelect && onSelect(agent)}
    >
      <CardContent className="p-4 flex items-center">
        <Avatar className={`h-12 w-12 ${getAvatarColor(agent.name)}`}>
          <AvatarImage src={agent.avatar} alt={agent.name} />
          <AvatarFallback>{getInitials(agent.name)}</AvatarFallback>
        </Avatar>
        <div className="ml-4 flex-1">
          <div className="font-medium">{agent.name}</div>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            {getVehicleIcon(agent.vehicle)}
            <span className="ml-1">{agent.vehicle}</span>
            {/* <span className="mx-2">•</span> */}
            {/* <Badge className={`${getStatusColor(agent.status)}`}>
              {getStatusText(agent.status)}
            </Badge> */}
          </div>
        </div>
        {agent.assignedParcels !== undefined && (
          <div className="text-sm text-gray-600">
            {/* Assigned: <span className="font-medium">{agent.assignedParcels}</span> */}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
