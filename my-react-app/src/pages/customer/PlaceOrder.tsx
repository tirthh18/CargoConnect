// import { useState, useEffect } from "react";
// import { useAuth } from "../../contexts/AuthContext";
// import { placeOrder } from "../../api/parcels";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardFooter,
// } from "../../components/ui/card";
// import { Input } from "../../components/ui/input";
// import { Label } from "../../components/ui/label";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "../../components/ui/tabs";
// import { Button } from "../../components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../../components/ui/select";
// import { Calendar } from "../../components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "../../components/ui/popover";
// import { format } from "date-fns";
// import { CalendarIcon, CreditCard, Landmark } from "lucide-react";
// import { cn } from "../../lib/utils";
// import { toast } from "sonner";

// export default function CustomerPlaceOrder() {
//   const { user } = useAuth();

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [orderPlaced, setOrderPlaced] = useState(false);

//   const [trackingNumber, setTrackingNumber] = useState("");

//   const [pickupAddress, setPickupAddress] = useState("");
//   const [pickupCity, setPickupCity] = useState("");
//   const [pickupPincode, setPickupPincode] = useState("");
//   const [senderMobile, setSenderMobile] = useState("");

//   const [receiverName, setReceiverName] = useState("");
//   const [dropAddress, setDropAddress] = useState("");
//   const [dropCity, setDropCity] = useState("");
//   const [dropPincode, setDropPincode] = useState("");
//   const [receiverMobile, setReceiverMobile] = useState("");

