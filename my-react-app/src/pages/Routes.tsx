import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Calendar } from "../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { ParcelData } from "../components/ParcelCard"; // or wherever it's defined
import { format } from "date-fns";
import { fetchAgents } from "../api/agents";
import { fetchParcels } from "../api/admin";
import { useQuery } from "@tanstack/react-query";
import { cn } from "../lib/utils";
import {
  CalendarIcon,
  CalculatorIcon,
  TruckIcon,
  MapPin,
  Info,
} from "lucide-react";
import Map from "../components/Map";

interface Agent {
  id: string;
  name: string;
}

interface PickupLocation {
  senderName: string;
  address: string;
  pincode: string;
  trackingNumber: string;
  weight: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  optimizedOrder?: number;
}

interface AdminResponse {
  parcels: ParcelData[];
}

// Haversine formula to calculate distance between two points
function calculateDistance(coord1:any, coord2:any) {
  console.log(coord2);
  if (!coord1 || !coord2) return Infinity;
  
  const toRadians = (deg) => deg * Math.PI / 180;
  
  const R = 6371; // Earth's radius in km
  const dLat = toRadians(coord2.lat - coord1.lat);
  const dLng = toRadians(coord2.lng - coord1.lng);
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRadians(coord1.lat)) * Math.cos(toRadians(coord2.lat)) * 
            Math.sin(dLng/2) * Math.sin(dLng/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}


function optimizeRoute(locations: any[]) {
  console.log("calculating optimized path-----------");
  if (!locations || locations.length <= 1) return locations;

  const hasValidCoordinates = locations.some(
    (loc) => loc.coordinates?.lat && loc.coordinates?.lng
  );

  if (!hasValidCoordinates) {
    return locations.map((loc: any, index: any) => ({
      ...loc,
      optimizedOrder: index,
    }));
  }

  const startCoords = { lat: 22.6837724, lng: 72.8809213 };

  const unvisited = [...locations];
  const route = [];

  // Find the nearest to the fixed startCoords
  let nearestIndex = -1;
  let minDistance = Infinity;

  unvisited.forEach((loc, index) => {
    const distance = calculateDistance(startCoords, loc.coordinates);
    if (distance < minDistance) {
      minDistance = distance;
      nearestIndex = index;
    }
  });

  // Start from the closest one to the fixed point
  let current = unvisited.splice(nearestIndex, 1)[0];
  current.optimizedOrder = 0;
  route.push(current);

  // Continue with nearest neighbor
  while (unvisited.length > 0) {
    let nextNearestIndex = -1;
    let nextMinDistance = Infinity;

    unvisited.forEach((loc, index) => {
      const distance = calculateDistance(current.coordinates, loc.coordinates);
      if (distance < nextMinDistance) {
        nextMinDistance = distance;
        nextNearestIndex = index;
      }
    });

    if (nextNearestIndex !== -1) {
      current = unvisited.splice(nextNearestIndex, 1)[0];
      current.optimizedOrder = route.length;
      route.push(current);
    } else {
      current = unvisited.shift();
      current.optimizedOrder = route.length;
      route.push(current);
    }
  }

  return route;
}

