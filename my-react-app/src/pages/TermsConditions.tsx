
import { Card, CardContent } from "../components/ui/card";

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-cream-50 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold text-coral-600 mb-8">Terms and Conditions</h1>

            <section className="mb-6">
              <h2 className="text-xl font-medium text-coral-500 mb-2">1. Introduction</h2>
              <p className="text-gray-700 mb-3">
                Welcome to CargoConnect. These Terms and Conditions govern your use of our website and services. By accessing or using CargoConnect, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access or use our services.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-medium text-coral-500 mb-2">2. Definitions</h2>
              <p className="text-gray-700 mb-3">
                "Service" refers to the parcel pickup and delivery services provided by CargoConnect.<br />
                "User," "You," and "Your" refers to the individual or entity using our Service.<br />
                "Company," "We," "Us," and "Our" refers to CargoConnect.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-medium text-coral-500 mb-2">3. Service Description</h2>
              <p className="text-gray-700 mb-3">
                CargoConnect provides parcel pickup and delivery services to destinations specified by the User. We reserve the right to refuse service to anyone for any reason at any time.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-medium text-coral-500 mb-2">4. User Responsibilities</h2>
              <ul className="list-disc pl-6 mb-3 text-gray-700 space-y-1">
                <li>You are responsible for providing accurate information regarding pickup and delivery locations.</li>
                <li>You must ensure that the parcel contents comply with all applicable laws and regulations.</li>
                <li>You are responsible for properly packaging items to prevent damage during transit.</li>
                <li>You must not send prohibited items including but not limited to: illegal substances, hazardous materials, perishable goods (unless specifically arranged), and items of exceptional value without proper insurance.</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-medium text-coral-500 mb-2">5. Pricing and Payment</h2>
              <p className="text-gray-700 mb-3">
                All prices are displayed in the local currency and do not include applicable taxes unless otherwise stated. Payment must be made in advance of service provision. We accept various payment methods as indicated on our website.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-medium text-coral-500 mb-2">6. Delivery and Tracking</h2>
              <p className="text-gray-700 mb-3">
                Estimated delivery times are provided as a guide only and are not guaranteed. Actual delivery times may vary based on distance, traffic, weather conditions, and other factors outside our control. A tracking number will be provided for all shipments.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-medium text-coral-500 mb-2">7. Liability and Insurance</h2>
              <p className="text-gray-700 mb-3">
                Our liability is limited to the declared value of the parcel or the standard liability coverage, whichever is less. Additional insurance can be purchased at the time of booking. We are not liable for any consequential, indirect, or special damages arising from the use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-coral-500 mb-2">8. Cancellation Policy</h2>
              <p className="text-gray-700">
                Cancellations made before pickup are eligible for a full or partial refund according to our current refund policy available on our website. Once a parcel has been picked up, cancellation is not possible.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