//   const [deliveryType, setDeliveryType] = useState("intercity");
//   const [weight, setWeight] = useState("5kg");
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(
//     new Date(Date.now() + 86400000)
//   );
//   const [selectedTime, setSelectedTime] = useState("09:00");
//   const [paymentMethod, setPaymentMethod] = useState("cod");

//   useEffect(() => {
//     if (pickupCity && dropCity) {
//       if (pickupCity.toLowerCase() === dropCity.toLowerCase()) {
//         setDeliveryType("local");
//       } else {
//         setDeliveryType("intercity");
//       }
//     }
//   }, [pickupCity, dropCity]);

//   const calculateTotal = () => {
//     let baseCost = 0;

//     if (deliveryType === "local") baseCost = 100;
//     else if (deliveryType === "intercity") baseCost = 180;

//     if (weight === "1kg") baseCost += 10;
//     else if (weight === "5kg") baseCost += 25;
//     else if (weight === "10kg") baseCost += 40;
//     else if (weight === "15kg") baseCost += 60;
//     const gst = baseCost * 0.18;
//     const insurance = 15;
//     return {
//       shipping: baseCost,
//       gst,
//       insurance,
//       total: baseCost + gst + insurance,
//     };
//   };

//   const { shipping, gst, insurance, total } = calculateTotal();

//   const handlePlaceOrder = () => {
//     setIsSubmitting(true);
    
//     // Simulate API call
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setOrderPlaced(true);
//       setTrackingNumber(`TRK${Math.floor(Math.random() * 1000000)}`);
//       toast.success("Order placed successfully!");
//     }, 1500);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Place New Order</h1>

//       {orderPlaced ? (
//         <Card className="max-w-2xl mx-auto bg-green-50 border-green-200">
//           <CardContent className="pt-6">
//             <div className="text-center py-8">
//               <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8 text-green-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//               </div>
//               <h2 className="text-2xl font-bold text-green-800 mb-2">
//                 Order Placed Successfully!
//               </h2>
//               <p className="text-green-700 mb-4">Your tracking number is:</p>
//               <div className="bg-white p-3 rounded-md inline-block mb-4">
//                 <span className="text-xl font-mono font-bold">
//                   {trackingNumber}
//                 </span>
//               </div>
//               <p className="text-green-700 mb-6">
//                 You can use this number to track your shipment.
//               </p>
//               <div className="flex justify-center gap-4">
//                 <Button variant="outline" onClick={() => setOrderPlaced(false)}>
//                   Place Another Order
//                 </Button>
//                 <Button
//                   variant="default"
//                   className="bg-coral-500 hover:bg-coral-600"
//                   onClick={() =>
//                     (window.location.href = "/customer/orders-history")
//                   }
//                 >
//                   View My Orders
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2 space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Tracking Information</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="trackingNumber">Tracking Number</Label>
//                     <Input
//                       id="trackingNumber"
//                       defaultValue="TRK850021"
//                       readOnly
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="priority">Priority</Label>
//                     <Select defaultValue="medium">
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select priority" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="low">Low</SelectItem>
//                         <SelectItem value="medium">Medium</SelectItem>
//                         <SelectItem value="high">High</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Sender Details</CardTitle>
//                 <CardDescription>
//                   Enter your details as the sender
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="senderName">Full Name</Label>
//                   <Input
//                     id="senderName"
//                     placeholder="Enter your full name"
//                     value={user?.name || ""}
//                     readOnly
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="pickupAddress">Pickup Address</Label>
//                     <Input
//                       id="pickupAddress"
//                       placeholder="Enter pickup address"
//                       value={pickupAddress}
//                       onChange={(e) => setPickupAddress(e.target.value)}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="pickupCity">Pickup City</Label>
//                     <Select value={pickupCity} onValueChange={setPickupCity}>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="nadiad">Nadiad</SelectItem>
//                         <SelectItem value="surat">Surat</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="pickupPincode">Pickup Pincode</Label>
//                     <Input
//                       id="pickupPincode"
//                       placeholder="Enter pincode"
//                       value={pickupPincode}
//                       onChange={(e) => {
//                         const onlyDigits = e.target.value.replace(/\D/g, "");
//                         if (onlyDigits.length <= 6) {
//                           setPickupPincode(onlyDigits);
//                         }
//                       }}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="senderMobile">Mobile Number</Label>
//                     <Input
//                       id="senderMobile"
//                       placeholder="Enter pincode"
//                       value={senderMobile}
//                       onChange={(e) => {
//                         const onlyDigits = e.target.value.replace(/\D/g, "");
//                         if (onlyDigits.length <= 10) {
//                           setSenderMobile(onlyDigits);
//                         }
//                       }}
//                     />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Receiver Details</CardTitle>
//                 <CardDescription>
//                   Enter the details of the recipient
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="receiverName">Full Name</Label>
//                   <Input
//                     id="receiverName"
//                     placeholder="Enter recipient's full name"
//                     value={receiverName}
//                     onChange={(e) => setReceiverName(e.target.value)}
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="dropAddress">Drop Address</Label>
//                     <Input
//                       id="dropAddress"
//                       placeholder="Enter pickup address"
//                       value={dropAddress}
//                       onChange={(e) => setDropAddress(e.target.value)}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="dropCity">Drop City</Label>
//                     <Select value={dropCity} onValueChange={setDropCity}>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="nadiad">Nadiad</SelectItem>
//                         <SelectItem value="surat">Surat</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="dropPincode">Drop Pincode</Label>
//                     <Input
//                       id="dropPincode"
//                       placeholder="Enter pincode"
//                       value={dropPincode}
//                       onChange={(e) => {
//                         const onlyDigits = e.target.value.replace(/\D/g, "");
//                         if (onlyDigits.length <= 6) {
//                           setDropPincode(onlyDigits);
//                         }
//                       }}
//                     />{" "}
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="receiverMobile">Mobile Number</Label>
//                     <Input
//                       id="receiverMobile"
//                       placeholder="Enter mobile number"
//                       value={receiverMobile}
//                       onChange={(e) => {
//                         const onlyDigits = e.target.value.replace(/\D/g, "");
//                         if (onlyDigits.length <= 10) {
//                           setReceiverMobile(onlyDigits);
//                         }
//                       }}
//                     />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Order Details</CardTitle>
//                 <CardDescription>
//                   Enter the details of your shipment
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="deliveryType">Choose Delivery Type</Label>

//                     <Select
//                       value={deliveryType}
//                       onValueChange={setDeliveryType}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="local">Local</SelectItem>
//                         <SelectItem value="intercity">Intercity</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="weight">Choose Weight</Label>
//                     <Select value={weight} onValueChange={setWeight}>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select weight" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="1kg">1 kg</SelectItem>
//                         <SelectItem value="5kg">5 kg</SelectItem>
//                         <SelectItem value="10kg">10 kg</SelectItem>
//                         <SelectItem value="15kg">15 kg</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="scheduleDate">Schedule Date</Label>
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <Button
//                           variant={"outline"}
//                           className={cn(
//                             "w-full justify-start text-left font-normal",
//                             !selectedDate && "text-muted-foreground"
//                           )}
//                         >
//                           <CalendarIcon className="mr-2 h-4 w-4" />
//                           {selectedDate ? (
//                             format(selectedDate, "PPP")
//                           ) : (
//                             <span>Pick a date</span>
//                           )}
//                         </Button>
//                       </PopoverTrigger>
//                       <PopoverContent className="w-auto p-0 pointer-events-auto">
//                         <Calendar
//                           mode="single"
//                           selected={selectedDate}
//                           onSelect={setSelectedDate}
//                           initialFocus
//                           disabled={(date) => date < new Date()}
//                           className="p-3"
//                         />
//                       </PopoverContent>
//                     </Popover>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="scheduleTime">Schedule Time</Label>
//                     <Select
//                       value={selectedTime}
//                       onValueChange={setSelectedTime}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select time" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="09:00">09:00 AM</SelectItem>
//                         <SelectItem value="12:00">12:00 PM</SelectItem>
//                         <SelectItem value="18:00">06:00 PM</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <div>
//             <Card className="sticky top-6">
//               <CardHeader>
//                 <CardTitle>Payment Details</CardTitle>
//                 <CardDescription>
//                   Complete your order by making a payment
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
//                   <TabsList className="grid w-full grid-cols-2">
//                     <TabsTrigger value="cod">COD</TabsTrigger>
//                     <TabsTrigger value="upi">UPI</TabsTrigger>
//                   </TabsList>
//                   <TabsContent value="cod" className="pt-4">
//                     <p className="text-sm text-gray-600 mb-4">
//                       Pay at the time of delivery. A convenience fee may apply.
//                     </p>
//                   </TabsContent>
//                   <TabsContent value="upi" className="pt-4">
//                     <div className="space-y-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="upiId">UPI ID</Label>
//                         <Input id="upiId" placeholder="yourname@upi" />
//                       </div>
//                     </div>
//                   </TabsContent>
//                 </Tabs>

//                 <div className="mt-6 space-y-2">
//                   <div className="flex justify-between text-sm">
//                     <span>Shipping Cost</span>
//                     <span>₹{shipping.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span>GST @18%</span>
//                     <span>₹{gst.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span>Add ₹15 Insurance</span>
//                     <span>₹{insurance.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between font-bold pt-2 border-t mt-2">
//                     <span>Total</span>
//                     <span>₹{total.toFixed(2)}</span>
//                   </div>
//                 </div>
//               </CardContent>
//               <CardFooter className="flex-col space-y-2">
//                 {paymentMethod === "cod" ? (
//                   <Button
//                     className="w-full bg-green-500 hover:bg-green-600"
//                     onClick={handlePlaceOrder}
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? "Processing..." : `Place Order`}
//                   </Button>
//                 ) : (
//                   <Button
//                     className="w-full bg-green-500 hover:bg-green-600"
//                     onClick={handlePlaceOrder}
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting
//                       ? "Processing..."
//                       : `Pay ₹${total.toFixed(2)} & Place Order`}
//                   </Button>
//                 )}
//               </CardFooter>
//             </Card>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { placeOrder } from "../../api/parcels";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, CreditCard, Landmark } from "lucide-react";
import { cn } from "../../lib/utils";
import { toast } from "sonner";

