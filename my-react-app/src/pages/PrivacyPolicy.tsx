
import { Card, CardContent } from "../components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-cream-50 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold text-coral-600 mb-8">Privacy Policy</h1>

            <section className="mb-6">
              <h2 className="text-xl font-medium text-coral-500 mb-2">1. Introduction</h2>
              <p className="text-gray-700 mb-3">
                CargoConnect we is committed to protecting your privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you use our website and delivery services. Please read this
                Privacy Policy carefully. By using our services, you consent to the data practices described in this policy.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-medium text-coral-500 mb-2">2. Information We Collect</h2>
              <div className="mb-4">
                <h3 className="font-medium mb-2">Personal Information:</h3>
                <p className="text-gray-700 mb-2">
                  We collect personal information that you voluntarily provide to us when you register,
                  express interest in our services, or otherwise contact us. This information may include:
                </p>
                <ul className="list-disc pl-6 mb-3 text-gray-700 space-y-1">
                  <li>Name, email address, phone number, and billing address</li>
                  <li>Pickup and delivery addresses</li>
                  <li>Payment information</li>
                  <li>Preferences for delivery options</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Automatically Collected Information:</h3>
                <p className="text-gray-700 mb-2">When you access our website, we may automatically collect:</p>
                <ul className="list-disc pl-6 mb-3 text-gray-700 space-y-1">
                  <li>Device information (type, operating system, browser)</li>
                  <li>IP address and location information</li>
                  <li>Browsing actions and patterns</li>
                  <li>Cookies and similar technologies</li>
                </ul>
              </div>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-medium text-coral-500 mb-2">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-2">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-3 text-gray-700 space-y-1">
                <li>Process and fulfill your delivery requests</li>
                <li>Create and manage your account</li>
                <li>Provide tracking information for your parcels</li>
                <li>Process payments and send invoices</li>
                <li>Communicate with you about our services</li>
                <li>Improve our website and services</li>
                <li>Send promotional emails about new services or special offers (if you have opted in)</li>
                <li>Monitor and analyze usage and trends</li>
                <li>Detect, prevent, and address technical issues</li>
              </ul>
            </section>

            {/* Additional sections would continue here */}
            <section className="mb-6">
              <h2 className="text-xl font-medium text-coral-500 mb-2">4. Disclosure of Your Information</h2>
              <p className="text-gray-700 mb-2">We may share your information with:</p>
              <ul className="list-disc pl-6 mb-3 text-gray-700 space-y-1">
                <li><strong>Service Providers:</strong> Third-party vendors who provide services on our behalf, such as payment processing, data analysis, and email delivery.</li>
                <li><strong>Delivery Partners:</strong> Couriers and logistics partners who help us fulfill deliveries.</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition of all or a portion of our assets.</li>
                <li><strong>Legal Requirements:</strong> To comply with legal obligations, protect our rights, or respond to law enforcement requests.</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-medium text-coral-500 mb-2">5. Security of Your Information</h2>
              <p className="text-gray-700 mb-3">
                We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-coral-500 mb-2">6. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700">
                We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
