import { Mail, Phone, MapPin } from "lucide-react";

export default function SupportContent() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 h-full flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-500 text-sm mt-1">Get in touch with the placement office for any queries or assistance.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">Contact Placement Office</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-6 bg-blue-50/50 hover:bg-blue-50 border border-blue-100 rounded-xl transition-colors">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <Mail size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Email Support</h3>
            <a href="mailto:placementsupport@office.com" className="text-sm text-blue-600 font-bold hover:underline">placementsupport@office.com</a>
            <p className="text-xs text-gray-500 mt-2">Response time: 24-48 hours</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-green-50/50 hover:bg-green-50 border border-green-100 rounded-xl transition-colors">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <Phone size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Phone Number</h3>
            <a href="tel:+919876543210" className="text-sm text-green-600 font-bold hover:underline">+91 98765 43210</a>
            <p className="text-xs text-gray-500 mt-2">Mon - Fri, 9:00 AM - 5:00 PM</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-purple-50/50 hover:bg-purple-50 border border-purple-100 rounded-xl transition-colors">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
              <MapPin size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Location</h3>
            <p className="text-sm text-purple-600 font-bold">Placement Cell, Admin Block</p>
            <p className="text-xs text-gray-500 mt-2">University Main Campus</p>
          </div>
        </div>
      </div>
    </div>
  );
}