export default function CustomerPlaceOrder() {
  const { user } = useAuth();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  
  // Combined form data state
  const [formData, setFormData] = useState({
    // Tracking information
    trackingNumber: "TRK850021",
    priority: "medium",
    
    senderName: user?.name || "",
    pickupAddress: "",
    pickupCity: "",
    pickupPincode: "",
    senderMobile: "",
    
    // Receiver details
    receiverName: "",
    dropAddress: "",
    dropCity: "",
    dropPincode: "",
    receiverMobile: "",
    
    // Order details
    deliveryType: "intercity",
    weight: "5kg",
    selectedDate: new Date(Date.now() + 86400000),
    selectedTime: "09:00",
    
    // Payment details
    paymentMethod: "cod",
    upiId: ""
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle date change
  const handleDateChange = (date: Date | undefined) => {
    if (!date) return; // prevent setting undefined
    setFormData({
      ...formData,
      selectedDate: date
    });
  };

  // Update delivery type based on cities
  useEffect(() => {
    if (formData.pickupCity && formData.dropCity) {
      if (formData.pickupCity.toLowerCase() === formData.dropCity.toLowerCase()) {
        setFormData(prev => ({
          ...prev,
          deliveryType: "local"
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          deliveryType: "intercity"
        }));
      }
    }
  }, [formData.pickupCity, formData.dropCity]);

  // Validate number inputs to contain only digits
  const handleNumberInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    maxLength: number
  ) => {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    if (onlyDigits.length <= maxLength) {
      setFormData({
        ...formData,
        [field]: onlyDigits
      });
    }
  };

  const calculateTotal = () => {
    let baseCost = 0;

    if (formData.deliveryType === "local") baseCost = 100;
    else if (formData.deliveryType === "intercity") baseCost = 180;

    if (formData.weight === "1kg") baseCost += 10;
    else if (formData.weight === "5kg") baseCost += 25;
    else if (formData.weight === "10kg") baseCost += 40;
    else if (formData.weight === "15kg") baseCost += 60;
    
    const gst = baseCost * 0.18;
    const insurance = 15;
    
    return {
      shipping: baseCost,
      gst,
      insurance,
      total: baseCost + gst + insurance,
    };
  };

  const { shipping, gst, insurance, total } = calculateTotal();

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    console.log('111111');

    try {
      // Call the API to place the order
      const response = await placeOrder(formData);
      console.log('11111');

      setOrderPlaced(true);
      setTrackingNumber(response.trackingNumber || `TRK${Math.floor(Math.random() * 1000000)}`);
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error("Failed to place order: ");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Place New Order</h1>

      {orderPlaced ? (
        <Card className="max-w-2xl mx-auto bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">
                Order Placed Successfully!
              </h2>
              <p className="text-green-700 mb-4">Your tracking number is:</p>
              <div className="bg-white p-3 rounded-md inline-block mb-4">
                <span className="text-xl font-mono font-bold">
                  {trackingNumber}
                </span>
              </div>
              <p className="text-green-700 mb-6">
                You can use this number to track your shipment.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => setOrderPlaced(false)}>
                  Place Another Order
                </Button>
                <Button
                  variant="default"
                  className="bg-coral-500 hover:bg-coral-600"
                  onClick={() =>
                    (window.location.href = "/customer/orders-history")
                  }
                >
                  View My Orders
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tracking Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="trackingNumber">Tracking Number</Label>
                    <Input
                      id="trackingNumber"
                      value={formData.trackingNumber}
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select 
                      value={formData.priority} 
                      onValueChange={(value) => handleSelectChange("priority", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sender Details</CardTitle>
                <CardDescription>
                  Enter your details as the sender
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="senderName">Full Name</Label>
                  <Input
                    id="senderName"
                    placeholder="Enter your full name"
                    value={formData.senderName}
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickupAddress">Pickup Address</Label>
                    <Input
                      id="pickupAddress"
                      placeholder="Enter pickup address"
                      value={formData.pickupAddress}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pickupCity">Pickup City</Label>
                    <Select 
                      value={formData.pickupCity} 
                      onValueChange={(value) => handleSelectChange("pickupCity", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nadiad">Nadiad</SelectItem>
                        <SelectItem value="surat">Surat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickupPincode">Pickup Pincode</Label>
                    <Input
                      id="pickupPincode"
                      placeholder="Enter pincode"
                      value={formData.pickupPincode}
                      onChange={(e) => handleNumberInput(e, "pickupPincode", 6)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="senderMobile">Mobile Number</Label>
                    <Input
                      id="senderMobile"
                      placeholder="Enter mobile number"
                      value={formData.senderMobile}
                      onChange={(e) => handleNumberInput(e, "senderMobile", 10)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Receiver Details</CardTitle>
                <CardDescription>
                  Enter the details of the recipient
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="receiverName">Full Name</Label>
                  <Input
                    id="receiverName"
                    placeholder="Enter recipient's full name"
                    value={formData.receiverName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dropAddress">Drop Address</Label>
                    <Input
                      id="dropAddress"
                      placeholder="Enter drop address"
                      value={formData.dropAddress}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dropCity">Drop City</Label>
                    <Select 
                      value={formData.dropCity} 
                      onValueChange={(value) => handleSelectChange("dropCity", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nadiad">Nadiad</SelectItem>
                        <SelectItem value="surat">Surat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dropPincode">Drop Pincode</Label>
                    <Input
                      id="dropPincode"
                      placeholder="Enter pincode"
                      value={formData.dropPincode}
                      onChange={(e) => handleNumberInput(e, "dropPincode", 6)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receiverMobile">Mobile Number</Label>
                    <Input
                      id="receiverMobile"
                      placeholder="Enter mobile number"
                      value={formData.receiverMobile}
                      onChange={(e) => handleNumberInput(e, "receiverMobile", 10)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
                <CardDescription>
                  Enter the details of your shipment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="deliveryType">Choose Delivery Type</Label>
                    <Select
                      value={formData.deliveryType}
                      onValueChange={(value) => handleSelectChange("deliveryType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Local</SelectItem>
                        <SelectItem value="intercity">Intercity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Choose Weight</Label>
                    <Select 
                      value={formData.weight} 
                      onValueChange={(value) => handleSelectChange("weight", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select weight" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1kg">1 kg</SelectItem>
                        <SelectItem value="5kg">5 kg</SelectItem>
                        <SelectItem value="10kg">10 kg</SelectItem>
                        <SelectItem value="15kg">15 kg</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="scheduleDate">Schedule Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.selectedDate ? (
                            format(formData.selectedDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 pointer-events-auto">
                        <Calendar
                          mode="single"
                          selected={formData.selectedDate}
                          onSelect={handleDateChange}
                          initialFocus
                          disabled={(date) => date < new Date()}
                          className="p-3"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="selectedTime">Schedule Time</Label>
                    <Select
                      value={formData.selectedTime}
                      onValueChange={(value) => handleSelectChange("selectedTime", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">09:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="18:00">06:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>
                  Complete your order by making a payment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs 
                  value={formData.paymentMethod} 
                  onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="cod">COD</TabsTrigger>
                    <TabsTrigger value="upi">UPI</TabsTrigger>
                  </TabsList>
                  <TabsContent value="cod" className="pt-4">
                    <p className="text-sm text-gray-600 mb-4">
                      Pay at the time of delivery. A convenience fee may apply.
                    </p>
                  </TabsContent>
                  <TabsContent value="upi" className="pt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input 
                          id="upiId" 
                          placeholder="yourname@upi" 
                          value={formData.upiId}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Shipping Cost</span>
                    <span>₹{shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GST @18%</span>
                    <span>₹{gst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Add ₹15 Insurance</span>
                    <span>₹{insurance.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t mt-2">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-2">
                {formData.paymentMethod === "cod" ? (
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600"
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : `Place Order`}
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600"
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Processing..."
                      : `Pay ₹${total.toFixed(2)} & Place Order`}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
