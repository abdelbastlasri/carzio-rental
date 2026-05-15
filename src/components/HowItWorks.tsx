const steps = [
  {
    number: '01',
    title: 'Select Your Car',
    description: 'Browse our wide selection of vehicles to find the perfect match for your travel style, needs, and budget.',
  },
  {
    number: '02',
    title: 'Contact Our Team',
    description: 'Reach out to our friendly team to confirm your booking details and any special requirements.',
  },
  {
    number: '03',
    title: 'Hit the Road',
    description: 'Your car is ready! Pick it up, start exploring Agadir, and enjoy the freedom of the open road with confidence.',
  },
];

export default function HowItWorks() {
  return (
    <section id="about" className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-black font-heading text-3xl md:text-4xl font-bold mb-3">Quick &amp; Easy Car Rental</h2>
          <p className="text-silver max-w-xl mx-auto">
            Booking your rental car has never been simpler &mdash; choose your vehicle online and hit the road in just a few clicks.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center relative">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gold font-heading font-bold text-2xl">{step.number}</span>
              </div>
              <h3 className="text-black font-heading font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-silver text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