export default function Routes() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [optimizedParcels, setOptimizedParcels] = useState<PickupLocation[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const { data: agents = [], isLoading: loadingAgents } = useQuery<Agent[]>({
    queryKey: ["agents"],
    queryFn: fetchAgents,
  });

  const {
    data: allParcelsData,
    isLoading: loadingParcels,
  } = useQuery<AdminResponse, Error, AdminResponse>({
    queryKey: ["allParcels"],
    queryFn: fetchParcels,
  });
  
  // Filter parcels based on selected agent and date
  const filteredParcels: PickupLocation[] =
    allParcelsData?.parcels
      ?.filter((parcel) => {
        const isAgentMatch =
          selectedAgent === null ||
          parcel.assignedDeliveryAgent === selectedAgent;

        const isDateMatch =
          !selectedDate ||
          format(new Date(parcel.parcelDetails.scheduleDate), "yyyy-MM-dd") ===
            format(selectedDate, "yyyy-MM-dd");

        return isAgentMatch && isDateMatch;
      })
      .map((parcel) => ({
        senderName: parcel.senderDetails.senderName,
        address: parcel.senderDetails.pickupAddress,
        pincode: parcel.senderDetails.pickupPincode,
        trackingNumber: parcel.trackingNumber,
        weight: parcel.parcelDetails.weight,
        coordinates: parcel.senderDetails.coordinates ?? undefined,

      })) || [];

  // Calculate optimal route when requested
  const calculateOptimalRoute = () => {
    console.log("enter----------------------")
    setIsOptimizing(true);
    
    // Small delay to show loading state
    setTimeout(() => {
      const optimized = optimizeRoute([...filteredParcels]);
      setOptimizedParcels(optimized);
      setIsOptimizing(false);
    }, 500);
  };
  
  // Reset optimization when filters change
  useEffect(() => {
    setOptimizedParcels([]);
  }, [selectedDate, selectedAgent]);

  // Display parcels in optimal order if optimization was done, otherwise show in original order
  // const displayParcels = optimizedParcels.length > 0 ? 
  //   [...optimizedParcels].sort((a:any, b:any) => a.optimizedOrder - b.optimizedOrder) : 
  //   filteredParcels;

  const displayParcels = 
  [...optimizedParcels].sort((a:any, b:any) => a.optimizedOrder - b.optimizedOrder) ;

  const formattedDate = selectedDate
    ? format(selectedDate, "dd/MM/yyyy")
    : "Pick a date";

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Route Optimization</h1>
          <p className="text-gray-600">
            Manage delivery agents and optimize routes
          </p>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[200px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formattedDate}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 pointer-events-auto">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
              className="p-3"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Delivery Agents</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {loadingAgents ? (
            <div className="col-span-4 text-center py-4">Loading agents...</div>
          ) : (
            agents.map((agent) => (
              <Card
                key={agent.id}
                className={cn(
                  "cursor-pointer hover:shadow-md transition-all",
                  selectedAgent === agent.name ? "ring-2 ring-primary" : ""
                )}
                onClick={() => setSelectedAgent(agent.name)}
              >
                <CardContent className="p-4 flex items-center">
                  <TruckIcon className="h-5 w-5 mr-3 text-gray-600" />
                  <span className="font-medium">{agent.name}</span>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">
            Route Map:{" "}
            {selectedAgent
              ? selectedAgent
              : "Select an agent"}
          </h2>
          <Map
            markers={displayParcels.map((parcel, index) => ({
              lat: parcel.coordinates?.lat || (21.1702 + index * 0.01),
              lng: parcel.coordinates?.lng || (72.8311 + index * 0.01),
              label: (parcel.optimizedOrder !== undefined ? parcel.optimizedOrder + 1 : index + 1).toString(),
            }))}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Route Optimization</h2>
            <Info className="h-5 w-5 text-gray-500" />
          </div>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                Calculate the most efficient delivery route
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-gray-600" />
                  Pickup Locations
                  <Badge className="ml-2 bg-blue-100 text-blue-700 border-blue-200">
                    {displayParcels.length} stops
                  </Badge>
                </h3>

                <div className="space-y-3 mt-4">
                  {displayParcels.map((location, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-coral-100 text-coral-700 flex items-center justify-center font-medium mr-3">
                        {location.optimizedOrder !== undefined ? location.optimizedOrder + 1 : index + 1}
                      </div>
                      <Input
                        value={location.senderName}
                        className="flex-1"
                        readOnly
                      />
                      <Button variant="ghost" size="icon" className="ml-2">
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                className="w-full bg-coral-500 hover:bg-coral-600 mb-3"
                onClick={calculateOptimalRoute}
                disabled={isOptimizing || filteredParcels.length <= 1}
              >
                {isOptimizing ? (
                  "Optimizing..."
                ) : (
                  <>
                    <CalculatorIcon className="mr-2 h-4 w-4" />
                    Calculate Optimal Route
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Uses nearest neighbor algorithm for route optimization
              </p>
            </CardContent>
          </Card>

          {selectedAgent && displayParcels.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Pickup Details</h3>

              {displayParcels.map((location, index) => (
                <Card key={index} className="mb-3">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-coral-100 text-coral-700 flex items-center justify-center font-medium mr-2">
                        {location.optimizedOrder !== undefined ? location.optimizedOrder + 1 : index + 1}
                      </div>
                      <div className="font-medium">{location.senderName}</div>
                      <Badge className="ml-auto bg-amber-100 text-amber-700 border-amber-200">
                        {location.weight}
                      </Badge>
                    </div>

                    <div className="ml-8 text-sm text-gray-600">
                      <p className="mb-1">{location.address}</p>
                      <p className="mb-1">Pincode: {location.pincode}</p>
                      <p className="mb-1">TRK{location.trackingNumber}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
