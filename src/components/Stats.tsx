export default function Stats() {
  return (
    <section className="bg-black py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-gold font-heading font-bold text-3xl md:text-5xl mb-1">15k+</div>
            <div className="text-silver text-sm">Happy Customers</div>
          </div>
          <div>
            <div className="text-gold font-heading font-bold text-3xl md:text-5xl mb-1">13+</div>
            <div className="text-silver text-sm">Vehicles Fleet</div>
          </div>
          <div>
            <div className="text-gold font-heading font-bold text-3xl md:text-5xl mb-1">5+</div>
            <div className="text-silver text-sm">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
}
