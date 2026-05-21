import { Link } from 'react-router-dom';

const sections = [
  {
    title: '1. Definitions',
    content: 'Website: refers to the carzio website. User: any person browsing the website or using our services. Provider: carzio, the car rental service provider.',
  },
  {
    title: '2. Services Offered',
    content: 'carzio provides car rental services. Details regarding available vehicles, prices, and specific conditions are available on the website.',
  },
  {
    title: '3. Access to Services',
    content: 'Access to the website is free, while rental services are paid. The User is responsible for their own equipment and internet connection.',
  },
  {
    title: '4. User Obligations',
    content: 'Provide accurate information when making a booking. Comply with the specific rental conditions for each vehicle. Not use the website for illegal purposes.',
  },
  {
    title: '5. Booking and Payment',
    content: 'Bookings are made through our secure online platform. Payment is made upon vehicle delivery. A confirmation will be sent after booking. Prices are displayed in euros. Important: Upon delivery, the total amount must be paid in cash, either in euros or Moroccan dirhams, when receiving the vehicle.',
  },
  {
    title: '6. Cancellation and Refund Policy',
    content: 'Cancellation conditions may vary depending on the booking. Please refer to our Refund Policy for more details.',
  },
  {
    title: '7. carzio Liability',
    content: 'carzio is committed to providing high-quality services but shall not be held responsible for: Misuse of the vehicle. Errors resulting from incorrect information provided by the User.',
  },
  {
    title: '8. Personal Data',
    content: 'We collect and process your data in accordance with our Privacy Policy. Your information will never be shared without your consent.',
  },
  {
    title: '9. Intellectual Property',
    content: 'All website content (texts, images, logos) is the property of carzio. Any reproduction or reuse without prior authorization is prohibited.',
  },
  {
    title: '10. Governing Law and Disputes',
    content: 'These Terms are governed by Moroccan law. Any disputes shall fall under the jurisdiction of the courts of Agadir.',
  },
  {
    title: '11. Modification of Terms',
    content: 'carzio reserves the right to modify these Terms at any time. Changes will take effect immediately upon publication on the website.',
  },
  {
    title: '12. Lost Keys or Documents',
    content: 'In the event of a lost car key, a fee of €150 will be charged. In the event of lost vehicle documents, a fee of €500 will be charged.',
  },
  {
    title: '13. Availability Requests',
    content: 'All vehicle reservations submitted through the website are considered availability requests and are not automatically confirmed. The agency reserves the right to review each request and confirm availability before final approval. Customers are required to provide accurate booking information, including their full name, age, email address, phone number, and pickup details. A transportation/delivery fee may apply depending on the selected pickup location: Casablanca Mohammed V International Airport: Additional €80 transportation fee. Marrakech Airport - Al Manara: Additional €80 transportation fee. Agadir Airport - Al Massira: Free transportation. Essaouira Airport - Mogador: Free transportation. Taghazout: Free transportation. Tamraght: Free transportation.',
  },
  {
    title: '14. No Security Deposit Policy',
    content: 'No security deposit, caution, or guarantee amount shall be required from the customer at the time of booking or vehicle reservation. The customer shall not be obligated to pay, block, or hold any deposit or security amount in connection with the booking of a vehicle, except where expressly stated otherwise in writing by the agency.',
  },
];

export default function TermsPage() {
  return (
    <div className="pt-28 md:pt-32 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/30 to-black" />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-sm font-medium mb-6 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-white font-heading text-3xl md:text-5xl font-bold tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-gold text-sm mt-2">
            Last updated: 21/05/2026
          </p>
          <p className="text-white/50 text-sm mt-4 max-w-2xl mx-auto">
            By accessing the carzio website, you fully accept these Terms and Conditions.
          </p>
        </div>

        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.title}
              className="glass rounded-2xl p-6 md:p-8 border border-white/5 hover:border-gold/20 transition"
            >
              <h2 className="text-white font-heading font-bold text-lg md:text-xl mb-3 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold text-sm font-bold shrink-0">
                  {section.title.split('.')[0]}
                </span>
                {section.title.split('. ').slice(1).join('. ') || section.title}
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-semibold px-8 py-3 rounded-lg transition text-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
