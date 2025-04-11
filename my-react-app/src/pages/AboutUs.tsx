
import { Card, CardContent } from "../components/ui/card";
import { Globe, Award, Heart, UserCheck, CheckCircle, Lightbulb, Users } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-cream-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">About CargoConnect</h1>
          
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="mr-4 w-12 h-12 bg-coral-100 rounded-full flex items-center justify-center">
                <Globe className="h-6 w-6 text-coral-500" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Our Story</h2>
            </div>
            
            <p className="text-gray-700 mb-4">
              Founded in 2015, CargoConnect began with a simple mission: to revolutionize courier services by combining cutting-edge technology with unparalleled customer care. What started as a small local delivery service has grown into a nationwide network of dedicated professionals committed to delivering excellence.
            </p>
          </section>
          
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-cream-100 border-cream-200">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-12 h-12 bg-cream-200 rounded-full flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-amber-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Reliability</h3>
                  <p className="text-gray-600">
                    We treat each package with the utmost care, ensuring safe and timely delivery.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-cream-100 border-cream-200">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-12 h-12 bg-cream-200 rounded-full flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-amber-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Technology</h3>
                  <p className="text-gray-600">
                    Our advanced tracking system provides real-time updates for complete package visibility.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-cream-100 border-cream-200">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-12 h-12 bg-cream-200 rounded-full flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-amber-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Sustainability</h3>
                  <p className="text-gray-600">
                    Investing in eco-friendly vehicles and packaging to reduce our environmental impact.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
          
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="mr-4 w-12 h-12 bg-coral-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-coral-500" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Our Core Values</h2>
            </div>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <UserCheck className="h-5 w-5 text-coral-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-800">Customer First:</h3>
                  <p className="text-gray-600">Your needs drive everything we do.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-coral-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-800">Integrity:</h3>
                  <p className="text-gray-600">We are transparent, honest, and accountable.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <Lightbulb className="h-5 w-5 text-coral-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-800">Innovation:</h3>
                  <p className="text-gray-600">We constantly seek better ways to serve you.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <Users className="h-5 w-5 text-coral-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-800">Respect:</h3>
                  <p className="text-gray-600">We value our customers, employees, and community.</p>
                </div>
              </li>
            </ul>
          </section>
          
          <section>
            <div className="text-center bg-coral-100 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact CargoConnect</h2>
              <p className="text-gray-700 mb-2">404-sumeru heghits</p>
              <p className="text-gray-700 mb-2">Helpline No: (555) 123-4567</p>
              <p className="text-gray-700">Email: support@cargoconnect.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
